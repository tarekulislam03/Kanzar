'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost, urlFor } from '../lib/sanity'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.coverImage ? urlFor(post.coverImage) : '/images/blog-bridal-guide.png'
  const slugString = typeof post.slug === 'string' ? post.slug : post.slug?.current || '#'
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="group bg-[#FAF8F3] border border-[#DEDAD2] p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#9C7A45]">
      <div>
        <Link href={`/blog/${slugString}`} className="relative aspect-[16/10] w-full overflow-hidden block bg-[#EAE6DD] mb-5">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
        </Link>

        <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9C7A45] font-medium mb-2">
          {formattedDate} · ATELIER JOURNAL
        </span>

        <h3 className="font-serif text-xl font-normal text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors leading-snug mb-3">
          <Link href={`/blog/${slugString}`}>{post.title}</Link>
        </h3>

        <p className="text-xs text-[#1C1A17]/70 font-light leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>
      </div>

      <div className="pt-3 border-t border-[#DEDAD2] flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-[#1C1A17]/60">
          {post.author || 'Musaddik Craftsmen'}
        </span>
        <Link
          href={`/blog/${slugString}`}
          className="text-xs uppercase tracking-[0.15em] text-[#1C1A17] hover:text-[#9C7A45] font-medium transition-colors"
        >
          Read Article →
        </Link>
      </div>
    </article>
  )
}
