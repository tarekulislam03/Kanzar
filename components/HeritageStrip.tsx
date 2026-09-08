'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeritageStrip() {
  const containerRef = useRef<HTMLElement | null>(null)
  const quoteRef = useRef<HTMLHeadingElement | null>(null)
  const bgTextRef = useRef<HTMLDivElement | null>(null)

  const quoteText =
    "Kanzar Jewels upholds the tradition of fine 22 karat gold craftsmanship, specialising in hallmarked jewellery built on trust and purity. Now, for the first time, that legacy arrives in Kolkata — every piece certified with the official BIS hallmark, priced with complete transparency, and made to be treasured for generations."

     useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Horizontal background typography drift
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          xPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // 2. Word-by-word blur to sharp reveal
      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll('.word-span')
        gsap.fromTo(
          words,
          {
            opacity: 0.15,
            filter: 'blur(4px)',
            y: 8,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const wordsArray = quoteText.split(' ')

  return (
    <section
      ref={containerRef}
      className="relative py-14 sm:py-16 px-6 sm:px-10 lg:px-12 bg-[#FAF6F3] border-b border-[#DEDAD2] overflow-hidden select-none"
    >
      {/* Background Watermark Horizontal Scrolling Text */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[12vw] font-serif uppercase tracking-[0.2em] text-[#9C7A45]/[0.04] pointer-events-none z-0"
      >
        HERITAGE ATELIER KOLKATA 22K GOLD KANZAR
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <span className="block text-[11px] uppercase tracking-[0.25em] text-[#6E6259] font-semibold">
          OUR HERITAGE
        </span>

        <h2
          ref={quoteRef}
          className="font-serif text-2xl sm:text-4xl font-light text-[#2A2422] leading-relaxed flex flex-wrap justify-center gap-x-2.5 gap-y-1"
        >
          {wordsArray.map((word, idx) => (
            <span key={idx} className="word-span inline-block transition-colors">
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}

