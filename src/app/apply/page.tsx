import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RegistrationForm from '@/components/RegistrationForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply',
  description:
    'Apply for the K Line Academy digital aligner planning bootcamp. 4 weekends, 15 real cases, direct hiring pipeline into K Line Europe GmbH.',
  alternates: { canonical: '/apply' },
  openGraph: {
    title: 'Apply — K Line Academy',
    description:
      'Apply for the K Line Academy digital aligner planning bootcamp. 4 weekends, 15 real cases, direct hiring pipeline into K Line Europe GmbH.',
    url: '/apply',
    siteName: 'K Line Academy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply — K Line Academy',
    description:
      'Apply for the K Line Academy digital aligner planning bootcamp. 4 weekends, 15 real cases, direct hiring pipeline into K Line Europe GmbH.',
  },
}

export default function ApplyPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50/50">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Apply to K Line Academy</h1>
          <p className="text-gray-600 mb-3">Complete the form below to submit your application.</p>
          <p className="text-gray-500 text-sm">
            Takes about 5 minutes · Have your CV ready (PDF or Word) · No payment is due now —
            applying is non-binding and we review every application within 48 hours.
          </p>
        </div>
        <RegistrationForm />
      </main>
      <Footer />
    </>
  )
}
