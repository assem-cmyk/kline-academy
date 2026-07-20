const faqs = [
  {
    q: 'How does the application process work?',
    a: 'Submit the application form (it takes about 5 minutes — have your CV ready as PDF or Word). We review every application within 48 hours and contact you with a decision via WhatsApp or email. Applying is free and non-binding; no payment is due until you are accepted.',
  },
  {
    q: 'When do I pay, and how?',
    a: 'Only after acceptance. A 50% deposit (20,000 EGP) secures your seat via bank transfer or InstaPay, and the remaining balance (20,000 EGP) is due at Session 1.',
  },
  {
    q: 'What is the refund policy?',
    a: 'Full refund up to 10 days before the first session. After that, fees are non-refundable. The full terms are on our Terms & Refund Policy page.',
  },
  {
    q: 'Do I need my own software license?',
    a: 'No. OnyxCeph or Titan software access during the program is included in the course fee — you will be assigned a seat on one of the two platforms based on your preference and availability.',
  },
  {
    q: 'Will I work on real cases?',
    a: 'Yes — 15 de-identified real patient cases per participant, each with answer keys, evaluation rubrics, and instructor walkthroughs. Roughly 85% of course hours are hands-on planning.',
  },
  {
    q: 'What certification do I receive?',
    a: 'Graduates receive the official K Line Academy completion certificate plus ADA certification.',
  },
  {
    q: 'Where exactly does the course take place?',
    a: 'In person in Cairo, Egypt, on Fridays (4:30–9:30 PM) and Saturdays (9:30 AM–4:30 PM). The exact venue address is shared with accepted applicants before the first session.',
  },
  {
    q: 'What happens after graduation?',
    a: 'You keep access to monthly alumni webinars for 6 months, get 50% off your first 2 cases submitted to K Line Middle East, and become eligible for the K Line Europe hiring pipeline — 1–2 top performers are hired per batch.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="relative py-24 md:py-32 bg-slate-50/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-teal-dark uppercase mb-3">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            Common <span className="gradient-text">questions.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group bg-white rounded-2xl border border-navy-700/8 shadow-premium open:border-teal/30 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-[15px] md:text-base font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 w-7 h-7 rounded-full bg-teal/10 flex items-center justify-center transition-transform group-open:rotate-45">
                  <svg aria-hidden="true" className="w-4 h-4 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-[15px] text-navy/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <p className="text-center text-navy/70 text-sm mt-10">
          Something else on your mind?{' '}
          <a
            href="https://wa.me/201227624659"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-dark font-semibold underline underline-offset-2 hover:text-navy transition-colors"
          >
            WhatsApp us
          </a>{' '}
          or email{' '}
          <a
            href="mailto:assem@clearxaligners.com"
            className="text-teal-dark font-semibold underline underline-offset-2 hover:text-navy transition-colors"
          >
            assem@clearxaligners.com
          </a>
        </p>
      </div>
    </section>
  )
}
