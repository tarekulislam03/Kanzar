'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost, urlFor } from '../lib/sanity'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.coverImage ? urlFor(post.coverImage) : '/images/hero-slide-pink.jpg'
  const slugString = typeof post.slug === 'string' ? post.slug : post.slug?.current || '#'
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="group flex flex-col cursor-pointer select-none transition-all duration-500">
      <Link href={`/blog/${slugString}`} className="block">
        {/* Minimal Neutral Image Box */}
        <div className="relative aspect-[4/3] w-full bg-[#F3F1ED] overflow-hidden mb-3.5 flex items-center justify-center shadow-xs">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          {/* Studio Light Sweep Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFE58F]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none mix-blend-overlay" />
        </div>

        {/* Minimalist Information */}
        <div className="flex flex-col text-left px-0.5">
          <h3 className="text-xs sm:text-[13px] font-normal text-[#1C1A17] group-hover:text-[#9C7A45] transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>

          <p className="text-[11px] text-[#1C1A17]/60 font-light mt-1 tracking-tight">
            {formattedDate} · {post.readTime || '5 min read'}
          </p>
        </div>
      </Link>
    </article>
  )
}

