'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function HeroSection() {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoLoaded = () => {
      setIsVideoReady(true)
      if (typeof window !== 'undefined') {
        ;(window as any).__HERO_VIDEO_READY__ = true
        window.dispatchEvent(new Event('heroVideoReady'))
      }
    }

    // Check if video is playing or ready
    if (video.readyState >= 3 || (video.currentTime > 0 && !video.paused)) {
      handleVideoLoaded()
    } else {
      video.addEventListener('canplaythrough', handleVideoLoaded)
      video.addEventListener('playing', handleVideoLoaded)
      video.addEventListener('loadeddata', handleVideoLoaded)
      video.addEventListener('timeupdate', handleVideoLoaded)
    }

    return () => {
      video.removeEventListener('canplaythrough', handleVideoLoaded)
      video.removeEventListener('playing', handleVideoLoaded)
      video.removeEventListener('loadeddata', handleVideoLoaded)
      video.removeEventListener('timeupdate', handleVideoLoaded)
    }
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[650px] bg-[#1C1A17] overflow-hidden select-none">

      {/* Full-Bleed Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-lv-1.png"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isVideoReady ? 'opacity-100' : 'opacity-90'
          }`}
        >
          <source src="/images/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Top Vignette Gradient Overlay (Ensures Header legibility) */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-black/75 via-black/35 to-transparent z-10 pointer-events-none" />

      {/* Bottom Soft Vignette Gradient Overlay */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />

    </section>
  )
}
