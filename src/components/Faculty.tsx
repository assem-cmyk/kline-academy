'use client'

const faculty = [
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
    title: 'Aligner Specialist',
    institution: '',
    badge: 'Head of Treatment Planning Department, K Line Europe GmbH',
  },
]

function FacultyPhoto({ photo, initials, name }: { photo: string; initials: string; name: string }) {
  return (
    <div className="w-[200px] h-[200px] rounded-full mx-auto mb-4 bg-gray-200 overflow-hidden relative">
      {/* Placeholder with initials */}
      <div className="absolute inset-0 flex items-center justify-center bg-navy/10 text-navy text-3xl font-bold">
        {initials}
      </div>
      {/* Actual image — overlays placeholder if loaded */}
      <img
        src={photo}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}

export default function Faculty() {
  return (
    <section id="faculty" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">
          Your Instructors
        </h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Every instructor plans aligner cases professionally — this is not theoretical teaching.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {faculty.map((f) => (
            <div
              key={f.name}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow group"
            >
              <FacultyPhoto photo={f.photo} initials={f.initials} name={f.name} />
              <h3 className="text-lg font-bold text-navy mb-1">{f.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{f.title}</p>
              {f.institution && (
                <p className="text-sm text-gray-500 mb-3">{f.institution}</p>
              )}
              <span className="inline-block bg-gold/10 text-gold-dark text-xs font-medium px-3 py-1.5 rounded-full mt-2">
                {f.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
