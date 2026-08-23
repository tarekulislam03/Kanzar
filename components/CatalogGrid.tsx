'use client'

import React, { useState } from 'react'
import JewelleryCard from './JewelleryCard'
import JewelleryModal from './JewelleryModal'
import CategoryFilter from './CategoryFilter'
import { JewelleryItem } from '../lib/sanity'

interface CatalogGridProps {
  initialItems: JewelleryItem[]
  showCategoryFilter?: boolean
  maxItems?: number
}

export default function CatalogGrid({
  initialItems,
  showCategoryFilter = true,
  maxItems = 6, // 3x2 grid layout (3 columns x 2 rows = 6 items)
}: CatalogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeItem, setActiveItem] = useState<JewelleryItem | null>(null)

  const filteredItems =
    selectedCategory === 'all'
      ? initialItems
      : initialItems.filter((item) => item.category === selectedCategory)

  // Strictly enforce 3x2 grid (6 items) when maxItems is specified
  const displayedItems = maxItems ? filteredItems.slice(0, maxItems) : filteredItems

  // Find index of first bridal item to apply the single oxblood tag allowed by PROMPTS.md rules
  const firstBridalIndex = displayedItems.findIndex((item) => item.category === 'bridal sets')

  return (
    <div className="w-full">
      {showCategoryFilter && (
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {displayedItems.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF8F3] border border-[#DEDAD2]">
          <p className="text-[#1C1A17]/60 text-sm font-light">No pieces found in this category.</p>
        </div>
      ) : (
        /* Generous 48px (gap-12) grid gutters as required by PROMPTS.md, 3 columns x 2 rows (3x2) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayedItems.map((item, idx) => (
            <JewelleryCard
              key={item._id}
              item={item}
              onSelect={(selected) => setActiveItem(selected)}
              isSingleOxbloodTag={idx === firstBridalIndex}
            />
          ))}
        </div>
      )}

      {/* Quick View Detail Modal */}
      <JewelleryModal item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  )
}
