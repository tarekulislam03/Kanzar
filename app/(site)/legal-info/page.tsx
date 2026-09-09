import React from 'react'
import type { Metadata } from 'next'
import HallmarkSeal from '../../../components/HallmarkSeal'
import { SITE_NAME } from '../../../lib/seo'

export const metadata: Metadata = {
  title: `Legal Info | ${SITE_NAME}`,
  description:
    'Legal Information, licensing, registered business details, and official regulatory compliance of Kanzar Jewels Kolkata.',
  alternates: {
    canonical: '/legal-info',
  },
}

export default function LegalInfoPage() {
  return (
    <div className="min-h-screen py-24 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3] text-[#1C1A17]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-[#DEDAD2] pb-10">
          <div className="flex justify-center mb-2">
            <HallmarkSeal size={40} />
          </div>
          <span className="block text-[11px] uppercase tracking-[0.25em] text-[#9C6B68] font-semibold">
            REGULATORY COMPLIANCE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17]">
            Legal Information
          </h1>
          <p className="text-xs text-[#1C1A17]/60 font-light uppercase tracking-wider">
            Kanzar Jewels • Kolkata, West Bengal
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-sm text-[#1C1A17]/80 font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">Registered Enterprise Details</h2>
            <p>
              Kanzar Jewels operates as a licensed jewellery atelier and retail entity based in Kolkata, West Bengal, India.
            </p>
            <ul className="list-disc list-inside pt-2 space-y-1 text-xs sm:text-sm text-[#1C1A17]/70">
              <li><strong className="font-medium text-[#1C1A17]">Registered Atelier Address:</strong> P-4B, CIT Road, Paddapukur, Entally, Near Birshul Hat, Kolkata – 700014</li>
              <li><strong className="font-medium text-[#1C1A17]">Contact Numbers:</strong> +91 98753 38183 / 033-4535-6632</li>
              <li><strong className="font-medium text-[#1C1A17]">Official Email:</strong> kanzarjewels@gmail.com</li>
              <li><strong className="font-medium text-[#1C1A17]">Certification Standard:</strong> BIS Hallmarked 22 Karat Gold</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-normal text-[#1C1A17]">Intellectual Property</h2>
            <p>
              All trademarks, logos, brand names, product photographs, and editorial text presented on this platform are the exclusive intellectual property of Kanzar Jewels. Unauthorized reproduction, distribution, or commercial use is strictly prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
