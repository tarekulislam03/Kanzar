'use client'

import React from 'react'

export default function GoldenRibbons() {
  return (
    <div className="pointer-events-none absolute inset-0 z-15 overflow-hidden">
      {/* Bottom Left Ribbon */}
      <div className="animate-ribbon-left absolute -bottom-4 -left-6 w-64 sm:w-80 md:w-[420px] lg:w-[540px] xl:w-[680px] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
        <svg
          viewBox="0 0 400 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <defs>
            <linearGradient id="goldRibbonLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8D6" />
              <stop offset="25%" stopColor="#F5C757" />
              <stop offset="50%" stopColor="#D4A034" />
              <stop offset="75%" stopColor="#8C5C15" />
              <stop offset="100%" stopColor="#E5B558" />
            </linearGradient>
            <linearGradient id="goldRibbonUnderside" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#73470D" />
              <stop offset="50%" stopColor="#9E6B1D" />
              <stop offset="100%" stopColor="#573307" />
            </linearGradient>
          </defs>

          {/* Ribbon fold shadow / underside */}
          <path
            d="M -20 180 Q 50 140 120 170 Q 180 200 240 180 L 250 196 Q 185 218 115 186 Q 48 156 -20 196 Z"
            fill="url(#goldRibbonUnderside)"
            opacity="0.85"
          />

          {/* Main Top Silk Ribbon Band */}
          <path
            d="M -20 160 C 40 120, 90 145, 140 155 C 190 165, 230 140, 270 175 C 310 210, 360 195, 410 180 L 405 195 C 355 210, 305 225, 265 190 C 225 155, 185 180, 135 170 C 85 160, 35 135, -20 175 Z"
            fill="url(#goldRibbonLeft)"
          />

          {/* Highlight ridge */}
          <path
            d="M -20 161 C 40 121, 90 146, 140 156 C 190 166, 230 141, 270 176 C 310 211, 360 196, 410 181"
            stroke="#FFFDF5"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* Bottom Right Ribbon */}
      <div className="animate-ribbon-right absolute -bottom-6 -right-8 w-72 sm:w-96 md:w-[460px] lg:w-[600px] xl:w-[740px] filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)]">
        <svg
          viewBox="0 0 450 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <defs>
            <linearGradient id="goldRibbonRight" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFBE6" />
              <stop offset="28%" stopColor="#F5C757" />
              <stop offset="55%" stopColor="#C9942C" />
              <stop offset="80%" stopColor="#825310" />
              <stop offset="100%" stopColor="#E2B252" />
            </linearGradient>
            <linearGradient id="goldRibbonRightFold" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#663E09" />
              <stop offset="50%" stopColor="#9C6B1C" />
              <stop offset="100%" stopColor="#4A2904" />
            </linearGradient>
          </defs>

          {/* Underside fold */}
          <path
            d="M 470 230 C 410 180, 360 210, 310 160 C 265 115, 220 150, 180 140 L 175 156 C 215 166, 260 131, 305 176 C 355 226, 405 196, 470 246 Z"
            fill="url(#goldRibbonRightFold)"
            opacity="0.9"
          />

          {/* Main sweeping loop */}
          <path
            d="M 470 210 C 400 160, 350 190, 300 140 C 250 90, 200 130, 150 115 C 100 100, 60 130, 10 120 L 8 136 C 58 146, 98 116, 148 131 C 198 146, 248 106, 298 156 C 348 206, 398 176, 470 226 Z"
            fill="url(#goldRibbonRight)"
          />

          {/* Glistening sheen edge */}
          <path
            d="M 470 211 C 400 161, 350 191, 300 141 C 250 91, 200 131, 150 116 C 100 101, 60 131, 10 121"
            stroke="#FFFFFA"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  )
}
