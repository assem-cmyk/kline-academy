import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Differentiators from '@/components/Differentiators'
import ProgramOverview from '@/components/ProgramOverview'
import SoftwareSection from '@/components/SoftwareSection'
import Faculty from '@/components/Faculty'
import BusinessModule from '@/components/BusinessModule'
import Benefits from '@/components/Benefits'
import Faq, { faqs } from '@/components/Faq'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://klineacademy.org'

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Digital Aligner Planning Bootcamp — Batch 3',
  description:
    "Egypt's first case-based bootcamp for digital aligner planning using OnyxCeph & Titan, taught by K Line Europe specialists. 8 sessions over 4 weekends, 15 real cases per participant.",
  provider: {
    '@type': 'Organization',
    name: 'K Line Academy',
    url: SITE_URL,
  },
  image: `${SITE_URL}/opengraph-image`,
  offers: {
    '@type': 'Offer',
    price: '900',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
    url: `${SITE_URL}/apply`,
    validFrom: '2026-10-08',
    category: 'Paid',
  },
  courseWorkload: 'PT50H',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Onsite',
    courseWorkload: 'PT50H',
    instructor: [
      { '@type': 'Person', name: 'Dr. Sameh Talaat' },
      { '@type': 'Person', name: 'Dr. Yasmine El Kabani' },
      { '@type': 'Person', name: 'Dr. Sara Tag' },
      { '@type': 'Person', name: 'Dr. Khalid Ibrahim' },
      { '@type': 'Person', name: 'Dr. Amr Radwan' },
      { '@type': 'Person', name: 'Dr. Nehal Ahmed' },
    ],
    location: {
      '@type': 'Place',
      name: 'Cairo, Egypt',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cairo',
        addressCountry: 'EG',
      },
    },
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Home() {
  return (
    <>
      <Header overDark />
      <main id="main">
        <Hero />
        <Differentiators />
        <ProgramOverview />
        <SoftwareSection />
        <Faculty />
        <BusinessModule />
        <Benefits />
        <Faq />
        <Pricing />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}
