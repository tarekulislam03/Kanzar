'use client'

import React, { useEffect, useRef } from 'react'

interface ConfettiPiece {
  x: number
  y: number
  w: number
  h: number
  rx: number
  ry: number
  rz: number
  speedY: number
  speedX: number
  rotSpeedX: number
  rotSpeedY: number
  rotSpeedZ: number
  oscSpeed: number
  oscAmp: number
  colorBase: string
  colorLight: string
  colorDark: string
}

const GOLD_METALLICS = [
  { base: '#D4AF37', light: '#FFF4CF', dark: '#8C6718' },
  { base: '#E5B558', light: '#FFFAF0', dark: '#9E7418' },
  { base: '#F3C562', light: '#FFFFFF', dark: '#A4791E' },
  { base: '#C59B27', light: '#FDF0C8', dark: '#73520E' },
  { base: '#EEDAA2', light: '#FFFFFF', dark: '#9E8040' },
  { base: '#BF8A30', light: '#FCE7A6', dark: '#5F3F08' },
]

export default function VelvetConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Number of confetti pieces
    const count = Math.min(Math.floor(window.innerWidth / 20), 40)
    const pieces: ConfettiPiece[] = []

    for (let i = 0; i < count; i++) {
      const col = GOLD_METALLICS[Math.floor(Math.random() * GOLD_METALLICS.length)]
      pieces.push({
        x: Math.random() * width,
        y: Math.random() * height - height * 0.2,
        w: 9 + Math.random() * 9,      // 9 to 18px width
        h: 14 + Math.random() * 14,    // 14 to 28px height
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: (Math.random() - 0.5) * 0.8,
        speedY: 1.1 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.6,
        rotSpeedX: 0.02 + Math.random() * 0.04,
        rotSpeedY: 0.03 + Math.random() * 0.05,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        oscSpeed: 0.015 + Math.random() * 0.02,
        oscAmp: 18 + Math.random() * 22,
        colorBase: col.base,
        colorLight: col.light,
        colorDark: col.dark,
      })
    }

    let isVisible = true
    const handleVisibility = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    let t = 0

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render)
        return
      }

      t += 1
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i]

        p.y += p.speedY
        p.x += p.speedX + Math.sin(t * p.oscSpeed + i) * 0.7
        p.rx += p.rotSpeedX
        p.ry += p.rotSpeedY
        p.rz += p.rotSpeedZ

        // Recycle to top
        if (p.y > height + 30) {
          p.y = -35
          p.x = Math.random() * width
        }
        if (p.x < -30) p.x = width + 20
        if (p.x > width + 30) p.x = -20

        // 3D projection scale
        const cosX = Math.cos(p.rx)
        const sinY = Math.sin(p.ry)
        const scaleX = Math.abs(cosX)
        const scaleY = Math.abs(sinY)

        if (scaleX < 0.05 && scaleY < 0.05) continue

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rz)
        ctx.scale(scaleX, scaleY)

        // Shading calculation based on 3D angle (simulates metallic sheen reflecting spotlight)
        const lightness = 0.5 + 0.5 * (cosX * sinY)
        const grad = ctx.createLinearGradient(-p.w / 2, -p.h / 2, p.w / 2, p.h / 2)
        if (lightness > 0.6) {
          grad.addColorStop(0, p.colorLight)
          grad.addColorStop(0.5, p.colorBase)
          grad.addColorStop(1, p.colorDark)
        } else {
          grad.addColorStop(0, p.colorBase)
          grad.addColorStop(0.7, p.colorDark)
          grad.addColorStop(1, '#3B2305')
        }

        ctx.fillStyle = grad
        ctx.shadowColor = 'rgba(212, 175, 55, 0.45)'
        ctx.shadowBlur = 6

        // Draw foil rectangle with tiny rounded corners
        ctx.beginPath()
        ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2)
        ctx.fill()

        ctx.restore()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  )
}
