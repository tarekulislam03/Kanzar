import { JewelleryItem, urlFor } from './sanity'

/**
 * Converts an image URL into a native File object via Canvas / Blob
 */
async function imageUrlToFile(url: string, filename: string): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth || img.width || 800
        canvas.height = img.naturalHeight || img.height || 1000
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('No canvas context')
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `${filename}.jpg`, { type: 'image/jpeg' })
              resolve(file)
            } else {
              reject(new Error('Blob conversion failed'))
            }
          },
          'image/jpeg',
          0.95
        )
      } catch (e) {
        reject(e)
      }
    }

    img.onerror = () => {
      // Fallback: try fetching direct blob
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], `${filename}.jpg`, { type: blob.type || 'image/jpeg' })
          resolve(file)
        })
        .catch(reject)
    }
  })
}

export async function shareProductToWhatsApp(item: JewelleryItem, customImageUrl?: string) {
  const phone = '917003467398'

  // Resolve image URL
  const rawImgUrl = customImageUrl || (item.images && item.images.length > 0 ? urlFor(item.images[0]) : '/images/catalog-1.png')
  const absoluteImageUrl = rawImgUrl.startsWith('http')
    ? rawImgUrl
    : typeof window !== 'undefined'
    ? `${window.location.origin}${rawImgUrl}`
    : rawImgUrl

  const safeFilename = (item.name || 'jewellery').replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const captionText = `Hello Kanzar Jewels, I am interested in enquiring about "${item.name}" (${item.material || '22K Gold'}).`

  // 1. Try Native Web Share API with File (Mobile iOS / Android)
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      const file = await imageUrlToFile(absoluteImageUrl, safeFilename)

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: item.name,
          text: captionText,
          files: [file],
        })
        return
      }
    } catch (err) {
      console.warn('Native file share failed, falling back to direct link:', err)
    }
  }

  // 2. Direct WhatsApp wa.me fallback (Includes direct image link for auto rich image preview in chat)
  const fullMessage = `${captionText}\n\nProduct Image: ${absoluteImageUrl}`
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`
  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }
}
