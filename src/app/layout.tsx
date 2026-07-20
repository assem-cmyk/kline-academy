import type { Metadata, Viewport } from 'next'
import { Familjen_Grotesk } from 'next/font/google'
import './globals.css'

const familjen = Familjen_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-familjen',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://klineacademy.org'

export const viewport: Viewport = {
  themeColor: '#0B132B',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'K Line Academy — Digital Aligner Planning Bootcamp',
    template: '%s — K Line Academy',
  },
  description:
    "Egypt's first case-based bootcamp for digital aligner planning using OnyxCeph & Titan. Taught by K Line Europe specialists. 4 weekends, 15 real cases, direct hiring pipeline.",
  authors: [{ name: 'K Line Middle East' }],
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'K Line Academy — Master Digital Aligner Planning in 4 Weekends',
    description:
      "Egypt's first case-based bootcamp using OnyxCeph & Titan — taught by K Line Europe specialists and university faculty.",
    type: 'website',
    url: './',
    siteName: 'K Line Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K Line Academy — Master Digital Aligner Planning in 4 Weekends',
    description:
      "Egypt's first case-based bootcamp using OnyxCeph & Titan — taught by K Line Europe specialists and university faculty.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'K Line Academy',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: 'assem@clearxaligners.com',
  parentOrganization: {
    '@type': 'Organization',
    name: 'K Line Europe GmbH',
    url: 'https://www.kline-europe.com',
    sameAs: [
      'https://www.facebook.com/klineurope',
      'https://www.instagram.com/kline_europe',
      'https://www.linkedin.com/company/k-line-europe-gmbh/',
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={familjen.variable}>
      <body className="bg-white text-text-primary">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  )
}
