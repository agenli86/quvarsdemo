'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Calendar, Sparkles } from 'lucide-react'
import { NAV_LINKS, COMPANY } from '@/lib/constants'
import type { SiteSettings } from '@/lib/types'

export default function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logoUrl = settings.logo_url

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-soft'
          : 'bg-white/40 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-lavender-200 group-hover:ring-rose-300 transition-all duration-300">
              {logoUrl ? (
                <Image src={logoUrl} alt={COMPANY.name} fill className="object-cover" sizes="48px" priority />
              ) : (
                <div className="w-full h-full bg-gradient-quvars flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <div className="text-lg md:text-xl font-heading font-semibold text-gradient leading-tight">
                Quvars
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.2em] text-lavender-600 uppercase font-medium -mt-0.5">
                Beauty Studio
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-lavender-600 rounded-full hover:bg-lavender-50 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={`tel:${COMPANY.phoneE164}`}
              className="hidden md:flex items-center gap-2 text-sm font-medium text-lavender-700 hover:text-lavender-900 transition-colors"
              aria-label="Telefon ile ara"
            >
              <Phone size={16} />
              <span>{COMPANY.phone}</span>
            </a>
            <Link
              href="/randevu"
              className="hidden sm:inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-gradient-quvars text-white text-sm font-semibold rounded-full shadow-soft hover:shadow-glow transition-all btn-glow"
            >
              <Calendar size={16} />
              <span>Randevu Al</span>
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-full hover:bg-lavender-100 transition-colors"
              aria-label="Menü"
              aria-expanded={open}
            >
              {open ? <X size={22} className="text-lavender-700" /> : <Menu size={22} className="text-lavender-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[600px] border-t border-lavender-100' : 'max-h-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-1 bg-white/95 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-base font-medium text-gray-700 hover:text-lavender-700 hover:bg-lavender-50 rounded-xl transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-lavender-100">
            <a
              href={`tel:${COMPANY.phoneE164}`}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-lavender-50 text-lavender-700 text-base font-semibold rounded-xl"
            >
              <Phone size={18} />
              <span>{COMPANY.phone}</span>
            </a>
            <Link
              href="/randevu"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-quvars text-white text-base font-semibold rounded-xl shadow-soft"
            >
              <Calendar size={18} />
              <span>Randevu Al</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
