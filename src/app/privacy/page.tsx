import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How K Line Academy collects, uses, and protects the personal data you share when applying to the program.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy — K Line Academy',
    description: 'How K Line Academy collects, uses, and protects the personal data you share when applying to the program.',
    url: '/privacy',
    siteName: 'K Line Academy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — K Line Academy',
    description: 'How K Line Academy collects, uses, and protects the personal data you share when applying to the program.',
  },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Privacy Policy</h1>
          <p className="text-navy/60 text-sm mb-10">Last updated: July 20, 2026</p>

          <div className="space-y-8 text-[15px] leading-relaxed text-navy/80">
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Who we are</h2>
              <p>
                K Line Academy is an educational initiative operated by K Line Middle East, part of the
                K Line Europe GmbH group. This policy explains how we handle the personal data you share
                with us through klineacademy.org.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">What we collect</h2>
              <p>When you apply to the program, we collect the information you provide in the application form:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Contact details — name, email address, WhatsApp number, country and city</li>
                <li>Professional background — your current aligner workflow, experience, goals, and CV</li>
                <li>Your batch, software preference, and program commitments</li>
              </ul>
              <p className="mt-2">
                Your in-progress application draft (excluding your CV) is stored locally in your own browser
                so you can continue where you left off. We do not use tracking or advertising cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">How we use it</h2>
              <p>
                Your data is used solely to review your application, contact you about your application and
                enrollment, and administer the program if you are accepted. We do not sell your data or share
                it with third parties for marketing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Who processes it</h2>
              <p>
                Application data is delivered to our admissions team by email using Resend, our email service
                provider, and is accessible only to the K Line Academy team involved in admissions and
                program administration.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Retention and your rights</h2>
              <p>
                We keep application data only as long as needed for admissions and program administration.
                You can request a copy of your data or ask us to delete it at any time by emailing{' '}
                <a href="mailto:assem@clearxaligners.com" className="text-teal-dark underline underline-offset-2">
                  assem@clearxaligners.com
                </a>{' '}
                or messaging us on{' '}
                <a href="https://wa.me/201227624659" target="_blank" rel="noopener noreferrer" className="text-teal-dark underline underline-offset-2">
                  WhatsApp
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
