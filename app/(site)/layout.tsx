import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F3] text-[#1C1A17]">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
