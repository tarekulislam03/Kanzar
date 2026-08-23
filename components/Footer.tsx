'use client'

import React from 'react'
import Link from 'next/link'
import HallmarkSeal from './HallmarkSeal'

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F3] text-[#1C1A17] border-t border-[#DEDAD2] pt-20 pb-12 px-6 sm:px-10 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#DEDAD2]">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <HallmarkSeal size={32} />
              <span className="font-serif text-xl font-normal tracking-[0.18em] text-[#1C1A17]">
                MUSADDIK
              </span>
            </Link>
            <p className="text-xs text-[#1C1A17]/70 leading-relaxed font-light">
              Traditional 22K gold, Kundan, and certified Polki jewellery. Handcrafted in Bangalore since 1978.
            </p>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-3">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
              COLLECTIONS
            </span>
            <ul className="space-y-2 text-xs text-[#1C1A17]/70 font-light">
              <li>
                <Link href="/catalog" className="hover:text-[#9C7A45] transition-colors">
                  Necklace Sets
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#9C7A45] transition-colors">
                  Bangles & Kada
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#9C7A45] transition-colors">
                  Earrings & Jhumkas
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#9C7A45] transition-colors">
                  Rings & Bands
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#9C7A45] transition-colors">
                  Bridal Ensembles
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & CMS */}
          <div className="space-y-3">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
              ATELIER & CMS
            </span>
            <ul className="space-y-2 text-xs text-[#1C1A17]/70 font-light">
              <li>
                <Link href="/" className="hover:text-[#9C7A45] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#9C7A45] transition-colors">
                  Atelier Journal
                </Link>
              </li>
              <li>
                <Link href="/visit-us" className="hover:text-[#9C7A45] transition-colors">
                  Visit Store
                </Link>
              </li>
              <li>
                <Link
                  href="/studio"
                  target="_blank"
                  className="text-[#9C7A45] hover:underline"
                >
                  Sanity Studio CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Location */}
          <div className="space-y-3">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
              FLAGSHIP STORE
            </span>
            <div className="text-xs text-[#1C1A17]/70 leading-relaxed font-light space-y-1">
              <div>104 Heritage Square, Commercial Street</div>
              <div>Bangalore, Karnataka 560001</div>
              <div>Tue – Sun: 11:00 AM – 8:00 PM</div>
              <div className="pt-2 text-[#1C1A17] font-medium">+91 80 2558 9000</div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Hallmark Stamp Motif Repeated Small */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#1C1A17]/60 gap-4">
          <div className="flex items-center gap-2">
            <HallmarkSeal size={20} />
            <span>© {new Date().getFullYear()} Musaddik Jewellery. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>BIS HALLMARK 916 CERTIFIED</span>
            <span>·</span>
            <span>NO ONLINE SALES · IN-STORE ENQUIRIES ONLY</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
