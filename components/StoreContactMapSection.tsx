'use client'

import React, { useState } from 'react'
import HallmarkSeal from './HallmarkSeal'
import { MapPin, Phone, Clock, Mail, MessageCircle, CheckCircle2, Send } from 'lucide-react'

export default function StoreContactMapSection() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    interest: 'Bridal Ensembles',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Musaddik Jewellery, I would like to enquire about visiting your Commercial Street store. Name: ${formData.name || 'Visitor'}, Date: ${formData.date || 'Soon'}.`
  )
  const whatsappUrl = `https://wa.me/917003467398?text=${whatsappMessage}`

  return (
    <section id="visit" className="py-24 px-6 sm:px-10 lg:px-12 bg-[#FAF8F3] border-b border-[#DEDAD2]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex justify-center mb-1">
            <HallmarkSeal size={36} />
          </div>

          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#6E6259] font-semibold">
            OUR LOCATION
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2A2422]">
            Visit Our Store
          </h2>

          
        </div>

        {/* Height-matched grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          {/* Left Column: Interactive Map & Store Details (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 h-full">
            {/* Interactive Google Map Embed */}
            <div className="w-full flex-1 min-h-[320px] bg-[#EAE6DD] border border-[#DEDAD2] relative overflow-hidden shadow-sm">

              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.695895780467!2d88.36908891151309!3d22.553061779420165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027742d79ed949%3A0xfd331fd2a8edf15a!2sKanzar%20jewels!5e0!3m2!1sen!2sin!4v1787590993995!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            {/* Store Information Cards */}
            <div className="bg-[#FAF8F3] border border-[#C99A94] p-5 space-y-6 flex-shrink-0">
              <h3 className="font-serif text-xl text-[#2A2422] font-normal border-b border-[#C99A94] pb-3">
                Store Location
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#1C1A17]/80 font-light leading-relaxed">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#9C6B68] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.15em] text-[#9C6B68] font-semibold mb-1">
                      LOCATION
                    </span>
                    <p className="text-sm font-medium text-[#1C1A17]">P-4B, CIT Road</p>
                    <p>Paddapukur, Entally (Near Birshul Hat)</p>
                    <p>Kolkata, West Bengal – 700014</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#9C6B68] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.15em] text-[#9C6B68] font-semibold mb-1">
                      STORE HOURS
                    </span>
                    <p className="text-sm font-medium text-[#1C1A17]">Monday – Saturday</p>
                    <p>9:00 AM – 9:00 PM</p>
                    <p className="text-[11px] text-[#1C1A17]/60">Closed on Sundays</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#9C6B68] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.15em] text-[#9C6B68] font-semibold mb-1">
                      PHONE
                    </span>
                    <p className="font-medium text-[#1C1A17]">+033-4535-6632</p>
                    <p>+91 98753 38183</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#9C6B68] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.15em] text-[#9C6B68] font-semibold mb-1">
                      EMAIL
                    </span>
                    <p className="font-medium text-[#1C1A17]">kanzarjewels@gmail.com</p>
                    <p className="text-[11px] text-[#1C1A17]/60">Mon-Sat 24/7</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Enquiry Action */}
              <div className="pt-3 border-t border-[#F3E2DD]">
<a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full py-3.5 pl-3 border border-[#9C6B68] bg-transparent text-[#9C6B68] text-[10px] font-medium uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2.5 hover:bg-[#C99A94] hover:border-[#C99A94] hover:text-[#FAF6F3]"
  >
                <MessageCircle className="w-4 h-4 text-[#9C6B68] group-hover:text-[#FAF6F3] transition-colors" />
                <span>Instant WhatsApp Enquiry</span>
              </a>
            </div>
            </div>
          </div>

          {/* Right Column: Contact & Visit Form (5 cols) matching height */}
          <div className="lg:col-span-5 bg-[#FAF6F3] border border-[#F3E2DD] p-5 shadow-sm flex flex-col justify-between h-full">
            {submitted ? (
              <div className="py-12 my-auto text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F3E2DD] border border-[#9C6B68] flex items-center justify-center mx-auto text-[#9C6B68]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#2A2422] font-light">
                  Enquiry Submitted
                </h3>
                <p className="text-xs text-[#2A2422]/70 font-light leading-relaxed max-w-xs mx-auto">
                  Thank you, <span className="font-medium text-[#2A2422]">{formData.name}</span>. Our concierge team will reach out shortly to confirm your store visit request.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 border border-[#2A2422] text-xs uppercase tracking-wider text-[#2A2422] hover:border-[#9C6B68] hover:text-[#9C6B68] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#9C6B68] font-semibold mb-1">
                    BOOK A VISIT & ENQUIRE
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#2A2422] mb-2">
                    Send Store Enquiry
                  </h3>
                  <p className="text-xs text-[#2A2422]/60 mb-4 font-light">
                    Reserve a viewing slot or send us a message. Our master goldsmiths will prepare your requested pieces prior to your arrival.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3.5 flex-1 flex flex-col">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#9C6B68] mb-1 font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAF6F3] border border-[#F3E2DD] px-4 py-2.5 text-xs text-[#2A2422] focus:outline-none focus:border-[#9C6B68]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#9C6B68] mb-1 font-semibold">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF6F3] border border-[#F3E2DD] px-4 py-2.5 text-xs text-[#2A2422] focus:outline-none focus:border-[#9C6B68]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#9C6B68] mb-1 font-semibold">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#FAF6F3] border border-[#F3E2DD] px-4 py-2.5 text-xs text-[#2A2422] focus:outline-none focus:border-[#9C6B68]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#9C6B68] mb-1 font-semibold">
                        Collection Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-[#FAF6F3] border border-[#F3E2DD] px-4 py-2.5 text-xs text-[#2A2422] focus:outline-none focus:border-[#9C6B68]"
                      >
                        <option value="Bridal Ensembles">Bridal Ensembles</option>
                        <option value="Necklace Sets">Kundan & Temple Necklaces</option>
                        <option value="Bangles">22K Gold Bangles & Kadas</option>
                        <option value="Earrings">Jhumkas & Chandbalis</option>
                        <option value="Rings">Solitaire & Floral Rings</option>
                      </select>
                    </div>

                    {/* Stretched Message Field filling all remaining vertical space */}
                    <div className="flex-1 flex flex-col min-h-[110px]">
                      <label className="block text-[10px] uppercase tracking-wider text-[#9C6B68] mb-1 font-semibold">
                        Message / Custom Requirements
                      </label>
                      <textarea
                        placeholder="Specify customized bridal preferences or queries..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full flex-1 h-full bg-[#FAF6F3] border border-[#F3E2DD] px-4 py-3 text-xs text-[#2A2422] focus:outline-none focus:border-[#9C6B68] resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-4 border border-[#2A2422] bg-transparent text-[#2A2422] text-xs font-medium uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 hover:border-[#9C6B68] hover:text-[#9C6B68]"
                  >
                    <Send className="w-3.5 h-3.5 text-[#9C6B68]" />
                    <span>Submit Enquiry</span>
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
