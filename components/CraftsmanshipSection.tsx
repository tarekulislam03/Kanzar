'use client'

import React from 'react'
import Image from 'next/image'

export default function CraftsmanshipSection() {
  const trustFacts = [
    {
      label: 'Purity',
      title: '100% Hallmarked',
      desc: 'Every piece is certified under the official BIS hallmark, guaranteeing genuine gold purity in every purchase.',
    },
    {
      label: 'Craftsmanship',
      title: 'Trusted Quality',
      desc: 'Crafted with meticulous attention to detail, using only certified materials and time-honoured techniques.',
    },
    {
      label: 'Pricing',
      title: 'Best Wholesale Prices',
      desc: 'Transparent, flat making charges and honest pricing — no hidden markups, ever.',
    },
    {
      label: 'Design',
      title: 'Handcrafted Excellence',
      desc: 'Each design reflects skilled craftsmanship, blending traditional techniques with refined, wearable finishes.',
    },
  ]

  return (
    <section id="heritage" className="relative py-28 px-6 sm:px-10 lg:px-12 bg-[#1A1815] text-white border-b border-[#2D2A26] overflow-hidden">
      {/* Background Imperial Kundan Heritage Necklace Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.20] pointer-events-none">
        <Image
          src="/images/necklace-kundan-set.png"
          alt="Imperial Kundan Heritage Necklace"
          fill
          quality={90}
          className="object-cover object-center filter brightness-110 contrast-125"
        />
      </div>

      {/* Dark Ambient Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1A1815] via-[#1A1815]/70 to-[#1A1815] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#2D2A26]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                AUTHENTICITY & GUARANTEE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
              Authenticity You Can Trust
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFacts.map((fact, idx) => (
            <div key={idx} className="border-l border-[#D4AF37] pl-6 py-2 space-y-2 bg-[#1A1815]/40 backdrop-blur-[2px]">
              <span className="block text-[10px] uppercase tracking-[0.15em] text-[#D4AF37] font-semibold">
                {fact.label}
              </span>
              <h3 className="font-serif text-lg font-normal text-white">
                {fact.title}
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {fact.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
