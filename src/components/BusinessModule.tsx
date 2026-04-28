'use client'

const highlights = [
  {
    title: 'Aligner Market Landscape',
    desc: 'Where the global and regional aligner market is heading — players, pricing, and where the margin actually lives.',
  },
  {
    title: 'Building a Profitable Aligner Practice',
    desc: 'Case mix, pricing strategy, lab partnerships, and what it really takes to scale aligner cases in your clinic.',
  },
  {
    title: 'Inside K Line Europe',
    desc: 'How a manufacturer-side treatment planning operation works — pipeline, quality, and what differentiates aligner brands.',
  },
]

export default function BusinessModule() {
  return (
    <section className="relative py-24 md:py-32 bg-navy overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 -left-32 w-[500px] h-[500px] rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photo */}
          <div className="lg:col-span-5">
            <div className="relative max-w-[360px] mx-auto lg:mx-0">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-teal/30 via-teal/10 to-transparent blur-2xl" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-premium-lg">
                <img
                  src="/faculty/assem-k.jpg"
                  alt="Dr. Assem Youssef, CEO of K Line Middle East"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% top' }}
                />
              </div>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-6 lg:translate-x-0 inline-block bg-teal text-navy text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded-full shadow-premium whitespace-nowrap">
                CEO, K Line ME
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-teal uppercase mb-3">
              From the CEO
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              The business of aligners — <span className="gradient-text">not just the planning.</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
              Most aligner courses stop at the software. <strong className="text-white font-semibold">Dr. Assem Youssef</strong>,
              CEO of K Line Middle East, leads a dedicated module on the market itself — how aligner companies
              compete, how successful clinics price and scale cases, and how a manufacturer-side treatment
              planning operation actually runs. Knowing this is what separates a technician from a practice owner.
            </p>

            <ul className="space-y-4 mb-8">
              {highlights.map((h) => (
                <li key={h.title} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-teal/15 border border-teal/30 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-white font-semibold text-[15px] mb-1">{h.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-white/50 text-sm italic">
              Included in every batch — one full session dedicated to the business side.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
