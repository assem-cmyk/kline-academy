export default function Hero() {
  return (
    <section className="bg-navy hero-pattern pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Master Digital Aligner Planning
          <br className="hidden sm:block" /> in 4 Weeks
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Egypt&apos;s first case-based bootcamp using OnyxCeph &amp; Titan — taught by K Line Europe&apos;s own specialists
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="/apply"
            className="bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors inline-flex items-center gap-2"
          >
            Apply Now <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="#program"
            className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
          >
            View Program
          </a>
        </div>

        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
          <span className="text-sm text-gray-300">
            Next Batch: June 20 – July 12, 2026 &middot; Cairo &middot; 12 Seats
          </span>
        </div>
      </div>
    </section>
  )
}
