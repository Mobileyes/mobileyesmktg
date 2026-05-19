import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mobileyes — Live Gaming Talent Agency | Sydney, Australia',
  description:
    'Professional briefs. 4-day payment. Representing live streaming and gaming creators across ANZ and APAC. YouTube, Twitch, Kick, TikTok.',
  keywords: ['gaming talent agency', 'streaming creators', 'influencer marketing', 'gaming', 'twitch', 'youtube gaming', 'kick', 'australia', 'apac', 'creator economy'],
  openGraph: {
    title: 'Mobileyes — Live Gaming Talent Agency',
    description:
      'Professional briefs. 4-day payment. Representing streaming creators across ANZ and APAC.',
    url: 'https://mobileyes.live',
    siteName: 'Mobileyes',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobileyes — Live Gaming Talent Agency',
    description: 'Professional briefs. 4-day payment. Gaming creators across ANZ and APAC.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900">{children}</body>
    </html>
  )
}
