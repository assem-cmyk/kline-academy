const software = [
  {
    name: 'OnyxCeph',
    features: ['Cloud-based aligner planning', '6 seats per batch', 'Beginner-friendly workflow'],
  },
  {
    name: 'Titan',
    features: ['Advanced aligner design software', '6 seats per batch', 'Industry-standard toolchain'],
  },
]

export default function SoftwareSection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">
          Software Platforms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {software.map((sw) => (
            <div
              key={sw.name}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-navy mb-4">{sw.name}</h3>
              <ul className="space-y-2">
                {sw.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8 max-w-2xl mx-auto">
          Select your preferred software in the application form.
          Allocation is first-come, first-served upon acceptance.
        </p>
      </div>
    </section>
  )
}
