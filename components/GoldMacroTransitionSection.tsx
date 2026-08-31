'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Piece {
  id: string
  tag: string
  title: string
  description: string
  image: string
  alt: string
}

const PIECES: Piece[] = [
  {
    id: 'kundan',
    tag: '01 / HERITAGE KUNDAN',
    title: 'Imperial Kundan Ensemble',
    description: 'Hand-burnished 22K gold foil settings paired with uncut emerald cabochons and pearls.',
    image: '/images/necklace-kundan-set.png',
    alt: 'KANZAR 22K Imperial Kundan Necklace',
  },
  {
    id: 'jhumka',
    tag: '02 / ROYAL EARRINGS',
    title: 'Chandbali Jhumka Masterpiece',
    description: 'Traditional moon-shaped gold architecture layered with delicate seed pearl droplets.',
    image: '/images/earrings-jhumka.png',
    alt: 'KANZAR 22K Antique Chandbali Jhumka Earrings',
  },
  {
    id: 'bangles',
    tag: '03 / HANDCRAFTED BANGLES',
    title: 'Filigree Artisanal Bangles',
    description: 'Generations of fine gold filigree wirework woven into certified 22K solid gold.',
    image: '/images/bangles-filigree.png',
    alt: 'KANZAR 22K Filigree Gold Bangles',
  },
]

export default function GoldMacroTransitionSection() {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const piecesRef = useRef<(HTMLDivElement | null)[]>([])
  const textRef = useRef<(HTMLDivElement | null)[]>([])
  const lightRef = useRef<HTMLDivElement | null>(null)
  const overlayTransitionRef = useRef<HTMLDivElement | null>(null)

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!triggerRef.current || !stickyRef.current) return

    const isMobile = window.innerWidth < 640
    const endScale = isMobile ? 1.35 : 1.55

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          pin: stickyRef.current,
          pinSpacing: false,
          onUpdate: (self) => {
            const progress = self.progress
            if (progress < 0.33) {
              setActiveStep(0)
            } else if (progress < 0.66) {
              setActiveStep(1)
            } else {
              setActiveStep(2)
            }
          },
        },
      })

      // Piece 1: Kundan Necklace (0% to 33%)
      const p1Img = piecesRef.current[0]
      const p1Txt = textRef.current[0]
      if (p1Img && p1Txt) {
        timeline
          .fromTo(
            p1Img,
            { opacity: 0, scale: 0.8, y: 30 },
            { opacity: 1, scale: endScale, y: 0, ease: 'power1.out' },
            0
          )
          .fromTo(
            p1Txt,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, ease: 'power1.out' },
            0.05
          )
          .to(
            [p1Img, p1Txt],
            { opacity: 0, y: -30, scale: endScale * 1.1, ease: 'power1.in' },
            0.28
          )
      }

      // Piece 2: Chandbali Jhumkas (33% to 66%)
      const p2Img = piecesRef.current[1]
      const p2Txt = textRef.current[1]
      if (p2Img && p2Txt) {
        timeline
          .fromTo(
            p2Img,
            { opacity: 0, scale: 0.8, y: 30, rotation: -3 },
            { opacity: 1, scale: endScale, y: 0, rotation: 1.5, ease: 'power1.out' },
            0.33
          )
          .fromTo(
            p2Txt,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, ease: 'power1.out' },
            0.38
          )
          .to(
            [p2Img, p2Txt],
            { opacity: 0, y: -30, scale: endScale * 1.1, ease: 'power1.in' },
            0.61
          )
      }

      // Piece 3: Filigree Bangles (66% to 100%)
      const p3Img = piecesRef.current[2]
      const p3Txt = textRef.current[2]
      if (p3Img && p3Txt) {
        timeline
          .fromTo(
            p3Img,
            { opacity: 0, scale: 0.8, y: 30, rotation: 3 },
            { opacity: 1, scale: endScale, y: 0, rotation: 0, ease: 'power1.out' },
            0.66
          )
          .fromTo(
            p3Txt,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, ease: 'power1.out' },
            0.71
          )
      }

      // Studio Light Sheen Sweep
      if (lightRef.current) {
        timeline
          .to(lightRef.current, { xPercent: 200, opacity: 0.6, ease: 'power2.inOut' }, 0.1)
          .to(lightRef.current, { xPercent: -200, opacity: 0 }, 0.35)
          .to(lightRef.current, { xPercent: 200, opacity: 0.6, ease: 'power2.inOut' }, 0.45)
          .to(lightRef.current, { xPercent: -200, opacity: 0 }, 0.68)
          .to(lightRef.current, { xPercent: 200, opacity: 0.6, ease: 'power2.inOut' }, 0.78)
      }

      // Filmic Gold Section Transition
      if (overlayTransitionRef.current) {
        timeline.to(
          overlayTransitionRef.current,
          {
            opacity: 1,
            ease: 'power2.inOut',
          },
          0.88
        )
      }
    }, triggerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={triggerRef} className="relative w-full h-[300vh] sm:h-[360vh] bg-[#0C0B0A] select-none z-20">
      {/* Sticky Fullscreen Mobile-First Camera Stage */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-[#0C0B0A]"
      >
        {/* Radial Ambient Gold Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#1C1A17]/70 to-[#0C0B0A] z-0 pointer-events-none" />

        {/* Mobile Viewport Collection Indicator */}
        <div className="absolute top-5 inset-x-0 z-30 flex items-center justify-center gap-2 pointer-events-none">
          {PIECES.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeStep === idx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Studio Light Sheen Overlay */}
        <div
          ref={lightRef}
          className="absolute inset-0 z-25 pointer-events-none opacity-0 -translate-x-full w-full h-full bg-gradient-to-r from-transparent via-[#FFE58F]/30 to-transparent mix-blend-overlay transform -skew-x-12"
        />

        {/* 3 Mobile Optimized Jewellery Display Containers */}
        {PIECES.map((piece, index) => (
          <div
            key={piece.id}
            ref={(el) => {
              piecesRef.current[index] = el
            }}
            className="absolute z-10 w-[270px] h-[270px] xs:w-[320px] xs:h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px] opacity-0 transform-gpu will-change-transform flex items-center justify-center pointer-events-none"
          >
            <Image
              src={piece.image}
              alt={piece.alt}
              fill
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 460px, 560px"
              priority={index === 0}
              quality={90}
              className="object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
            />
          </div>
        ))}

        {/* 3 Mobile Optimized Typography Display Layers */}
        {PIECES.map((piece, index) => (
          <div
            key={`text-${piece.id}`}
            ref={(el) => {
              textRef.current[index] = el
            }}
            className="absolute z-20 inset-0 flex flex-col justify-between pt-14 pb-12 sm:py-20 px-5 max-w-3xl mx-auto text-center pointer-events-none opacity-0"
          >
            {/* Top Tag & Title */}
            <div>
              <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold block mb-1.5 drop-shadow-sm">
                {piece.tag}
              </span>
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-light text-white tracking-tight drop-shadow-md">
                {piece.title}
              </h2>
            </div>

            {/* Bottom Description */}
            <div className="max-w-xs sm:max-w-md mx-auto">
              <p className="text-[11px] sm:text-sm text-white/85 font-light leading-relaxed tracking-wide drop-shadow-sm">
                {piece.description}
              </p>
              <div className="w-10 h-[1px] bg-[#D4AF37]/60 mx-auto mt-3" />
            </div>
          </div>
        ))}

        {/* Filmic Gold Section Transition Overlay */}
        <div
          ref={overlayTransitionRef}
          className="absolute inset-0 z-30 bg-[#FAF8F3] opacity-0 pointer-events-none transition-opacity duration-300"
        />

        {/* Top & Bottom Mobile Vignettes */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0C0B0A] to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0C0B0A] to-transparent z-20 pointer-events-none" />
      </div>
    </div>
  )
}
