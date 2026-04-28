import { NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

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
  cv?: CvAttachment
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(data: FormPayload): string | null {
  if (!data.fullName?.trim()) return 'Full name is required'
  if (!data.email?.trim() || !isValidEmail(data.email)) return 'Valid email is required'
  if (!data.whatsapp?.trim() || data.whatsapp.replace(/[\s\-()]/g, '').length < 10)
    return 'Valid WhatsApp number is required'
  if (!data.city?.trim()) return 'City is required'
  if (!data.batch) return 'Batch selection is required'
  if (!data.software) return 'Software preference is required'
  if (!data.workflow) return 'Workflow is required'
  if (data.casesCompleted === '' || parseInt(data.casesCompleted) < 0) return 'Cases completed is required'
  if (!data.challenge) return 'Challenge is required'
  if (!data.commitHours) return 'Commitment answer is required'
  if (!data.willingGraded) return 'Grading answer is required'
  if (data.confidentiality !== 'Yes') return 'Confidentiality agreement is required'
  if (!data.goal?.trim() || data.goal.trim().length < 20) return 'Goal must be at least 20 characters'
  if (!data.investmentConfirmed) return 'Investment confirmation is required'
  return null
}

function cairoTimestamp() {
  return new Date().toLocaleString('en-GB', {
    timeZone: 'Africa/Cairo',
    dateStyle: 'full',
    timeStyle: 'short',
  })
}

const socialFooterHtml = `
  <div style="background:#0A1628;padding:24px 32px;border-radius:0 0 12px 12px;text-align:center;margin-top:0">
    <div style="margin-bottom:16px">
      <a href="https://www.kline-europe.com" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);text-decoration:none;line-height:36px;text-align:center;margin:0 4px" title="Website">
        <img src="https://img.icons8.com/ios-filled/24/ffffff/globe.png" width="18" height="18" alt="Website" style="vertical-align:middle"/>
      </a>
      <a href="https://www.facebook.com/klineurope" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);text-decoration:none;line-height:36px;text-align:center;margin:0 4px" title="Facebook">
        <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png" width="18" height="18" alt="Facebook" style="vertical-align:middle"/>
      </a>
      <a href="https://www.instagram.com/kline_europe" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);text-decoration:none;line-height:36px;text-align:center;margin:0 4px" title="Instagram">
        <img src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png" width="18" height="18" alt="Instagram" style="vertical-align:middle"/>
      </a>
      <a href="https://www.linkedin.com/company/k-line-europe-gmbh/" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);text-decoration:none;line-height:36px;text-align:center;margin:0 4px" title="LinkedIn">
        <img src="https://img.icons8.com/ios-filled/24/ffffff/linkedin.png" width="18" height="18" alt="LinkedIn" style="vertical-align:middle"/>
      </a>
      <a href="https://wa.me/201227624659" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);text-decoration:none;line-height:36px;text-align:center;margin:0 4px" title="WhatsApp">
        <img src="https://img.icons8.com/ios-filled/24/ffffff/whatsapp.png" width="18" height="18" alt="WhatsApp" style="vertical-align:middle"/>
      </a>
    </div>
    <p style="font-size:12px;color:rgba(255,255,255,0.6);margin:0">
      <a href="https://www.kline-europe.com" target="_blank" rel="noopener noreferrer" style="color:#D4A843;text-decoration:none">kline-europe.com</a>
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
        `<tr><td style="padding:10px 16px;border-bottom:1px solid #eee;font-weight:600;color:#0A1628;width:200px;vertical-align:top;font-size:14px">${label}</td><td style="padding:10px 16px;border-bottom:1px solid #eee;color:#333;font-size:14px">${value}</td></tr>`
    )
    .join('')

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto">
      <div style="background:#0A1628;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;font-size:20px;margin:0">K Line Academy<span style="color:#D4A843">.</span></h1>
        <p style="color:#D4A843;font-size:14px;margin:4px 0 0">New Application</p>
      </div>
      <div style="background:#fff;padding:0;border:1px solid #e5e5e5;border-top:none">
        <table style="width:100%;border-collapse:collapse">${tableRows}</table>
      </div>
      <p style="color:#888;font-size:12px;margin:12px 0;padding:0 16px">
        Reply to this email or WhatsApp <strong>${d.whatsapp}</strong> to follow up.
      </p>
      ${socialFooterHtml}
    </div>
  `
}

function applicantEmailHtml(d: FormPayload): string {
  const firstName = d.fullName.split(' ')[0]
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto">
      <div style="background:#0A1628;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;font-size:20px;margin:0">K Line Academy<span style="color:#D4A843">.</span></h1>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px">
        <p style="font-size:16px;color:#1A1A2E;margin:0 0 16px">Hi ${firstName},</p>
        <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 16px">
          We've received your application for K Line Academy — <strong>${d.batch}</strong>.
        </p>
        <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 8px"><strong>Here's what happens next:</strong></p>
        <ol style="font-size:14px;color:#333;line-height:2;padding-left:20px;margin:0 0 24px">
          <li>We'll review your application within 48 hours</li>
          <li>If accepted, we'll contact you via WhatsApp or email</li>
          <li>A 50% deposit ($375 USD) confirms your seat</li>
          <li>Full balance ($375 USD) is due at Session 1</li>
        </ol>
        <p style="font-size:13px;color:#666;line-height:1.6;margin:0 0 16px;padding:12px 16px;background:#fdf6e3;border-left:3px solid #D4A843;border-radius:4px">
          <strong style="color:#1A1A2E">Refund Policy:</strong> Full refund available up to 10 days before the first session. After that, fees are non-refundable.
        </p>
        <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 24px">
          Questions? Reply to this email or message us on WhatsApp.
        </p>
        <div style="border-top:1px solid #eee;padding-top:20px;margin-top:16px">
          <p style="font-size:14px;color:#1A1A2E;margin:0;font-weight:600">— Assem K</p>
          <p style="font-size:13px;color:#888;margin:4px 0 0">CEO, K Line Middle East</p>
          <p style="font-size:13px;color:#888;margin:2px 0 0">assem@clearxaligners.com</p>
        </div>
      </div>
      ${socialFooterHtml}
    </div>
  `
}

export async function POST(request: Request) {
  try {
    const data: FormPayload = await request.json()

    const validationError = validate(data)
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 })
    }

    const resend = getResend()

    // Send admin notification email (with CV attached if provided)
    const adminEmailParams: Parameters<typeof resend.emails.send>[0] = {
      from: 'K Line Academy <onboarding@resend.dev>',
      to: 'assem@clearxaligners.com',
      subject: `New Application — ${data.fullName} · ${data.batch} · ${data.software}`,
      html: adminEmailHtml(data),
      replyTo: data.email,
    }

    if (data.cv?.content) {
      // Server-side size cap: ~7 MB base64 ≈ 5 MB binary
      if (data.cv.content.length > 7 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'CV file too large (max 5 MB).' },
          { status: 400 }
        )
      }
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]
      if (data.cv.contentType && !allowedTypes.includes(data.cv.contentType)) {
        return NextResponse.json(
          { success: false, error: 'CV must be PDF or Word.' },
          { status: 400 }
        )
      }
      adminEmailParams.attachments = [
        {
          filename: data.cv.filename,
          content: data.cv.content, // base64
        },
      ]
    }

    let adminOk = false
    let applicantOk = false

    try {
      const adminResult = await resend.emails.send(adminEmailParams)
      console.log('[submit] Admin email result:', JSON.stringify(adminResult))
      adminOk = !adminResult.error
      if (adminResult.error) {
        console.error('[submit] Admin email error:', adminResult.error)
      }
    } catch (e) {
      console.error('[submit] Admin email exception:', e)
    }

    try {
      const applicantResult = await resend.emails.send({
        from: 'K Line Academy <onboarding@resend.dev>',
        to: data.email,
        subject: 'Your K Line Academy Application — Received ✓',
        html: applicantEmailHtml(data),
      })
      console.log('[submit] Applicant email result:', JSON.stringify(applicantResult))
      applicantOk = !applicantResult.error
      if (applicantResult.error) {
        console.error('[submit] Applicant email error:', applicantResult.error)
      }
    } catch (e) {
      console.error('[submit] Applicant email exception:', e)
    }

    // As long as admin received the application, treat as success
    if (adminOk || applicantOk) {
      return NextResponse.json({ success: true, adminOk, applicantOk })
    }

    return NextResponse.json(
      { success: false, error: 'Email delivery failed. Please contact us directly.' },
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
