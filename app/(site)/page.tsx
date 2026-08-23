import React from 'react'
import Link from 'next/link'
import HeroSection from '../../components/HeroSection'
import HeritageStrip from '../../components/HeritageStrip'
import FeaturedCollection from '../../components/FeaturedCollection'
import CraftsmanshipSection from '../../components/CraftsmanshipSection'
import BlogCard from '../../components/BlogCard'
import HallmarkSeal from '../../components/HallmarkSeal'
import StoreContactMapSection from '../../components/StoreContactMapSection'
import { getJewelleryItems, getBlogPosts } from '../../lib/sanity'

export const revalidate = 60

export default async function HomePage() {
  const items = await getJewelleryItems()
  const posts = await getBlogPosts()

  return (
    <div className="bg-[#FAF8F3] text-[#1C1A17]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Heritage / About Strip */}
      <div id="heritage"><HeritageStrip /></div>

      {/* 3. Catalog Section */}
      <div id="collections"><FeaturedCollection items={items} /></div>

      {/* 4. Craftsmanship & Trust Section */}
      <CraftsmanshipSection />

      {/* 5. Blog Preview Section */}
      <section id="journal" className="py-28 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3] border-b border-[#DEDAD2]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#DEDAD2]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <HallmarkSeal size={28} />
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
                  ATELIER JOURNAL
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1C1A17]">
                Guides & Gold Care
              </h2>
            </div>
            <Link
              href="/blog"
              className="mt-4 md:mt-0 text-xs font-medium uppercase tracking-[0.15em] text-[#1C1A17] hover:text-[#9C7A45] transition-colors"
            >
              View Journal Index →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Flagship Atelier Map & Contact Enquiry Section */}
      <div id="visit"><StoreContactMapSection /></div>
    </div>
  )
}
