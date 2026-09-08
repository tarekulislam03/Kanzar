'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HallmarkSeal from './HallmarkSeal'
import { MessageCircle } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function StoreContactMapSection() {
  const containerRef = useRef<HTMLElement | null>(null)

  const whatsappMessage = encodeURIComponent(
    'Hello Kanzar Jewels, I would like to enquire about visiting your Kolkata store.'
  )
  const whatsappUrl = `https://wa.me/917003467398?text=${whatsappMessage}`

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Scroll-driven blur to sharp text reveal across headline, contact paragraph, and WhatsApp button
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.word-span, .scroll-reveal')
        gsap.fromTo(
          elements,
          {
            opacity: 0.15,
            filter: 'blur(4px)',
            y: 12,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom 50%',
              scrub: 0.5,
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="visit"
      className="relative py-12 sm:py-24 px-5 sm:px-10 lg:px-12 bg-[#FAF6F3] border-b border-[#DEDAD2] overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Hallmark Seal Header Icon */}
        <div className="flex justify-center mb-1">
          <HallmarkSeal size={38} />
        </div>

        {/* Sub-label */}
        <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#9C6B68] font-semibold">
          OUR ATELIER & LOCATION
        </span>

        {/* Editorial Scroll-Revealing Paragraph Headline */}
        <h2 className="font-serif text-lg sm:text-2xl lg:text-3xl font-light text-[#2A2422] leading-relaxed max-w-3xl mx-auto">
          <span className="word-span inline-block">Visit Kanzar Jewels at</span>{' '}
          {/* Highlighted Location Badge */}
          <span className="word-span inline-block text-3xl sm:text-3xl lg:text-4xl px-3 sm:px-4 py-1 sm:py-1.5 my-1 bg-[#9C6B68] text-white font-normal rounded-none shadow-xs">
            <span className="block sm:inline">P-4B, CIT Road, Entally,</span>{' '}
            <span className="block sm:inline">Kolkata – 700014</span>
          </span>{' '}
          <span className="word-span inline-block">(Near Birshul Hat). Our store is open</span>{' '}
          {/* Highlighted Hours Badge */}
          <span className="word-span inline-block text-3xl sm:text-3xl lg:text-4xl px-3 sm:px-4 py-1 sm:py-1.5 my-1 bg-[#C99A94]/20 border-b-2 border-[#9C6B68] text-[#2A2422] font-medium">
            <span className="block sm:inline">Monday to Saturday,</span>{' '}
            <span className="block sm:inline">11:00 AM – 10:00 PM</span>
          </span>
          <span className="word-span inline-block">.</span>
        </h2>

        {/* Animated Paragraph Contact Line */}
        <p className="scroll-reveal text-sm sm:text-base text-[#1C1A17]/80 font-light leading-relaxed max-w-2xl mx-auto pt-1 sm:pt-2">
          For direct enquiries or bespoke bridal appointments, call us at{' '}
          <a
            href="tel:+919875338183"
            className="font-medium text-[#9C6B68] underline underline-offset-4 hover:text-[#2A2422] transition-colors"
          >
            +91 98753 38183
          </a>{' '}
          / 033-4535-6632 or write to{' '}
          <a
            href="mailto:kanzarjewels@gmail.com"
            className="font-medium text-[#9C6B68] underline underline-offset-4 hover:text-[#2A2422] transition-colors"
          >
            kanzarjewels@gmail.com
          </a>.
        </p>

        {/* Animated Instant WhatsApp Action Button Container */}
        <div className="scroll-reveal pt-3 sm:pt-4 flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 sm:gap-3 px-7 sm:px-10 py-3.5 sm:py-4 border border-[#9C6B68] bg-[#9C6B68] text-white text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#C99A94] hover:border-[#C99A94] transition-all duration-300 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Instant WhatsApp Enquiry</span>
          </a>
        </div>
      </div>
    </section>
  )
}
