'use client'

import React, { useState } from 'react'
import { X, CheckCircle2, MessageCircle } from 'lucide-react'
import HallmarkSeal from './HallmarkSeal'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    interest: 'Bridal Set',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const resetAndClose = () => {
    setSubmitted(false)
    onClose()
  }

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to book a store appointment for ${formData.name || 'a visit'}. Phone: ${formData.phone}, Preferred Date: ${formData.date}.`
  )
  const whatsappUrl = `https://wa.me/918101402916?text=${whatsappMessage}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm transition-all overflow-y-auto">
      <div className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] bg-[#FAF8F3] border border-[#DEDAD2] shadow-2xl p-6 sm:p-8 text-[#1C1A17] overflow-y-auto my-auto">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-[#1C1A17]/60 hover:text-[#1C1A17] p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center mb-2">
              <HallmarkSeal size={48} />
            </div>
            <h3 className="font-serif text-2xl text-[#1C1A17] font-normal">Appointment Requested</h3>
            <p className="text-xs text-[#1C1A17]/70 font-light leading-relaxed max-w-xs mx-auto">
              Thank you, <span className="font-medium text-[#1C1A17]">{formData.name}</span>. We will contact you on <span className="font-medium">{formData.phone}</span> to confirm your viewing time.
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 border border-[#1C1A17] bg-transparent text-[#1C1A17] text-xs font-medium uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors hover:border-[#9C7A45] hover:text-[#9C7A45]"
              >
                <MessageCircle className="w-4 h-4 text-[#9C7A45]" />
                <span>Confirm on WhatsApp</span>
              </a>
              <button
                onClick={resetAndClose}
                className="w-full py-2.5 border border-[#DEDAD2] text-xs text-[#1C1A17] uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#9C7A45] text-xs font-medium uppercase tracking-[0.2em] mb-1">
              <HallmarkSeal size={20} />
              <span>PRIVATE  VISIT</span>
            </div>
            <h2 className="font-serif text-2xl font-normal text-[#1C1A17] mb-2">
              Book an Appointment
            </h2>
            <p className="text-xs text-[#1C1A17]/60 mb-6 font-light">
              Experience one-on-one consultation with senior goldsmiths in our private viewing lounge.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#9C7A45] mb-1 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF8F3] border border-[#DEDAD2] px-3 py-2.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#9C7A45]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#9C7A45] mb-1 font-semibold">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAF8F3] border border-[#DEDAD2] px-3 py-2.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#9C7A45]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#9C7A45] mb-1 font-semibold">
                    Category of Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#DEDAD2] px-3 py-2.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#9C7A45]"
                  >
                    <option value="Bridal Set">Bridal Sets</option>
                    <option value="Necklace">Necklaces & Chokers</option>
                    <option value="Bangles">Gold Bangles & Kada</option>
                    <option value="Earrings">Jhumkas & Chandbalis</option>
                    <option value="Rings">Rings & Bands</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#9C7A45] mb-1 font-semibold">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#DEDAD2] px-3 py-2.5 text-xs text-[#1C1A17] focus:outline-none focus:border-[#9C7A45]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 border border-[#1C1A17] bg-transparent text-[#1C1A17] text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:border-[#9C7A45] hover:text-[#9C7A45]"
              >
                Request Appointment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
