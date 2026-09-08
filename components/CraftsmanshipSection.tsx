'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface RoadmapStep {
  level: string
  label: string
  title: string
  desc: string
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    level: '01',
    label: 'Purity Assurance',
    title: '100% BIS Hallmarked',
    desc: 'Every piece is certified under the official BIS hallmark, guaranteeing 22K genuine gold purity in every creation.',
  },
  {
    level: '02',
    label: 'Artisanal Heritage',
    title: 'Master Filigree Quality',
    desc: 'Crafted with meticulous attention to detail using centuries-old heritage wirework & Kundan techniques.',
  },
  {
    level: '03',
    label: 'Wholesale Trust',
    title: 'Transparent Gold Rates',
    desc: 'Honest pricing with transparent, flat making charges — zero hidden markups or arbitrary surcharges, ever.',
  },
  {
    level: '04',
    label: 'Bespoke Perfection',
    title: 'Handcrafted Durability',
    desc: 'Each design is individually burnished and quality-inspected for lifetime durability and wearable luxury.',
  },
]

export default function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const imageContainerRef = useRef<HTMLDivElement | null>(null)
  const svgPathRef = useRef<SVGPathElement | null>(null)
  const pointsRef = useRef<(HTMLDivElement | null)[]>([])
  const nodeDotsRef = useRef<(HTMLDivElement | null)[]>([])

  const [activeStep, setActiveStep] = useState<number>(0)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // 1. Background image slow parallax zoom
      if (imageContainerRef.current) {
        gsap.to(imageContainerRef.current, {
          scale: 1.15,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // 2. Animate Curved SVG Path drawing down on scroll
      const path = svgPathRef.current
      if (path) {
        const pathLength = path.getTotalLength()
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 0.8,
            onUpdate: (self) => {
              const p = self.progress
              if (p < 0.25) setActiveStep(0)
              else if (p < 0.5) setActiveStep(1)
              else if (p < 0.75) setActiveStep(2)
              else setActiveStep(3)
            },
          },
        })
      }

      // 3. Animate each Minimalist Point & Node Dot as scroll progresses
      pointsRef.current.forEach((point, idx) => {
        if (!point) return
        const nodeDot = nodeDotsRef.current[idx]

        gsap.fromTo(
          point,
          {
            opacity: 0.2,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: point,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        )

        if (nodeDot) {
          gsap.fromTo(
            nodeDot,
            { scale: 0.7, backgroundColor: '#2D2A26', borderColor: '#D4AF37' },
            {
              scale: 1.25,
              backgroundColor: '#D4AF37',
              borderColor: '#FFE58F',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.9)',
              scrollTrigger: {
                trigger: point,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 0.5,
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="heritage"
      className="relative py-12 sm:py-16 px-5 sm:px-10 lg:px-12 bg-[#1A1815] text-white border-b border-[#2D2A26] overflow-hidden select-none"
    >
      {/* Background Imperial Kundan Model Overlay */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 z-0 opacity-[0.20] pointer-events-none transform-gpu will-change-transform scale-100"
      >
        <Image
          src="/images/modest-royal-bride.png"
          alt="Imperial Kundan Heritage Model"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center filter brightness-110 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent opacity-50 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Dark Ambient Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1A1815] via-[#1A1815]/85 to-[#1A1815] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold block mb-2">
            AUTHENTICITY & GUARANTEE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
            Authenticity Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-light mt-3 tracking-wide">
            Follow the golden path of certified 22K gold purity, artisanal excellence, and pricing transparency.
          </p>
        </div>

        {/* Roadmap Steps Container with Curved S-Line Overlay */}
        <div className="relative my-8">
          {/* Curved SVG Roadmap Line (Desktop: S-Curve, Mobile: Straight Center Line) */}
          <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
            {/* Desktop Curved S-Line Path */}
            <svg
              className="hidden md:block w-full h-full"
              viewBox="0 0 800 1000"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Background Muted Path */}
              <path
                d="M 400 30 C 650 180, 650 320, 400 470 C 150 620, 150 760, 400 970"
                stroke="rgba(212, 175, 55, 0.15)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Animated Glowing Gold Path */}
              <path
                ref={svgPathRef}
                d="M 400 30 C 650 180, 650 320, 400 470 C 150 620, 150 760, 400 970"
                stroke="url(#goldGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px rgba(212,175,55,0.6))"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#FFE58F" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
            </svg>

            {/* Mobile Vertical Center Line */}
            <div className="md:hidden absolute left-4 top-4 bottom-4 w-[2px] bg-[#D4AF37]/20" />
          </div>

          {/* 4 Minimalist Roadmap Points */}
          <div className="space-y-10 sm:space-y-16 relative z-10">
            {ROADMAP_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0
              const isActive = activeStep === idx

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    pointsRef.current[idx] = el
                  }}
                  className={`flex flex-col md:flex-row items-center gap-6 sm:gap-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Minimalist Point Container (No Box Background, Pure Editorial Typography) */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0">
                    <div className="border-l border-[#D4AF37]/50 pl-5 sm:pl-6 py-1 transition-all duration-500">
                      {/* Step Header */}
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span
                          className={`text-xs font-mono font-semibold tracking-widest transition-colors ${
                            isActive ? 'text-[#FFE58F]' : 'text-[#D4AF37]'
                          }`}
                        >
                          {step.level}.
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">
                          {step.label}
                        </span>
                      </div>

                      <h3
                        className={`font-serif text-xl sm:text-2xl font-light leading-snug mb-2 transition-colors ${
                          isActive ? 'text-white' : 'text-white/90'
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Bullet Point on the Curved Path */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div
                      ref={(el) => {
                        nodeDotsRef.current[idx] = el
                      }}
                      className="w-6 h-6 rounded-full border-2 border-[#D4AF37] bg-[#1A1815] flex items-center justify-center transition-all duration-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFE58F]" />
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop Alternate Layout */}
                  <div className="hidden md:block w-1/2" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
