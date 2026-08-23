# Musaddik Jewellery Store Landing & CMS

A high-end luxury landing web application built with **Next.js 16 (App Router, TypeScript)**, **Tailwind CSS v4**, and **Sanity.io** as the headless CMS with an embedded Sanity Studio at `/studio`.

## Features
- **App Router Architecture**: Structured with `app/(site)` for public pages and `app/studio` for Sanity Studio.
- **Tailwind CSS Styling**: Custom luxury gold theme, dark obsidian backgrounds, glassmorphism, and responsive design.
- **Sanity.io Schemas**:
  - `blogPost`: title, slug, excerpt, body (rich text), coverImage, publishedAt
  - `jewelleryItem`: name, category (necklace, bangles, earrings, rings, bridal sets), material, images, shortDescription
- **Sanity Client**: `lib/sanity.ts` configured with `createClient` and `createImageUrlBuilder` with fallback demo dataset.
- **Deploy Ready**: Configured for deployment on Vercel (`vercel.json`).

## Quick Start
```bash
cp .env.local.example .env.local
npm run dev
```
- Storefront: `http://localhost:3000`
- Sanity Studio: `http://localhost:3000/studio`
