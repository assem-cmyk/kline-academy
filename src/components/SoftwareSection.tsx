'use client'

const software = [
  {
    name: 'OnyxCeph',
    logo: '/software/onyxceph-logo.png',
    tagline: 'Cloud-based aligner planning',
    features: ['6 seats per batch', 'Beginner-friendly workflow', 'Instant cloud collaboration'],
  },
  {
    name: 'Titan',
    logo: '/software/titan-logo.png',
    tagline: 'Advanced dental design',
    features: ['6 seats per batch', 'Industry-standard toolchain', 'Pro-grade precision'],
  },
]

export default function SoftwareSection() {
  return (
    <section className="relative py-24 md:py-28 bg-slate-50/40 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-teal uppercase mb-3">
            Software Platforms
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy max-w-3xl mx-auto leading-tight">
            Train on the tools <span className="gradient-text">labs actually use.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {software.map((sw) => (
            <div
              key={sw.name}
              className="group bg-white rounded-2xl p-8 md:p-10 shadow-premium hover:shadow-premium-lg border border-navy-700/8 hover:border-teal/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Logo container */}
              <div className="h-24 flex items-center justify-center mb-6 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-navy-700/5 relative overflow-hidden">
                <img
                  src={sw.logo}
                  alt={`${sw.name} logo`}
                  className="max-h-16 max-w-[200px] object-contain relative z-10 transition-transform group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = 'block'
                  }}
                />
                <h3 className="text-3xl font-bold text-navy hidden">{sw.name}</h3>
              </div>

              <p className="text-navy/60 text-sm mb-5">{sw.tagline}</p>

              <ul className="space-y-2.5">
                {sw.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-navy/80 text-[15px]">
                    <span className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-teal" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-navy/50 text-sm mt-10 max-w-2xl mx-auto">
          Select your preferred software in the application form.
          Allocation is first-come, first-served upon acceptance.
        </p>
      </div>
    </section>
  )
}
