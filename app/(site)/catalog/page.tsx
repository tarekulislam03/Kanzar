import React from 'react'
import type { Metadata } from 'next'
import CatalogGrid from '../../../components/CatalogGrid'
import HallmarkSeal from '../../../components/HallmarkSeal'
import { getJewelleryItems } from '../../../lib/sanity'

export const metadata: Metadata = {
  title: 'Jewellery Catalog | Musaddik Heritage Collections',
  description:
    'Browse our complete catalog of handcrafted 22K gold neckpieces, uncut Kundan chokers, certified Polki bridal sets, bangles, and rings.',
}

export const revalidate = 60

export default async function CatalogPage() {
  const items = await getJewelleryItems()

  return (
    <div className="min-h-screen py-24 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3]">
      <div className="max-w-6xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <HallmarkSeal size={40} />
          </div>

          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
            22K BIS HALLMARKED CATALOGUE
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1C1A17]">
            The Heritage Collections
          </h1>

          <p className="text-sm text-[#1C1A17]/70 font-light leading-relaxed">
            Select pieces in 22K pure gold, uncut Kundan, natural Polki, and hand-carved temple work. Enquire on WhatsApp or visit our Bangalore store for custom orders.
          </p>
        </div>

        {/* Catalog Grid with Category Filter */}
        <CatalogGrid initialItems={items} showCategoryFilter={true} />
      </div>
    </div>
  )
}
