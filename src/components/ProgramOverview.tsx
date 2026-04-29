const details = [
  '8 Sessions — Saturdays & Sundays over 4 consecutive weekends',
  'Sessions 9:00 AM – 3:00 PM · Workshops 9:00 AM – 4:00 PM',
  'Starting Saturday, July 4, 2026',
  '2 Formats: Offline (Cairo) · Online (Live Zoom)',
  '12 participants max per batch',
  'Split: 6 seats on OnyxCeph · 6 seats on Titan',
  '15 de-identified real cases per participant',
  'Pre & post assessment with measurable skill lift',
]

const sessions = [
  { num: '1', date: 'Sat · July 4, 2026', time: '9:00 AM – 3:00 PM', title: 'Introduction to Clear Aligners' },
  { num: '2', date: 'Sun · July 5, 2026', time: '9:00 AM – 3:00 PM', title: 'The Digital Workflow' },
  { num: '3', date: 'Sat · July 11, 2026', time: '9:00 AM – 4:00 PM', title: 'Hands-On Workshop I' },
  { num: '4', date: 'Sun · July 12, 2026', time: '9:00 AM – 4:00 PM', title: 'Hands-On Workshop II' },
  { num: '5', date: 'Sat · July 18, 2026', time: '9:00 AM – 4:00 PM', title: 'Hands-On Workshop III' },
  { num: '6', date: 'Sun · July 19, 2026', time: '9:00 AM – 4:00 PM', title: 'Hands-On Workshop IV' },
  { num: '7', date: 'Sat · July 25, 2026', time: '9:00 AM – 4:00 PM', title: 'Hands-On Workshop V' },
  { num: '8', date: 'Sun · July 26, 2026', time: '9:00 AM – 3:00 PM', title: 'Special Cases & Capstone' },
]

export default function ProgramOverview() {
  return (
    <section id="program" className="relative py-24 md:py-32 bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-teal uppercase mb-3">
            The Program
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy max-w-2xl mx-auto leading-tight">
            Four weekends. <span className="gradient-text">Eight intensive sessions.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Details Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-premium border border-navy-700/5">
            <h3 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-teal" />
              At a glance
            </h3>
            <ul className="space-y-4">
              {details.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-navy/75">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  <span className="text-[15px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="bg-navy-900 rounded-3xl p-8 md:p-10 shadow-premium-lg relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-teal/10 blur-3xl pointer-events-none" />
            <h3 className="relative text-lg font-bold text-white mb-7 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-teal" />
              8-Session Schedule
            </h3>
            <div className="relative space-y-0">
              {sessions.map((s, i) => (
                <div key={i} className="flex items-stretch gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal/30 to-teal/10 border border-teal/40 text-teal-light flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-110 transition-transform">
                      {s.num}
                    </div>
                    {i < sessions.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-teal/30 to-teal/0 my-1" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-teal uppercase mb-0.5">
                      Session {s.num}
                    </p>
                    <p className="font-semibold text-white text-[15px]">{s.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{s.date} · {s.time}</p>
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
