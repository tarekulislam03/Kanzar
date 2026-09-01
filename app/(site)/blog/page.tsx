import React from 'react'
import type { Metadata } from 'next'
import BlogCard from '../../../components/BlogCard'
import HallmarkSeal from '../../../components/HallmarkSeal'
import { getBlogPosts } from '../../../lib/sanity'
import { SITE_URL } from '../../../lib/seo'

export const metadata: Metadata = {
  title: 'Atelier Journal | Musaddik Gold Care & Guides',
  description:
    'Practical advice on reading gold hallmarks, caring for 22K gold, and choosing bridal jewellery from Musaddik master goldsmiths.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Atelier Journal | Musaddik Gold Care & Guides',
    description:
      'Practical advice on reading gold hallmarks, caring for 22K gold, and choosing bridal jewellery from Musaddik master goldsmiths.',
    url: '/blog',
    siteName: 'Musaddik Jewellery',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/blog-bridal-guide.png',
        width: 1200,
        height: 630,
        alt: 'Musaddik Atelier Journal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atelier Journal | Musaddik Gold Care & Guides',
    description:
      'Practical advice on reading gold hallmarks, caring for 22K gold, and choosing bridal jewellery from Musaddik master goldsmiths.',
    images: ['/images/blog-bridal-guide.png'],
  },
}

export const revalidate = 60

export default async function BlogIndexPage() {
  const posts = await getBlogPosts()

  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Atelier Journal | Musaddik Gold Care & Guides',
    description:
      'Practical advice on reading gold hallmarks, caring for 22K gold, and choosing bridal jewellery from Musaddik master goldsmiths.',
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((post) => {
      const slugStr = typeof post.slug === 'string' ? post.slug : post.slug.current
      return {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `${SITE_URL}/blog/${slugStr}`,
        datePublished: post.publishedAt,
      }
    }),
  }

  return (
    <div className="min-h-screen py-24 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <HallmarkSeal size={40} />
          </div>

          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
            ATELIER JOURNAL & GUIDES
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1C1A17]">
            Craft & Knowledge
          </h1>

          <p className="text-sm text-[#1C1A17]/70 font-light leading-relaxed">
            Practical advice on reading gold hallmarks, caring for traditional 22K gold pieces, and selecting bridal neckpieces for family ceremonies.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
