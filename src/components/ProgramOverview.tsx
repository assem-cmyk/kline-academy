const details = [
  '8 Sessions — Saturdays & Sundays over 4 consecutive weekends',
  '8 Hours per session · 9:00 AM – 5:00 PM',
  'Starting Saturday, June 20, 2026',
  '2 Formats: Offline (Cairo) · Online (Live Zoom)',
  '4 Offline batches + 2 Online batches per year',
  '12 participants max per batch',
  'Split: 6 seats on OnyxCeph · 6 seats on Titan',
  '15 de-identified real cases per participant',
  'Pre & post assessment with measurable skill lift',
]

const sessions = [
  { num: '1', date: 'Sat · June 20, 2026', time: '9:00 AM – 5:00 PM', title: 'Introduction to Clear Aligners' },
  { num: '2', date: 'Sun · June 21, 2026', time: '9:00 AM – 5:00 PM', title: 'The Digital Workflow' },
  { num: '3', date: 'Sat · June 27, 2026', time: '9:00 AM – 5:00 PM', title: 'Hands-On Workshop I' },
  { num: '4', date: 'Sun · June 28, 2026', time: '9:00 AM – 5:00 PM', title: 'Hands-On Workshop II' },
  { num: '5', date: 'Sat · July 4, 2026', time: '9:00 AM – 5:00 PM', title: 'Hands-On Workshop III' },
  { num: '6', date: 'Sun · July 5, 2026', time: '9:00 AM – 5:00 PM', title: 'Hands-On Workshop IV' },
  { num: '7', date: 'Sat · July 11, 2026', time: '9:00 AM – 5:00 PM', title: 'Hands-On Workshop V' },
  { num: '8', date: 'Sun · July 12, 2026', time: '9:00 AM – 5:00 PM', title: 'Special Cases & Capstone' },
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
                  <div className="pb-6">
                    <p className="text-xs text-gold font-semibold uppercase tracking-wide">
                      Session {s.num}
                    </p>
                    <p className="font-semibold text-navy">{s.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{s.date}</p>
                    <p className="text-xs text-gray-500">{s.time}</p>
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
