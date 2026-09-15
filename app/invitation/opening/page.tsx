import type { Metadata } from 'next'
import { Suspense } from 'react'
import OpeningInvitationPage from '@/components/invitation/OpeningInvitationPage'

export const metadata: Metadata = {
  title: 'Grand Opening Invitation — Kanzar Jewels',
  description: 'You are invited at 30th September to Kanzar Jewels.',
  alternates: {
    canonical: '/invitation/opening',
  },
  openGraph: {
    title: 'Grand Opening Invitation — Kanzar Jewels',
    description: 'You are invited at 30th September to Kanzar Jewels.',
    url: '/invitation/opening',
    siteName: 'Kanzar Jewels',
    locale: 'en_US',
    type: 'website',
  },
}

export default function InvitationOpeningRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] w-full bg-gradient-to-br from-[#FAF2F3] via-[#F4E3E5] to-[#E9D0D5] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#C48793] border-t-transparent animate-spin" />
        </div>
      }
    >
      <OpeningInvitationPage />
    </Suspense>
  )
}
