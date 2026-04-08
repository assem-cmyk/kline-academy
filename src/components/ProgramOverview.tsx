const details = [
  '8 Sessions — Saturdays & Sundays over 4 consecutive weekends',
  '~5 Hours per session',
  '2 Formats: Offline (Cairo) · Online (Live Zoom)',
  '4 Offline batches + 2 Online batches per year',
  '20 participants max per batch',
  'Split: 10 seats on OnyxCeph · 10 seats on Titan',
  '15 de-identified real cases per participant',
  'Pre & post assessment with measurable skill lift',
]

const sessions = [
  { num: '1', title: 'Introduction to Clear Aligners' },
  { num: '2', title: 'The Digital Workflow' },
  { num: '3–7', title: 'Hands-On Workshops (5 sessions)' },
  { num: '8', title: 'Special Cases & Capstone' },
]

export default function ProgramOverview() {
  return (
    <section id="program" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-16">
          The Program
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Details */}
          <div>
            <ul className="space-y-4">
              {details.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-gold shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-navy mb-6">8-Session Timeline</h3>
            <div className="space-y-0">
              {sessions.map((s, i) => (
                <div key={i} className="flex items-stretch gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {s.num}
                    </div>
                    {i < sessions.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="text-sm text-gray-500 font-medium">
                      Session {s.num}
                    </p>
                    <p className="font-semibold text-navy">{s.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
