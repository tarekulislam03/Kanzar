import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId: projectId || 'demo-project',
  dataset,
  apiVersion,
  useCdn: false,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  if (!source) return '/images/hero-bridal.png'
  if (typeof source === 'string') return source
  if (source.asset?._ref || source.asset?.url) {
    return builder.image(source).url()
  }
  return '/images/hero-bridal.png'
}

export interface JewelleryItem {
  _id: string
  name: string
  category: 'necklace' | 'bangles' | 'earrings' | 'rings' | 'bridal sets'
  material: string
  images: any[]
  shortDescription: string
  priceDisplay?: string
  karat?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string } | string
  excerpt: string
  body?: any
  coverImage: any
  publishedAt: string
  author?: string
  readTime?: string
}

// Fallback Mock Data for instant visual excellence out of the box
export const FALLBACK_JEWELLERY_ITEMS: JewelleryItem[] = [
  {
    _id: 'j1',
    name: 'Imperial Kundan Heritage Necklace',
    category: 'necklace',
    material: '22K Yellow Gold, Uncut Kundan & Fresh Water Pearls',
    images: ['/images/necklace-kundan-set.png', '/images/hero-bridal.png'],
    shortDescription: 'Handcrafted royal choke necklace set with authentic uncut Kundan stones, encased in 22K pure gold setting with cascading pearl drops.',
    priceDisplay: 'Price On Request',
    karat: '22K Pure Gold',
  },
  {
    _id: 'j2',
    name: 'Royal Antique Filigree Gold Choker',
    category: 'necklace',
    material: '22K Antique Gold with Rubies & Emeralds',
    images: ['/images/necklace-kundan-set.png'],
    shortDescription: 'Intricately hand-engraved gold choker featuring traditional geometric filigree and floral lace motifs set in dark burnished gold.',
    priceDisplay: 'Price On Request',
    karat: '22K Gold',
  },
  {
    _id: 'j3',
    name: 'Heritage Royal Polki Bridal Set',
    category: 'bridal sets',
    material: '24K Gold Plated Silver Base with Natural Polki Diamonds',
    images: ['/images/bridal-polki-set.png', '/images/bridal-kundan-set.png'],
    shortDescription: 'Grand multi-tier bridal necklace paired with matching chandelier earrings, handcrafted for the modern royal bride.',
    priceDisplay: 'Exclusive Collection',
    karat: 'Pure Polki',
  },
  {
    _id: 'j4',
    name: 'Maharani Kundan Grand Bridal Ensemble',
    category: 'bridal sets',
    material: '22K Solid Gold, Emerald Cabochons & Polki',
    images: ['/images/bridal-kundan-set.png', '/images/hero-bridal.png'],
    shortDescription: 'An opulent bridal collection including a choker, long rani haar, and matha patti designed for timeless wedding ceremonies.',
    priceDisplay: 'Custom Order',
    karat: '22K Gold',
  },
  {
    _id: 'j5',
    name: 'Filigree Antique Gold Bangles (Set of 4)',
    category: 'bangles',
    material: '22K Yellow Gold Fine Wirework',
    images: ['/images/bangles-filigree.png'],
    shortDescription: 'Delicate gold filigree craftsmanship woven into intricate mesh bangles, embodying generations of artisan heritage.',
    priceDisplay: 'Price On Request',
    karat: '22K Gold',
  },
  {
    _id: 'j6',
    name: 'Royal Meenakari Royal Kada',
    category: 'bangles',
    material: '22K Gold with Red & Green Enamel Work',
    images: ['/images/kada-meenakari.png'],
    shortDescription: 'Bold wrist kada featuring traditional Jaipuri Meenakari enamel art on the inner side and carved elephant head clasps.',
    priceDisplay: 'Price On Request',
    karat: '22K Gold',
  },
  {
    _id: 'j7',
    name: 'Antique Chandbali Jhumka Earrings',
    category: 'earrings',
    material: '22K Gold, Polki Diamonds & Pearl Droplets',
    images: ['/images/earrings-jhumka.png'],
    shortDescription: 'Classic moon-shaped chandbali jhumkas layered with delicate seed pearls and sparkling champagne diamond polkis.',
    priceDisplay: 'Price On Request',
    karat: '22K Gold',
  },
  {
    _id: 'j8',
    name: 'Solitaire Emerald & Diamond Studs',
    category: 'earrings',
    material: '18K White Gold, Natural Zambian Emeralds',
    images: ['/images/earrings-stud.png'],
    shortDescription: 'Elegantly framed royal green emerald studs surrounded by a halo of brilliant round-cut micro diamonds.',
    priceDisplay: 'Price On Request',
    karat: '18K White Gold',
  },
  {
    _id: 'j9',
    name: 'Royal Filigree Solitaire Ring',
    category: 'rings',
    material: '18K Rose Gold & Certified VVS Diamond',
    images: ['/images/ring-filigree.png'],
    shortDescription: 'A statement solitaire ring with vintage filigree side galleries, capturing light from every angle with supreme brilliance.',
    priceDisplay: 'Price On Request',
    karat: '18K Gold',
  },
  {
    _id: 'j10',
    name: 'Traditional Heritage Floral Band Ring',
    category: 'rings',
    material: '22K Antique Yellow Gold',
    images: ['/images/ring-filigree.png'],
    shortDescription: 'Heavy solid gold band hand-engraved with fine gold filigree wirework and traditional floral patterns.',
    priceDisplay: 'Price On Request',
    karat: '22K Gold',
  },
]

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    _id: 'b1',
    title: 'The Ultimate Guide to Selecting Your Dream Bridal Jewellery',
    slug: 'ultimate-bridal-jewellery-guide',
    excerpt: 'Discover how to pair heritage necklines, metal tones, and heirloom gems to craft a cohesive, spellbinding bridal ensemble.',
    coverImage: '/images/blog-bridal-guide.png',
    publishedAt: '2026-08-15T10:00:00.000Z',
    author: 'Musaddik Master Artisans',
    readTime: '6 min read',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Selecting bridal jewellery is far more than matching metals with fabric; it is about crafting an heirloom narrative that lives for generations. At Musaddik Jewellery, each piece is engineered to harmonize with the silk drape, neckline geometry, and ceremonial lighting of your grand day.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '1. Understanding Gold Purity & Tone\nWhether you select 22K yellow gold for traditional radiance or 18K rose gold for contemporary sparkle, your skin tone and attire color palette dictate the perfect base metal.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '2. Layering Kundan with Long Rani Haars\nA quintessential bridal look combines a high-fitting choker with a cascading long necklace (Rani Haar). Ensure the lengths complement each other without crowding the neckline.',
          },
        ],
      },
    ],
  },
  {
    _id: 'b2',
    title: 'Caring for 22K Pure Gold & Gemstones: Preserving Eternal Lustre',
    slug: 'caring-for-22k-gold-and-gemstones',
    excerpt: 'Essential advice from our master goldsmiths on cleaning, storing, and protecting high-karat gold and delicate polki stones.',
    coverImage: '/images/blog-gold-care.png',
    publishedAt: '2026-08-10T14:30:00.000Z',
    author: 'Musaddik Vault Team',
    readTime: '4 min read',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'High karat gold (22K and 24K) possesses a distinct warm yellow glow but is softer than alloyed gold. Proper storage in velvet-lined individual pouches is crucial to prevent surface scratching.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Avoid exposing Kundan and Polki pieces to water or perfume, as moisture can weaken the lac foil backing and diminish stone radiance.',
          },
        ],
      },
    ],
  },
  {
    _id: 'b3',
    title: 'The Royal History of Polki & Kundan: From Mughal Courts to Modern Brides',
    slug: 'royal-history-of-polki-and-kundan',
    excerpt: 'Trace the 500-year evolution of uncut diamonds set in 24K gold foil and how contemporary artisans preserve royal court techniques.',
    coverImage: '/images/bridal-polki-set.png',
    publishedAt: '2026-08-05T11:00:00.000Z',
    author: 'Heritage Atelier Curators',
    readTime: '5 min read',
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Polki diamonds—uncut natural diamonds preserved in their raw organic form—have adorned South Asian royalty for over five centuries. Unlike modern faceted brilliant cuts, Polki captures ambient candle and hall light with an ethereal, vintage luster.',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The art of Kundan setting involves burnishing pure 24K gold foil around each stone, creating a seamless metallic frame that protects the gem while reflecting light from behind. Today, Musaddik ateliers continue this sacred tradition using age-old hand tools.',
          },
        ],
      },
    ],
  },
]

// Query helper functions with Sanity + Fallback fallback strategy
export async function getJewelleryItems(categoryFilter?: string): Promise<JewelleryItem[]> {
  if (projectId && projectId !== 'demo-project' && projectId !== 'your-project-id') {
    try {
      const query = categoryFilter && categoryFilter !== 'all'
        ? `*[_type == "jewelleryItem" && category == $category] | order(_createdAt desc)`
        : `*[_type == "jewelleryItem"] | order(_createdAt desc)`
      
      const items = await client.fetch(query, { category: categoryFilter })
      if (items && items.length > 0) return items
    } catch (err) {
      console.warn('Sanity fetch failed or unconfigured, fallback to local dataset:', err)
    }
  }

  if (categoryFilter && categoryFilter !== 'all') {
    return FALLBACK_JEWELLERY_ITEMS.filter((item) => item.category === categoryFilter)
  }
  return FALLBACK_JEWELLERY_ITEMS
}

export async function getJewelleryItemById(id: string): Promise<JewelleryItem | null> {
  if (projectId && projectId !== 'demo-project' && projectId !== 'your-project-id') {
    try {
      const item = await client.fetch(`*[_type == "jewelleryItem" && _id == $id][0]`, { id })
      if (item) return item
    } catch (err) {
      console.warn('Sanity fetch failed for item ID:', err)
    }
  }
  return FALLBACK_JEWELLERY_ITEMS.find((item) => item._id === id) || null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (projectId && projectId !== 'demo-project' && projectId !== 'your-project-id') {
    try {
      const posts = await client.fetch(`*[_type == "blogPost"] | order(publishedAt desc)`)
      if (posts && posts.length > 0) return posts
    } catch (err) {
      console.warn('Sanity fetch failed for blog posts:', err)
    }
  }
  return FALLBACK_BLOG_POSTS
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (projectId && projectId !== 'demo-project' && projectId !== 'your-project-id') {
    try {
      const post = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]`, { slug })
      if (post) return post
    } catch (err) {
      console.warn('Sanity fetch failed for blog post slug:', err)
    }
  }
  return FALLBACK_BLOG_POSTS.find((post) => {
    const s = typeof post.slug === 'string' ? post.slug : post.slug.current
    return s === slug
  }) || null
}
