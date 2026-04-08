import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'K Line Academy — Digital Aligner Planning Bootcamp',
  description: "Egypt's first case-based bootcamp for digital aligner planning using OnyxCeph & Titan. Taught by K Line Europe specialists. 4 weeks, 15 real cases, direct hiring pipeline.",
  openGraph: {
    title: 'K Line Academy — Master Digital Aligner Planning in 4 Weeks',
    description: "Egypt's first case-based bootcamp using OnyxCeph & Titan — taught by K Line Europe's own specialists.",
    type: 'website',
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
