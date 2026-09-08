'use client'

import React from 'react'
import Link from 'next/link'
import CatalogGrid from './CatalogGrid'
import { JewelleryItem } from '../lib/sanity'

interface FeaturedCollectionProps {
  items: JewelleryItem[]
}

export default function FeaturedCollection({ items }: FeaturedCollectionProps) {
  return (
    <section id="collections" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3] border-b border-[#DEDAD2]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Centered Louis Vuitton Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#6E6259]/60 font-medium block mb-2">
            Our Collections
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#2A2422] tracking-tight">
            Pick You Perfect Match
          </h2>
        </div>

        {/* 4-Column Minimalist Grid */}
        <div className="w-full mb-12 sm:mb-16">
          <CatalogGrid initialItems={items} showCategoryFilter={false} maxItems={4} />
        </div>

        {/* Centered Minimalist Rectangular Button CTA */}
        <div>
          <Link
            href="/catalog"
            className="inline-block border border-[#9C6B68] text-[#9C6B68] rounded-none px-8 sm:px-10 py-3.5 sm:py-4 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#C99A94] hover:text-white transition-all duration-300"
          >
            Discover the Collection
          </Link>
        </div>

      </div>
    </section>
  )
}
