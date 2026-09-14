'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  maxOpacity: number
  pulseSpeed: number
  color: string
}

const GOLD_DUSK_PALETTE = [
  'rgba(212, 175, 55, ',   // Metallic gold
  'rgba(245, 230, 205, ',  // Champagne light
  'rgba(196, 135, 147, ',  // Dusky pink
  'rgba(229, 178, 189, ',  // Soft rose gold
  'rgba(180, 140, 70, '    // Antique gold
]

export default function CinematicParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    const particleCount = Math.min(Math.floor(window.innerWidth / 22), 55)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const colorBase = GOLD_DUSK_PALETTE[Math.floor(Math.random() * GOLD_DUSK_PALETTE.length)]
      const maxOpacity = 0.25 + Math.random() * 0.55
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.35 + 0.12),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * maxOpacity,
        maxOpacity,
        pulseSpeed: 0.006 + Math.random() * 0.01,
        color: colorBase
      })
    }

    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.15
        p.opacity += p.pulseSpeed

        if (p.opacity >= p.maxOpacity || p.opacity <= 0.08) {
          p.pulseSpeed = -p.pulseSpeed
        }

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.opacity))})`
        ctx.shadowBlur = p.size > 2 ? 8 : 4
        ctx.shadowColor = 'rgba(212, 175, 55, 0.4)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  )
}
