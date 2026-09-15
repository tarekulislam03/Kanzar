'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Copy, Check, ExternalLink, User, FileText } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'

export default function InvitationAdminGenerator() {
  const [name, setName] = useState('')
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedMessage, setCopiedMessage] = useState(false)
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  const baseUrl = origin ? `${origin}/invitation/opening` : '/invitation/opening'
  const generatedUrl = name.trim()
    ? `${baseUrl}?name=${encodeURIComponent(name.trim())}`
    : baseUrl

  const guestGreeting = name.trim() ? `Dear ${name.trim()},` : 'Dear Guest,'
  const whatsappText = `${guestGreeting}

Something beautiful is coming to Kolkata.

Kanzar Jewels cordially invites you to the Grand Opening of our Flagship Atelier on 30th September 2026.

Open your personalized royal invitation here:
${generatedUrl}

We look forward to welcoming you! ✨`

  const whatsappDirectUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`

  const handleCopyLink = async () => {
    if (typeof navigator !== 'undefined') {
      await navigator.clipboard.writeText(generatedUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const handleCopyMessage = async () => {
    if (typeof navigator !== 'undefined') {
      await navigator.clipboard.writeText(whatsappText)
      setCopiedMessage(true)
      setTimeout(() => setCopiedMessage(false), 2000)
    }
  }

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-[#9E5D6C] via-[#803E4C] to-[#5C2633] text-[#2B1F22] flex flex-col justify-between items-center py-8 px-4 sm:px-6">
      {/* Top only: Logo */}
      <header className="flex flex-col items-center pt-2 sm:pt-4">
        <Link href="/" className="transition-transform hover:scale-105">
          <Image
            src="/logo-v3.png"
            alt="Kanzar Jewels"
            width={200}
            height={80}
            priority
            className="h-12 sm:h-16 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] brightness-105"
          />
        </Link>
      </header>

      {/* Main Centered Form Card */}
      <main className="w-full max-w-md my-auto py-6">
        <div className="bg-[#FCF9F7] rounded-3xl p-6 sm:p-8 border border-[#E8CCD1] shadow-[0_20px_50px_-10px_rgba(40,10,16,0.45)] relative overflow-hidden">
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 bg-scratchy opacity-40 mix-blend-multiply pointer-events-none" />

          <div className="relative z-10 space-y-5">
            {/* Guest Name Field Only */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#7A3E4B] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C48793]" />
                Guest Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter guest name..."
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#E5C7CC] focus:border-[#8B4A56] focus:ring-2 focus:ring-[#8B4A56]/20 outline-none text-base font-medium text-[#2B1F22] transition-all shadow-inner"
              />
            </div>

            {/* Buttons Only */}
            <div className="pt-2 space-y-3">
              {/* 1. Send on WhatsApp Button */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium text-sm sm:text-base shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2.5 transition-all duration-300 transform active:scale-98 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current text-white shrink-0" />
                <span>Send via WhatsApp</span>
              </a>

              {/* 2. Copy Link & Copy Message */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCopyLink}
                  className="py-3 px-3 rounded-xl bg-white hover:bg-[#FAF3F5] text-[#8B4A56] border-2 border-[#E5C7CC] hover:border-[#C48793] font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#8B4A56]" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyMessage}
                  className="py-3 px-3 rounded-xl bg-white hover:bg-[#FAF3F5] text-[#8B4A56] border-2 border-[#E5C7CC] hover:border-[#C48793] font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-[#8B4A56]" />
                      <span>Copy Message</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Preview Link */}
              <div className="text-center pt-2">
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8B4A56]/80 hover:text-[#8B4A56] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Preview invitation page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-2 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#F3D5DB]/85 font-medium">
          Kanzar Jewels • Kolkata
        </p>
      </footer>
    </div>
  )
}
