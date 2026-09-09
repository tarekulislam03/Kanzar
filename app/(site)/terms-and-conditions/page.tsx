import React from 'react'
import type { Metadata } from 'next'
import HallmarkSeal from '../../../components/HallmarkSeal'
import { SITE_NAME } from '../../../lib/seo'

export const metadata: Metadata = {
  title: `Terms & Conditions | ${SITE_NAME}`,
  description:
    'Read the Terms & Conditions for Kanzar Jewels. Learn about our hallmarked jewellery sales, pricing, making charges, and store policies.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen py-24 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3] text-[#1C1A17]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-[#DEDAD2] pb-10">
          <div className="flex justify-center mb-2">
            <HallmarkSeal size={40} />
          </div>
          <span className="block text-[11px] uppercase tracking-[0.25em] text-[#9C6B68] font-semibold">
            LEGAL & STORE POLICIES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17]">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#1C1A17]/60 font-light uppercase tracking-wider">
            Last Updated: September 2026
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-sm text-[#1C1A17]/80 font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">1. BIS Hallmark Certification</h2>
            <p>
              Every piece of gold jewellery sold at Kanzar Jewels is 100% hallmarked under the Bureau of Indian Standards (BIS 916), guaranteeing 22 karat purity. Each purchase comes with an official certificate of authenticity and transparent break-up billing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">2. Flat 4.99% Making Charges</h2>
            <p>
              Our featured flat 4.99% making charges apply to qualifying 22 Karat gold collections. Custom bespoke bridal designs or intricate Kundan/Polki hand-setting may carry specific artisan fabrication charges, clearly communicated prior to order confirmation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">3. Gold Rate Valuation & Billing</h2>
            <p>
              Jewellery valuations are calculated based on the prevailing daily Kolkata gold bullion rate at the exact time of transaction. Invoices reflect itemized weight, purity grade, stone karatage, and applicable GST.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">4. Store Visit Appointments</h2>
            <p>
              Bespoke bridal consultations and private viewing lounge appointments booked via our web portal are subject to availability. Our team will verify appointment slots via telephone or WhatsApp prior to your visit.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
