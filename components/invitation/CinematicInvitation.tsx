'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import {
  MapPin,
  Calendar,
  MessageCircle,
  Share2,
  Check,
  Gift,
  Sparkles
} from 'lucide-react'
import VelvetConfetti from './VelvetConfetti'
import GoldenRibbons from './GoldenRibbons'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Framer Motion Staggered Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const heroOfferVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: 0.2,
    },
  },
}

export default function CinematicInvitation() {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Grand Opening Date: Sept 30, 2026, 11:00 AM IST
  const targetDate = new Date('2026-09-30T11:00:00+05:30').getTime()

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

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Kanzar Jewels P-4B CIT Road Entally Kolkata 700014'
  )}`

  const whatsappMessage = encodeURIComponent(
    'Hello Kanzar Jewels, I received your Grand Opening invitation and would love to RSVP for the inaugural celebration on 30th September 2026.'
  )
  const whatsappUrl = `https://wa.me/917003467398?text=${whatsappMessage}`

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Grand Opening — Kanzar Jewels Kolkata'
  )}&details=${encodeURIComponent(
    'You are cordially invited to the Grand Inauguration of Kanzar Jewels Flagship Atelier in Kolkata. Flat 3.99% inaugural making charges on 22K gold jewellery.'
  )}&location=${encodeURIComponent(
    'P-4B, CIT Road, Entally, Kolkata – 700014 (Near Birshul Hat)'
  )}&dates=20260930T053000Z/20260930T163000Z`

  const handleShare = async () => {
    const shareData = {
      title: 'Grand Opening Invitation — Kanzar Jewels Kolkata',
      text: "You are cordially invited to the Grand Opening of Kanzar Jewels Kolkata on 30th September 2026. Flat 3.99% making charges inaugural offer!",
      url: typeof window !== 'undefined' ? window.location.href : 'https://kanzarjewels.com/invitation'
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

  return (
    <main className="relative min-h-[100dvh] w-full bg-[#180204] text-[#FAF6F0] selection:bg-[#D4AF37]/30 selection:text-[#FAF6F0] antialiased overflow-x-hidden flex flex-col justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-12">
      {/* ==================================================
          BACKGROUND STAGE: DEEP RED VELVET THEATER CURTAIN
      ================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Fullscreen Velvet Curtain image */}
        <div className="absolute inset-0 w-full h-full scale-[1.02] transition-transform duration-1000">
          <Image
            src="/images/red-velvet-curtain-clean.jpg"
            alt="Red Velvet Stage Curtains"
            fill
            priority
            className="object-cover object-center filter brightness-[0.95] contrast-[1.05]"
          />
        </div>

        {/* Theatrical Spotlight Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_0%,rgba(255,220,160,0.22)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(212,175,55,0.22)_0%,rgba(60,4,8,0.45)_50%,rgba(20,2,4,0.92)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />
      </div>

      {/* ==================================================
          FALLING 3D GOLD CONFETTI & FLOWING SILK RIBBONS
      ================================================== */}
      <VelvetConfetti />
      <GoldenRibbons />

      {/* ==================================================
          MAIN CINEMATIC INVITATION CONTENT (WITH STAGGERED REVEAL)
      ================================================== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto my-auto flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-9 py-2"
      >
        {/* 1. Top Brand Emblem & Name */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="relative w-16 h-12 sm:w-24 sm:h-18 md:w-32 md:h-24 lg:w-44 lg:h-32 xl:w-52 xl:h-36 mb-1 filter drop-shadow-[0_6px_20px_rgba(212,175,55,0.5)]">
            <Image
              src="/logo-v3.png"
              alt="Kanzar Jewels"
              fill
              priority
              className="object-contain filter brightness-110"
            />
          </div>
        </motion.div>

        {/* 2. "DON'T MISS IT!" */}
        <motion.div variants={itemVariants}>
          <h2 className="font-montserrat text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl tracking-[0.45em] text-[#FFF6E5] font-bold uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
            DON&apos;T MISS IT!
          </h2>
        </motion.div>

        {/* 3. The Iconic "Grand OPENING" Title Lockup */}
        <motion.div variants={itemVariants} className="relative flex flex-col items-center justify-center select-none py-1">
          {/* Cursive Calligraphy "Grand" */}
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] 2xl:text-[13rem] text-[#FFFFFF] italic font-normal tracking-wide drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] z-20 -mb-5 sm:-mb-7 md:-mb-10 lg:-mb-14 xl:-mb-18 relative transform -rotate-[2deg]">
            Grand
          </h1>

          {/* Bold Golden Serif "OPENING" */}
          <div className="relative z-10">
            <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] 2xl:text-[8rem] font-bold tracking-[0.18em] uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] animate-gold-shimmer">
              OPENING
            </h2>
          </div>
        </motion.div>

        {/* 4. THE CENTER ATTRACTION — HERO 3.99% OFFER SHOWCASE */}
        <motion.div
          variants={heroOfferVariants}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto my-2 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl bg-gradient-to-b from-[#2B050B]/90 via-[#4A0812]/95 to-[#2B050B]/90 border-2 border-[#D4AF37] backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.45),0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden group"
        >
          {/* Animated Gold Shimmer Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-[shimmer_3s_infinite]" />
          
          {/* Inner Filigree Border Accent */}
          <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-[#D4AF37]/40" />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-1.5 sm:space-y-2.5 md:space-y-3">
            {/* Giant Hero "3.99%" Callout */}
            <div className="py-1">
              <span className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] via-[#FFD700] to-[#C59B27] drop-shadow-[0_6px_25px_rgba(212,175,55,0.6)] leading-none block">
                3.99%
              </span>
            </div>

            {/* Making Charges Title */}
            <h3 className="font-montserrat text-sm sm:text-lg md:text-xl lg:text-2xl font-black uppercase tracking-[0.35em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              MAKING CHARGES
            </h3>

            {/* On 22K Gold Subtitle */}
            <p className="font-cinzel text-xs sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-[0.25em] text-[#FFDF78] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              ON ALL 22K GOLD JEWELLERY
            </p>

            {/* Terms & Details */}
            <div className="pt-2 border-t border-[#D4AF37]/30 w-full max-w-xs sm:max-w-sm md:max-w-md text-[9px] sm:text-xs md:text-sm text-white/80 font-serif italic">
              9K &amp; 18K Gold Jewellery Also Available • Offer Valid Till 6 October 2026
            </div>
          </div>
        </motion.div>

        {/* 5. Event Date & Day */}
        <motion.div variants={itemVariants} className="space-y-1 sm:space-y-1.5 md:space-y-2 pt-2">
          <div className="font-cinzel text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl tracking-[0.4em] text-[#FFF6E5] uppercase font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            WEDNESDAY
          </div>
          <div className="font-cinzel text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl tracking-[0.24em] text-[#FAF6F0] font-semibold uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
            30TH SEPTEMBER 2026
          </div>
          <div className="font-montserrat text-[10px] sm:text-xs md:text-sm lg:text-lg xl:text-xl tracking-[0.3em] text-[#E5B558] uppercase font-semibold">
            11:00 AM ONWARDS
          </div>
        </motion.div>

        {/* 6. Location Pin & Store Address */}
        <motion.a
          variants={itemVariants}
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          {/* White Location Pin Icon from the video */}
          <div className="relative mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/30 backdrop-blur-xs group-hover:bg-[#D4AF37]/25 group-hover:border-[#D4AF37] transition-all shadow-md">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white group-hover:text-[#D4AF37] transition-colors fill-white/20" />
            </div>
            <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-40 pointer-events-none" />
          </div>

          {/* Address Lines */}
          <div className="space-y-0.5 sm:space-y-1 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl">
            <p className="font-montserrat text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-semibold tracking-[0.14em] text-white uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              P-4B, CIT ROAD, ENTALLY
            </p>
            <p className="font-montserrat text-[11px] sm:text-xs md:text-sm lg:text-lg xl:text-xl tracking-[0.16em] text-white/90 uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              KOLKATA – 700014
            </p>
            <p className="font-montserrat text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base tracking-[0.22em] text-[#E5B558] uppercase font-semibold">
              (NEAR BIRSHUL HAT) • FLAGSHIP ATELIER
            </p>
          </div>
        </motion.a>

        {/* 7. Live Countdown Ticker */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto"
        >
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINS', value: timeLeft.minutes },
            { label: 'SECS', value: timeLeft.seconds }
          ].map((item, i) => (
            <div
              key={i}
              className="py-1.5 sm:py-2.5 md:py-3 lg:py-4 px-1.5 sm:px-3 md:px-4 rounded-lg bg-black/65 border border-[#D4AF37]/40 backdrop-blur-xs text-center shadow-lg"
            >
              <div className="font-cinzel text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-none">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs font-montserrat tracking-widest text-[#E5B558] font-bold mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ==================================================
          BOTTOM ACTION BUTTONS (RSVP, DIRECTIONS, CALENDAR, SHARE)
      ================================================== */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        className="relative z-30 pt-6 pb-2 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5">
          {/* 1. RSVP via WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 sm:py-3.5 md:py-4 lg:py-5 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3C562] to-[#D4AF37] hover:brightness-110 active:scale-95 text-[#2B0508] text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase tracking-wider shadow-[0_6px_22px_rgba(212,175,55,0.5)] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-[#2B0508] shrink-0" />
            <span>RSVP</span>
          </a>

          {/* 2. Get Directions */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 sm:py-3.5 md:py-4 lg:py-5 px-3 sm:px-4 rounded-xl bg-black/65 hover:bg-white/15 active:scale-95 border border-[#D4AF37]/60 text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wider backdrop-blur-md shadow-lg transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#E5B558] shrink-0" />
            <span>Map</span>
          </a>

          {/* 3. Add to Calendar */}
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 sm:py-3.5 md:py-4 lg:py-5 px-3 sm:px-4 rounded-xl bg-black/65 hover:bg-white/15 active:scale-95 border border-white/30 text-white/90 text-xs sm:text-sm md:text-base lg:text-lg font-medium uppercase tracking-wider backdrop-blur-md shadow-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#E5B558] shrink-0" />
            <span>Calendar</span>
          </a>

          {/* 4. Share Invitation */}
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 py-3 sm:py-3.5 md:py-4 lg:py-5 px-3 sm:px-4 rounded-xl bg-black/65 hover:bg-white/15 active:scale-95 border border-white/30 text-white/90 text-xs sm:text-sm md:text-base lg:text-lg font-medium uppercase tracking-wider backdrop-blur-md shadow-md transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-400 shrink-0" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#E5B558] shrink-0" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </motion.footer>
    </main>
  )
}
