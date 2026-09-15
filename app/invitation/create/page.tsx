import type { Metadata } from 'next'
import InvitationAdminGenerator from '@/components/invitation/InvitationAdminGenerator'

export const metadata: Metadata = {
  title: 'Personalized Invitation Generator — Kanzar Jewels',
  description: 'Admin tool to generate tailored luxury invitations for Kanzar Jewels Grand Opening.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function InvitationCreatePage() {
  return <InvitationAdminGenerator />
}
