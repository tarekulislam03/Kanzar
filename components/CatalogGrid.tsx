'use client'

import React, { useState } from 'react'
import JewelleryCard from './JewelleryCard'
import JewelleryRow from './JewelleryRow'
import JewelleryModal from './JewelleryModal'
import CategoryFilter from './CategoryFilter'
import RevealOnScroll from './RevealOnScroll'
import { JewelleryItem } from '../lib/sanity'

interface CatalogGridProps {
  initialItems: JewelleryItem[]
  showCategoryFilter?: boolean
  maxItems?: number
  layoutStyle?: 'grid' | 'alternate'
}

export default function CatalogGrid({
  initialItems,
  showCategoryFilter = false,
  maxItems,
  layoutStyle = 'grid',
}: CatalogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeItem, setActiveItem] = useState<JewelleryItem | null>(null)

  const limit = maxItems

  const filteredItems =
    selectedCategory === 'all'
      ? initialItems
      : initialItems.filter((item) => item.category === selectedCategory)

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems

  return (
    <div className="w-full">
      {showCategoryFilter && (
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {displayedItems.length === 0 ? (
        <div className="text-center py-20 bg-[#F3F1ED] border border-[#DEDAD2]">
          <p className="text-[#1C1A17]/60 text-sm font-light">No pieces found in this category.</p>
        </div>
      ) : layoutStyle === 'alternate' ? (
        /* Alternating High-Fashion Layout */
        <div className="flex flex-col space-y-4">
          {displayedItems.map((item, idx) => (
            <RevealOnScroll key={item._id} direction={idx % 2 === 0 ? 'left' : 'right'} delay={100} duration={700}>
              <JewelleryRow
                item={item}
                index={idx}
                onSelect={(selected) => setActiveItem(selected)}
              />
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        /* 4-Column Minimalist Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6">
          {displayedItems.map((item, idx) => (
            <RevealOnScroll key={item._id} direction="up" delay={idx * 100} duration={700}>
              <JewelleryCard
                item={item}
                onSelect={(selected) => setActiveItem(selected)}
              />
            </RevealOnScroll>
          ))}
        </div>
      )}

      {/* Quick View Detail Modal */}
      <JewelleryModal item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  )
}
