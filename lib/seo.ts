export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kanzar.in'
export const SITE_NAME = 'Kanzar Jewels'
export const DEFAULT_TITLE = 'Kanzar - Best Jewellery Shop in Kolkata'
export const DEFAULT_DESCRIPTION =
  'We are Kanzar Jewellers, a family-owned jewellery business based in Kolkata, West Bengal. We specialize in the sale of gold, diamond, and silver jewellery.'

export function getAbsoluteUrl(path: string): string {
  if (!path) return SITE_URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${cleanPath}`
}

export const STORE_ADDRESS = {
  streetAddress: 'P-4B, CIT Road, Paddapukur, Entally (Near Birshul Hat)',
  addressLocality: 'Kolkata',
  addressRegion: 'West Bengal',
  postalCode: '700014',
  addressCountry: 'IN',
}

export const STORE_GEO = {
  latitude: 22.5530618,
  longitude: 88.3690889,
}

export const STORE_TELEPHONE = '+91 98753 38183'
export const STORE_EMAIL = 'kanzarjewels@gmail.com'

export function getJewelryStoreJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': `${SITE_URL}/#store`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: getAbsoluteUrl('/images/logo-kanzar.png'),
    image: getAbsoluteUrl('/images/hero-slide-pink.jpg'),
    description: DEFAULT_DESCRIPTION,
    telephone: STORE_TELEPHONE,
    email: STORE_EMAIL,
    priceRange: '₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      ...STORE_ADDRESS,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...STORE_GEO,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      'https://instagram.com/kanzarjewels',
      'https://facebook.com/kanzarjewels',
    ],
  }
}

export function getProductJsonLd(
  item: {
    _id: string
    name: string
    category: string
    material: string
    shortDescription: string
    priceDisplay?: string
  },
  imageUrl: string
) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    '@id': `${SITE_URL}/catalog/${item._id}#product`,
    name: item.name,
    image: getAbsoluteUrl(imageUrl),
    description: item.shortDescription,
    sku: item._id,
    category: item.category,
    material: item.material,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/catalog/${item._id}`,
      priceCurrency: 'INR',
      price: '0',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '0',
        priceCurrency: 'INR',
        valueAddedTaxIncluded: 'true',
        description: item.priceDisplay || 'Price On Request',
      },
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  }
}

export function getBlogPostingJsonLd(
  post: {
    _id: string
    title: string
    slug: string
    excerpt: string
    publishedAt: string
    author?: string
  },
  coverImageUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: getAbsoluteUrl(coverImageUrl),
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author || 'Kanzar Master Goldsmiths',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/images/logo-kanzar.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }
}
