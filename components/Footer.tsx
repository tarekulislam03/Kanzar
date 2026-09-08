'use client'

import React from 'react'
import Link from 'next/link'
import HallmarkSeal from './HallmarkSeal'

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F3] text-[#1C1A17] border-t border-[#DEDAD2] pt-12 pb-8 px-6 sm:px-10 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-10 border-b border-[#DEDAD2]">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <HallmarkSeal size={32} />
              <span className="font-serif text-xl font-normal tracking-[0.18em] text-[#1C1A17]">
                KANZAR
              </span>
            </Link>
            <p className="text-xs text-[#1C1A17]/70 leading-relaxed font-light">
              Specialising in 100% hallmarked gold jewellery — trusted quality, honest pricing.
            </p>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-3">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C6B68] font-semibold">
              COLLECTIONS
            </span>
            <ul className="space-y-2 text-xs text-[#1C1A17]/70 font-light">
              <li>
                <Link href="/catalog" className="hover:text-[#9C6B68] transition-colors">
                  Necklace Sets
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#9C6B68] transition-colors">
                  Bangles & Kada
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#9C6B68] transition-colors">
                  Earrings & Jhumkas
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#9C6B68] transition-colors">
                  Rings & Bands
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#9C6B68] transition-colors">
                  Bridal Ensembles
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & CMS */}
          <div className="space-y-3">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C6B68] font-semibold">
              ATELIER & CMS
            </span>
            <ul className="space-y-2 text-xs text-[#1C1A17]/70 font-light">
              <li>
                <Link href="/" className="hover:text-[#9C6B68] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#9C6B68] transition-colors">
                  Atelier Journal
                </Link>
              </li>
              <li>
                <Link href="/visit-us" className="hover:text-[#9C6B68] transition-colors">
                  Visit Store
                </Link>
              </li>
              <li>
                <Link
                  href="/studio"
                  target="_blank"
                  className="text-[#9C6B68] hover:underline"
                >
                  Sanity Studio CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Location */}
          <div className="space-y-3">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C6B68] font-semibold">
              ADDRESS
            </span>
            <div className="text-xs text-[#1C1A17]/70 leading-relaxed font-light space-y-1">
              <div>P-4B, CIT Road, Paddapukur, Entally, Near Birshul Hat</div>
              <div>Kolkata, West Bengal – 700014</div>
              <div>Mon – Sat: 9:00 AM – 9:00 PM</div>
              <div className="pt-2 text-[#1C1A17] font-medium">033-4535-6632 / 9875338183</div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Hallmark Stamp Motif Repeated Small */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1C1A17]/60 gap-4">
          <div className="flex items-center gap-2">
            <HallmarkSeal size={20} />
            <span>© {new Date().getFullYear()} Kanzar Jewels. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% HALLMARKED</span>
            <span>TRUSTED QUALITY</span>
            <span>BEST WHOLESALE PRICES</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
