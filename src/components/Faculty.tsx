'use client'

const faculty = [
  {
    name: 'Dr. Assem Youssef',
    photo: '/faculty/assem-k.jpg',
    initials: 'AY',
    title: '',
    institution: '',
    badge: 'CEO, K Line ME',
  },
  {
    name: 'Dr. Sameh Talaat',
    photo: '/faculty/sameh-talaat.jpg',
    initials: 'SmT',
    title: 'Associate Research Scientist',
    institution: 'Dept. of Oral Technology, University of Bonn',
    badge: 'Lecturer of Orthodontics, Future University in Egypt',
  },
  {
    name: 'Dr. Yasmine El Kabani',
    photo: '/faculty/yasmine-kabani.jpg',
    initials: 'YK',
    title: 'MD, PhD · Associate Professor',
    institution: '',
    badge: 'Head of Science & Technology Development, K Line Europe GmbH',
  },
  {
    name: 'Dr. Sara Tag',
    photo: '/faculty/sara-tag.jpg',
    initials: 'SrT',
    title: 'Pediatric Dentist (MSc)',
    institution: '',
    badge: 'Product Lead Manager, K Line Europe GmbH',
  },
  {
    name: 'Dr. Khalid Ibrahim',
    photo: '/faculty/khalid-ibrahim.jpg',
    initials: 'KI',
    title: 'Specialist Orthodontist · F(Orth) RCSEd',
    institution: '',
    badge: 'Head of Treatment Planning Quality Dept., K Line Europe GmbH',
  },
  {
    name: 'Dr. Amr Radwan',
    photo: '/faculty/amr-radwan.jpg',
    initials: 'AR',
    title: 'Aligner Specialist · Clinical & Digital Orthodontic Aligners Consultant',
    institution: '',
    badge: 'Head of Clinical Treatment Planning Dept., K Line Europe GmbH',
  },
]

function FacultyPhoto({ photo, initials, name }: { photo: string; initials: string; name: string }) {
  return (
    <div className="relative w-[180px] h-[180px] mx-auto mb-5">
      {/* Glow ring */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-teal/40 via-teal-glow/20 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
      <div className="relative w-full h-full rounded-full overflow-hidden bg-navy-700/10 ring-2 ring-white shadow-premium">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal/15 to-navy/5 text-navy text-3xl font-bold">
          {initials}
        </div>
        <img
          src={photo}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-top"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
    </div>
  )
}

export default function Faculty() {
  return (
    <section id="faculty" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-teal/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-teal uppercase mb-3">
            Faculty
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
            Taught by <span className="gradient-text">practitioners.</span>
          </h2>
          <p className="text-navy/60 max-w-2xl mx-auto text-base md:text-lg">
            Every instructor plans aligner cases professionally — this is not theoretical teaching.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {faculty.map((f) => (
            <div
              key={f.name}
              className="group relative text-center p-8 rounded-2xl bg-white border border-navy-700/8 hover:border-teal/30 shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300"
            >
              <FacultyPhoto photo={f.photo} initials={f.initials} name={f.name} />
              <h3 className="text-lg font-bold text-navy mb-1">{f.name}</h3>
              {f.title && <p className="text-sm text-navy/60 mb-1">{f.title}</p>}
              {f.institution && (
                <p className="text-sm text-navy/50 mb-3 italic">{f.institution}</p>
              )}
              <span className="inline-block bg-teal/10 text-teal-dark text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mt-3 border border-teal/20">
                {f.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
