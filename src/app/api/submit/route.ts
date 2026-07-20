import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const ADMIN_EMAIL = 'assem@clearxaligners.com'
const FROM = 'K Line Academy <noreply@klineacademy.org>'

/* ── Server-side allowlists (must mirror the form) ── */
const BATCHES = [
  'In-Person — Batch 2 (Cairo) · Sep 18 – Oct 10, 2026 · Fri & Sat · 4 weekends',
]
// Human-readable batch name for applicant-facing copy (never show the raw data string)
const BATCH_FRIENDLY = 'Batch 2 in Cairo (September 18 – October 10, 2026)'
const SOFTWARE = ['OnyxCeph', 'Titan', 'No preference']
const WORKFLOWS = ['In-house planning', 'Outsource to lab', 'Mixed']
const CHALLENGES = [
  'Tracking issues',
  'Staging & sequencing',
  'Anchorage control',
  'IPR planning',
  'Attachment design',
  'Case selection',
  'All of the above',
  'Other',
]
const YES_NO = ['Yes', 'No']

interface CvAttachment {
  filename: string
  contentType: string
  content: string // base64
}

interface FormPayload {
  fullName: string
  email: string
  whatsapp: string
  city: string
  batch: string
  software: string
  workflow: string
  casesCompleted: string
  challenge: string
  commitHours: string
  willingGraded: string
  confidentiality: string
  goal: string
  investmentConfirmed: boolean
  website?: string // honeypot — must be empty
  cv?: CvAttachment
}

/* ── Helpers ── */
function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(val: string) {
  return /^\+?[0-9]{10,15}$/.test(val.replace(/[\s\-()]/g, ''))
}

function sanitizeFilename(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9._\- ]/g, '_').slice(0, 100)
  return cleaned || 'cv.pdf'
}

// Verify the decoded file actually starts with the magic bytes of a PDF (%PDF),
// DOCX (PK zip header), or legacy DOC (OLE compound file) — don't trust the
// client-reported MIME type alone.
function hasValidMagicBytes(base64: string): boolean {
  try {
    const head = Buffer.from(base64.slice(0, 16), 'base64')
    const isPdf = head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46
    const isZip = head[0] === 0x50 && head[1] === 0x4b
    const isOle = head[0] === 0xd0 && head[1] === 0xcf && head[2] === 0x11 && head[3] === 0xe0
    return isPdf || isZip || isOle
  } catch {
    return false
  }
}

/* ── Simple in-memory rate limit: max 5 submissions per IP per 10 minutes ── */
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const rateMap = new Map<string, number[]>()
// email -> last successful submission (for retry dedup; sig distinguishes a
// genuine correction from a duplicate network retry)
const recentSubmissions = new Map<string, { ts: number; sig: string }>()

function submissionSig(d: FormPayload): string {
  return `${d.fullName}|${d.whatsapp}|${d.goal.length}|${d.cv?.content.length ?? 0}`
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (hits.length >= RATE_MAX) {
    rateMap.set(ip, hits)
    return true
  }
  hits.push(now)
  rateMap.set(ip, hits)
  // Opportunistic cleanup so the map never grows unbounded
  if (rateMap.size > 1000) {
    rateMap.forEach((v, k) => {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) rateMap.delete(k)
    })
  }
  return false
}

const STRING_FIELDS: (keyof FormPayload)[] = [
  'fullName', 'email', 'whatsapp', 'city', 'batch', 'software', 'workflow',
  'casesCompleted', 'challenge', 'commitHours', 'willingGraded', 'confidentiality', 'goal',
]

// Reject malformed payloads (wrong types) with a clean 400 instead of a 500
function hasValidShape(data: unknown): data is FormPayload {
  if (typeof data !== 'object' || data === null) return false
  const d = data as Record<string, unknown>
  if (!STRING_FIELDS.every((f) => typeof d[f] === 'string')) return false
  if (typeof d.investmentConfirmed !== 'boolean') return false
  if (d.website !== undefined && typeof d.website !== 'string') return false
  if (d.cv !== undefined) {
    const cv = d.cv as Record<string, unknown>
    if (typeof cv !== 'object' || cv === null) return false
    if (typeof cv.filename !== 'string' || typeof cv.contentType !== 'string' || typeof cv.content !== 'string') return false
  }
  return true
}

function validate(data: FormPayload): string | null {
  if (!data.fullName?.trim() || data.fullName.length > 100) return 'Full name is required'
  if (!data.email?.trim() || data.email.length > 200 || !isValidEmail(data.email.trim()))
    return 'Valid email is required'
  if (!data.whatsapp?.trim() || data.whatsapp.length > 30 || !isValidPhone(data.whatsapp))
    return 'Valid WhatsApp number is required'
  if (!data.city?.trim() || data.city.length > 100) return 'City / Country is required'
  if (!BATCHES.includes(data.batch)) return 'Batch selection is required'
  if (!SOFTWARE.includes(data.software)) return 'Software preference is required'
  if (!WORKFLOWS.includes(data.workflow)) return 'Workflow is required'
  const cases = Number(data.casesCompleted)
  if (data.casesCompleted === '' || !Number.isInteger(cases) || cases < 0 || cases > 10000)
    return 'Cases completed is required'
  if (!CHALLENGES.includes(data.challenge)) return 'Challenge is required'
  if (!YES_NO.includes(data.commitHours)) return 'Commitment answer is required'
  if (!YES_NO.includes(data.willingGraded)) return 'Grading answer is required'
  if (data.confidentiality !== 'Yes') return 'Confidentiality agreement is required'
  if (!data.goal?.trim() || data.goal.trim().length < 20 || data.goal.length > 2000)
    return 'Goal must be 20–2000 characters'
  if (!data.investmentConfirmed) return 'Investment confirmation is required'
  if (!data.cv?.content) return 'CV upload is required'
  return null
}

function cairoTimestamp() {
  return new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Cairo',
    dateStyle: 'full',
    timeStyle: 'short',
  })
}

/* ── Brand palette (matches the site) ── */
const NAVY = '#0B132B'
const TEAL = '#06B0AE'

const socialFooterHtml = `
  <div style="background:${NAVY};padding:24px 32px;border-radius:0 0 12px 12px;text-align:center;margin-top:0">
    <p style="font-size:13px;margin:0 0 10px">
      <a href="https://www.kline-europe.com" target="_blank" rel="noopener noreferrer" style="color:#ffffff;text-decoration:none;margin:0 8px">Website</a>
      <span style="color:rgba(255,255,255,0.3)">·</span>
      <a href="https://www.facebook.com/klineurope" target="_blank" rel="noopener noreferrer" style="color:#ffffff;text-decoration:none;margin:0 8px">Facebook</a>
      <span style="color:rgba(255,255,255,0.3)">·</span>
      <a href="https://www.instagram.com/kline_europe" target="_blank" rel="noopener noreferrer" style="color:#ffffff;text-decoration:none;margin:0 8px">Instagram</a>
      <span style="color:rgba(255,255,255,0.3)">·</span>
      <a href="https://www.linkedin.com/company/k-line-europe-gmbh/" target="_blank" rel="noopener noreferrer" style="color:#ffffff;text-decoration:none;margin:0 8px">LinkedIn</a>
      <span style="color:rgba(255,255,255,0.3)">·</span>
      <a href="https://wa.me/201227624659" target="_blank" rel="noopener noreferrer" style="color:#ffffff;text-decoration:none;margin:0 8px">WhatsApp</a>
    </p>
    <p style="font-size:12px;color:rgba(255,255,255,0.6);margin:0">
      <a href="https://www.kline-europe.com" target="_blank" rel="noopener noreferrer" style="color:${TEAL};text-decoration:none">kline-europe.com</a>
      &nbsp;&mdash;&nbsp; &copy; ${new Date().getFullYear()} K Line Academy
    </p>
    <p style="font-size:11px;color:rgba(255,255,255,0.4);margin:4px 0 0">A K Line Europe GmbH initiative</p>
  </div>
`

function adminEmailHtml(d: FormPayload): string {
  const rows = [
    ['Full Name', d.fullName],
    ['Email', d.email],
    ['WhatsApp', d.whatsapp],
    ['City', d.city],
    ['Batch Selected', d.batch],
    ['Software Preference', d.software],
    ['Aligner Workflow', d.workflow],
    ['Cases Completed', d.casesCompleted],
    ['Biggest Challenge', d.challenge],
    ['Commits 2–4 hrs/week', d.commitHours],
    ['Willing to be Graded', d.willingGraded],
    ['Agrees to Confidentiality', d.confidentiality],
    ['Goal After Program', d.goal],
    ['CV Attached', d.cv ? d.cv.filename : 'Not provided'],
    ['Investment Confirmed', 'Yes'],
    ['Submitted At', cairoTimestamp()],
  ]

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 16px;border-bottom:1px solid #eee;font-weight:600;color:${NAVY};width:200px;vertical-align:top;font-size:14px">${escapeHtml(label)}</td><td style="padding:10px 16px;border-bottom:1px solid #eee;color:#333;font-size:14px">${escapeHtml(value)}</td></tr>`
    )
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
      <div style="background:${NAVY};padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;font-size:20px;margin:0">K Line Academy<span style="color:${TEAL}">.</span></h1>
        <p style="color:${TEAL};font-size:14px;margin:4px 0 0">New Application</p>
      </div>
      <div style="background:#fff;padding:0;border:1px solid #e5e5e5;border-top:none">
        <table style="width:100%;border-collapse:collapse">${tableRows}</table>
      </div>
      <p style="color:#888;font-size:12px;margin:12px 0;padding:0 16px">
        Reply to this email or WhatsApp <strong>${escapeHtml(d.whatsapp)}</strong> to follow up.
      </p>
      ${socialFooterHtml}
    </div>
  `
}

function applicantEmailHtml(d: FormPayload): string {
  const firstName = escapeHtml(d.fullName.trim().split(' ')[0])
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
      <div style="background:${NAVY};padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;font-size:20px;margin:0">K Line Academy<span style="color:${TEAL}">.</span></h1>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px">
        <p style="font-size:16px;color:${NAVY};margin:0 0 16px">Hi ${firstName},</p>
        <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 16px">
          We've received your application for K Line Academy — <strong>${BATCH_FRIENDLY}</strong>.
        </p>
        <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 8px"><strong>Here's what happens next:</strong></p>
        <ol style="font-size:14px;color:#333;line-height:2;padding-left:20px;margin:0 0 24px">
          <li>We review every application within 48 hours</li>
          <li>We'll contact you with a decision via WhatsApp or email</li>
          <li>If accepted, a 50% deposit (20,000 EGP) secures your seat</li>
          <li>The remaining balance (20,000 EGP) is due at Session 1</li>
        </ol>
        <p style="font-size:13px;color:#666;line-height:1.6;margin:0 0 16px;padding:12px 16px;background:#e9f8f8;border-left:3px solid ${TEAL};border-radius:4px">
          <strong style="color:${NAVY}">Refund Policy:</strong> Full refund available up to 10 days before the first session. After that, fees are non-refundable.
          <a href="https://klineacademy.org/terms" style="color:${TEAL}">Full Terms &amp; Refund Policy</a>
        </p>
        <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 24px">
          Questions? Reply to this email or message us on <a href="https://wa.me/201227624659" style="color:${TEAL}">WhatsApp</a>.
        </p>
        <div style="border-top:1px solid #eee;padding-top:20px;margin-top:16px">
          <p style="font-size:14px;color:${NAVY};margin:0;font-weight:600">— Dr. Assem Youssef</p>
          <p style="font-size:13px;color:#888;margin:4px 0 0">CEO, K Line Middle East</p>
          <p style="font-size:13px;color:#888;margin:2px 0 0">${ADMIN_EMAIL}</p>
        </div>
      </div>
      ${socialFooterHtml}
    </div>
  `
}

function applicantEmailText(d: FormPayload): string {
  const firstName = d.fullName.trim().split(' ')[0]
  return [
    `Hi ${firstName},`,
    '',
    `We've received your application for K Line Academy — ${BATCH_FRIENDLY}.`,
    '',
    "Here's what happens next:",
    '1. We review every application within 48 hours',
    "2. We'll contact you with a decision via WhatsApp or email",
    '3. If accepted, a 50% deposit (20,000 EGP) secures your seat',
    '4. The remaining balance (20,000 EGP) is due at Session 1',
    '',
    'Refund policy: full refund available up to 10 days before the first session; after that, fees are non-refundable. Full terms: https://klineacademy.org/terms',
    '',
    'Questions? Reply to this email or message us on WhatsApp: https://wa.me/201227624659',
    '',
    '— Dr. Assem Youssef',
    'CEO, K Line Middle East',
    ADMIN_EMAIL,
  ].join('\n')
}

export async function POST(request: Request) {
  try {
    // Fail fast and loud when the email service is not configured —
    // otherwise a misconfigured deploy silently loses applications.
    if (!process.env.RESEND_API_KEY) {
      console.error('[submit] RESEND_API_KEY is not set — applications CANNOT be delivered')
      return NextResponse.json(
        { success: false, error: 'Email service is not configured. Please contact us on WhatsApp.' },
        { status: 500 }
      )
    }

    // Use the LAST x-forwarded-for hop (appended by the nearest trusted proxy) —
    // the first entry is client-controlled and spoofable
    const xff = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')
    const ip = xff[xff.length - 1].trim()
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      )
    }

    const raw = await request.json()
    if (!hasValidShape(raw)) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission. Please reload the page and try again.' },
        { status: 400 }
      )
    }
    const data: FormPayload = raw

    // Honeypot: real users never fill this field. Pretend success so bots don't adapt.
    if (data.website) {
      return NextResponse.json({ success: true })
    }

    const validationError = validate(data)
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 })
    }

    // Idempotency: the SAME content re-submitted within 2 minutes is a retry
    // after a lost response — acknowledge without re-sending. A changed payload
    // (corrected CV, fixed number) passes through as a fresh application.
    const dedupKey = data.email.trim().toLowerCase()
    const sig = submissionSig(data)
    const lastSeen = recentSubmissions.get(dedupKey)
    if (lastSeen && Date.now() - lastSeen.ts < 2 * 60 * 1000 && lastSeen.sig === sig) {
      return NextResponse.json({ success: true, deduplicated: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send admin notification email (with CV attached)
    const adminEmailParams: Parameters<typeof resend.emails.send>[0] = {
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `New Application — ${data.fullName.slice(0, 60)} · ${data.software}`,
      html: adminEmailHtml(data),
      replyTo: data.email,
    }

    if (data.cv?.content) {
      // Server-side size cap: ~4.3 MB base64 ≈ 3 MB binary (mirrors the client cap)
      if (data.cv.content.length > 4.3 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'CV file too large (max 3 MB).' },
          { status: 400 }
        )
      }
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]
      if (!data.cv.contentType || !allowedTypes.includes(data.cv.contentType)) {
        return NextResponse.json(
          { success: false, error: 'CV must be PDF or Word.' },
          { status: 400 }
        )
      }
      if (!hasValidMagicBytes(data.cv.content)) {
        return NextResponse.json(
          { success: false, error: 'CV file appears corrupted. Please re-export it as PDF and try again.' },
          { status: 400 }
        )
      }
      adminEmailParams.attachments = [
        {
          filename: sanitizeFilename(data.cv.filename),
          content: data.cv.content, // base64
          contentType: data.cv.contentType,
        },
      ]
    }

    let adminOk = false
    let applicantOk = false

    try {
      const adminResult = await resend.emails.send(adminEmailParams)
      adminOk = !adminResult.error
      if (adminResult.error) {
        console.error('[submit] Admin email error:', adminResult.error)
      }
    } catch (e) {
      console.error('[submit] Admin email exception:', e)
    }

    try {
      const applicantResult = await resend.emails.send({
        from: FROM,
        to: data.email,
        replyTo: ADMIN_EMAIL,
        subject: 'Your K Line Academy Application — Received',
        html: applicantEmailHtml(data),
        text: applicantEmailText(data),
      })
      applicantOk = !applicantResult.error
      if (applicantResult.error) {
        console.error('[submit] Applicant email error:', applicantResult.error)
      }
    } catch (e) {
      console.error('[submit] Applicant email exception:', e)
    }

    // Success ONLY if the application actually reached the admissions inbox.
    // The applicant confirmation is best-effort.
    if (adminOk) {
      recentSubmissions.set(dedupKey, { ts: Date.now(), sig })
      if (recentSubmissions.size > 1000) {
        const cutoff = Date.now() - 10 * 60 * 1000
        recentSubmissions.forEach((v, k) => {
          if (v.ts < cutoff) recentSubmissions.delete(k)
        })
      }
      return NextResponse.json({ success: true, adminOk, applicantOk })
    }

    return NextResponse.json(
      { success: false, error: 'Email delivery failed. Please contact us directly on WhatsApp.' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process application. Please try again.' },
      { status: 500 }
    )
  }
}
