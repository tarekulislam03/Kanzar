import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, urlFor } from '../../../../lib/sanity'
import { getBlogPostingJsonLd } from '../../../../lib/seo'
import HallmarkSeal from '../../../../components/HallmarkSeal'
import { ArrowLeft } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) {
    return {
      title: 'Article Not Found | Musaddik Journal',
      description: 'The requested article could not be found.',
      alternates: { canonical: `/blog/${slug}` },
    }
  }

  const coverImageUrl = post.coverImage ? urlFor(post.coverImage) : '/images/hero-slide-pink.jpg'

  return {
    title: `${post.title} | Musaddik Journal`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Musaddik Journal`,
      description: post.excerpt,
      url: `/blog/${slug}`,
      siteName: 'Musaddik Jewellery',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : ['Musaddik Master Artisans'],
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Musaddik Journal`,
      description: post.excerpt,
      images: [coverImageUrl],
    },
  }
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const coverImageUrl = post.coverImage ? urlFor(post.coverImage) : '/images/hero-slide-pink.jpg'
  const blogPostingJsonLd = getBlogPostingJsonLd(
    {
      _id: post._id,
      title: post.title,
      slug,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      author: post.author,
    },
    coverImageUrl
  )
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="min-h-screen py-20 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#1C1A17]/70 hover:text-[#9C7A45] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>

        {/* Category Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <HallmarkSeal size={24} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9C7A45] font-semibold">
              {formattedDate} · BY {post.author || 'MUSADDIK CRAFTSMEN'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1A17] leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full bg-[#EAE6DD] border border-[#DEDAD2] mb-10 overflow-hidden">
          <Image
            src={coverImageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="text-base text-[#1C1A17] font-serif leading-relaxed italic mb-8 p-6 bg-[#EAE6DD]/50 border-l-2 border-[#9C7A45]">
          "{post.excerpt}"
        </div>

        {/* Body Text */}
        <div className="space-y-6 text-sm text-[#1C1A17]/80 font-light leading-relaxed">
          {Array.isArray(post.body) ? (
            post.body.map((block: any, idx: number) => {
              if (block._type === 'block') {
                const text = block.children?.map((c: any) => c.text).join('') || ''
                return (
                  <p key={idx} className="whitespace-pre-line">
                    {text}
                  </p>
                )
              }
              return null
            })
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-[#DEDAD2] flex items-center justify-between">
          <div className="text-xs text-[#1C1A17]/60">
            Musaddik Jewellery Atelier · Commercial Street, Bangalore
          </div>
          <Link
            href="/catalog"
            className="text-xs uppercase tracking-[0.15em] text-[#9C7A45] hover:underline font-medium"
          >
            Browse Collections →
          </Link>
        </div>
      </div>
    </article>
  )
}
