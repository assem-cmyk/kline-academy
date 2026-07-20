import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Differentiators from '@/components/Differentiators'
import ProgramOverview from '@/components/ProgramOverview'
import SoftwareSection from '@/components/SoftwareSection'
import Faculty from '@/components/Faculty'
import BusinessModule from '@/components/BusinessModule'
import Benefits from '@/components/Benefits'
import Faq from '@/components/Faq'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://klineacademy.org'

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Digital Aligner Planning Bootcamp — Batch 2',
  description:
    "Egypt's first case-based bootcamp for digital aligner planning using OnyxCeph & Titan, taught by K Line Europe specialists. 8 sessions over 4 weekends, 15 real cases per participant.",
  provider: {
    '@type': 'Organization',
    name: 'K Line Academy',
    url: SITE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '40000',
    priceCurrency: 'EGP',
    availability: 'https://schema.org/LimitedAvailability',
    url: `${SITE_URL}/apply`,
    category: 'Professional Training',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Onsite',
    startDate: '2026-09-18',
    endDate: '2026-10-10',
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

export default function Home() {
  return (
    <>
      <Header />
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
    </>
  )
}
