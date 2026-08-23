'use client'

import React from 'react'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { JewelleryItem, urlFor } from '../lib/sanity'

interface JewelleryCardProps {
  item: JewelleryItem
  onSelect: (item: JewelleryItem) => void
  isSingleOxbloodTag?: boolean
}

export default function JewelleryCard({ item, onSelect, isSingleOxbloodTag = false }: JewelleryCardProps) {
  const imageUrl = item.images && item.images.length > 0 ? urlFor(item.images[0]) : '/images/hero-bridal.png'

  const whatsappMessage = encodeURIComponent(
    `Hello Musaddik Jewellery, I am inquiring about the "${item.name}" (${item.material}) from your catalog.`
  )
  const whatsappUrl = `https://wa.me/918025589000?text=${whatsappMessage}`

  return (
    <div
      onClick={() => onSelect(item)}
      className="group bg-[#FAF8F3] border border-[#DEDAD2] p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#9C7A45] cursor-pointer select-none active:bg-[#EAE6DD]/30"
    >
      {/* Image Container with Porcelain Background */}
      <div className="relative aspect-square w-full bg-[#EAE6DD] overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Optional single oxblood bridal tag as permitted in PROMPTS.md */}
        {isSingleOxbloodTag && item.category === 'bridal sets' ? (
          <div className="absolute top-3 left-3 bg-[#5E1A1F] text-[#FAF8F3] px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-medium">
            BRIDAL COLLECTION
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-[#FAF8F3]/90 text-[#9C7A45] border border-[#DEDAD2] px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-medium">
            {item.category}
          </div>
        )}
      </div>

      {/* Item Information */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="block text-[10px] uppercase tracking-[0.15em] text-[#9C7A45] font-medium mb-1">
            {item.material}
          </span>

          <h3 className="font-serif text-lg font-normal text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors leading-snug">
            {item.name}
          </h3>

          <p className="mt-1.5 text-xs text-[#1C1A17]/70 line-clamp-2 font-light leading-relaxed">
            {item.shortDescription}
          </p>
        </div>

        {/* Action: Enquire on WhatsApp & View Details */}
        <div className="pt-3 border-t border-[#DEDAD2] flex items-center justify-between">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs uppercase tracking-[0.15em] text-[#1C1A17] hover:text-[#9C7A45] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#9C7A45]" />
            <span>WhatsApp Enquire</span>
          </a>

          <span className="text-[10px] uppercase tracking-wider text-[#9C7A45] font-medium">
            Details →
          </span>
        </div>
      </div>
    </div>
  )
}
