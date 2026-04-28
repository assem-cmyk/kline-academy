const included = [
  '8 sessions (64 hours total)',
  '15 real case assignments with answer keys',
  'OnyxCeph or Titan software access',
  'Printed session materials',
  'Pre & post skills assessment',
  'K Line Academy completion certificate',
  'K Line Europe hiring pipeline eligibility',
  '50% discount on first 2 cases',
  '6-month alumni webinar access',
]

export default function Pricing() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-teal uppercase mb-3">
            Investment
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
            One commitment. <span className="gradient-text">Lifelong return.</span>
          </h2>
        </div>

        <div className="relative bg-navy-900 rounded-3xl p-10 md:p-14 text-center overflow-hidden bg-noise">
          {/* Decorative orbs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-teal/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 w-72 h-72 rounded-full bg-teal-glow/10 blur-3xl" />

          <div className="relative">
            <p className="text-teal text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              First Batch · Cairo
            </p>
            <p className="text-6xl md:text-7xl font-bold text-white mb-2 tracking-tight">
              $750
              <span className="text-xl font-normal text-slate-400 ml-2">USD</span>
            </p>
            <p className="text-slate-400 text-sm mb-10">
              4 weekends · 64 hours · 15 cases
            </p>

            <div className="text-left max-w-md mx-auto mb-10 space-y-2.5">
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                What's included
              </p>
              <ul className="space-y-2.5">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-[15px]">
                    <span className="mt-1 w-5 h-5 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-teal" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-6 mb-8">
              <p className="text-slate-400 text-sm mb-2">
                Payment via bank transfer or Instapay after acceptance.
              </p>
              <p className="text-slate-400 text-sm">
                A 50% deposit ($375) secures your seat.
              </p>
              <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-teal/10 border border-teal/20">
                <svg className="w-3.5 h-3.5 text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-teal-light text-xs font-medium">
                  Full refund up to 10 days before first session
                </span>
              </div>
            </div>

            <a
              href="/apply"
              className="btn-premium inline-flex items-center gap-2 text-white font-semibold px-10 py-4 rounded-full text-base group"
            >
              Apply Now
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
