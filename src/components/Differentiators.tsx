const items = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    stat: '85%',
    title: 'Hands-On Learning',
    desc: 'Not lectures. Real case planning from Day 1, with live feedback from K Line Europe specialists.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    stat: '15',
    title: 'Real Patient Cases',
    desc: 'De-identified clinical cases with answer keys, evaluation rubrics, and instructor walkthroughs.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    stat: '1–2',
    title: 'Hired Per Batch',
    desc: 'Top performers join K Line Europe GmbH\'s treatment planning team. The only direct pathway in.',
  },
]

export default function Differentiators() {
  return (
    <section className="relative py-24 md:py-28 bg-white overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-teal blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-teal uppercase mb-3">
            Why K Line Academy
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy max-w-2xl mx-auto leading-tight">
            Built differently. <span className="gradient-text">On purpose.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group relative bg-white rounded-2xl p-8 border border-navy-700/8 hover:border-teal/30 shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon + Stat */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal/10 to-teal/5 flex items-center justify-center text-teal group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-3xl font-bold gradient-text">{item.stat}</span>
              </div>

              <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
              <p className="text-navy/60 text-[15px] leading-relaxed">{item.desc}</p>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-teal/0 via-teal/0 to-teal/5 rounded-tr-2xl rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
