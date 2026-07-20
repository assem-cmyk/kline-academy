import type { Metadata } from 'next'

// Noindexed page — no canonical, to avoid sending mixed indexing signals
export const metadata: Metadata = {
  title: 'Application Received',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
