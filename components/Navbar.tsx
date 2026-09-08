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
              : 'max-h-10 opacity-100'
            }
  `}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-2 flex items-center justify-center gap-2 sm:gap-4 text-[8.5px] sm:text-[12px] uppercase tracking-[0.18em] font-bold text-center text-[#FAF6F3]">

            {/* Discount Icon Added Here */}
            <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />

            <span>
              Enjoy 4.99% Flat Making Charges On 22 Karat
            </span>

            {/* Underline and hover effect added to the link */}
            <a
              href=""
              className="underline underline-offset-4 decoration-1 hover:text-white transition-colors"
            >
              Shop Now
            </a>

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
                  src="/logo__3_-removebg-preview.png"
                  alt="Kanzar"
                  className="
                    h-10
                    sm:h-15
                    w-auto
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-105
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
                href="tel:+919875338183"
                title="Call Us: +91 98753 38183"
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
                href="tel:+919875338183"
                aria-label="Call Now"
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
            h-full
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
                MOBILE NAVIGATION
            ================================================== */}

            <nav className="space-y-6 sm:space-y-7">

              {/* COLLECTIONS */}

              <div
                className={`
                  group
                  border-b
                  border-[#F3E2DD]
                  pb-5
                  transition-all
                  duration-500
                  delay-150
                  transform
                  ${menuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-6'
                  }
                `}
              >

                <button
                  onClick={() =>
                    handleNavClick('collections')
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    text-left
                    group
                    cursor-pointer
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <span className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#C99A94]
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    " />

                    <span className="
                      font-serif
                      text-xl
                      sm:text-2xl
                      text-[#2A2422]
                      group-hover:text-[#9C6B68]
                      group-hover:translate-x-1
                      transition-all
                      duration-300
                      font-medium
                    ">
                      High Jewellery Collections
                    </span>

                  </div>

                  <ChevronRight className="
                    w-5
                    h-5
                    text-[#9C6B68]
                    group-hover:translate-x-2
                    transition-transform
                    duration-300
                  " />

                </button>

                <div className="
                  mt-3
                  space-y-2.5
                  pl-6
                  border-l-2
                  border-[#C99A94]/40
                ">

                  <button
                    onClick={() =>
                      handleNavClick('collections')
                    }
                    className="
                      block
                      text-xs
                      sm:text-sm
                      text-[#2A2422]/75
                      hover:text-[#9C6B68]
                      hover:translate-x-1
                      transition-all
                      duration-200
                      font-light
                    "
                  >
                    Royal Kundan & Antique Polki
                  </button>

                  <button
                    onClick={() =>
                      handleNavClick('collections')
                    }
                    className="
                      block
                      text-xs
                      sm:text-sm
                      text-[#2A2422]/75
                      hover:text-[#9C6B68]
                      hover:translate-x-1
                      transition-all
                      duration-200
                      font-light
                    "
                  >
                    Bridal Gold Trousseau Sets
                  </button>

                  <button
                    onClick={() =>
                      handleNavClick('collections')
                    }
                    className="
                      block
                      text-xs
                      sm:text-sm
                      text-[#2A2422]/75
                      hover:text-[#9C6B68]
                      hover:translate-x-1
                      transition-all
                      duration-200
                      font-light
                    "
                  >
                    Temple Heritage Masterpieces
                  </button>

                </div>
              </div>

              {/* CATALOG */}

              <div
                className={`
                  group
                  border-b
                  border-[#F3E2DD]
                  pb-5
                  transition-all
                  duration-500
                  delay-200
                  transform
                  ${menuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-6'
                  }
                `}
              >

                <button
                  onClick={() => navigateCatalog()}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    text-left
                    group
                    cursor-pointer
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <span className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#C99A94]
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    " />

                    <span className="
                      font-serif
                      text-xl
                      sm:text-2xl
                      text-[#2A2422]
                      group-hover:text-[#9C6B68]
                      group-hover:translate-x-1
                      transition-all
                      duration-300
                      font-medium
                    ">
                      Explore Catalog
                    </span>

                  </div>

                  <ChevronRight className="
                    w-5
                    h-5
                    text-[#9C6B68]
                    group-hover:translate-x-2
                    transition-transform
                    duration-300
                  " />

                </button>

                <div className="
                  mt-3
                  space-y-2.5
                  pl-6
                  border-l-2
                  border-[#C99A94]/40
                ">

                  <button
                    onClick={() =>
                      navigateCatalog('Necklaces')
                    }
                    className="
                      block
                      text-xs
                      sm:text-sm
                      text-[#2A2422]/75
                      hover:text-[#9C6B68]
                      hover:translate-x-1
                      transition-all
                      duration-200
                      font-light
                    "
                  >
                    Chokers & Statement Necklaces
                  </button>

                  <button
                    onClick={() =>
                      navigateCatalog('Bangles')
                    }
                    className="
                      block
                      text-xs
                      sm:text-sm
                      text-[#2A2422]/75
                      hover:text-[#9C6B68]
                      hover:translate-x-1
                      transition-all
                      duration-200
                      font-light
                    "
                  >
                    Crafted Gold Bangles & Kadas
                  </button>

                  <button
                    onClick={() =>
                      navigateCatalog('Earrings')
                    }
                    className="
                      block
                      text-xs
                      sm:text-sm
                      text-[#2A2422]/75
                      hover:text-[#9C6B68]
                      hover:translate-x-1
                      transition-all
                      duration-200
                      font-light
                    "
                  >
                    Heritage Jhumkas & Chandbalis
                  </button>

                </div>
              </div>

              {/* HERITAGE */}

              <div
                className={`
                  group
                  border-b
                  border-[#F3E2DD]
                  pb-5
                  transition-all
                  duration-500
                  delay-[250ms]
                  transform
                  ${menuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-6'
                  }
                `}
              >

                <button
                  onClick={() =>
                    handleNavClick('heritage')
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    text-left
                    group
                    cursor-pointer
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <span className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#C99A94]
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    " />

                    <span className="
                      font-serif
                      text-xl
                      sm:text-2xl
                      text-[#2A2422]
                      group-hover:text-[#9C6B68]
                      group-hover:translate-x-1
                      transition-all
                      duration-300
                      font-medium
                    ">
                      5 Generations Craftsmanship
                    </span>

                  </div>

                  <ChevronRight className="
                    w-5
                    h-5
                    text-[#9C6B68]
                    group-hover:translate-x-2
                    transition-transform
                    duration-300
                  " />

                </button>

                <div className="
                  mt-3
                  space-y-2.5
                  pl-6
                  border-l-2
                  border-[#C99A94]/40
                ">

                  <button
                    onClick={() =>
                      handleNavClick('heritage')
                    }
                    className="
                      block
                      text-xs
                      sm:text-sm
                      text-[#2A2422]/75
                      hover:text-[#9C6B68]
                      hover:translate-x-1
                      transition-all
                      duration-200
                      font-light
                    "
                  >
                    Legacy & Atelier Artisans
                  </button>

                  <button
                    onClick={() =>
                      handleNavClick('heritage')
                    }
                    className="
                      block
                      text-xs
                      sm:text-sm
                      text-[#2A2422]/75
                      hover:text-[#9C6B68]
                      hover:translate-x-1
                      transition-all
                      duration-200
                      font-light
                    "
                  >
                    BIS Hallmark 916 Guarantee
                  </button>

                </div>
              </div>

              {/* JOURNAL */}

              <div
                className={`
                  group
                  border-b
                  border-[#F3E2DD]
                  pb-5
                  transition-all
                  duration-500
                  delay-300
                  transform
                  ${menuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-6'
                  }
                `}
              >

                <button
                  onClick={() => navigateBlog()}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    text-left
                    group
                    cursor-pointer
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <span className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#C99A94]
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    " />

                    <span className="
                      font-serif
                      text-xl
                      sm:text-2xl
                      text-[#2A2422]
                      group-hover:text-[#9C6B68]
                      group-hover:translate-x-1
                      transition-all
                      duration-300
                      font-medium
                    ">
                      Atelier Journal
                    </span>

                  </div>

                  <ChevronRight className="
                    w-5
                    h-5
                    text-[#9C6B68]
                    group-hover:translate-x-2
                    transition-transform
                    duration-300
                  " />

                </button>
              </div>

              {/* VISIT STORE */}

              <div
                className={`
                  group
                  transition-all
                  duration-500
                  delay-[350ms]
                  transform
                  ${menuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-6'
                  }
                `}
              >

                <button
                  onClick={() =>
                    handleNavClick('visit')
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    text-left
                    group
                    cursor-pointer
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <span className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#C99A94]
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    " />

                    <span className="
                      font-serif
                      text-xl
                      sm:text-2xl
                      text-[#2A2422]
                      group-hover:text-[#9C6B68]
                      group-hover:translate-x-1
                      transition-all
                      duration-300
                      font-medium
                    ">
                      Visit Flagship Store
                    </span>

                  </div>

                  <ChevronRight className="
                    w-5
                    h-5
                    text-[#9C6B68]
                    group-hover:translate-x-2
                    transition-transform
                    duration-300
                  " />

                </button>
              </div>

            </nav>
          </div>

          {/* ==================================================
              DRAWER FOOTER
          ================================================== */}

          <div
            className={`
              pt-8
              border-t
              border-[#F3E2DD]
              mt-8
              space-y-4
              transition-all
              duration-500
              delay-[400ms]
              transform
              ${menuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
              }
            `}
          >

            {/* Appointment */}

            <button
              onClick={() => {
                setMenuOpen(false)
                setIsAppointmentOpen(true)
              }}
              className="
                group
                relative
                w-full
                py-4
                bg-[#9C6B68]
                text-[#FAF6F3]
                hover:bg-[#C99A94]
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                flex
                items-center
                justify-center
                gap-3
                transition-all
                duration-300
                shadow-lg
                hover:shadow-xl
                cursor-pointer
                overflow-hidden
              "
            >

              <span className="
                absolute
                inset-0
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
                transform
                -translate-x-full
                group-hover:translate-x-full
                transition-transform
                duration-1000
              " />

              <Calendar className="
                w-4
                h-4
                text-[#B08D57]
                group-hover:text-white
                transition-colors
              " />

              <span>
                Book Atelier Appointment
              </span>

              <Sparkles className="
                w-3.5
                h-3.5
                text-[#B08D57]
                opacity-80
                group-hover:opacity-100
                group-hover:rotate-12
                transition-all
              " />

            </button>

            {/* Concierge */}

            <a
              href="tel:+919875338183"
              className="
                w-full
                py-3
                border
                border-[#2A2422]/25
                text-[#2A2422]
                hover:border-[#9C6B68]
                hover:text-[#9C6B68]
                text-xs
                uppercase
                tracking-[0.18em]
                font-light
                flex
                items-center
                justify-center
                gap-2
                transition-colors
                cursor-pointer
              "
            >

              <Phone className="w-3.5 h-3.5" />

              <span>
                Call Concierge: +91 98753 38183
              </span>

            </a>

            {/* Certifications */}

            <div className="
              flex
              items-center
              justify-between
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-[#2A2422]/60
              pt-2
              font-light
              border-t
              border-[#F3E2DD]
            ">
              <span>
                Certified 22K Gold
              </span>

              <span>
                BIS Hallmark 916
              </span>
            </div>

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