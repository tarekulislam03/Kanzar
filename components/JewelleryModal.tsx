'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, MessageCircle, Calendar } from 'lucide-react'
import { JewelleryItem, urlFor } from '../lib/sanity'
import HallmarkSeal from './HallmarkSeal'
import AppointmentModal from './AppointmentModal'

interface JewelleryModalProps {
  item: JewelleryItem | null
  onClose: () => void
}

export default function JewelleryModal({ item, onClose }: JewelleryModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)

  // Lock body scroll when modal is active
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [item])

  if (!item) return null

  const imageList = item.images && item.images.length > 0 ? item.images : ['/images/hero-bridal.png']
  const activeImageUrl = urlFor(imageList[activeImageIndex])

  const whatsappMessage = encodeURIComponent(
    `Hello Musaddik Jewellery, I am inquiring about the "${item.name}" (${item.material}) from your catalog.`
  )
  const whatsappUrl = `https://wa.me/918025589000?text=${whatsappMessage}`

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
        <div className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] bg-[#FAF8F3] border border-[#DEDAD2] shadow-2xl overflow-y-auto my-auto text-[#1C1A17]">
          {/* Close button - absolute top right position without overlapping text */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-2 text-[#1C1A17]/70 hover:text-[#1C1A17] bg-[#FAF8F3]/90 hover:bg-[#EAE6DD] border border-[#DEDAD2] transition-colors cursor-pointer rounded-full sm:rounded-none shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image View */}
            <div className="bg-[#EAE6DD] p-4 sm:p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-[#DEDAD2]">
              <div className="relative aspect-square w-full bg-[#FAF8F3] border border-[#DEDAD2] overflow-hidden">
                <Image
                  src={activeImageUrl}
                  alt={item.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {imageList.length > 1 && (
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 overflow-x-auto pb-1">
                  {imageList.map((img, idx) => {
                    const src = urlFor(img)
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-10 h-10 sm:w-12 sm:h-12 border transition-all shrink-0 cursor-pointer ${
                          activeImageIndex === idx ? 'border-[#9C7A45] ring-1 ring-[#9C7A45]' : 'border-[#DEDAD2] opacity-60'
                        }`}
                      >
                        <Image src={src} alt={`${item.name} thumb ${idx}`} fill className="object-cover" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Right Information Details */}
            <div className="p-4 sm:p-6 pr-10 sm:pr-12 flex flex-col justify-between space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <HallmarkSeal size={18} />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
                    22K BIS HALLMARKED PURE GOLD
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1A17] leading-snug">
                  {item.name}
                </h2>

                <div className="text-xs text-[#9C7A45] uppercase tracking-wider font-medium">
                  Material: <span className="text-[#1C1A17]">{item.material}</span>
                </div>

                <div className="border-t border-[#DEDAD2] pt-2">
                  <p className="text-xs text-[#1C1A17]/80 leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
                    {item.shortDescription}
                  </p>
                </div>

                {/* Compact Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[9px] uppercase tracking-wider bg-[#EAE6DD]/70 text-[#1C1A17]/80 px-2 py-0.5 border border-[#DEDAD2]/80 font-medium">
                    BIS 916 Hallmarked
                  </span>
                  <span className="text-[9px] uppercase tracking-wider bg-[#EAE6DD]/70 text-[#1C1A17]/80 px-2 py-0.5 border border-[#DEDAD2]/80 font-medium">
                    Natural Gemstones
                  </span>
                  <span className="text-[9px] uppercase tracking-wider bg-[#EAE6DD]/70 text-[#1C1A17]/80 px-2 py-0.5 border border-[#DEDAD2]/80 font-medium">
                    Bespoke Fitting
                  </span>
                </div>
              </div>

              {/* Action Buttons visible in full view */}
              <div className="pt-3 border-t border-[#DEDAD2] flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 py-2.5 px-3 border border-[#1C1A17] bg-transparent text-[#1C1A17] text-[11px] font-medium uppercase tracking-[0.12em] transition-colors flex items-center justify-center gap-1.5 text-center hover:border-[#9C7A45] hover:text-[#9C7A45] cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#9C7A45]" />
                  <span>WhatsApp Enquire</span>
                </a>

                <button
                  onClick={() => setIsAppointmentOpen(true)}
                  className="w-full sm:w-1/2 py-2.5 px-3 bg-[#1C1A17] text-[#FAF8F3] hover:bg-[#9C7A45] text-[11px] font-medium uppercase tracking-[0.12em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#9C7A45]" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </>
  )
}
