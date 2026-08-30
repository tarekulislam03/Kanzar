'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Calendar, Phone, ChevronRight, Sparkles } from 'lucide-react'
import AppointmentModal from './AppointmentModal'
import HallmarkSeal from './HallmarkSeal'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop || 0
      setScrolled(top > 20)
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

  // Close overlay when route changes
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

  // Determine text and icon colors based on scroll position and page
  const isTransparent = isHomePage && !scrolled && !menuOpen
  const textColor = isTransparent ? 'text-white' : 'text-[#1C1A17]'
  const textHoverColor = isTransparent ? 'hover:text-white/80' : 'hover:text-[#9C7A45]'
  const brandSubColor = isTransparent ? 'text-[#D4AF37]' : 'text-[#9C7A45]'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent py-6 sm:py-7 lg:py-8 border-b border-white/10'
            : 'backdrop-glass-nav border-b border-[#DEDAD2]/80 py-5 sm:py-6 shadow-sm'
        }`}
      >
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">

          {/* Left: Menu Only (Icon on mobile, Icon + Text on desktop) */}
          <div className="flex items-center z-10">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-light transition-colors focus:outline-none cursor-pointer group ${textColor} ${textHoverColor}`}
              aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>

          {/* Absolute Centre: Luxury Brand Wordmark */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10">
            <Link href="/" className="flex flex-col items-center py-1 cursor-pointer group text-center whitespace-nowrap">
              <span className={`font-serif text-lg sm:text-2xl md:text-3xl font-light tracking-[0.22em] transition-colors cursor-pointer ${textColor} ${textHoverColor}`}>
                KANZAR
              </span>
              <span className={`text-[8px] sm:text-[10px] tracking-[0.3em] uppercase font-medium -mt-1 cursor-pointer ${brandSubColor}`}>
                JEWELS
              </span>
            </Link>
          </div>

          {/* Right: Call Icon on Mobile, Call Now on Desktop (No Border) */}
          <div className="flex items-center z-10">
            <a
              href="tel:+919875338183"
              aria-label="Call Now"
              title="Call Us: +91 98753 38183"
              className={`flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-light transition-colors focus:outline-none cursor-pointer group ${textColor} ${textHoverColor}`}
            >
              <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Call Now</span>
            </a>
          </div>

        </div>
      </header>

      {/* LEFT SIDE NAVIGATION DRAWER: Full Screen on Mobile, Half Screen on Desktop */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop Overlay with Backdrop Blur */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Left Side Drawer Panel (W-FULL ON MOBILE, 50% WIDTH ON DESKTOP) */}
        <aside
          className={`fixed top-0 left-0 bottom-0 w-full md:w-1/2 lg:w-[48vw] xl:w-[42vw] h-full bg-[#FAF8F3] border-r border-[#DEDAD2] shadow-2xl z-50 flex flex-col justify-between p-6 sm:p-10 lg:p-12 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] overflow-y-auto transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header Bar inside Drawer */}
          <div>
            <div className="flex items-center justify-between border-b border-[#DEDAD2] pb-6 mb-8">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="p-1 rounded-full bg-[#9C7A45]/10 group-hover:rotate-45 transition-transform duration-500">
                  <HallmarkSeal size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-[#1C1A17] font-medium leading-none">
                    KANZAR
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#9C7A45] font-semibold mt-1">
                    ATELIER NAVIGATION
                  </span>
                </div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-[#1C1A17]/20 flex items-center justify-center text-[#1C1A17] hover:bg-[#1C1A17] hover:text-white hover:rotate-90 transition-all duration-300 cursor-pointer"
                aria-label="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Staggered Animated Navigation Links */}
            <nav className="space-y-6 sm:space-y-7">

              {/* Item 1: High Jewellery Collections */}
              <div
                className={`group border-b border-[#DEDAD2]/60 pb-5 transition-all duration-500 delay-150 transform ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
              >
                <button
                  onClick={() => handleNavClick('collections')}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A45] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="font-serif text-xl sm:text-2xl text-[#1C1A17] group-hover:text-[#9C7A45] group-hover:translate-x-1 transition-all duration-300 font-medium">
                      High Jewellery Collections
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#9C7A45] group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <div className="mt-3 space-y-2.5 pl-6 border-l-2 border-[#9C7A45]/30">
                  <button onClick={() => handleNavClick('collections')} className="block text-xs sm:text-sm text-[#1C1A17]/75 hover:text-[#9C7A45] hover:translate-x-1 transition-all duration-200 font-light">
                    Royal Kundan & Antique Polki
                  </button>
                  <button onClick={() => handleNavClick('collections')} className="block text-xs sm:text-sm text-[#1C1A17]/75 hover:text-[#9C7A45] hover:translate-x-1 transition-all duration-200 font-light">
                    Bridal Gold Trousseau Sets
                  </button>
                  <button onClick={() => handleNavClick('collections')} className="block text-xs sm:text-sm text-[#1C1A17]/75 hover:text-[#9C7A45] hover:translate-x-1 transition-all duration-200 font-light">
                    Temple Heritage Masterpieces
                  </button>
                </div>
              </div>

              {/* Item 2: Catalog Categories */}
              <div
                className={`group border-b border-[#DEDAD2]/60 pb-5 transition-all duration-500 delay-200 transform ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
              >
                <button
                  onClick={() => navigateCatalog()}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A45] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="font-serif text-xl sm:text-2xl text-[#1C1A17] group-hover:text-[#9C7A45] group-hover:translate-x-1 transition-all duration-300 font-medium">
                      Explore Catalog
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#9C7A45] group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <div className="mt-3 space-y-2.5 pl-6 border-l-2 border-[#9C7A45]/30">
                  <button onClick={() => navigateCatalog('Necklaces')} className="block text-xs sm:text-sm text-[#1C1A17]/75 hover:text-[#9C7A45] hover:translate-x-1 transition-all duration-200 font-light">
                    Chokers & Statement Necklaces
                  </button>
                  <button onClick={() => navigateCatalog('Bangles')} className="block text-xs sm:text-sm text-[#1C1A17]/75 hover:text-[#9C7A45] hover:translate-x-1 transition-all duration-200 font-light">
                    Crafted Gold Bangles & Kadas
                  </button>
                  <button onClick={() => navigateCatalog('Earrings')} className="block text-xs sm:text-sm text-[#1C1A17]/75 hover:text-[#9C7A45] hover:translate-x-1 transition-all duration-200 font-light">
                    Heritage Jhumkas & Chandbalis
                  </button>
                </div>
              </div>

              {/* Item 3: Our Heritage */}
              <div
                className={`group border-b border-[#DEDAD2]/60 pb-5 transition-all duration-500 delay-250 transform ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
              >
                <button
                  onClick={() => handleNavClick('heritage')}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A45] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="font-serif text-xl sm:text-2xl text-[#1C1A17] group-hover:text-[#9C7A45] group-hover:translate-x-1 transition-all duration-300 font-medium">
                      5 Generations Craftsmanship
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#9C7A45] group-hover:translate-x-2 transition-transform duration-300" />
                </button>
                <div className="mt-3 space-y-2.5 pl-6 border-l-2 border-[#9C7A45]/30">
                  <button onClick={() => handleNavClick('heritage')} className="block text-xs sm:text-sm text-[#1C1A17]/75 hover:text-[#9C7A45] hover:translate-x-1 transition-all duration-200 font-light">
                    Legacy & Atelier Artisans
                  </button>
                  <button onClick={() => handleNavClick('heritage')} className="block text-xs sm:text-sm text-[#1C1A17]/75 hover:text-[#9C7A45] hover:translate-x-1 transition-all duration-200 font-light">
                    BIS Hallmark 916 Guarantee
                  </button>
                </div>
              </div>

              {/* Item 4: Journal */}
              <div
                className={`group border-b border-[#DEDAD2]/60 pb-5 transition-all duration-500 delay-300 transform ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
              >
                <button
                  onClick={() => navigateBlog()}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A45] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="font-serif text-xl sm:text-2xl text-[#1C1A17] group-hover:text-[#9C7A45] group-hover:translate-x-1 transition-all duration-300 font-medium">
                      Atelier Journal
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#9C7A45] group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>

              {/* Item 5: Flagship Atelier */}
              <div
                className={`group transition-all duration-500 delay-350 transform ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
              >
                <button
                  onClick={() => handleNavClick('visit')}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9C7A45] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="font-serif text-xl sm:text-2xl text-[#1C1A17] group-hover:text-[#9C7A45] group-hover:translate-x-1 transition-all duration-300 font-medium">
                      Visit Flagship Store
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#9C7A45] group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>

            </nav>
          </div>

          {/* Drawer Footer Actions */}
          <div
            className={`pt-8 border-t border-[#DEDAD2] mt-8 space-y-4 transition-all duration-500 delay-400 transform ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button
              onClick={() => {
                setMenuOpen(false)
                setIsAppointmentOpen(true)
              }}
              className="group relative w-full py-4 bg-[#1C1A17] text-[#FAF8F3] hover:bg-[#9C7A45] text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Calendar className="w-4 h-4 text-[#D4AF37] group-hover:text-white transition-colors" />
              <span>Book Atelier Appointment</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
            </button>

            <a
              href="tel:+919875338183"
              className="w-full py-3 border border-[#1C1A17]/30 text-[#1C1A17] hover:border-[#9C7A45] hover:text-[#9C7A45] text-xs uppercase tracking-[0.18em] font-light flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Concierge: +91 98753 38183</span>
            </a>

            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#1C1A17]/60 pt-2 font-light border-t border-[#DEDAD2]/40">
              <span>Certified 22K Gold</span>
              <span>BIS Hallmark 916</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </>
  )
}
