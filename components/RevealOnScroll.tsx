'use client'

import React, { useEffect, useRef, useState } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom'
  delay?: number // in ms
  duration?: number // in ms
}

export default function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 800,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-12 opacity-0'
      case 'down':
        return '-translate-y-12 opacity-0'
      case 'left':
        return 'translate-x-12 opacity-0'
      case 'right':
        return '-translate-x-12 opacity-0'
      case 'zoom':
        return 'scale-95 opacity-0'
      case 'fade':
      default:
        return 'opacity-0'
    }
  }

  const getFinalTransform = () => {
    switch (direction) {
      case 'zoom':
        return 'scale-100 opacity-100'
      case 'up':
      case 'down':
        return 'translate-y-0 opacity-100'
      case 'left':
      case 'right':
        return 'translate-x-0 opacity-100'
      case 'fade':
      default:
        return 'opacity-100'
    }
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all ${
        isVisible ? getFinalTransform() : getInitialTransform()
      } ${className}`}
    >
      {children}
    </div>
  )
}
