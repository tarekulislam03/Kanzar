'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AppointmentModal from './AppointmentModal'
import { ArrowRight, Play, Crown, Gem, KeyRound, Phone } from 'lucide-react'

export default function HeroSection() {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)

  return (
    <>
      <section className="relative w-full min-h-screen bg-[#F5F0E6] border-b border-[#DEDAD2] overflow-hidden flex flex-col justify-between">

        {/* Right-aligned HD Bridal Image, seamlessly merged with 40/60 gradient split */}
        <div className="absolute -top-12 right-0 w-full lg:w-[60%] h-full z-0 overflow-hidden pointer-events-none opacity-80 sm:opacity-90 lg:opacity-100 transition-opacity duration-500">
          <div
            className="relative w-full h-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 60%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 60%)',
            }}
          >
            <Image
              src="/images/bridal-polki-set.png"
              alt="Heritage Royal Polki Bridal Set"
              fill
              priority
              quality={100}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center lg:object-[75%_50%] transition-all duration-700 ease-out"
            />
          </div>
        </div>

        {/* Ambient Left Edge Color Blend Overlay (40% width) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E6] via-[#F5F0E6]/80 to-transparent z-10 w-full lg:w-[40%] h-full pointer-events-none" />

        {/* Main Content Area */}
        <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-10 lg:px-12 relative z-20 pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left py-2">
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#9C7A45] font-semibold">
                  First Time in Kolkata
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1A17] font-light leading-[1.1] sm:leading-[1.12] tracking-tight">
                Welcome to <br />
                <span className="italic font-normal text-[#9C7A45]">Kanzar</span> Jewels
              </h1>

              {/* Subheadline */}
              <p className="text-xs sm:text-base text-[#1C1A17]/95 sm:text-[#1C1A17]/85 font-medium sm:font-light leading-relaxed max-w-xs sm:max-w-sm lg:max-w-md">
                Specialising in fully hallmarked gold jewellery — crafted with trust, priced with transparency.
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-row items-center justify-start gap-2 sm:gap-6 w-full sm:w-auto">
                <a
                  href="tel:+919875338183"
                  className="px-3.5 sm:px-7 py-2.5 sm:py-3.5 bg-[#1C1A17] text-[#FAF8F3] hover:bg-[#9C7A45] active:bg-[#9C7A45] text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-colors duration-300 flex items-center justify-center gap-1.5 sm:gap-3 group shadow-md cursor-pointer rounded-none text-center whitespace-nowrap shrink-0"
                >
                  <span>Call Us Now</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FAF8F3] group-hover:translate-x-1 transition-transform shrink-0" />
                </a>

                <Link
                  href="/catalog"
                  className="px-2.5 sm:px-5 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] sm:tracking-[0.15em] text-[#1C1A17] hover:text-[#9C7A45] active:opacity-75 transition-colors flex items-center justify-center gap-1.5 sm:gap-2.5 group cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#1C1A17]/30 flex items-center justify-center bg-[#F5F0E6]/80 backdrop-blur-sm group-hover:border-[#9C7A45] group-hover:bg-[#9C7A45]/10 transition-colors shrink-0">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1C1A17] group-hover:text-[#9C7A45] fill-current translate-x-0.5" />
                  </span>
                  <span>Explore Catalog</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Single-Line Infinite Marquee Strip — Glassmorphism */}
        <div className="relative z-20 bg-[#F5F0E6]/80 backdrop-blur-md border-t border-[#DEDAD2]/60 py-3.5 overflow-hidden">
          <div className="animate-marquee flex items-center text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#1C1A17]/70 font-light select-none">
            {/* First copy */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
              <span>Certified 22K Gold</span>
              <span className="text-[#9C7A45]">·</span>
              <span>5 Generations of Heritage</span>
              <span className="text-[#9C7A45]">·</span>
              <span>Private Atelier Suites</span>
              <span className="text-[#9C7A45]">·</span>
              <span>BIS Hallmark 916</span>
              <span className="text-[#9C7A45]">·</span>
              <span>Bespoke Commissions</span>
              <span className="text-[#9C7A45]">·</span>
              <span>Handcrafted Polki & Kundan</span>
              <span className="text-[#9C7A45]">·</span>
            </div>
            {/* Duplicate copy for seamless infinite loop */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
              <span>Certified 22K Gold</span>
              <span className="text-[#9C7A45]">·</span>
              <span>5 Generations of Heritage</span>
              <span className="text-[#9C7A45]">·</span>
              <span>Private Atelier Suites</span>
              <span className="text-[#9C7A45]">·</span>
              <span>BIS Hallmark 916</span>
              <span className="text-[#9C7A45]">·</span>
              <span>Bespoke Commissions</span>
              <span className="text-[#9C7A45]">·</span>
              <span>Handcrafted Polki & Kundan</span>
              <span className="text-[#9C7A45]">·</span>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </>
  )
}
