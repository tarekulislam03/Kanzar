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
              <img src="/logo.png" alt="Kanzar" className="h-18 w-auto object-contain" />
            </Link>
            <p className="text-xs text-[#1C1A17]/70 leading-relaxed font-light">
              Enjoy 4.99% Flat Making Charges On 22 Karat
            </p>
          </div>

          {/* Essential Pages */}
          <div className="space-y-3">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C6B68] font-semibold">
              ESSENTIAL PAGES
            </span>
            <ul className="space-y-2 text-xs text-[#1C1A17]/70 font-light">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#9C6B68] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal-info" className="hover:text-[#9C6B68] transition-colors">
                  Legal Info
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-[#9C6B68] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#9C6B68] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links / Atelier */}
          <div className="space-y-3">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C6B68] font-semibold">
              ATELIER
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

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1C1A17]/60 gap-4">
          <div className="flex items-center gap-2">
            <HallmarkSeal size={20} />
            <span>© {new Date().getFullYear()} Kanzar Jewels. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <span>Developed By Kodane</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
