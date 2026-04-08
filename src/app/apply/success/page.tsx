'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function SuccessContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'Applicant'
  const batch = searchParams.get('batch') || 'your selected batch'
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.origin).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center">
        {/* Gold checkmark */}
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">
          Application Received
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Thank you, {name}.
        </p>
        <p className="text-gray-500 mb-8 leading-relaxed">
          We&apos;ve received your application for <strong>{batch}</strong>.
          We&apos;ll review it and contact you within 48 hours via WhatsApp or email.
          If accepted, you&apos;ll receive payment details to confirm your seat with a 50% deposit.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="bg-navy hover:bg-navy/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </a>
          <button
            onClick={copyLink}
            className="border-2 border-gold text-gold hover:bg-gold/5 font-semibold px-6 py-3 rounded-lg transition-colors relative"
          >
            {copied ? 'Link Copied!' : 'Share K Line Academy'}
          </button>
        </div>

        {/* Toast */}
        {copied && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white text-sm px-6 py-3 rounded-lg shadow-lg animate-pulse">
            Link copied to clipboard!
          </div>
        )}
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </main>
      }>
        <SuccessContent />
      </Suspense>
      <Footer />
    </>
  )
}
