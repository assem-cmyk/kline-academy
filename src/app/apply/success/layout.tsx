import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Application Received',
  robots: { index: false, follow: false },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
