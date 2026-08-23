import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getJewelleryItemById, urlFor } from '../../../../lib/sanity'
import { Sparkles, ArrowLeft, ShieldCheck, Gem, Calendar } from 'lucide-react'

interface ItemPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ItemPageProps) {
  const { id } = await params
  const item = await getJewelleryItemById(id)
  if (!item) return { title: 'Item Not Found | Musaddik Jewellery' }
  return {
    title: `${item.name} | Musaddik Jewellery`,
    description: item.shortDescription,
  }
}

export default async function JewelleryItemDetailPage({ params }: ItemPageProps) {
  const { id } = await params
  const item = await getJewelleryItemById(id)

  if (!item) {
    notFound()
  }

  const imageList = item.images && item.images.length > 0 ? item.images : ['/images/hero-bridal.png']
  const primaryImageUrl = urlFor(imageList[0])

  return (
    <div className="min-h-screen py-16 bg-[#0A0B0E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#A1A1AA] hover:text-[#D4AF37] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collections</span>
        </Link>

        <div className="bg-[#12141D] border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
          {/* Main Image View */}
          <div className="relative aspect-square bg-[#0A0B0E] p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex items-center justify-center">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#161824]">
              <Image
                src={primaryImageUrl}
                alt={item.name}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <div className="absolute top-8 left-8 px-3 py-1 bg-[#0A0B0E]/80 backdrop-blur-md rounded text-[10px] uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30">
              {item.category}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                <Gem className="w-4 h-4" />
                <span>{item.karat || '22K Gold BIS Hallmarked'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F7F4] leading-snug mb-4">
                {item.name}
              </h1>

              <div className="inline-block px-4 py-1.5 rounded bg-[#1A1D2B] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium mb-6">
                Material Composition: <span className="text-[#F8F7F4]">{item.material}</span>
              </div>

              <div className="border-t border-white/10 pt-6 mb-6">
                <h3 className="text-xs uppercase tracking-widest text-[#A1A1AA] font-semibold mb-3">
                  Artisan & Craft Overview
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed font-light">
                  {item.shortDescription}
                </p>
              </div>

              <div className="space-y-3 bg-[#0A0B0E]/60 p-5 rounded-xl border border-white/5 text-xs text-[#A1A1AA]">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>100% Certified Natural Gemstones & BIS 916 Hallmarked Pure Gold</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>Custom Sizing & Personalization Available at Flagship Lounge</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <Link
                href="/visit-us"
                className="w-full py-4 rounded bg-gradient-to-r from-[#D4AF37] via-[#F5E5C0] to-[#C5A059] text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-[#D4AF37]/30 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Atelier Viewing</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
