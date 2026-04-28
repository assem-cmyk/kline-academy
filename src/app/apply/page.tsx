import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RegistrationForm from '@/components/RegistrationForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply — K Line Academy',
  description: 'Apply for the K Line Academy digital aligner planning bootcamp. 4 weeks, 15 real cases, direct hiring pipeline into K Line Europe GmbH.',
}

export default function ApplyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50/50">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Apply to K Line Academy</h1>
          <p className="text-gray-500">Complete the form below to submit your application.</p>
        </div>
        <RegistrationForm />
      </main>
      <Footer />
    </>
  )
}
