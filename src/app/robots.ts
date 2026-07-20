import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://klineacademy.org'

export default function robots(): MetadataRoute.Robots {
  return {
    // /apply/success is excluded via noindex metadata — don't Disallow it here,
    // or crawlers can never see the noindex directive
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
