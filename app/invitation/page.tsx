import type { Metadata } from 'next'
import CinematicInvitation from '@/components/invitation/CinematicInvitation'

export const metadata: Metadata = {
  title: 'Grand Opening Invitation — Kanzar Jewels Kolkata',
  description:
    'Something beautiful is coming to Kolkata. You are cordially invited to the Grand Opening of Kanzar Jewels on 30 September 2026. Exclusive 3.99% making charges inaugural offer on 22K gold jewellery.',
  alternates: {
    canonical: '/invitation',
  },
  openGraph: {
    title: 'Grand Opening Invitation — Kanzar Jewels Kolkata',
    description:
      'Something beautiful is coming to Kolkata. Join us on 30 September 2026 at P-4B, CIT Road, Entally, Kolkata for the Grand Inauguration of Kanzar Jewels.',
    url: '/invitation',
    siteName: 'Kanzar Jewels',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hero-slide-pink.jpg',
        width: 1200,
        height: 630,
        alt: 'Kanzar Jewels Grand Opening Invitation Kolkata',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grand Opening Invitation — Kanzar Jewels Kolkata',
    description:
      'Something beautiful is coming to Kolkata. Grand Opening on 30 September 2026 at P-4B, CIT Road, Entally.',
    images: ['/images/hero-slide-pink.jpg'],
  },
}

export default function InvitationPage() {
  return <CinematicInvitation />
}
