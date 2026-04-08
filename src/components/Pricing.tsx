const included = [
  '8 sessions (40 hours total)',
  '15 real case assignments with answer keys',
  'OnyxCeph or Titan software access',
  'Printed session materials',
  'Pre & post skills assessment',
  'K Line ME hiring pipeline eligibility',
  '50% discount on first 2 cases',
  '12-month alumni webinar access',
]

export default function Pricing() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy rounded-2xl p-10 md:p-14 text-center">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Investment
          </p>
          <p className="text-5xl md:text-6xl font-bold text-white mb-8">
            $1,000 <span className="text-2xl font-normal text-gray-400">USD</span>
          </p>

          <div className="text-left max-w-md mx-auto mb-10">
            <p className="text-white font-semibold mb-4">What&apos;s included:</p>
            <ul className="space-y-3">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-400 text-sm mb-8">
            Payment via bank transfer or Instapay after acceptance.
            <br />A 50% deposit ($500) secures your seat.
          </p>

          <a
            href="/apply"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors"
          >
            Apply Now <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
