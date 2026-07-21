import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Refund Policy',
  description: 'Program terms, payment schedule, and refund policy for the K Line Academy digital aligner planning bootcamp.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms & Refund Policy — K Line Academy',
    description: 'Program terms, payment schedule, and refund policy for the K Line Academy digital aligner planning bootcamp.',
    url: '/terms',
    siteName: 'K Line Academy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Refund Policy — K Line Academy',
    description: 'Program terms, payment schedule, and refund policy for the K Line Academy digital aligner planning bootcamp.',
  },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">Terms &amp; Refund Policy</h1>
          <p className="text-navy/60 text-sm mb-10">Last updated: July 20, 2026</p>

          <div className="space-y-8 text-[15px] leading-relaxed text-navy/80">
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">The program</h2>
              <p>
                K Line Academy Batch 2 is an in-person training program held in Cairo, Egypt: 8 sessions
                over 4 consecutive weekends (October 2 – 24, 2026), Fridays 4:30–9:30 PM and
                Saturdays 9:30 AM–4:30 PM. Seats are limited to 15 participants. Every application is
                reviewed; a seat is confirmed on acceptance and receipt of the deposit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Payment</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>The base program fee is $1,000 USD. The standard discounted price is $900 USD, and the current early-bird price is $800 USD, payable by bank transfer or InstaPay after acceptance.</li>
                <li>A 50% deposit ($400) secures your seat.</li>
                <li>The remaining balance ($400) is due at Session 1.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Refunds &amp; cancellations</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cancel 10 or more days before the first session: full refund of everything you have paid.</li>
                <li>Cancel less than 10 days before the first session, or after the program has started: fees are non-refundable.</li>
                <li>Refunds are processed within 14 business days via the original payment method.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">If we cancel or postpone</h2>
              <p>
                If K Line Academy cancels a batch or changes its dates — for example due to
                under-enrollment or circumstances beyond our control — enrolled participants may choose
                either a full refund of all amounts paid (processed within 14 business days) or a
                guaranteed seat in the next available batch.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Program conduct</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Course cases and materials are confidential: participants agree not to record sessions or
                  share cases or materials outside the cohort.
                </li>
                <li>
                  Participants complete pre- and post-program assessments and graded case checkpoints as part
                  of the program.
                </li>
                <li>Software access (OnyxCeph or Titan) is provided for the duration of the program.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Certification</h2>
              <p>
                Participants who complete the program receive the K Line Academy completion certificate and
                ADA certification.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">Contact</h2>
              <p>
                Questions about these terms? Email{' '}
                <a href="mailto:assem@clearxaligners.com" className="text-teal-dark underline underline-offset-2">
                  assem@clearxaligners.com
                </a>{' '}
                or message us on{' '}
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
