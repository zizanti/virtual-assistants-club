import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Virtual Assistants Club — The #1 EA Talent Network in LATAM',
  description: 'Connect elite executive assistants with top companies across Latin America. Browse curated remote opportunities and hire vetted VA talent.',
  generator: 'v0.app',
  keywords: ['virtual assistant', 'executive assistant', 'LATAM', 'remote jobs', 'EA network'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Virtual Assistants Club',
    description: 'The #1 Executive Assistant Talent Network in LATAM',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  )
}
