'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Program', href: '#program' },
    { label: 'Faculty', href: '#faculty' },
    { label: 'Benefits', href: '#benefits' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-navy-700/8 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/brand/kline-logo.jpg"
              alt="K Line"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="h-7 w-px bg-navy-700/20" />
            <span className="text-base font-semibold tracking-tight text-navy">
              Academy<span className="text-teal">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline text-[15px] font-medium text-navy/80 hover:text-navy transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/apply"
              className="btn-premium text-white text-[14px] font-semibold px-6 py-3 rounded-full"
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
          <div className="md:hidden pb-4 border-t border-navy-700/10 mt-2 pt-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-navy hover:text-teal"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/apply"
                className="btn-premium text-white text-sm font-semibold px-5 py-3 rounded-full text-center"
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
