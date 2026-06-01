import { Space_Grotesk, Space_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-space-mono',
})

export default function ABLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${spaceMono.variable} font-[family-name:var(--font-space-grotesk)]`}>
      {/* A/B Test Banner */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-yellow-400 text-yellow-900 text-center py-1 text-xs font-medium">
        ⚠️ A/B TEST — Brand Book v1.0 Preview — Not Live
      </div>
      <div className="pt-6">
        {children}
      </div>
    </div>
  )
}
