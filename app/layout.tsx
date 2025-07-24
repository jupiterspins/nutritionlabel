import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Nutrition Label Finder | Opus Caviar',
  description: 'Find nutrition facts and calorie information for thousands of foods. Fast, free, and easy-to-use nutrition label finder.',
  keywords: 'nutrition label, nutrition facts, calories, food nutrition, nutrition information',
  authors: [{ name: 'Opus Caviar' }],
  robots: 'index, follow',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Nutrition Label Finder | Opus Caviar',
    description: 'Find nutrition facts and calorie information for thousands of foods.',
    type: 'website',
    url: 'https://nutritionlabel.opuscaviar.com',
    siteName: 'Nutrition Label Finder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nutrition Label Finder | Opus Caviar',
    description: 'Find nutrition facts and calorie information for thousands of foods.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}