import type { MetadataRoute } from 'next'
import { getJewelleryItems, getBlogPosts } from '../lib/sanity'
import { SITE_URL } from '../lib/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await getJewelleryItems()
  const posts = await getBlogPosts()

  const productUrls: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${SITE_URL}/catalog/${item._id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => {
    const slugStr = typeof post.slug === 'string' ? post.slug : post.slug.current
    return {
      url: `${SITE_URL}/blog/${slugStr}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  })

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      images: [`${SITE_URL}/images/logo-kanzar.png`],
    },
    {
      url: `${SITE_URL}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...productUrls,
    ...blogUrls,
  ]
}
