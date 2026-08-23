'use client'

import React from 'react'

interface CategoryFilterProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const categories = [
    { label: 'All Pieces', value: 'all' },
    { label: 'Necklace Sets', value: 'necklace' },
    { label: 'Bangles & Kada', value: 'bangles' },
    { label: 'Earrings', value: 'earrings' },
    { label: 'Rings', value: 'rings' },
    { label: 'Bridal Sets', value: 'bridal sets' },
  ]

  return (
    <div className="w-full my-8 sm:my-10 border-b border-[#DEDAD2] pb-4">
      <div className="flex items-center overflow-x-auto whitespace-nowrap gap-5 sm:gap-8 justify-start sm:justify-center px-2 sm:px-0 scrollbar-none touch-pan-x">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onSelectCategory(cat.value)}
              className={`text-xs uppercase tracking-[0.15em] transition-all pb-2 shrink-0 cursor-pointer active:scale-95 ${
                isSelected
                  ? 'text-[#1C1A17] font-semibold border-b-2 border-[#9C7A45]'
                  : 'text-[#1C1A17]/60 hover:text-[#9C7A45]'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
