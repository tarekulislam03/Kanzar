'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { JewelleryItem, urlFor } from '../lib/sanity'
import { shareProductToWhatsApp } from '../lib/whatsappShare'
import WhatsAppIcon from './WhatsAppIcon'

interface JewelleryCardProps {
  item: JewelleryItem
  onSelect: (item: JewelleryItem) => void
  isSingleOxbloodTag?: boolean
}

export default function JewelleryCard({ item, onSelect }: JewelleryCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const imageUrl = item.images && item.images.length > 0 ? urlFor(item.images[0]) : '/images/catalog-1.png'

  return (
    <div
      onClick={() => onSelect(item)}
      className="group flex flex-col cursor-pointer select-none transition-all duration-500"
    >
      {/* Louis Vuitton Style Neutral Image Box with Studio Light Sheen */}
      <div className="relative aspect-[4/5] w-full bg-[#F3F1ED] overflow-hidden mb-3.5 flex items-center justify-center shadow-xs">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Studio Light Sweep Effect across gold surface on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFE58F]/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-overlay" />

        {/* Subtle Dark Vignette Border */}
        <div className="absolute inset-0 border border-black/5 pointer-events-none group-hover:border-[#9C7A45]/30 transition-colors duration-500" />

        {/* WhatsApp Quick Enquiry Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            shareProductToWhatsApp(item, imageUrl)
          }}
          title={`Enquire on WhatsApp about ${item.name}`}
          aria-label={`Enquire on WhatsApp about ${item.name}`}
          className="absolute bottom-2.5 right-2.5 z-10 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-black/20 hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Louis Vuitton Style Minimalist Left-Aligned Information */}
      <div className="flex flex-col text-left px-0.5">
        <h3 className="text-sm sm:text-sm font-normal text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors leading-snug truncate">
          {item.name}
        </h3>

        <p className="text-xs sm:text-[11px] text-[#1C1A17]/60 font-light mt-0.5 tracking-tight">
          {item.material || 'Certified 22K Gold'}
        </p>
      </div>
    </div>
  )
}

