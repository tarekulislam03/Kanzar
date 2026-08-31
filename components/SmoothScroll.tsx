'use client'

import React, { useEffect, useState, createContext, useContext } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const lenisInstance = new Lenis({
      duration: isTouch ? 1.0 : 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      infinite: false,
    })

    setLenis(lenisInstance)
    if (typeof window !== 'undefined') {
      ;(window as any).__LENIS__ = lenisInstance
    }

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    const updateGSAP = (time: number) => {
      lenisInstance.raf(time * 1000)
    }

    gsap.ticker.add(updateGSAP)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateGSAP)
      lenisInstance.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}


