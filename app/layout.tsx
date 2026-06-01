import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Mobileyes — Live Streaming Talent Agency | Sydney, Australia',
  description:
    'Professional briefs. 4-day payment. Representing live streaming creators across ANZ and APAC. YouTube, Twitch, Kick, TikTok.',
  keywords: ['talent agency', 'streaming creators', 'influencer marketing', 'live streaming', 'twitch', 'youtube', 'kick', 'australia', 'apac', 'creator economy'],
  openGraph: {
    title: 'Mobileyes — Live Streaming Talent Agency',
    description:
      'Represent. Perform. Get paid. Professional briefs. 4-day payment. Streaming creators across ANZ and APAC.',
    url: 'https://mobileyes.live',
    siteName: 'Mobileyes',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mobileyes — Live Streaming Talent Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobileyes — Live Streaming Talent Agency',
    description: 'Represent. Perform. Get paid. Streaming creators across ANZ and APAC.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="antialiased font-[family-name:var(--font-space-grotesk)]" style={{ background: '#0B0F2E', color: '#FFFFFF', margin: 0 }}>{children}</body>
    </html>
  )
}
