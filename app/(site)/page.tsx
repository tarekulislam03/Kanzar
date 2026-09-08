import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '../../components/HeroSection'
import HeritageStrip from '../../components/HeritageStrip'
import GoldMacroTransitionSection from '../../components/GoldMacroTransitionSection'
import FeaturedCollection from '../../components/FeaturedCollection'
import CraftsmanshipSection from '../../components/CraftsmanshipSection'
import BlogCard from '../../components/BlogCard'
import StoreContactMapSection from '../../components/StoreContactMapSection'
import { getJewelleryItems, getBlogPosts } from '../../lib/sanity'
import { getJewelryStoreJsonLd, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../lib/seo'

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: '/',
    siteName: 'Kanzar',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-bridal.png',
        width: 1200,
        height: 630,
        alt: 'Kanzar Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/images/hero-bridal.png'],
  },
}

export const revalidate = 60

export default async function HomePage() {
  const items = await getJewelleryItems()
  const posts = await getBlogPosts()
  const storeJsonLd = getJewelryStoreJsonLd()

  return (
    <div className="bg-[#D193A3] text-[#1C1A17] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
      />
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Heritage / About Strip */}
      <div id="heritage">
        <HeritageStrip />
      </div>
      

      {/* 4. Catalog Section */}
      <div id="collections">
        <FeaturedCollection items={items} />
      </div>

      
     

      {/* 7. Flagship Atelier Map & Contact Enquiry Section */}
      <div id="visit">
        <StoreContactMapSection />
      </div>
    </div>
  )
}

