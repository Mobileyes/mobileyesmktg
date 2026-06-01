'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { MBIcon } from '@/components/brand/MBIcon'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/brands', label: 'For Brands' },
  { href: '/creators', label: 'For Creators' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{ backgroundColor: 'rgba(11, 15, 46, 0.95)', borderBottom: '1px solid #1E2A5E', height: 52 }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo — MBIcon + wordmark */}
        <Link href="/" className="flex items-center gap-2.5">
          <MBIcon size={26} />
          <span
            className="text-white font-extrabold tracking-[0.03em] text-base"
            style={{ fontFamily: 'var(--font-space-grotesk, system-ui)' }}
          >
            MOBILEYES
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/creators"
            className="px-5 py-2 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#3B82F6' }}
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden px-6 py-6 space-y-4" style={{ backgroundColor: '#0B0F2E', borderTop: '1px solid #1E2A5E' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-base font-medium py-1"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/creators"
            className="block mt-4 px-5 py-3 text-white rounded-lg text-sm font-semibold text-center"
            style={{ backgroundColor: '#3B82F6' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Apply Now
          </Link>
        </nav>
      )}
    </header>
  )
}
