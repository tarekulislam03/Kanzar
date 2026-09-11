'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Menu,
  X,
  Calendar,
  Phone,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Tag
} from 'lucide-react'
import AppointmentModal from './AppointmentModal'
import HallmarkSeal from './HallmarkSeal'

const NAV_LINKS = [
  { label: 'Collections', action: 'collections' },
  { label: 'Story', action: 'heritage' },
  { label: 'Blog', action: 'journal' },
  { label: 'Visit Store', action: 'visit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)

  const pathname = usePathname()
  const router = useRouter()
  const headerRef = useRef<HTMLElement>(null)

  const textColor = 'text-[#2A2422]'
  const textHoverColor = 'hover:text-[#C99A94]'

  /* --------------------------------------------------
     SCROLL DETECTION
  -------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      const top =
        window.scrollY ||
        document.documentElement.scrollTop ||
        0

      setScrolled(top > 20)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('touchmove', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [])

  /* --------------------------------------------------
     HEADER HEIGHT
  -------------------------------------------------- */

  useEffect(() => {
    const el = headerRef.current

    if (!el) return

    const updateHeight = () => {
      setHeaderHeight(el.offsetHeight)
    }

    updateHeight()

    const observer = new ResizeObserver(updateHeight)
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  /* --------------------------------------------------
     BODY SCROLL LOCK WHEN MOBILE MENU IS OPEN
  -------------------------------------------------- */

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? 'hidden'
      : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* --------------------------------------------------
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  -------------------------------------------------- */

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  /* --------------------------------------------------
     NAVIGATION
  -------------------------------------------------- */

  const handleNavClick = (id: string) => {
    setMenuOpen(false)

    if (pathname === '/') {
      const element = document.getElementById(id)

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }, 100)

        return
      }
    }

    router.push(`/#${id}`)
  }

  const navigateCatalog = (category?: string) => {
    setMenuOpen(false)

    if (category) {
      router.push(
        `/catalog?category=${encodeURIComponent(category)}`
      )
    } else {
      router.push('/catalog')
    }
  }

  const navigateBlog = () => {
    setMenuOpen(false)
    router.push('/blog')
  }

  const handleNavLink = (action: string) => {
    if (action === 'catalog') {
      navigateCatalog()
    } else if (action === 'journal') {
      navigateBlog()
    } else {
      handleNavClick(action)
    }
  }

  return (
    <>
      {/* ==================================================
         MAIN HEADER
      ================================================== */}

      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40"
      >

        {/* ==================================================
            TIER 1 — USP STRIP
        ================================================== */}
        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            bg-[#7A4F5B] 
            ${scrolled
              ? 'max-h-0 opacity-0'
              : 'max-h-12 opacity-100'
            }
          `}
        >
          <div className="max-w-[1400px] mx-auto px-2 sm:px-8 lg:px-12 py-2 flex items-center justify-center gap-1.5 sm:gap-3 text-[10px] min-[380px]:text-[11px] sm:text-[12px] uppercase tracking-normal sm:tracking-[0.15em] font-bold text-center text-[#FAF6F3] whitespace-nowrap">

            {/* Discount Icon */}
            <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-white" />

            <span className="truncate sm:overflow-visible">
              Enjoy <span className="bg-white bg-scratchy text-[#7A4F5B] px-1.5 py-0.5 rounded-sm font-black shadow-xs tracking-normal inline-block align-baseline mx-0.5">4.99%</span> Flat Making Charges On 22 Karat
            </span>

            {/* Link to catalog collection page */}
            <Link
              href="/catalog"
              className="underline underline-offset-4 decoration-1 text-white hover:text-white/80 transition-colors shrink-0 font-extrabold"
            >
              Shop Now
            </Link>

          </div>
        </div>

        {/* ==================================================
            TIER 2 — MAIN NAVIGATION
        ================================================== */}

        <div
          className={`
            relative
            transition-all
            duration-300
            bg-white/95
            backdrop-blur-md
            border-b border-[#F3E2DD]
            shadow-sm
            py-5 sm:py-6
          `}
        >
          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">

            {/* ==================================================
                LEFT — MOBILE MENU + DESKTOP NAV
            ================================================== */}

            <div className="flex items-center gap-8 z-10">

              {/* Mobile Menu Button */}

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`
                  lg:hidden
                  flex items-center gap-2
                  focus:outline-none
                  cursor-pointer
                  transition-colors
                  ${textColor}
                  ${textHoverColor}
                `}
                aria-label={
                  menuOpen
                    ? 'Close Menu'
                    : 'Open Menu'
                }
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Desktop Navigation */}

              <nav className="hidden lg:flex items-center gap-7">

                {NAV_LINKS.map((link) => (
                  <button
                    key={link.action}
                    onClick={() =>
                      handleNavLink(link.action)
                    }
                    className={`
                      text-[14px]
                      uppercase
                      tracking-[0.18em]
                      font-light
                      transition-colors
                      cursor-pointer
                      text-[#2A2422]
                      hover:text-[#6E6259]
                    `}
                  >
                    {link.label}
                  </button>
                ))}

              </nav>
            </div>

            {/* ==================================================
                CENTER — LOGO
            ================================================== */}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">

              <Link
                href="/"
                className="flex flex-col items-center cursor-pointer group text-center whitespace-nowrap"
              >
                <img
                  src="/logo-v3.png"
                  alt="Kanzar"
                  className="
                    h-12
                    sm:h-17
                    w-auto
                    object-contain
                    transition-all
                    duration-300
                    drop-shadow-[0_1px_3px_rgba(0,0,0,0.12)]
                    group-hover:scale-105
                    group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)]
                  "
                />
              </Link>

            </div>

            {/* ==================================================
                RIGHT — PHONE + APPOINTMENT
            ================================================== */}

            <div className="flex items-center gap-4 sm:gap-6 z-10">

              {/* Desktop Call */}

              <a
                href="https://wa.me/919875338183"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Us: +91 98753 38183"
                className={`
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  text-14px
                  uppercase
                  tracking-[0.18em]
                  font-light
                  transition-colors
                  cursor-pointer
                  text-[#2A2422]
                  ${textHoverColor}
                `}
              >
                <MessageCircle className="w-3.5 h-3.5" />

                <span>
                  WhatsApp
                </span>
              </a>

              {/* Mobile Call */}

              <a
                href="https://wa.me/917003467398"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Us"
                className={`
                  sm:hidden
                  text-[#2A2422]
                `}
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              {/* Appointment Button */}

              <button
                onClick={() =>
                  setIsAppointmentOpen(true)
                }
                className={`
                  hidden
                  md:inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  text-[14px]
                  uppercase
                  tracking-[0.18em]
                  font-medium
                  border
                  transition-all
                  duration-300
                  cursor-pointer
                  border-[#C99A94]
                  text-[#9C6B68]
                  hover:bg-[#C99A94]
                  hover:text-white
                `}
              >
                <Calendar className="w-3.5 h-3.5" />

                <span>
                  Book Appointment
                </span>
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* ==================================================
         HEADER SPACER
      ================================================== */}

      <div
        style={{
          height: headerHeight,
        }}
      />

      {/* ==================================================
         MOBILE DRAWER
      ================================================== */}

      <div
        className={`
          fixed
          inset-0
          h-screen
          h-[100dvh]
          min-h-[100dvh]
          max-h-[100dvh]
          w-screen
          z-[60]
          transition-all
          duration-500
          ease-[cubic-bezier(0.77,0,0.175,1)]
          ${menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }
        `}
      >

        {/* Backdrop */}

        <div
          className={`
            absolute
            inset-0
            bg-[#2A2422]/60
            backdrop-blur-md
            transition-opacity
            duration-500
            ${menuOpen
              ? 'opacity-100'
              : 'opacity-0'
            }
          `}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}

        <aside
          className={`
            fixed
            top-0
            left-0
            bottom-0
            w-full
            md:w-1/2
            lg:w-[48vw]
            xl:w-[42vw]
            h-screen
            h-[100dvh]
            min-h-[100dvh]
            max-h-[100dvh]
            bg-[#FAF6F3]
            border-r
            border-[#F3E2DD]
            shadow-2xl
            z-50
            flex
            flex-col
            justify-between
            p-6
            sm:p-10
            lg:p-12
            transition-transform
            duration-500
            ease-[cubic-bezier(0.77,0,0.175,1)]
            overflow-y-auto
            overscroll-contain
            transform
            ${menuOpen
              ? 'translate-x-0'
              : '-translate-x-full'
            }
          `}
        >

          {/* ==================================================
              DRAWER TOP
          ================================================== */}

          <div>

            <div className="
              flex
              items-center
              justify-between
              border-b
              border-[#F3E2DD]
              pb-6
              mb-8
            ">

              <div className="
                flex
                items-center
                gap-3
                group
                cursor-pointer
              ">

                <div className="
                  p-1
                  rounded-full
                  bg-[#C99A94]/10
                  group-hover:rotate-45
                  transition-transform
                  duration-500
                ">
                  <HallmarkSeal size={24} />
                </div>

                <div className="flex flex-col">

                  <span className="
                    font-serif
                    text-xl
                    sm:text-2xl
                    tracking-[0.2em]
                    text-[#2A2422]
                    font-medium
                    leading-none
                  ">
                    KANZAR
                  </span>

                  <span className="
                    text-[10px]
                    uppercase
                    tracking-[0.3em]
                    text-[#9C6B68]
                    font-semibold
                    mt-1
                  ">
                    ATELIER NAVIGATION
                  </span>

                </div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="
                  w-10
                  h-10
                  rounded-full
                  border
                  border-[#2A2422]/20
                  flex
                  items-center
                  justify-center
                  text-[#2A2422]
                  hover:bg-[#2A2422]
                  hover:text-white
                  hover:rotate-90
                  transition-all
                  duration-300
                  cursor-pointer
                "
                aria-label="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* ==================================================
                MOBILE NAVIGATION (FOOTER MATCHING LINKS)
            ================================================== */}

            <nav className="space-y-6 sm:space-y-7">

              {/* ATELIER SECTION */}
              <div className="space-y-3 border-b border-[#F3E2DD] pb-5">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C6B68] font-semibold">
                  ATELIER
                </span>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-lg sm:text-xl text-[#2A2422] hover:text-[#9C6B68] transition-colors font-medium flex items-center justify-between group"
                    >
                      <span>Home</span>
                      <ChevronRight className="w-4 h-4 text-[#9C6B68] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-lg sm:text-xl text-[#2A2422] hover:text-[#9C6B68] transition-colors font-medium flex items-center justify-between group"
                    >
                      <span>Atelier Journal</span>
                      <ChevronRight className="w-4 h-4 text-[#9C6B68] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/visit-us"
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-lg sm:text-xl text-[#2A2422] hover:text-[#9C6B68] transition-colors font-medium flex items-center justify-between group"
                    >
                      <span>Visit Store</span>
                      <ChevronRight className="w-4 h-4 text-[#9C6B68] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* ESSENTIAL PAGES SECTION */}
              <div className="space-y-3 border-b border-[#F3E2DD] pb-5">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C6B68] font-semibold">
                  ESSENTIAL PAGES
                </span>
                <ul className="space-y-2.5">
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      onClick={() => setMenuOpen(false)}
                      className="text-xs sm:text-sm text-[#2A2422]/80 hover:text-[#9C6B68] transition-colors font-light block"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/legal-info"
                      onClick={() => setMenuOpen(false)}
                      className="text-xs sm:text-sm text-[#2A2422]/80 hover:text-[#9C6B68] transition-colors font-light block"
                    >
                      Legal Info
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookie-policy"
                      onClick={() => setMenuOpen(false)}
                      className="text-xs sm:text-sm text-[#2A2422]/80 hover:text-[#9C6B68] transition-colors font-light block"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      onClick={() => setMenuOpen(false)}
                      className="text-xs sm:text-sm text-[#2A2422]/80 hover:text-[#9C6B68] transition-colors font-light block"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* ADDRESS SECTION */}
              <div className="space-y-2">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C6B68] font-semibold">
                  ADDRESS & STORE
                </span>
                <div className="text-xs text-[#2A2422]/75 leading-relaxed font-light space-y-1">
                  <div>P-4B, CIT Road, Paddapukur, Entally, Near Birshul Hat</div>
                  <div>Kolkata, West Bengal – 700014</div>
                  <div>Mon – Sat: 9:00 AM – 9:00 PM</div>
                  <div className="pt-1 text-[#2A2422] font-medium">033-4535-6632 / 9875338183</div>
                </div>
              </div>

            </nav>
          </div>


        </aside>
      </div>

      {/* ==================================================
         APPOINTMENT MODAL
      ================================================== */}

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() =>
          setIsAppointmentOpen(false)
        }
      />
    </>
  )
}
