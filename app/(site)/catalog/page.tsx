import React from 'react'
import type { Metadata } from 'next'
import CatalogGrid from '../../../components/CatalogGrid'
import HallmarkSeal from '../../../components/HallmarkSeal'
import { getJewelleryItems } from '../../../lib/sanity'
import { SITE_URL } from '../../../lib/seo'

export const metadata: Metadata = {
  title: 'Jewellery Catalog | Musaddik Jewellery',
  description:
    'Browse our complete catalog of handcrafted 22K gold neckpieces, uncut Kundan chokers, certified Polki bridal sets, bangles, and rings.',
  alternates: {
    canonical: '/catalog',
  },
  openGraph: {
    title: 'Jewellery Catalog | Musaddik Jewellery',
    description:
      'Browse our complete catalog of handcrafted 22K gold neckpieces, uncut Kundan chokers, certified Polki bridal sets, bangles, and rings.',
    url: '/catalog',
    siteName: 'Musaddik Jewellery',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-bridal.png',
        width: 1200,
        height: 630,
        alt: 'Musaddik Jewellery Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jewellery Catalog | Musaddik Jewellery',
    description:
      'Browse our complete catalog of handcrafted 22K gold neckpieces, uncut Kundan chokers, certified Polki bridal sets, bangles, and rings.',
    images: ['/images/hero-bridal.png'],
  },
}

export const revalidate = 60

export default async function CatalogPage() {
  const items = await getJewelleryItems()

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Jewellery Catalog | Musaddik Jewellery',
    description:
      'Browse our complete catalog of handcrafted 22K gold neckpieces, uncut Kundan chokers, certified Polki bridal sets, bangles, and rings.',
    url: `${SITE_URL}/catalog`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        url: `${SITE_URL}/catalog/${item._id}`,
      })),
    },
  }

  return (
    <div className="min-h-screen py-24 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <HallmarkSeal size={40} />
          </div>

          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
            100% Hallmarked
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1C1A17]">
            Our Collections
          </h1>

          <p className="text-sm text-[#1C1A17]/70 font-light leading-relaxed">
            Every piece is certified under the official BIS hallmark, guaranteeing genuine gold purity in every purchase.
          </p>
        </div>

        {/* Catalog Grid with Category Filter */}
        <CatalogGrid initialItems={items} showCategoryFilter={true} />
      </div>
    </div>
  )
}
