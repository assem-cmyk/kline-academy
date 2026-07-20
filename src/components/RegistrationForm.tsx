'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

/* ── Types ── */
interface FormData {
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
}

const EMPTY: FormData = {
  fullName: '',
  email: '',
  whatsapp: '',
  city: '',
  batch: '',
  software: '',
  workflow: '',
  casesCompleted: '',
  challenge: '',
  commitHours: '',
  willingGraded: '',
  confidentiality: '',
  goal: '',
  investmentConfirmed: false,
}

const STORAGE_KEY = 'kline-academy-form'

const STEPS = ['Personal Info', 'Batch & Software', 'Clinical Background', 'Review & Submit']

const BATCHES = [
  'Offline — Batch 2 (Cairo) · Sep 18 – Oct 10, 2026 · Fri & Sat · 4 weekends',
]

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

/* ── Helpers ── */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function stripPhone(val: string) {
  return val.replace(/[\s\-()]/g, '')
}

function isValidPhone(val: string) {
  return /^\+?[0-9]{10,15}$/.test(stripPhone(val))
}

/* ── Component ── */
export default function RegistrationForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  // Honeypot — humans never see or fill this field
  const [website, setWebsite] = useState('')
  const formRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const mountedRef = useRef(false)

  // CV file (not persisted to localStorage — must re-upload on refresh)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvError, setCvError] = useState('')

  // Load from localStorage on mount — merge with defaults so schema changes never crash,
  // and drop any stale batch value that no longer exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = { ...EMPTY, ...JSON.parse(saved) } as FormData
        if (parsed.batch && !BATCHES.includes(parsed.batch)) parsed.batch = ''
        setForm(parsed)
      }
    } catch {}
  }, [])

  // If there's only one batch, auto-select it so users don't have to "pick" the only option
  useEffect(() => {
    if (BATCHES.length === 1 && !form.batch) {
      setForm((prev) => ({ ...prev, batch: BATCHES[0] }))
    }
  }, [form.batch])

  // Save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
    } catch {}
  }, [form])

  // Move focus to the step heading when the step changes (skip initial mount)
  useEffect(() => {
    if (mountedRef.current) {
      headingRef.current?.focus()
    } else {
      mountedRef.current = true
    }
  }, [step])

  const set = useCallback((field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  function scrollToError() {
    setTimeout(() => {
      const el = formRef.current?.querySelector('.field-error')
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

  /* ── Validation per step ── */
  function validateStep(s: number): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {}

    if (s === 1) {
      if (!form.fullName.trim()) errs.fullName = 'Full name is required'
      if (!form.email.trim()) errs.email = 'Email is required'
      else if (!isValidEmail(form.email.trim())) errs.email = 'Enter a valid email'
      if (!form.whatsapp.trim()) errs.whatsapp = 'WhatsApp number is required'
      else if (!isValidPhone(form.whatsapp))
        errs.whatsapp = 'Enter a valid number with country code, e.g. +20 1XX XXX XXXX'
      if (!form.city.trim()) errs.city = 'Country / City is required'
    }

    if (s === 2) {
      if (!form.batch) errs.batch = 'Select a batch'
      if (!form.software) errs.software = 'Select a software preference'
    }

    if (s === 3) {
      if (!form.workflow) errs.workflow = 'Select your current workflow'
      if (form.casesCompleted === '') errs.casesCompleted = 'Enter number of cases'
      else if (parseInt(form.casesCompleted) < 0) errs.casesCompleted = 'Must be 0 or more'
      if (!form.challenge) errs.challenge = 'Select your biggest challenge'
      if (!form.commitHours) errs.commitHours = 'This field is required'
      if (!form.willingGraded) errs.willingGraded = 'This field is required'
      if (!form.confidentiality) errs.confidentiality = 'This field is required'
      else if (form.confidentiality === 'No')
        errs.confidentiality = 'Confidentiality agreement is required to participate in K Line Academy.'
      if (!form.goal.trim()) errs.goal = 'Please describe your goal'
      else if (form.goal.trim().length < 20) errs.goal = 'At least 20 characters required'
      // CV validation
      if (!cvFile) {
        setCvError('Please upload your CV')
      } else {
        setCvError('')
      }
    }

    if (s === 4) {
      if (!form.investmentConfirmed) errs.investmentConfirmed = 'You must confirm the investment to submit'
    }

    setErrors(errs)
    const hasCvError = s === 3 && !cvFile
    if (Object.keys(errs).length > 0 || hasCvError) {
      scrollToError()
      return false
    }
    return true
  }

  function handleCvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setCvError('File too large. Max size is 5 MB.')
      setCvFile(null)
      return
    }
    // Allowed types
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) {
      setCvError('Only PDF or Word (.doc, .docx) files are accepted.')
      setCvFile(null)
      return
    }
    setCvError('')
    setCvFile(file)
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Strip data URL prefix
        resolve(result.split(',')[1] || '')
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  function next() {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function back() {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submit() {
    if (!validateStep(4)) return
    if (!cvFile) {
      setSubmitError('Please go back to Step 3 and upload your CV.')
      return
    }
    setSubmitting(true)
    setSubmitError('')

    try {
      const cvBase64 = await fileToBase64(cvFile)
      // Trim all string fields once before sending
      const trimmed = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
      ) as unknown as FormData
      const payload = {
        ...trimmed,
        website, // honeypot
        cv: {
          filename: cvFile.name,
          contentType: cvFile.type,
          content: cvBase64,
        },
      }

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (data.success) {
        localStorage.removeItem(STORAGE_KEY)
        // Keep `submitting` true — the button stays disabled while we navigate away,
        // preventing a double submission
        router.push(`/apply/success?batch=${encodeURIComponent(form.batch)}`)
      } else {
        setSubmitError(data.error || 'Something went wrong. Your answers are saved — please try again.')
        setSubmitting(false)
      }
    } catch {
      setSubmitError('Something went wrong. Your answers are saved — please try again.')
      setSubmitting(false)
    }
  }

  /* ── Shared field components ── */
  function FieldError({ field }: { field: keyof FormData }) {
    return errors[field] ? (
      <p id={`${field}-error`} role="alert" className="field-error text-red-600 text-sm mt-1">
        {errors[field]}
      </p>
    ) : null
  }

  function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
    return (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-navy mb-1.5">
        {children}
      </label>
    )
  }

  const inputCls = (field: keyof FormData) =>
    `w-full border ${errors[field] ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm focus:border-gold transition-colors`

  const fieldAria = (field: keyof FormData) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  })

  /* ── Step Renderers ── */
  function renderStep1() {
    return (
      <div className="space-y-5">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <input id="fullName" name="name" type="text" autoComplete="name" className={inputCls('fullName')} value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Your full name" {...fieldAria('fullName')} />
          <FieldError field="fullName" />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <input id="email" name="email" type="email" autoComplete="email" className={inputCls('email')} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" {...fieldAria('email')} />
          <FieldError field="email" />
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp Number (incl. country code) *</Label>
          <input id="whatsapp" name="tel" type="tel" inputMode="tel" autoComplete="tel" className={inputCls('whatsapp')} value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="+20 1XX XXX XXXX" {...fieldAria('whatsapp')} />
          <FieldError field="whatsapp" />
        </div>
        <div>
          <Label htmlFor="city">Country / City *</Label>
          <input id="city" name="city" type="text" autoComplete="address-level2" className={inputCls('city')} value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Cairo, Egypt" {...fieldAria('city')} />
          <FieldError field="city" />
        </div>
        {/* Honeypot — hidden from humans, bots often fill every field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
      </div>
    )
  }

  function renderStep2() {
    return (
      <div className="space-y-6">
        <p className="text-gray-500 text-sm">Choose your batch and software preference.</p>

        <div>
          {BATCHES.length === 1 ? (
            <>
              <span id="batch-label" className="block text-sm font-medium text-navy mb-1.5">Batch *</span>
              <div aria-labelledby="batch-label" className="flex items-start gap-3 border border-teal/30 bg-teal/5 rounded-lg px-4 py-3">
                <span className="mt-0.5 inline-flex w-5 h-5 rounded-full bg-teal/15 items-center justify-center shrink-0">
                  <svg aria-hidden="true" className="w-3 h-3 text-teal" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-navy">{BATCHES[0]}</p>
                  <p className="text-gray-500 text-xs mt-1">Only Batch 2 is currently open. You will be enrolled in this batch on acceptance.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <Label htmlFor="batch">Batch *</Label>
              <select id="batch" className={inputCls('batch')} value={form.batch} onChange={(e) => set('batch', e.target.value)} {...fieldAria('batch')}>
                <option value="">Select a batch...</option>
                {BATCHES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </>
          )}
          <FieldError field="batch" />
        </div>

        <div>
          <span id="software-label" className="block text-sm font-medium text-navy mb-1.5">Software Preference *</span>
          <div role="group" aria-labelledby="software-label" className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            {[
              { value: 'OnyxCeph', label: 'OnyxCeph', desc: 'Established planning software' },
              { value: 'Titan', label: 'Titan', desc: 'Advanced dental design' },
              { value: 'No preference', label: 'No preference', desc: 'Assign me based on availability' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={form.software === opt.value}
                onClick={() => set('software', opt.value)}
                className={`border rounded-lg p-4 text-left transition-all ${
                  form.software === opt.value
                    ? 'border-gold bg-gold/5 ring-2 ring-gold/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-navy text-sm">{opt.label}</p>
                <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>
          <FieldError field="software" />
          <p className="text-gray-500 text-xs mt-2">
            Each batch has 15 seats. Software allocation is first-come, first-served upon acceptance.
          </p>
        </div>
      </div>
    )
  }

  function renderStep3() {
    return (
      <div className="space-y-5">
        <p className="text-gray-500 text-sm">Help us understand your current experience level.</p>

        <div>
          <Label htmlFor="workflow">Current aligner workflow *</Label>
          <select id="workflow" className={inputCls('workflow')} value={form.workflow} onChange={(e) => set('workflow', e.target.value)} {...fieldAria('workflow')}>
            <option value="">Select...</option>
            <option value="In-house planning">In-house planning</option>
            <option value="Outsource to lab">Outsource to lab</option>
            <option value="Mixed">Mixed</option>
          </select>
          <FieldError field="workflow" />
        </div>

        <div>
          <Label htmlFor="casesCompleted">Aligner cases completed end-to-end *</Label>
          <input id="casesCompleted" type="number" min="0" className={inputCls('casesCompleted')} value={form.casesCompleted} onChange={(e) => set('casesCompleted', e.target.value)} placeholder="0" {...fieldAria('casesCompleted')} />
          <FieldError field="casesCompleted" />
        </div>

        <div>
          <Label htmlFor="challenge">Biggest recurring challenge *</Label>
          <select id="challenge" className={inputCls('challenge')} value={form.challenge} onChange={(e) => set('challenge', e.target.value)} {...fieldAria('challenge')}>
            <option value="">Select...</option>
            {CHALLENGES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <FieldError field="challenge" />
        </div>

        {/* Radio questions */}
        {([
          { field: 'commitHours' as const, question: 'Can you commit 2–4 hours/week between sessions for case work? *' },
          { field: 'willingGraded' as const, question: 'Are you willing to be graded — pre/post assessments and case checkpoints? *' },
          { field: 'confidentiality' as const, question: 'Do you agree not to record or share cases or materials outside the cohort? *' },
        ]).map(({ field, question }) => (
          <fieldset key={field} className="border-0 p-0 m-0">
            <legend className="text-sm font-medium text-navy mb-2 p-0">{question}</legend>
            <div className="flex gap-4">
              {['Yes', 'No'].map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={field}
                    value={val}
                    checked={form[field] === val}
                    onChange={() => set(field, val)}
                    className="w-4 h-4 text-gold accent-gold"
                  />
                  <span className="text-sm">{val}</span>
                </label>
              ))}
            </div>
            <FieldError field={field} />
          </fieldset>
        ))}

        <div>
          <Label htmlFor="goal">Specific goal after the 8 sessions *</Label>
          <textarea
            id="goal"
            className={`${inputCls('goal')} min-h-[100px] resize-y`}
            value={form.goal}
            onChange={(e) => set('goal', e.target.value)}
            placeholder="Be specific — what will you do differently in your clinic after this program?"
            rows={4}
            {...fieldAria('goal')}
          />
          <div className="flex justify-between mt-1">
            <FieldError field="goal" />
            <span className={`text-xs ${form.goal.trim().length < 20 ? 'text-gray-500' : 'text-green-600'}`}>
              {form.goal.trim().length}/20 min
            </span>
          </div>
        </div>

        {/* CV Upload */}
        <div>
          <label htmlFor="cv" className="block text-sm font-medium text-navy mb-1.5">
            Upload your CV *
          </label>
          <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors focus-within:ring-2 focus-within:ring-teal/50 ${
            cvError ? 'border-red-400 bg-red-50/30' : cvFile ? 'border-gold bg-gold/5' : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleCvUpload}
              className="sr-only"
              aria-invalid={cvError ? true : undefined}
              aria-describedby={cvError ? 'cv-error' : undefined}
            />
            {cvFile ? (
              <div>
                <svg aria-hidden="true" className="w-8 h-8 text-gold mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium text-navy">{cvFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(cvFile.size / 1024).toFixed(1)} KB</p>
                <button
                  type="button"
                  onClick={() => { setCvFile(null); setCvError('') }}
                  className="text-xs text-red-600 hover:underline mt-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label htmlFor="cv" className="cursor-pointer block">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-navy font-medium">Click to upload your CV</p>
                <p className="text-xs text-gray-500 mt-1">PDF or Word · Max 5 MB</p>
              </label>
            )}
          </div>
          {cvError && <p id="cv-error" role="alert" className="text-red-600 text-sm mt-1 field-error">{cvError}</p>}
        </div>
      </div>
    )
  }

  function renderStep4() {
    const sections = [
      {
        title: 'Personal Info',
        editStep: 1,
        rows: [
          ['Full Name', form.fullName],
          ['Email', form.email],
          ['WhatsApp', form.whatsapp],
          ['Country / City', form.city],
        ],
      },
      {
        title: 'Batch & Software',
        editStep: 2,
        rows: [
          ['Batch', form.batch],
          ['Software', form.software],
        ],
      },
      {
        title: 'Clinical Background',
        editStep: 3,
        rows: [
          ['Workflow', form.workflow],
          ['Cases Completed', form.casesCompleted],
          ['Biggest Challenge', form.challenge],
          ['Commits 2–4 hrs/week', form.commitHours],
          ['Willing to be Graded', form.willingGraded],
          ['Confidentiality', form.confidentiality],
          ['Goal', form.goal],
          ['CV', cvFile ? cvFile.name : 'Not uploaded'],
        ],
      },
    ]

    return (
      <div className="space-y-6">
        <p className="text-gray-500 text-sm">Review your application before submitting.</p>

        {sections.map((sec) => (
          <div key={sec.title} className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy">{sec.title}</h3>
              <button
                type="button"
                onClick={() => setStep(sec.editStep)}
                className="text-gold-dark hover:text-navy text-sm font-medium"
              >
                Edit
              </button>
            </div>
            <dl className="space-y-2">
              {sec.rows.map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
                  <dt className="text-xs text-gray-500 sm:w-40 shrink-0">{label}</dt>
                  <dd className="text-sm text-text-primary break-words">{value || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        <div className="border border-gray-200 rounded-xl p-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.investmentConfirmed}
              onChange={(e) => set('investmentConfirmed', e.target.checked)}
              className="mt-1 w-4 h-4 accent-gold"
            />
            <span className="text-sm text-gray-700">
              I confirm I am ready for the 40,000 EGP investment. I understand payment is made via bank transfer or InstaPay after acceptance. A 50% deposit (20,000 EGP) secures my seat, with the remaining balance due at Session 1. I understand that refunds are available up to 10 days before the first session; after that, fees are non-refundable. I agree to the processing of my data as described in the{' '}
              <a href="/privacy" target="_blank" className="underline text-navy hover:text-teal-dark">Privacy Policy</a>.
            </span>
          </label>
          <FieldError field="investmentConfirmed" />
        </div>

        {submitError && (
          <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
            {submitError}
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={formRef} className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((label, i) => {
            const stepNum = i + 1
            const active = stepNum === step
            const completed = stepNum < step
            return (
              <div key={label} className="flex flex-col items-center flex-1" aria-current={active ? 'step' : undefined}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    active
                      ? 'bg-gold text-white'
                      : completed
                      ? 'bg-navy text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {completed ? (
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span className={`text-xs mt-1.5 hidden sm:block ${active ? 'text-gold-dark font-semibold' : 'text-gray-500'}`}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>
        {/* Progress line */}
        <div
          className="h-1 bg-gray-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-label="Application progress"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step}
          aria-valuetext={`Step ${step} of ${STEPS.length}: ${STEPS[step - 1]}`}
        >
          <div
            className="h-full bg-navy rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          if (step < 4) next()
          else submit()
        }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 step-transition"
      >
        <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-navy mb-6 outline-none">
          Step {step}: {STEPS[step - 1]}
        </h2>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={back}
              className="text-sm font-medium text-gray-600 hover:text-navy transition-colors flex items-center gap-1"
            >
              <span aria-hidden="true">&larr;</span> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="submit"
              className="bg-gold hover:bg-gold-dark text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1"
            >
              Next <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="bg-gold hover:bg-gold-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg aria-hidden="true" className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>Submit Application <span aria-hidden="true">&rarr;</span></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
