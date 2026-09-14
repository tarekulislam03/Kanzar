'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  MapPin,
  Calendar,
  MessageCircle,
  Share2,
  Check,
  Clock,
  Gift,
  Home,
  X,
  Phone
} from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function InvitationCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Target Opening Date: Sept 30, 2026 11:00:00 AM IST
  const targetDate = new Date('2026-09-30T11:00:00+05:30').getTime()

  // Countdown timer logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const handleOpenEnvelope = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(50)
      } catch {
        // ignore
      }
    }
    setIsOpen(true)
  }

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Kanzar Jewels P-4B CIT Road Entally Kolkata 700014'
  )}`

  const whatsappMessage = encodeURIComponent(
    'Hello Kanzar Jewels, I would like to RSVP for the Grand Opening ceremony on 30th September.'
  )
  const whatsappUrl = `https://wa.me/919875338183?text=${whatsappMessage}`

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Grand Opening — Kanzar Jewels Kolkata'
  )}&details=${encodeURIComponent(
    'You are cordially invited to the Grand Inauguration of Kanzar Jewels Flagship Atelier in Kolkata. Experience fine 22K gold and certified bridal masterpieces.'
  )}&location=${encodeURIComponent(
    'P-4B, CIT Road, Entally, Kolkata – 700014 (Near Birshul Hat)'
  )}&dates=20260930T053000Z/20260930T163000Z`

  const handleShare = async () => {
    const shareData = {
      title: 'Grand Opening Invitation — Kanzar Jewels',
      text: 'You are cordially invited to the Grand Opening of Kanzar Jewels Flagship Atelier in Kolkata.',
      url: typeof window !== 'undefined' ? window.location.href : 'https://kanzarjewels.com/invitation',
    }

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        copyLink()
      }
    } else {
      copyLink()
    }
  }

  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  // Framer Motion Stagger Variants for Page Elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 25, opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 240, damping: 22 }
    }
  }

  return (
    <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-black text-[#FAF6F3] select-none font-sans flex items-center justify-center">
      {/* Background Hero Image with Slow Motion Ken Burns Zoom */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/hero-slide-pink.jpg"
          alt="Kanzar Jewels Grand Opening"
          fill
          className="object-cover object-center filter brightness-[0.55] saturate-[1.15]"
          priority
        />
      </motion.div>

      {/* Dark Luxury Vignette & Radial Light Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/80 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-scratchy opacity-20 pointer-events-none mix-blend-overlay z-10" />

      {/* Floating Motion Gold Dust Particles Matrix */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: ['0vh', '-100vh'],
              x: [i * 12, (i % 2 === 0 ? 35 : -35) + i * 12],
              opacity: [0, 0.85, 0],
              scale: [0.6, 1.4, 0.6]
            }}
            transition={{
              duration: 5.5 + i * 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.6
            }}
            className="absolute bottom-0 text-[#C48793]/50"
            style={{ left: `${6 + i * 10}%` }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ==================================================
             1. PRE-PAGE: MOTION WAX SEAL COVER
          ================================================== */
          <motion.div
            key="envelope-cover"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(12px)', transition: { duration: 0.5 } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full max-w-sm sm:max-w-md max-h-[calc(100dvh-2rem)] mx-4 bg-[#23171A]/85 backdrop-blur-xl border border-[#C48793]/30 p-6 sm:p-9 shadow-2xl text-center flex flex-col items-center justify-between min-h-[480px] sm:min-h-[520px] rounded-none outline outline-1 outline-offset-6 outline-[#C48793]/20"
          >
            {/* Animated Corner Filigree Accents */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="contents"
            >
              <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#C48793]" />
              <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#C48793]" />
              <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#C48793]" />
              <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#C48793]" />
            </motion.div>

            {/* Header / Subtitle */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="pt-2 flex flex-col items-center"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C48793] font-semibold mb-3">
                OFFICIAL INVITATION
              </span>
              <Image
                src="/logo-v3.png"
                alt="Kanzar Jewels"
                width={170}
                height={60}
                className="h-11 sm:h-13 w-auto object-contain filter brightness-110 drop-shadow-md"
                priority
              />
            </motion.div>

            {/* Central Animated Motion Wax Seal Button */}
            <div className="my-6 flex flex-col items-center relative">
              <motion.button
                onClick={handleOpenEnvelope}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.92 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(196,135,147,0.3)',
                    '0 0 45px rgba(196,135,147,0.7)',
                    '0 0 20px rgba(196,135,147,0.3)'
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="group relative w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-gradient-to-tr from-[#7A3F4A] via-[#9C6B68] to-[#C48793] text-white flex flex-col items-center justify-center border-2 border-[#FAF6F3]/30 cursor-pointer overflow-hidden"
              >
                {/* Shimmer sweep motion */}
                <motion.div
                  animate={{ x: ['-100%', '220%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 pointer-events-none"
                />

                {/* Pulse Ring Motion */}
                <span className="absolute inset-0 rounded-full border-2 border-[#C48793] animate-ping opacity-35 pointer-events-none" />

                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#FAF6F3] group-hover:rotate-45 transition-transform duration-500" />
                <span className="text-[10px] uppercase tracking-[0.25em] mt-1 font-semibold text-white drop-shadow-xs">
                  UNFOLD
                </span>
              </motion.button>

              <motion.p
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-4 font-serif text-sm text-[#FAF6F3]/90 italic tracking-wide"
              >
                Tap seal to open invitation
              </motion.p>
            </div>

            {/* Bottom Details Preview */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pb-1 text-center border-t border-[#C48793]/20 pt-4 w-full"
            >
              <h2 className="font-serif text-lg text-white font-light tracking-wider uppercase">
                Grand Opening Ceremony
              </h2>
              <p className="text-[11px] text-[#C48793] tracking-[0.2em] uppercase mt-1 font-medium">
                Kolkata Flagship Atelier
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* ==================================================
             2. SINGLE ALL-IN-ONE MOTION INVITATION PAGE
          ================================================== */
          <motion.div
            key="single-invitation-page"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-7 z-20"
          >
            {/* TOP HEADER BAR */}
            <motion.div
              variants={itemVariants}
              className="relative z-30 pt-1 max-w-2xl mx-auto w-full flex items-center justify-between"
            >
              <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src="/logo-v3.png"
                  alt="Kanzar Jewels"
                  width={140}
                  height={45}
                  className="h-8 sm:h-10 w-auto object-contain filter brightness-110 drop-shadow-md"
                  priority
                />
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-widest text-white transition-all rounded-full"
                >
                  <Home className="w-3 h-3 text-[#C48793]" />
                  <span className="hidden sm:inline">Main Site</span>
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Re-seal envelope"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* CENTER STAGGERED CONTENT CONTAINER */}
            <div className="relative z-30 px-2 sm:px-6 max-w-xl mx-auto w-full my-auto text-center space-y-3.5 sm:space-y-5">
              {/* HEADING & SUBTITLE */}
              <motion.div variants={itemVariants} className="space-y-1">
                <motion.h1
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="font-serif text-3xl min-[380px]:text-4xl sm:text-5xl font-normal tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4E3C1] to-[#C48793] uppercase drop-shadow-md leading-[1.1]"
                >
                  THE GRAND OPENING
                </motion.h1>
                <h2 className="font-serif text-xs sm:text-base tracking-[0.2em] text-[#C48793] uppercase font-light">
                  KOLKATA FLAGSHIP ATELIER
                </h2>
              </motion.div>

              {/* EDITORIAL INVITATION NOTE */}
              <motion.p
                variants={itemVariants}
                className="text-[11px] sm:text-xs text-white/95 font-light leading-relaxed max-w-md mx-auto drop-shadow-xs"
              >
                Kanzar Jewels cordially invites you to the grand inauguration of Kolkata’s finest destination for certified 22K gold & heirloom bridal masterpieces.
              </motion.p>

              {/* COMBINED EVENT DETAILS BOX (DATE, TIME, LOCATION) */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="bg-black/55 border border-[#C48793]/40 backdrop-blur-md p-3 sm:p-4 text-left space-y-2.5 max-w-md mx-auto shadow-xl transition-all duration-300"
              >
                {/* DATE & TIME */}
                <div className="flex items-center gap-2.5 text-[#F4E3C1] pb-2 border-b border-white/10">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Calendar className="w-4 h-4 text-[#C48793] shrink-0" />
                  </motion.div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm font-serif">
                    <span className="font-medium text-white">30th September 2026</span>
                    <span className="text-white/60">•</span>
                    <span className="text-white/90">11:00 AM Onwards</span>
                  </div>
                </div>

                {/* ATELIER LOCATION & ADDRESS */}
                <div className="flex items-start gap-2.5 text-white/90">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <MapPin className="w-4 h-4 text-[#C48793] shrink-0 mt-0.5" />
                  </motion.div>
                  <div>
                    <div className="block text-[10px] uppercase tracking-wider text-[#C48793] font-semibold">
                      Atelier Location
                    </div>
                    <div className="font-serif text-xs sm:text-sm text-white font-light leading-snug">
                      P-4B, CIT Road, Entally, Kolkata – 700014
                    </div>
                    <div className="text-[10px] text-white/70 italic mt-0.5">
                      (Near Birshul Hat) • Mon – Sat: 11:00 AM – 10:00 PM
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* INAUGURAL SPECIAL OFFER STRIP WITH GLOW MOTION */}
              <motion.div
                variants={itemVariants}
                animate={{
                  scale: [1, 1.02, 1],
                  boxShadow: [
                    '0 0 10px rgba(196,135,147,0.2)',
                    '0 0 25px rgba(196,135,147,0.5)',
                    '0 0 10px rgba(196,135,147,0.2)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-gradient-to-r from-[#8B4A56]/80 via-[#6E3541]/90 to-[#8B4A56]/80 border border-[#C48793]/60 backdrop-blur-md p-2.5 sm:p-3 text-center space-y-1 max-w-md mx-auto shadow-md"
              >
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F4E3C1] text-[#2A161C] text-[8px] sm:text-[9px] font-bold uppercase tracking-widest">
                  <Gift className="w-3 h-3 text-[#8B4A56]" />
                  INAUGURAL BENEFIT
                </div>
                <div className="font-serif text-xs sm:text-sm text-white font-normal">
                  Flat <strong className="text-[#F4E3C1] font-semibold text-sm sm:text-base">3.99%</strong> Making Charges on 22K Gold
                </div>
              </motion.div>

              {/* LIVE COUNTDOWN GRID WITH MOTION COUNTERS */}
              <motion.div variants={itemVariants} className="grid grid-cols-4 gap-1.5 sm:gap-2 max-w-md mx-auto">
                {[
                  { label: 'DAYS', value: timeLeft.days },
                  { label: 'HOURS', value: timeLeft.hours },
                  { label: 'MINS', value: timeLeft.minutes },
                  { label: 'SECS', value: timeLeft.seconds }
                ].map((unit, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/60 border border-[#C48793]/30 backdrop-blur-md py-1.5 px-1 text-center"
                  >
                    <span className="font-serif text-sm sm:text-lg font-light text-white leading-none block">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-[#C48793] block mt-0.5 font-medium">
                      {unit.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* BOTTOM ACTION BUTTONS WITH MOTION HOVER/TAP */}
            <motion.div variants={itemVariants} className="relative z-30 pb-2 sm:pb-4 px-2 sm:px-6 max-w-xl mx-auto w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* RSVP WHATSAPP */}
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 px-2 bg-gradient-to-r from-[#8B4A56] to-[#7A3F4A] hover:brightness-110 text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold shadow-lg border border-[#C48793]/40 backdrop-blur-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>RSVP</span>
                </motion.a>

                {/* GET DIRECTIONS */}
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 px-2 border border-[#C48793] bg-black/40 hover:bg-white/20 text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold shadow-md backdrop-blur-md"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#C48793]" />
                  <span>Directions</span>
                </motion.a>

                {/* ADD CALENDAR */}
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 px-2 border border-white/20 bg-black/40 hover:bg-white/20 text-white/90 text-[10px] sm:text-[11px] uppercase tracking-wider font-medium shadow-md backdrop-blur-md"
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0 text-[#C48793]" />
                  <span>Calendar</span>
                </motion.a>

                {/* SHARE CARD */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 py-3 px-2 border border-white/20 bg-black/40 hover:bg-white/20 text-white/90 text-[10px] sm:text-[11px] uppercase tracking-wider font-medium shadow-md backdrop-blur-md cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      <span className="text-green-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 shrink-0 text-[#C48793]" />
                      <span>Share</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
