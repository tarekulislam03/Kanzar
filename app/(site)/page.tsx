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
import RevealOnScroll from '../../components/RevealOnScroll'
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
    siteName: 'Musaddik Jewellery',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-bridal.png',
        width: 1200,
        height: 630,
        alt: 'Musaddik Jewellery Heritage Collection',
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
    <div className="bg-[#FAF8F3] text-[#1C1A17] overflow-hidden">
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

      {/* 3. Gold Jewellery Macro Moment & Filmic Section Transition */}
      <GoldMacroTransitionSection />

      {/* 4. Catalog Section */}
      <div id="collections">
        <FeaturedCollection items={items} />
      </div>

      {/* 5. Craftsmanship & Trust Section */}
      <CraftsmanshipSection />

      {/* 6. Blog Preview Section */}
      <section id="journal" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3] border-b border-[#DEDAD2]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Centered Louis Vuitton Style Header */}
          <RevealOnScroll direction="up">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#1C1A17]/60 font-medium block mb-2">
                ATELIER JOURNAL
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-[#1C1A17] tracking-tight">
                Guides & Gold Care
              </h2>
            </div>
          </RevealOnScroll>

          {/* Minimalist Grid (1x1 on Mobile, 3-Column on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 w-full mb-12 sm:mb-16">
            {posts.slice(0, 3).map((post, idx) => (
              <RevealOnScroll key={post._id} direction="up" delay={idx * 120} duration={800}>
                <BlogCard post={post} />
              </RevealOnScroll>
            ))}
          </div>

          {/* Centered Minimalist Rectangular Button CTA */}
          <RevealOnScroll direction="up">
            <div>
              <Link
                href="/blog"
                className="inline-block border border-[#1C1A17] text-[#1C1A17] rounded-none px-8 sm:px-10 py-3.5 sm:py-4 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#1C1A17] hover:text-white transition-all duration-300"
              >
                View Journal Index
              </Link>
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* 7. Flagship Atelier Map & Contact Enquiry Section */}
      <div id="visit">
        <RevealOnScroll direction="up" duration={900}>
          <StoreContactMapSection />
        </RevealOnScroll>
      </div>
    </div>
  )
}

