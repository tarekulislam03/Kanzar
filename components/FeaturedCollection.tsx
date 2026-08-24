'use client'

import React from 'react'
import Link from 'next/link'
import CatalogGrid from './CatalogGrid'
import HallmarkSeal from './HallmarkSeal'
import { JewelleryItem } from '../lib/sanity'

interface FeaturedCollectionProps {
  items: JewelleryItem[]
}

export default function FeaturedCollection({ items }: FeaturedCollectionProps) {
  return (
    <section id="collections" className="py-28 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3] border-b border-[#DEDAD2]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#DEDAD2]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <HallmarkSeal size={28} />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9C7A45] font-medium">
                Our Collection
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1C1A17]">
              Hallmarked Gold, Every Occasion
            </h2>
          </div>
          <Link
            href="/catalog"
            className="mt-4 md:mt-0 text-xs font-medium uppercase tracking-[0.15em] text-[#1C1A17] hover:text-[#9C7A45] transition-colors"
          >
            View Complete Collection →
          </Link>
        </div>

        <CatalogGrid initialItems={items} showCategoryFilter={true} />
      </div>
    </section>
  )
}
