'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <aside
      aria-label="Cookie Consent Banner"
      className="fixed bottom-0 left-0 right-0 z-[9999] w-full bg-[#FAF8F3] border-t border-[#DEDAD2] px-4 py-4 sm:px-8 sm:py-5 text-[#1C1A17] shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-[#1C1A17]/80 font-light leading-relaxed text-center md:text-left">
          We use cookies to personalize content, analyze traffic, and enhance your browsing experience at Kanzar.
          By clicking &ldquo;Accept&rdquo;, you agree to our storage of cookies on your device. Learn more in our{' '}
          <Link
            href="/privacy-policy"
            className="font-medium text-[#9C6B68] underline underline-offset-4 hover:text-[#2A2422] transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="px-5 sm:px-6 py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium bg-transparent text-[#1C1A17] border border-[#1C1A17]/40 hover:border-[#1C1A17] hover:bg-[#1C1A17]/5 transition-all duration-300 shadow-xs cursor-pointer"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-5 sm:px-6 py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium bg-[#9C6B68] text-white border border-[#9C6B68] hover:bg-[#C99A94] hover:border-[#C99A94] transition-all duration-300 shadow-xs cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  )
}
