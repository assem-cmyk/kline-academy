'use client'

import { useState } from 'react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Program', href: '#program' },
    { label: 'Faculty', href: '#faculty' },
    { label: 'Benefits', href: '#benefits' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold text-navy">K Line Academy</span>
            <span className="w-2 h-2 rounded-full bg-gold inline-block mb-3"></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-primary hover:text-navy transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/apply"
              className="bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Apply Now
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-navy transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-navy transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-navy transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-text-primary hover:text-navy"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/apply"
                className="bg-gold hover:bg-gold-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center transition-colors"
              >
                Apply Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
