import React from 'react'
import type { Metadata } from 'next'
import HallmarkSeal from '../../../components/HallmarkSeal'
import { SITE_NAME } from '../../../lib/seo'

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description:
    'Read the Privacy Policy for Kanzar Jewels. Learn how we handle your personal data, appointment requests, and cookie preferences.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3] text-[#1C1A17]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-[#DEDAD2] pb-10">
          <div className="flex justify-center mb-2">
            <HallmarkSeal size={40} />
          </div>
          <span className="block text-[11px] uppercase tracking-[0.25em] text-[#9C6B68] font-semibold">
            LEGAL & PRIVACY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#1C1A17]/60 font-light uppercase tracking-wider">
            Last Updated: September 2026
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-6 text-sm text-[#1C1A17]/80 font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">1. Introduction</h2>
            <p>
              At Kanzar Jewels (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we value the trust you place in us when visiting our atelier or digital store. This Privacy Policy explains how we collect, use, and protect your information when you browse our site, request bespoke appointments, or contact us.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">2. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide when booking store appointments or initiating WhatsApp inquiries, including your name, telephone number, and preferred date of visit. We also collect minimal browsing metrics via cookies to ensure smooth site navigation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">3. Cookie Policy & Usage</h2>
            <p>
              Cookies are small data files saved on your browser to optimize site functionality. We use essential cookies to remember your consent preferences (`cookie-consent`) and analyze site performance. You may manage or decline non-essential cookies via our consent banner.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">4. How We Use Your Data</h2>
            <p>
              Your personal contact information is strictly used to confirm store viewings, provide bespoke jewellery recommendations, and fulfill customer enquiries. We never sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">5. Contact Atelier</h2>
            <p>
              If you have any questions regarding our privacy practices or wish to update your preferences, please write to us at{' '}
              <a
                href="mailto:kanzarjewels@gmail.com"
                className="font-medium text-[#9C6B68] underline underline-offset-4 hover:text-[#2A2422]"
              >
                kanzarjewels@gmail.com
              </a>{' '}
              or visit our Kolkata atelier at P-4B, CIT Road, Entally, Kolkata – 700014.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
