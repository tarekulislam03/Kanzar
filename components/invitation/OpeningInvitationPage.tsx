'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'

export default function OpeningInvitationPage() {
  const [animationState, setAnimationState] = useState<'sealed' | 'opening' | 'opened'>('sealed')
  const searchParams = useSearchParams()

  const guestName = searchParams?.get('name')?.trim() || searchParams?.get('to')?.trim() || ''
  const rawLocation = searchParams?.get('location')
  const location = rawLocation || 'P-4B, CIT Road, Entally, Kolkata – 700014'

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location.includes('P-4B')
      ? 'Kanzar Jewels P-4B CIT Road Entally Kolkata 700014'
      : location
  )}`

  const handleOpen = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(45)
      } catch {
        // ignore
      }
    }
    setAnimationState('opening')
    setTimeout(() => {
      setAnimationState('opened')
    }, 600)
  }

  const handleReplay = () => {
    setAnimationState('sealed')
  }

  const whatsappMessage = encodeURIComponent(
    guestName
      ? `Hello Kanzar Jewels, I am ${guestName} and I am delighted to accept your invitation for the Grand Opening on 30th September! RSVP.`
      : `Hello Kanzar Jewels, I am delighted to accept your invitation for the Grand Opening on 30th September! RSVP.`
  )
  const whatsappUrl = `https://wa.me/917003467398?text=${whatsappMessage}`

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-[#9E5D6C] via-[#803E4C] to-[#5C2633] text-[#2B1F22] flex flex-col justify-between items-center select-none font-sans px-4 py-6 sm:py-8">
      {/* Background Soft Glows & Ambient Luxury Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Central warm rose glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full bg-[radial-gradient(circle,rgba(214,142,156,0.28)_0%,rgba(128,62,76,0.35)_50%,transparent_75%)] blur-2xl" />
        
        {/* Soft edge vignette to deepen the background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(55,18,25,0.45)_100%)]" />

        {/* Ambient floating subtle dusky pink / pearl dust */}
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: [0.2, 0.85, 0.2],
              y: [-10, -70, -10],
              x: [0, (i % 2 === 0 ? 18 : -18), 0],
            }}
            transition={{
              duration: 4 + (i % 4) * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
            className="absolute rounded-full bg-white/70 shadow-xs"
            style={{
              width: `${(i % 3) * 3 + 2.5}px`,
              height: `${(i % 3) * 3 + 2.5}px`,
              top: `${12 + (i * 7) % 78}%`,
              left: `${6 + (i * 8) % 88}%`,
            }}
          />
        ))}
      </div>

      {/* TOP ONLY: LOGO */}
      <header className="relative z-30 flex flex-col items-center pt-2 sm:pt-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        >
          <Image
            src="/logo-v3.png"
            alt="Kanzar Jewels"
            width={200}
            height={80}
            priority
            className="h-12 sm:h-16 md:h-18 w-auto object-contain brightness-105"
          />
        </motion.div>
      </header>

      {/* CENTER: INTERACTIVE LETTER ENVELOPE / CARD REVEAL */}
      <main className="relative z-20 flex-1 w-full max-w-lg mx-auto flex items-center justify-center my-auto py-4">
        <AnimatePresence mode="wait">
          {animationState !== 'opened' ? (
            /* ==================================================
               STATE 1: ENVELOPE WITH REALISTIC LETTER OPENING ANIMATION
            ================================================== */
            <motion.div
              key="envelope-container"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 1.05,
                filter: 'blur(6px)',
                transition: { duration: 0.35, ease: 'easeInOut' },
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm sm:max-w-md flex flex-col items-center [perspective:1000px]"
            >
              {/* Envelope Wrapper */}
              <div className="relative w-full aspect-[16/11] rounded-2xl bg-gradient-to-b from-[#FDF8F9] via-[#FAF0F2] to-[#EED8DC] shadow-[0_25px_50px_-12px_rgba(139,74,86,0.35)] border border-[#E8CCD1] overflow-visible">
                {/* Envelope Interior Backing Lining */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#ECD5DA] to-[#FAF1F3] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#C48793_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
                </div>


                {/* Front Envelope Pocket (Left, Right & Bottom Flaps) */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
                  <svg
                    viewBox="0 0 100 70"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    <defs>
                      <linearGradient id="foldLeft" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#F5DFE3" />
                      </linearGradient>
                      <linearGradient id="foldRight" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#F5DFE3" />
                      </linearGradient>
                      <linearGradient id="foldBottom" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#E5C7CC" />
                        <stop offset="100%" stopColor="#FAF2F4" />
                      </linearGradient>
                    </defs>
                    {/* Left Triangle */}
                    <path d="M 0 0 L 50 35 L 0 70 Z" fill="url(#foldLeft)" opacity="0.98" />
                    {/* Right Triangle */}
                    <path d="M 100 0 L 50 35 L 100 70 Z" fill="url(#foldRight)" opacity="0.98" />
                    {/* Bottom Triangle */}
                    <path
                      d="M 0 70 L 50 30 L 100 70 Z"
                      fill="url(#foldBottom)"
                      stroke="#E5C7CC"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>

                {/* TOP FLAP / LID (Folds Upward Smoothly in 3D) */}
                <motion.div
                  style={{ transformOrigin: 'top center' }}
                  animate={
                    animationState === 'opening'
                      ? { rotateX: 180 }
                      : { rotateX: 0 }
                  }
                  transition={{
                    duration: 0.55,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute top-0 left-0 right-0 h-[52%] z-30 pointer-events-none drop-shadow-[0_6px_12px_rgba(139,74,86,0.22)]"
                >
                  <svg
                    viewBox="0 0 100 36"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    <defs>
                      <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="60%" stopColor="#FAF1F3" />
                        <stop offset="100%" stopColor="#EAD2D7" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 0 L 50 36 L 100 0 Z"
                      fill="url(#flapGrad)"
                      stroke="#E5C7CC"
                      strokeWidth="0.5"
                    />
                    {/* Subtle dashed stitch border on flap */}
                    <path
                      d="M 4 0 L 50 33 L 96 0"
                      fill="none"
                      stroke="#C48793"
                      strokeWidth="0.4"
                      strokeDasharray="1.5 1.5"
                      opacity="0.6"
                    />
                  </svg>
                </motion.div>

                {/* Guest Name Plaque on Envelope (if personalized) */}
                {guestName && (
                  <div className="absolute top-2.5 inset-x-0 z-25 text-center pointer-events-none px-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/85 backdrop-blur-xs text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8B4A56] font-bold border border-[#E8CCD1] shadow-xs truncate max-w-[85%]">
                      Exclusively For {guestName}
                    </span>
                  </div>
                )}

                {/* CENTER OPEN BUTTON (Aligned at flap tip) */}
                <AnimatePresence>
                  {animationState === 'sealed' && (
                    <motion.div
                      key="open-button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.18 } }}
                      className="absolute left-1/2 top-[51%] -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center"
                    >
                      {/* Outer pulsating glow ring */}
                      <motion.div
                        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -inset-3 rounded-full border border-[#C48793] pointer-events-none"
                      />

                      <motion.button
                        onClick={handleOpen}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        animate={{
                          boxShadow: [
                            '0 10px 25px -5px rgba(196, 135, 147, 0.45)',
                            '0 15px 35px -5px rgba(139, 74, 86, 0.65)',
                            '0 10px 25px -5px rgba(196, 135, 147, 0.45)',
                          ],
                        }}
                        transition={{
                          boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        aria-label="Open Letter"
                        className="group relative px-9 py-3.5 sm:px-11 sm:py-4 rounded-full bg-gradient-to-r from-[#C48793] via-[#9C5B67] to-[#8B4A56] text-white font-medium tracking-[0.2em] uppercase text-sm sm:text-base flex items-center justify-center cursor-pointer shadow-xl overflow-hidden transition-all duration-300"
                      >
                        {/* Shimmer light sweep */}
                        <motion.div
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent transform -skew-x-12 pointer-events-none"
                        />

                        <span>Open</span>
                      </motion.button>

                      <p className="text-[11px] sm:text-xs text-[#8B4A56]/75 mt-3 tracking-wider font-medium">
                        Tap to open letter
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* ==================================================
               STATE 2: FULLY REVEALED INVITATION CARD
            ================================================== */
            <motion.div
              key="opened-state"
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#FCF9F7] rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-[0_25px_60px_-15px_rgba(139,74,86,0.28),inset_0_0_60px_rgba(196,135,147,0.18)] border border-[#E8CCD1] flex flex-col items-center text-center overflow-hidden"
            >
              {/* Authentic Handmade Paper Texture Overlay */}
              <div className="absolute inset-0 bg-scratchy opacity-45 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFB] via-[#FAF3F5]/80 to-[#F5E6E9]/90 pointer-events-none -z-10" />

              {/* Embossed Letterpress Plate Inner Frames */}
              <div className="absolute inset-2.5 sm:inset-3.5 rounded-xl sm:rounded-2xl border border-[#E8D0D4] shadow-[inset_0_1px_2px_rgba(139,74,86,0.05),0_1px_0_rgba(255,255,255,0.9)] pointer-events-none" />
              <div className="absolute inset-4 sm:inset-5 rounded-lg sm:rounded-xl border border-[#C48793]/35 pointer-events-none" />

              {/* Dusky Pink Corner Filigree Accents */}
              <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-[#C48793] rounded-tl pointer-events-none" />
              <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-[#C48793] rounded-tr pointer-events-none" />
              <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-[#C48793] rounded-bl pointer-events-none" />
              <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-[#C48793] rounded-br pointer-events-none" />

              {/* Personalized Guest Greeting (if provided) */}
              {guestName && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-1"
                >
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8B4A56]/70 font-semibold block">
                    Specially Invited
                  </span>
                  <p className="font-serif text-lg sm:text-xl text-[#8B4A56] font-medium tracking-wide">
                    Dear {guestName},
                  </p>
                </motion.div>
              )}

              {/* Grand Opening (Bigger & Highlighted) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.6 }}
                className="relative my-2 sm:my-3 flex items-center justify-center"
              >
                <div className="flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#F4DFE3]/90 via-[#FDF2F4] to-[#F4DFE3]/90 border border-[#DCA8B2] shadow-[0_4px_14px_rgba(139,74,86,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <span className="text-[#C48793] text-xs sm:text-sm">✦</span>
                  <span className="font-cinzel text-lg sm:text-2xl md:text-3xl font-extrabold tracking-[0.22em] text-[#8B4A56] uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                    Grand Opening
                  </span>
                  <span className="text-[#C48793] text-xs sm:text-sm">✦</span>
                </div>
              </motion.div>

              {/* 1. "You are invited" */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-script text-4xl sm:text-5xl md:text-6xl text-[#8B4A56] font-normal leading-tight tracking-wide pt-0.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
              >
                You are invited
              </motion.h1>

              {/* Decorative Subtle Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#C48793] to-transparent my-3 sm:my-4"
              />

              {/* 2. Date (Increased Size) & "to Kanzar Jewels" (Decreased Size) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.6 }}
                className="flex flex-col items-center space-y-1"
              >
<h2 className="font-serif text-xs sm:text-sm md:text-base text-[#5C363F] tracking-[0.18em] uppercase font-medium pt-1">
                  to Kanzar Jewels
                </h2>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8B4A56]/75 font-semibold">
                  on
                </span>
                <p className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-[#8B4A56] tracking-[0.06em] leading-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                  30th September
                </p>
                
              </motion.div>

              {/* 3. "location - {location}" (Handmade paper inset) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.6 }}
                className="relative mt-4 sm:mt-5 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#F7EDEF]/80 bg-scratchy border border-[#E8CCD1] w-full shadow-[inset_0_1px_3px_rgba(139,74,86,0.08),0_1px_0_rgba(255,255,255,0.85)] overflow-hidden"
              >
                <span className="block text-xs sm:text-sm uppercase tracking-[0.22em] font-bold text-[#A25A68] mb-2">
                  location -
                </span>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#7A3E4B] leading-snug">
                  {location}
                </p>
              </motion.div>

              {/* 4. BUTTONS: MAP BUTTON & WHATSAPP BUTTON */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.6 }}
                className="mt-6 sm:mt-7 w-full flex flex-col gap-3"
              >
                {/* Map Button */}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-[#FAF2F4] text-[#8B4A56] border-2 border-[#C48793]/70 hover:border-[#8B4A56] font-medium text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B4A56] group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">View on Google Maps</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm sm:text-base shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 transform active:scale-98"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current text-white shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">Message on Whatsapp</span>
                </a>
              </motion.div>

              {/* Replay button */}
              <button
                onClick={handleReplay}
                className="mt-4 text-[11px] text-[#8B4A56]/60 hover:text-[#8B4A56] uppercase tracking-[0.18em] transition-colors cursor-pointer"
              >
                ↻ Fold Letter
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Subtle footer spacing to keep layout centered */}
      <footer className="relative z-10 text-center py-2">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#F3D5DB]/85 font-medium">
          Kanzar Jewels • Kolkata
        </p>
      </footer>
    </div>
  )
}

