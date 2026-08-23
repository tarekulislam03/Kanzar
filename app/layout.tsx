import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-heading',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Musaddik Jewellery | Traditional Gold & Bridal Jewellery',
  description:
    'Handcrafted 22K gold, uncut Kundan, certified Polki diamonds, and temple jewellery. Est. 1978. Visit our flagship store or enquire on WhatsApp.',
  keywords: [
    'Musaddik Jewellery',
    'Gold Jewellery',
    'Bridal Jewellery',
    'Kundan Necklace',
    'Polki Diamonds',
    '22K Gold',
    'BIS Hallmark',
  ],
  openGraph: {
    title: 'Musaddik Jewellery | Traditional Gold & Bridal Jewellery',
    description: 'Understated luxury, handcrafted 22K gold and heritage bridal collections.',
    url: 'https://musaddik-jewellery.vercel.app',
    siteName: 'Musaddik Jewellery',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${fraunces.variable} ${jakarta.variable}`}>
      <body className="bg-[#FAF8F3] text-[#1C1A17] antialiased selection:bg-[#9C7A45]/20 selection:text-[#1C1A17]">
        {children}
      </body>
    </html>
  )
}
