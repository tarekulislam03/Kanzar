'use client'

import React, { useEffect, useState } from 'react'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let isMounted = true

    const dismissCurtain = () => {
      if (!isMounted) return
      setLoading(false)
      setTimeout(() => {
        if (isMounted) setVisible(false)
      }, 700)
    }

    const checkVideoActive = () => {
      const videoEl = document.querySelector('video') as HTMLVideoElement | null
      if (videoEl && (videoEl.currentTime > 0.05 || videoEl.readyState >= 3)) {
        dismissCurtain()
        return true
      }
      return false
    }

    if (checkVideoActive()) {
      return () => {
        isMounted = false
      }
    }

    const poller = setInterval(() => {
      if (checkVideoActive()) {
        clearInterval(poller)
      }
    }, 80)

    const fallbackTimer = setTimeout(() => {
      clearInterval(poller)
      dismissCurtain()
    }, 2000)

    const handleVideoReady = () => {
      if (checkVideoActive()) {
        clearInterval(poller)
        clearTimeout(fallbackTimer)
      }
    }

    window.addEventListener('heroVideoReady', handleVideoReady)

    return () => {
      isMounted = false
      clearTimeout(fallbackTimer)
      clearInterval(poller)
      window.removeEventListener('heroVideoReady', handleVideoReady)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#FAF8F3] flex items-center justify-center transition-opacity duration-700 ease-out pointer-events-none select-none ${
        loading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Minimal 3 Dots Opening Animation in Dusky Pink (#9C6B68) */}
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#9C6B68] animate-bounce [animation-delay:-0.32s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#9C6B68] animate-bounce [animation-delay:-0.16s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#9C6B68] animate-bounce" />
      </div>
    </div>
  )
}
