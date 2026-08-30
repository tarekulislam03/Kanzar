'use client'

import React, { useEffect, useState } from 'react'
import HallmarkSeal from './HallmarkSeal'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    let isMounted = true

    // Trigger internal animation sequence for logo & line expansion
    const animTimer = setTimeout(() => {
      if (isMounted) setAnimationStarted(true)
    }, 100)

    const dismissCurtain = () => {
      if (!isMounted) return
      setTimeout(() => {
        if (isMounted) setLoading(false)
      }, 200)
    }

    // Poller to check if the video has actively started playing (currentTime > 0)
    const checkVideoActive = () => {
      const videoEl = document.querySelector('video') as HTMLVideoElement | null
      if (videoEl && (videoEl.currentTime > 0.05 || videoEl.readyState >= 3)) {
        dismissCurtain()
        return true
      }
      return false
    }

    // Check immediately if video is ready
    if (checkVideoActive()) {
      return () => {
        isMounted = false
        clearTimeout(animTimer)
      }
    }

    // Polling interval every 80ms until video frame 1 is actively playing
    const poller = setInterval(() => {
      if (checkVideoActive()) {
        clearInterval(poller)
      }
    }, 80)

    // Safety fallback maximum timer (4s) so slow networks never freeze
    const fallbackTimer = setTimeout(() => {
      clearInterval(poller)
      dismissCurtain()
    }, 4000)

    const handleVideoReady = () => {
      if (checkVideoActive()) {
        clearInterval(poller)
        clearTimeout(fallbackTimer)
      }
    }

    window.addEventListener('heroVideoReady', handleVideoReady)

    return () => {
      isMounted = false
      clearTimeout(animTimer)
      clearTimeout(fallbackTimer)
      clearInterval(poller)
      window.removeEventListener('heroVideoReady', handleVideoReady)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#1C1A17] flex flex-col items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.77,0,0.175,1)] pointer-events-none select-none ${
        loading ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-90'
      }`}
    >
      {/* Subtle Ambient Background Light */}
      <div className="absolute inset-0 bg-radial from-[#9C7A45]/15 via-transparent to-transparent opacity-60" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Floating Hallmark Gold Emblem */}
        <div
          className={`mb-6 transition-all duration-700 delay-100 transform ${
            animationStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <HallmarkSeal size={40} />
        </div>

        {/* Luxury Brand Wordmark */}
        <div
          className={`transition-all duration-700 delay-200 transform ${
            animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h1 className="font-serif text-2xl sm:text-4xl text-white font-light tracking-[0.25em] uppercase">
            KANZAR
          </h1>
          <span className="block text-[9px] sm:text-[11px] tracking-[0.4em] uppercase text-[#D4AF37] font-medium -mt-0.5">
            JEWELS
          </span>
        </div>

        {/* Animated Expanding Gold Line */}
        <div className="my-5 w-36 h-[1px] relative overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-1000 delay-300 ease-out transform ${
              animationStarted ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          />
        </div>

        {/* Subtitle / Heritage Tag */}
        <p
          className={`text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-white/70 font-light transition-all duration-700 delay-400 transform ${
            animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          Handcrafted 22K Gold · Est. 1978
        </p>

      </div>
    </div>
  )
}
