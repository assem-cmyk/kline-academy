export default function Hero() {
  return (
    <section className="relative bg-navy-900 overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 hero-grid" />
      <div className="hero-orb hero-orb-teal" style={{ width: 600, height: 600, top: -150, left: -150 }} />
      <div className="hero-orb hero-orb-blue" style={{ width: 700, height: 700, bottom: -250, right: -200 }} />
      <div className="hero-orb hero-orb-teal" style={{ width: 400, height: 400, top: '30%', right: '20%', opacity: 0.25 }} />

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(11,19,43,0) 0%, rgba(11,19,43,0.6) 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 backdrop-blur-sm mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-teal animate-subtle-pulse" />
          <span className="text-xs font-medium tracking-wide text-teal-light uppercase">
            Applications Open · First Batch
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-7 max-w-5xl mx-auto animate-fade-in-up">
          Master Digital
          <span className="block bg-gradient-to-r from-teal-light to-teal bg-clip-text text-transparent">
            Aligner Planning
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl font-semibold text-white/90 mt-3">in 4 Weeks</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          Egypt's first case-based bootcamp using OnyxCeph &amp; Titan — taught by K Line Europe's own specialists.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="/apply"
            className="btn-premium text-white font-semibold px-8 py-4 rounded-full text-[15px] inline-flex items-center gap-2 group"
          >
            Apply Now
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="#program"
            className="text-white/90 hover:text-white font-medium px-8 py-4 rounded-full text-[15px] border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            View Program
          </a>
        </div>

        {/* Meta strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs md:text-sm text-slate-400 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            July 4 – 26, 2026
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600 hidden md:block" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Cairo, Egypt
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600 hidden md:block" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            12 Seats Only
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
