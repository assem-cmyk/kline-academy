import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'K Line Academy',
    short_name: 'K Line Academy',
    description: 'Digital aligner planning bootcamp by K Line Europe — Cairo, Egypt.',
    start_url: '/',
    display: 'browser',
    background_color: '#0B132B',
    theme_color: '#0B132B',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
