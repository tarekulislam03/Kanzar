'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image' // <-- 1. Import Next.js Image
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  // Dispatch event immediately so PageLoader (if any) doesn't hang
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ; (window as any).__HERO_VIDEO_READY__ = true
      window.dispatchEvent(new Event('heroVideoReady'))
    }
  }, [])

  // GSAP ScrollTrigger Cinematic Parallax
  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      // Typography subtle drift away on scroll
      gsap.to(textRef.current, {
        y: -50,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[80vh] min-h-[450px] overflow-hidden select-none bg-[#FAF6F3]"
    >
      {/* 2. Next.js Optimized Background Image */}
      <Image
        src="/images/hero-bg-3.png"
        alt="Kanzar Jewels"
        fill
        priority
        /* object-cover prevents squeezing, object-[15%_center] keeps the left-side jewelry visible on mobile */
        className="object-cover object-[15%] md:object-left z-0"
      />
 
      {/* Hero Typography - Right Aligned block, Center Aligned text */}
      <div
        ref={textRef}
        /* CHANGED: justify-end (mobile bottom), sm:justify-center (desktop middle), pb-12 (mobile bottom spacing) */
        className="relative z-20 h-full flex flex-col justify-end sm:justify-center items-end px-5 sm:px-12 pb-12 sm:pb-0 max-w-[1400px] mx-auto"
      >
        <div className="max-w-xs sm:max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6 text-center">

          {/* Changed text color to off-white (#FAF6F3) */}
          <span className="block text-[9px] xs:text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#FAF6F3] font-bold drop-shadow-sm">
            FIRST TIME IN KOLKATA
          </span>

          {/* Changed text color to white and added drop shadow for readability */}
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-8xl font-medium text-white tracking-tight leading-[1.15] sm:leading-[1.1] drop-shadow-md">
            Welcome to Kanzar Jewels
          </h1>

          {/* Changed text color to off-white */}
          <p className="text-[12px] sm:text-sm text-[#FAF6F3]/90 font-light tracking-wide leading-relaxed max-w-sm sm:max-w-lg mx-auto drop-shadow-sm">
            Where raw gold transforms into certified BIS hallmarked masterpieces under centuries of master craftsmanship.
          </p>
          <div className="pt-2 sm:pt-4">
            <a
              href="/catalog"
              className="inline-block px-8 py-3.5 border border-white/60 text-white text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-white hover:text-[#5C4047] transition-all duration-500 ease-in-out backdrop-blur-sm"
            >
              Explore The Collection
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}