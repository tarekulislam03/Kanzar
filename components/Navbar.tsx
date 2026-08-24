'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Calendar, Phone } from 'lucide-react'
import AppointmentModal from './AppointmentModal'
import HallmarkSeal from './HallmarkSeal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop || 0
      setScrolled(top > 10)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchmove', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [])

  // Lock body scroll when navigation menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close navigation menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    if (pathname === '/') {
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
        return
      }
    }
    router.push(`/#${id}`)
  }

  const navigateCatalog = (cat?: string) => {
    setMenuOpen(false)
    router.push(cat ? `/catalog?category=${encodeURIComponent(cat)}` : '/catalog')
  }

  const navigateBlog = () => {
    setMenuOpen(false)
    router.push('/blog')
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'backdrop-glass-nav border-b border-[#DEDAD2]/80 py-3.5 shadow-sm'
            : 'bg-transparent border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">

          {/* Left Hamburger Button (Desktop & Mobile) */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 p-2 -ml-2 text-[#1C1A17] hover:text-[#9C7A45] transition-colors focus:outline-none cursor-pointer group"
              aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="text-[11px] uppercase tracking-[0.2em] font-light text-[#1C1A17]/80 group-hover:text-[#9C7A45] transition-colors cursor-pointer">
                Menu
              </span>
            </button>
          </div>

          {/* Centre Wordmark / Logo (Desktop & Mobile) */}
          <Link href="/" className="flex flex-col items-center py-1 cursor-pointer group">
            <span className="font-serif text-lg sm:text-2xl font-normal tracking-[0.18em] text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors cursor-pointer">
              KANZAR
            </span>
            <span className="text-[7px] sm:text-[9px] tracking-[0.25em] text-[#9C7A45] uppercase font-medium -mt-0.5 cursor-pointer">
              JEWELS
            </span>
          </Link>

          {/* Right Book Appointment CTA Button (Desktop & Mobile) */}
          <div className="flex items-center">
            <button
              onClick={() => setIsAppointmentOpen(true)}
              className="px-3.5 sm:px-5 py-1.5 sm:py-2 border border-[#1C1A17]/80 text-[#1C1A17] text-[10px] sm:text-[11px] uppercase tracking-[0.15em] hover:bg-[#1C1A17] hover:text-[#FAF8F3] transition-colors font-medium rounded-none shadow-xs cursor-pointer"
            >
              Book <span className="hidden sm:inline">Appointment</span>
            </button>
          </div>

        </div>
      </header>

      {/* Navigation Drawer Container (Full Width, 30% Viewport Height with Sub Navs) */}
      <div
        className={`fixed inset-0 z-40 pt-[61px] sm:pt-[72px] transition-opacity duration-400 ease-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Darkened backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-400 cursor-pointer"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Full Width, ~30% Viewport Height Top Menu Banner Panel with Sub-Navs */}
        <div
          className={`relative w-full min-h-[320px] sm:h-[35vh] max-h-[85vh] backdrop-glass-drawer border-b border-[#DEDAD2] shadow-2xl transition-all duration-400 ease-in-out z-50 transform overflow-y-auto ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <div className="max-w-[1200px] mx-auto h-full px-6 sm:px-10 lg:px-12 py-4 sm:py-5 flex flex-col justify-between">

            {/* Drawer Header Bar */}
            <div className="flex items-center justify-between border-b border-[#DEDAD2]/60 pb-2.5">
              <div className="flex items-center gap-2">
                <HallmarkSeal size={20} />
                <span className="text-xs sm:text-[11px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
                  Navigation
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#1C1A17]/70 font-light">
                <span>Kanzar</span>
                <a href="tel:+919875338183" className="hover:text-[#9C7A45] underline flex items-center gap-1 cursor-pointer">
                  <Phone className="w-3 h-3 text-[#9C7A45]" />
                  <span>+91 98753 38183</span>
                </a>
              </div>
            </div>

            {/* Navigation Columns Grid with Sub Navs (Single Column per line on Mobile for enhanced UX) */}
            <nav className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-6 py-3">

              {/* Column 1: Collections */}
              <div className="flex flex-col group border-b border-[#DEDAD2]/40 pb-3 md:border-b-0 md:pb-0">
                <button
                  onClick={() => handleNavClick('collections')}
                  className="flex items-center gap-1.5 text-left py-0.5 cursor-pointer"
                >
                  <span className="text-sm sm:text-sm uppercase tracking-[0.15em] text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors font-semibold sm:font-medium cursor-pointer">
                    Collections
                  </span>
                </button>
                <ul className="mt-2 space-y-2 sm:space-y-1.5 pl-3 border-l-2 sm:border-l border-[#9C7A45]/40 sm:border-[#DEDAD2]/70">
                  <li>
                    <button
                      onClick={() => handleNavClick('collections')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Bridal Gold Sets
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('collections')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Antique Polki
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('collections')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Royal Kundan
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('collections')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Temple Craft
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Heritage */}
              <div className="flex flex-col group border-b border-[#DEDAD2]/40 pb-3 md:border-b-0 md:pb-0">
                <button
                  onClick={() => handleNavClick('heritage')}
                  className="flex items-center gap-1.5 text-left py-0.5 cursor-pointer"
                >
                  <span className="text-sm sm:text-sm uppercase tracking-[0.15em] text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors font-semibold sm:font-medium cursor-pointer">
                    Heritage
                  </span>
                </button>
                <ul className="mt-2 space-y-2 sm:space-y-1.5 pl-3 border-l-2 sm:border-l border-[#9C7A45]/40 sm:border-[#DEDAD2]/70">
                  <li>
                    <button
                      onClick={() => handleNavClick('heritage')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      5 Generations Craft
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('heritage')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      BIS Hallmark 916
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('heritage')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Master Goldsmiths
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('heritage')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Bespoke Atelier
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Full Catalog */}
              <div className="flex flex-col group border-b border-[#DEDAD2]/40 pb-3 md:border-b-0 md:pb-0">
                <button
                  onClick={() => navigateCatalog()}
                  className="flex items-center gap-1.5 text-left py-0.5 cursor-pointer"
                >
                  <span className="text-sm sm:text-sm uppercase tracking-[0.15em] text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors font-semibold sm:font-medium cursor-pointer">
                    Catalog
                  </span>
                </button>
                <ul className="mt-2 space-y-2 sm:space-y-1.5 pl-3 border-l-2 sm:border-l border-[#9C7A45]/40 sm:border-[#DEDAD2]/70">
                  <li>
                    <button
                      onClick={() => navigateCatalog('Necklaces')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Necklaces & Chokers
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateCatalog('Bangles')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Gold Bangles & Kada
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateCatalog('Earrings')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Jhumkas & Earrings
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateCatalog('Rings')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Rings & Solitaires
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 4: Atelier Journal */}
              <div className="flex flex-col group border-b border-[#DEDAD2]/40 pb-3 md:border-b-0 md:pb-0">
                <button
                  onClick={() => handleNavClick('journal')}
                  className="flex items-center gap-1.5 text-left py-0.5 cursor-pointer"
                >
                  <span className="text-sm sm:text-sm uppercase tracking-[0.15em] text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors font-semibold sm:font-medium cursor-pointer">
                    Journal
                  </span>
                </button>
                <ul className="mt-2 space-y-2 sm:space-y-1.5 pl-3 border-l-2 sm:border-l border-[#9C7A45]/40 sm:border-[#DEDAD2]/70">
                  <li>
                    <button
                      onClick={() => navigateBlog()}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Gold Purity Guide
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateBlog()}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Bridal Styling Tips
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateBlog()}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Jewellery Care
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigateBlog()}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Heirloom Restoration
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 5: Visit Atelier */}
              <div className="flex flex-col group">
                <button
                  onClick={() => handleNavClick('visit')}
                  className="flex items-center gap-1.5 text-left py-0.5 cursor-pointer"
                >
                  <span className="text-sm sm:text-sm uppercase tracking-[0.15em] text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors font-semibold sm:font-medium cursor-pointer">
                    Visit Atelier
                  </span>
                </button>
                <ul className="mt-2 space-y-2 sm:space-y-1.5 pl-3 border-l-2 sm:border-l border-[#9C7A45]/40 sm:border-[#DEDAD2]/70">
                  <li>
                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        setIsAppointmentOpen(true)
                      }}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Private Viewing Lounge
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavClick('visit')}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Flagship Store Address
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        setIsAppointmentOpen(true)
                      }}
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      Virtual Consultation
                    </button>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/918025589000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] sm:text-xs text-[#1C1A17]/80 hover:text-[#9C7A45] transition-colors font-normal sm:font-light block text-left cursor-pointer"
                    >
                      WhatsApp Concierge
                    </a>
                  </li>
                </ul>
              </div>

            </nav>

            {/* Drawer Footer Actions */}
            <div className="pt-2.5 border-t border-[#DEDAD2]/60 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#1C1A17]/50 font-light hidden sm:inline">
                Certified 22K Gold · Wholesale
              </span>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  setIsAppointmentOpen(true)
                }}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-[#1C1A17] text-[#FAF8F3] hover:bg-[#9C7A45] text-xs sm:text-[11px] font-medium uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#9C7A45]" />
                <span>Book Appointment</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </>
  )
}
