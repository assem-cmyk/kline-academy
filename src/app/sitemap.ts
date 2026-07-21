import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://klineacademy.org'

// Bump when page content meaningfully changes — a real freshness signal beats build time
const LAST_CONTENT_UPDATE = new Date('2026-07-21')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/apply`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
