'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, Calendar, Eye } from 'lucide-react'
import { JewelleryItem, urlFor } from '../lib/sanity'
import AppointmentModal from './AppointmentModal'

interface JewelleryRowProps {
  item: JewelleryItem
  index: number
  onSelect: (item: JewelleryItem) => void
}

export default function JewelleryRow({ item, index, onSelect }: JewelleryRowProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)

  const isEven = index % 2 === 0
  const imageList = item.images && item.images.length > 0 ? item.images : ['/images/catalog-1.png']
  const activeImageUrl = urlFor(imageList[activeImageIndex])

  const whatsappMessage = encodeURIComponent(
    `Hello Kanzar Jewels, I would like to enquire about "${item.name}" (${item.material || '22K Gold'}).`
  )
  const whatsappUrl = `https://wa.me/917003467398?text=${whatsappMessage}`

  return (
    <div className="py-10 md:py-16 border-b border-[#DEDAD2] last:border-b-0">
      <div
        className={`flex flex-col ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        } items-center gap-8 lg:gap-14 max-w-6xl mx-auto`}
      >
        {/* Left / Right Big Product Image Container */}
        <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col items-center">
          <div
            onClick={() => onSelect(item)}
            className="group relative aspect-[4/5] w-full bg-[#F3F1ED] border border-[#DEDAD2] overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-500"
          >
            <Image
              src={activeImageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Studio Light Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFE58F]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-overlay" />

            {/* Quick View Hover Tag */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1C1A17]/90 text-white px-4 py-2 text-xs uppercase tracking-widest font-medium flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#9C7A45]" />
              <span>Quick View</span>
            </div>
          </div>

          {/* Optional Image Thumbnails */}
          {imageList.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-3 overflow-x-auto w-full">
              {imageList.map((img, idx) => {
                const src = urlFor(img)
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 border transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#9C6B68] ring-1 ring-[#9C6B68]' : 'border-[#DEDAD2] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={src} alt={`${item.name} thumb ${idx}`} fill sizes="48px" className="object-cover" />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Opposite Side Product Description & Details Container */}
        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center space-y-4 md:space-y-5 text-left px-2 sm:px-4">
          <div className="space-y-2">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-[#9C6B68] font-semibold">
              100% HALLMARKED • {item.category}
            </span>

            <h2
              onClick={() => onSelect(item)}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1A17] hover:text-[#9C6B68] transition-colors cursor-pointer leading-tight"
            >
              {item.name}
            </h2>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="bg-[#9C6B68]/15 text-[#9C6B68] border border-[#9C6B68]/30 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                {item.karat || '22K Gold'}
              </span>
              <span className="text-xs sm:text-sm text-[#1C1A17]/80 font-medium">
                {item.material}
              </span>
            </div>
          </div>

          <div className="border-t border-[#DEDAD2] pt-4">
            <p className="text-sm sm:text-base text-[#1C1A17]/80 font-light leading-relaxed">
              {item.shortDescription ||
                'Handcrafted by master goldsmiths in Kolkata using 100% BIS hallmarked 22 karat gold. Every angle reflects pure Indian heritage craftsmanship and luxury finish.'}
            </p>
          </div>

          {/* Quality Assurance Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] uppercase tracking-wider bg-[#EAE6DD]/70 text-[#1C1A17]/80 px-2.5 py-1 border border-[#DEDAD2] font-medium">
              BIS 916 Certified
            </span>
            <span className="text-[10px] uppercase tracking-wider bg-[#EAE6DD]/70 text-[#1C1A17]/80 px-2.5 py-1 border border-[#DEDAD2] font-medium">
              Authentic Gemstones
            </span>
            <span className="text-[10px] uppercase tracking-wider bg-[#EAE6DD]/70 text-[#1C1A17]/80 px-2.5 py-1 border border-[#DEDAD2] font-medium">
              Bespoke Fitting
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#9C6B68] text-white border border-[#9C6B68] text-xs font-medium uppercase tracking-[0.18em] hover:bg-[#C99A94] hover:border-[#C99A94] transition-all duration-300 flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Instant WhatsApp Enquiry</span>
            </a>

            <button
              type="button"
              onClick={() => setIsAppointmentOpen(true)}
              className="px-6 py-3.5 bg-transparent text-[#1C1A17] border border-[#1C1A17] text-xs font-medium uppercase tracking-[0.18em] hover:bg-[#1C1A17] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#9C6B68]" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      <AppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </div>
  )
}
