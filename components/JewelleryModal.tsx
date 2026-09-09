'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll and trigger smooth enter animation frame
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
      const timer = requestAnimationFrame(() => setIsVisible(true))
      return () => cancelAnimationFrame(timer)
    } else {
      document.body.style.overflow = ''
      setIsVisible(false)
      setIsClosing(false)
    }
  }, [item])

  const handleAnimatedClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
      setIsVisible(false)
    }, 600)
  }

  if (!item || !mounted) return null

  const imageList = item.images && item.images.length > 0 ? item.images : ['/images/catalog-1.png']
  const activeImageUrl = urlFor(imageList[activeImageIndex])

  const whatsappMessage = encodeURIComponent(
    `Hello, I am inquiring about the "${item.name}" (${item.material}) from your catalog.`
  )
  const whatsappUrl = `https://wa.me/917003467398?text=${whatsappMessage}`

  const modalContent = (
    <>
      {/* Global Fixed Overlay with highest z-index */}
      <div
        className={`fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/75 backdrop-blur-md transition-opacity duration-600 ease-out ${
          isVisible && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop click dismiss */}
        <div className="absolute inset-0 z-0" onClick={handleAnimatedClose} />

        {/* Single Viewport Modal Container - No Scrollbar Required */}
        <div
          className={`relative z-10 w-full max-w-3xl max-h-[92dvh] sm:max-h-[85vh] bg-[#FAF8F3] border-t sm:border border-[#DEDAD2] rounded-t-2xl sm:rounded-none shadow-2xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-[#1C1A17] flex flex-col transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] transform ${
            isVisible && !isClosing
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-full sm:translate-y-24 scale-[0.97]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3.5 bg-[#FAF8F3] border-b border-[#DEDAD2] shrink-0">
            <div className="flex items-center gap-2">
              <HallmarkSeal size={16} />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
                Kanzar Piece Details
              </span>
            </div>
            <button
              onClick={handleAnimatedClose}
              className="p-1 text-[#1C1A17]/70 hover:text-[#1C1A17] hover:bg-[#EAE6DD] transition-colors cursor-pointer rounded-full"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 p-3.5 sm:p-6 gap-3 sm:gap-6 flex-1 overflow-hidden">
            {/* Left Image View */}
            <div className="flex flex-col justify-center items-center">
              <div className="relative aspect-square max-h-[32vh] sm:max-h-none w-full bg-[#F3F1ED] overflow-hidden">
                <Image
                  src={activeImageUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              {imageList.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-2 overflow-x-auto pb-0.5 w-full shrink-0">
                  {imageList.map((img, idx) => {
                    const src = urlFor(img)
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-9 h-9 sm:w-12 sm:h-12 border transition-all shrink-0 cursor-pointer ${
                          activeImageIndex === idx ? 'border-[#9C7A45] ring-1 ring-[#9C7A45]' : 'border-[#DEDAD2] opacity-60'
                        }`}
                      >
                        <Image src={src} alt={`${item.name} thumb ${idx}`} fill sizes="48px" className="object-cover" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Right Details */}
            <div className="flex flex-col justify-between space-y-2 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-3">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1A17] leading-snug">
                  {item.name}
                </h2>

                <div className="text-xs sm:text-xs text-[#9C7A45] uppercase tracking-wider font-medium">
                  Material: <span className="text-[#1C1A17]">{item.material}</span>
                </div>

                <div className="border-t border-[#DEDAD2] pt-1.5 sm:pt-3">
                  <p className="text-xs sm:text-xs text-[#1C1A17]/80 leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
                    {item.shortDescription}
                  </p>
                </div>

                {/* Compact Badges */}
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider bg-[#EAE6DD]/70 text-[#1C1A17]/80 px-2 py-0.5 border border-[#DEDAD2]/80 font-medium">
                    BIS 916 Hallmarked
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider bg-[#EAE6DD]/70 text-[#1C1A17]/80 px-2 py-0.5 border border-[#DEDAD2]/80 font-medium">
                    Natural Gemstones
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider bg-[#EAE6DD]/70 text-[#1C1A17]/80 px-2 py-0.5 border border-[#DEDAD2]/80 font-medium">
                    Bespoke Fitting
                  </span>
                </div>
              </div>

              {/* Compact Action Buttons */}
              <div className="pt-2 sm:pt-4 border-t border-[#DEDAD2] flex flex-row items-center gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 py-2.5 sm:py-3 px-2 border border-[#1C1A17] bg-transparent text-[#1C1A17] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.1em] transition-colors flex items-center justify-center gap-1 text-center hover:border-[#9C7A45] hover:text-[#9C7A45] cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#9C7A45] shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsAppointmentOpen(true)}
                  className="w-1/2 py-2.5 sm:py-3 px-2 bg-[#1C1A17] text-[#FAF8F3] hover:bg-[#9C7A45] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.1em] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#9C7A45] shrink-0" />
                  <span className="truncate">Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal isOpen={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
    </>
  )

  return createPortal(modalContent, document.body)
}
