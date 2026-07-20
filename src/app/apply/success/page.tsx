'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function SuccessContent() {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.origin).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main id="main" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg aria-hidden="true" className="w-10 h-10 text-teal-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">
          Application Received
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Thank you for applying.
        </p>
        <p className="text-gray-500 mb-4 leading-relaxed">
          We&apos;ve received your application for <strong>Batch 2 in Cairo (September 18 – October 10, 2026)</strong>.
          We review every application within 48 hours and will contact you with a decision
          via WhatsApp or email. If accepted, you&apos;ll receive payment details to confirm
          your seat with a 50% deposit.
        </p>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          A confirmation email is on its way — check your spam folder if you don&apos;t see it.
          Haven&apos;t heard from us within 48 hours?{' '}
          <a
            href="https://wa.me/201227624659"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-dark font-medium underline underline-offset-2"
          >
            WhatsApp us
          </a>{' '}
          or email{' '}
          <a href="mailto:assem@clearxaligners.com" className="text-teal-dark font-medium underline underline-offset-2">
            assem@clearxaligners.com
          </a>.
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
            className="border-2 border-teal-dark text-teal-dark hover:bg-teal/5 font-semibold px-6 py-3 rounded-lg transition-colors relative"
          >
            {copied ? 'Link Copied!' : 'Share K Line Academy'}
          </button>
        </div>

        {copied && (
          <div
            role="status"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white text-sm px-6 py-3 rounded-lg shadow-lg"
          >
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
      <SuccessContent />
      <Footer />
    </>
  )
}
