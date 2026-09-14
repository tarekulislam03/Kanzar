'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { JewelleryItem, urlFor } from '../lib/sanity'
import { shareProductToWhatsApp } from '../lib/whatsappShare'
import WhatsAppIcon from './WhatsAppIcon'

interface JewelleryModalProps {
  item: JewelleryItem | null
  onClose: () => void
}

export default function JewelleryModal({ item, onClose }: JewelleryModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const initialDistanceRef = useRef<number | null>(null)
  const initialScaleRef = useRef<number>(1)
  const lastTapRef = useRef<number>(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset zoom & active image when modal opens or item changes
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
      setActiveImageIndex(0)
      setScale(1)
      setPosition({ x: 0, y: 0 })
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      document.body.style.overflow = ''
      setIsVisible(false)
    }
  }, [item])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }, 200)
  }, [onClose])

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose])

  if (!item || !mounted) return null

  const imageList = item.images && item.images.length > 0 ? item.images : ['/images/catalog-1.png']
  const activeImageUrl = urlFor(imageList[activeImageIndex])

  // Zoom helpers
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1)
      if (next === 1) setPosition({ x: 0, y: 0 })
      return next
    })
  }

  const handleResetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.25, 4))
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.25, 1)
        if (next === 1) setPosition({ x: 0, y: 0 })
        return next
      })
    }
  }

  // Double tap / double click to toggle 2.5x zoom
  const handleDoubleTap = () => {
    if (scale > 1) {
      handleResetZoom()
    } else {
      setScale(2.5)
    }
  }

  // Touch handlers for Pinch-to-Zoom & Dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch gesture start
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      initialDistanceRef.current = dist
      initialScaleRef.current = scale
    } else if (e.touches.length === 1) {
      // Check for double tap
      const now = Date.now()
      if (now - lastTapRef.current < 300) {
        handleDoubleTap()
      }
      lastTapRef.current = now

      // Pan gesture start
      if (scale > 1) {
        setIsDragging(true)
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        })
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistanceRef.current !== null) {
      // Pinch zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const factor = dist / initialDistanceRef.current
      const newScale = Math.min(Math.max(initialScaleRef.current * factor, 1), 4)
      setScale(newScale)
      if (newScale === 1) setPosition({ x: 0, y: 0 })
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Pan image
      const newX = e.touches[0].clientX - dragStart.x
      const newY = e.touches[0].clientY - dragStart.y
      setPosition({ x: newX, y: newY })
    }
  }

  const handleTouchEnd = () => {
    initialDistanceRef.current = null
    setIsDragging(false)
  }

  // Mouse Dragging (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Kanzar Jewels, I am interested in enquiring about "${item.name}" (${item.material || '22K Gold'}).`
  )
  const whatsappUrl = `https://wa.me/919875338183?text=${whatsappMessage}`

  const modalContent = (
    <div
      className={`fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col justify-between transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Top Control Bar */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        {/* Title / Caption */}
        <div className="flex flex-col">
          <h3 className="text-white text-sm sm:text-base font-medium truncate max-w-[180px] sm:max-w-md">
            {item.name}
          </h3>
          <span className="text-[#D4AF37] text-[10px] sm:text-xs font-light">
            {item.material || '22K Gold'} • Pinch or double-tap to zoom
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* WhatsApp Button */}
          <button
            type="button"
            onClick={() => shareProductToWhatsApp(item, activeImageUrl)}
            className="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#20ba5a] hover:scale-105 transition-all cursor-pointer shadow-md"
            title="Enquire on WhatsApp"
            aria-label="Enquire on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-2 text-white/90 hover:text-white bg-white/20 hover:bg-white/30 rounded-full transition-all cursor-pointer"
            title="Close"
            aria-label="Close image viewer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Canvas Container */}
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden touch-none select-none cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleTap}
      >
        {/* Next / Prev Image Arrows if multiple images exist */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={() => {
                setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1))
                handleResetZoom()
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => {
                setActiveImageIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0))
                handleResetZoom()
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Zoomable Image Wrapper */}
        <div
          className="relative w-full h-full max-w-[95vw] max-h-[80vh] flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <Image
            src={activeImageUrl}
            alt={item.name}
            fill
            sizes="100vw"
            priority
            className="object-contain pointer-events-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* Bottom Thumbnail Strip (if multiple images) */}
      <div className="relative z-20 px-4 py-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center gap-2">
        {imageList.length > 1 ? (
          imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveImageIndex(idx)
                handleResetZoom()
              }}
              className={`relative w-12 h-12 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageIndex === idx ? 'border-[#D4AF37] scale-110' : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={urlFor(img)} alt={`Thumbnail ${idx}`} fill sizes="48px" className="object-cover" />
            </button>
          ))
        ) : (
          <span className="text-white/60 text-xs tracking-wider uppercase font-light">
            Use 2 fingers to pinch-zoom or drag to inspect craftsmanship
          </span>
        )}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
