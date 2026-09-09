import React from 'react'
import type { Metadata } from 'next'
import HallmarkSeal from '../../../components/HallmarkSeal'
import { SITE_NAME } from '../../../lib/seo'

export const metadata: Metadata = {
  title: `Cookie Policy | ${SITE_NAME}`,
  description:
    'Read the Cookie Policy for Kanzar Jewels. Learn how we use cookies, manage consent, and protect your browsing experience.',
  alternates: {
    canonical: '/cookie-policy',
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen py-24 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3] text-[#1C1A17]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-[#DEDAD2] pb-10">
          <div className="flex justify-center mb-2">
            <HallmarkSeal size={40} />
          </div>
          <span className="block text-[11px] uppercase tracking-[0.25em] text-[#9C6B68] font-semibold">
            PRIVACY & COOKIES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17]">
            Cookie Policy
          </h1>
          <p className="text-xs text-[#1C1A17]/60 font-light uppercase tracking-wider">
            Last Updated: September 2026
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-sm text-[#1C1A17]/80 font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your computer or mobile device when you browse websites. They enable the site to remember your preferences and ensure a seamless browsing experience.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">2. How We Use Cookies</h2>
            <p>
              Kanzar Jewels uses essential cookies (`cookie-consent`) stored locally on your device (`localStorage`) to remember your banner accept/decline selection. We do not use intrusive cross-site tracking or sell user data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">3. Managing Your Preferences</h2>
            <p>
              You can accept or decline non-essential cookies via our consent banner at any time. Alternatively, you may clear cookies and local storage through your web browser settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
