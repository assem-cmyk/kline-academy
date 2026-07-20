'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Header({ overDark = false }: { overDark?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        burgerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const navLinks = [
    { label: 'Program', href: '/#program' },
    { label: 'Faculty', href: '/#faculty' },
    { label: 'Benefits', href: '/#benefits' },
    { label: 'Investment', href: '/#pricing' },
    { label: 'FAQ', href: '/#faq' },
  ]

  // Over the dark hero the header is transparent, so text must be light until
  // the user scrolls and the white backdrop appears (WCAG 1.4.3)
  const onDarkBg = overDark && !scrolled && !mobileOpen
  const linkCls = onDarkBg
    ? 'text-white/90 hover:text-white'
    : 'text-navy/80 hover:text-navy'
  const wordmarkCls = onDarkBg ? 'text-white' : 'text-navy'
  const dividerCls = onDarkBg ? 'bg-white/30' : 'bg-navy-700/20'
  const burgerBarCls = onDarkBg ? 'bg-white' : 'bg-navy'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-white/85 backdrop-blur-xl border-b border-navy-700/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/brand/kline-logo.jpg"
              alt="K Line"
              width={200}
              height={200}
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105 bg-white rounded"
            />
            <div className={`h-7 w-px ${dividerCls}`} />
            <span className={`text-base font-semibold tracking-tight transition-colors ${wordmarkCls}`}>
              Academy<span className="text-teal">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main" className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`link-underline text-[15px] font-medium transition-colors ${linkCls}`}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/apply"
              className="btn-premium text-white text-[14px] font-semibold px-6 py-3 rounded-full"
            >
              Apply Now
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            ref={burgerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? 'mobile-menu' : undefined}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 transition-all ${burgerBarCls} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 transition-all ${burgerBarCls} ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 transition-all ${burgerBarCls} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="md:hidden pb-4 border-t border-navy-700/10 mt-2 pt-4">
            <nav aria-label="Mobile" className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-navy hover:text-teal-dark"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/apply"
                className="btn-premium text-white text-sm font-semibold px-5 py-3 rounded-full text-center"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
