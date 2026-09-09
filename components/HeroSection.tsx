'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const HERO_SLIDES = [
  {
    image: '/images/hero-slide-pink.jpg',
    title: 'Redefining Luxury, The Modern Way',
    subtitle:
      'Where raw gold transforms into certified BIS hallmarked masterpieces under centuries of master craftsmanship.',
    ctaText: 'Explore Collection',
    ctaLink: '/catalog',
  },
  {
    image: '/images/hero-slide-pink-2.jpg',
    title: 'Timeless Heritage & Fine Artistry',
    subtitle:
      'Experience handcrafted bridal elegance and certified gold jewelry designed to shine for generations.',
    ctaText: 'View Collections',
    ctaLink: '/catalog',
  },
  {
    image: '/images/hero-slide-pink-3.jpg',
    title: 'First Time In Kolkata',
    subtitle:
      'Discover exclusive gold and diamond bridal collections crafted for life’s most cherished celebrations.',
    ctaText: 'Visit Atelier',
    ctaLink: '/#visit',
  },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Dispatch event immediately so PageLoader (if any) doesn't hang
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ;(window as any).__HERO_VIDEO_READY__ = true
      window.dispatchEvent(new Event('heroVideoReady'))
    }
  }, [])

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // GSAP ScrollTrigger Cinematic Parallax
  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        y: -40,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  const activeSlideData = HERO_SLIDES[currentSlide]

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[70vh] min-h-[520px] lg:h-[75vh] overflow-hidden select-none bg-[#111]"
    >
      {/* Background Image Carousel */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover object-right sm:object-center"
          />
        </div>
      ))}

      {/* Dark Gradient Overlays for maximum readability (matching reyalgd.com screenshot) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent w-full md:w-3/4 lg:w-2/3 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Left Circle Arrow Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/40 bg-black/20 backdrop-blur-xs text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-lg cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Right Circle Arrow Button */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/40 bg-black/20 backdrop-blur-xs text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-lg cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Bottom-Left Aligned Hero Content Container */}
      <div
        ref={textRef}
        className="relative z-20 h-full flex flex-col justify-end items-start px-7 sm:px-16 md:px-20 lg:px-24 pb-14 sm:pb-20 md:pb-24 max-w-[1400px] mx-auto text-left"
      >
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl space-y-3.5 sm:space-y-6">
          {/* Main Title - Serif typography */}
          <h1 className="font-serif text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-7xl font-normal text-white tracking-tight leading-[1.15] drop-shadow-md">
            {activeSlideData.title}
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-xl md:max-w-2xl drop-shadow-sm">
            {activeSlideData.subtitle}
          </p>

          {/* Rectangular Outline CTA Button */}
          <div className="pt-2 sm:pt-5">
            <a
              href={activeSlideData.ctaLink}
              className="inline-block px-7 sm:px-10 py-3 sm:py-4 border border-white/80 bg-black/20 text-white font-serif text-sm sm:text-lg tracking-wide hover:bg-white hover:text-black transition-all duration-300 ease-in-out backdrop-blur-xs shadow-md"
            >
              {activeSlideData.ctaText}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Dash Carousel Pagination Indicators */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
              index === currentSlide
                ? 'w-8 sm:w-12 bg-white'
                : 'w-5 sm:w-8 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
