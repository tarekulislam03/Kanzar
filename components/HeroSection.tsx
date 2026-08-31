'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoContainerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoLoaded = () => {
      setIsVideoReady(true)
      if (typeof window !== 'undefined') {
        ; (window as any).__HERO_VIDEO_READY__ = true
        window.dispatchEvent(new Event('heroVideoReady'))
      }
    }

    if (video.readyState >= 3 || (video.currentTime > 0 && !video.paused)) {
      handleVideoLoaded()
    } else {
      video.addEventListener('canplaythrough', handleVideoLoaded)
      video.addEventListener('playing', handleVideoLoaded)
      video.addEventListener('loadeddata', handleVideoLoaded)
      video.addEventListener('timeupdate', handleVideoLoaded)
    }

    return () => {
      video.removeEventListener('canplaythrough', handleVideoLoaded)
      video.removeEventListener('playing', handleVideoLoaded)
      video.removeEventListener('loadeddata', handleVideoLoaded)
      video.removeEventListener('timeupdate', handleVideoLoaded)
    }
  }, [])

  // GSAP ScrollTrigger Cinematic Parallax & Zoom
  useEffect(() => {
    if (!containerRef.current || !videoContainerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Slow camera approach on scroll (scale 100% -> 108%, slight vertical movement)
      gsap.to(videoContainerRef.current, {
        scale: 1.08,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // 2. Typography subtle drift away at different speed
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: -50,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 0.8,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[550px] bg-[#1C1A17] overflow-hidden select-none"
    >
      {/* Full-Bleed Background Video with GSAP Camera Scale */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden transform-gpu will-change-transform"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-lv-1.png"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-90'
            }`}
        >
          <source src="/images/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Top Vignette Gradient Overlay (Ensures Header legibility) */}
      <div className="absolute top-0 inset-x-0 h-48 sm:h-48 bg-gradient-to-b from-black/85 via-black/50 to-transparent z-10 pointer-events-none" />

      {/* Bottom Soft Vignette Gradient Overlay for Mobile Legibility */}
      <div className="absolute bottom-0 inset-x-0 h-64 sm:h-56 bg-gradient-to-t from-[#1C1A17] via-black/70 to-transparent z-10 pointer-events-none" />

      {/* Hero Overlaid Luxury Typography & Scroll Indicator */}
      <div
        ref={textRef}
        className="relative z-20 h-full flex flex-col justify-end pb-20 sm:pb-24 px-5 sm:px-12 max-w-7xl mx-auto pointer-events-none"
      >
        <div className="max-w-xs sm:max-w-xl lg:max-w-2xl space-y-2.5 sm:space-y-3">
          <span className="block text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold opacity-95 drop-shadow-sm">
            FIRST TIME IN KOLKATA
          </span>
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.15] sm:leading-[1.1] drop-shadow-md">
            Welcome to Kanzar Jewels
          </h1>
          <p className="text-[11px] sm:text-sm text-white/85 font-light tracking-wide leading-relaxed drop-shadow-sm max-w-sm sm:max-w-lg">
            Where raw gold transforms into certified BIS hallmarked masterpieces under centuries of master craftsmanship.
          </p>
        </div>

        {/* Minimalist Mobile-First Scroll Indicator (Right Aligned) */}
        <div className="absolute bottom-4 sm:bottom-6 right-5 sm:right-12 flex items-center gap-2 sm:gap-2.5 opacity-85 pointer-events-none">
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-white/85 font-light">
            Scroll To Experience
          </span>
          <div className="w-4 h-7 sm:w-5 sm:h-8 border border-white/40 rounded-full flex items-start justify-center p-0.5 sm:p-1">
            <div className="w-1 h-1.5 sm:h-2 bg-[#D4AF37] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}


