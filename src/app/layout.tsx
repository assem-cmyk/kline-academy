import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://klineacademy.org'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'K Line Academy — Digital Aligner Planning Bootcamp',
  description:
    "Egypt's first case-based bootcamp for digital aligner planning using OnyxCeph & Titan. Taught by K Line Europe specialists. 4 weekends, 15 real cases, direct hiring pipeline.",
  keywords: [
    'aligner planning',
    'digital orthodontics',
    'OnyxCeph',
    'Titan',
    'K Line Europe',
    'orthodontic training',
    'Cairo bootcamp',
    'clear aligners',
  ],
  authors: [{ name: 'K Line Middle East' }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'K Line Academy — Master Digital Aligner Planning in 4 Weeks',
    description:
      "Egypt's first case-based bootcamp using OnyxCeph & Titan — taught by K Line Europe's own specialists.",
    type: 'website',
    url: SITE_URL,
    siteName: 'K Line Academy',
    locale: 'en_US',
    images: [
      {
        url: '/brand/kline-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'K Line Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K Line Academy — Master Digital Aligner Planning in 4 Weeks',
    description:
      "Egypt's first case-based bootcamp using OnyxCeph & Titan — taught by K Line Europe's own specialists.",
    images: ['/brand/kline-logo.jpg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-text-primary">
        {children}
      </body>
    </html>
  )
}
