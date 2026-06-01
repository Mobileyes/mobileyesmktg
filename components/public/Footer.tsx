import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-white" style={{ background: '#0B0F2E', borderTop: '1px solid #1E2A5E' }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <h2 className="text-xl font-bold tracking-tight">MOBILEYES</h2>
            </div>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Live streaming talent agency. Professional briefs. 4-day payment.
              Representing streaming creators across Australia and APAC.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { label: 'TikTok', href: 'https://tiktok.com/@mobileyes' },
                { label: 'YouTube', href: 'https://youtube.com/@mobileyes' },
                { label: 'Twitch', href: 'https://twitch.tv/mobileyes' },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/mobileyes' },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Creators</h3>
            <ul className="space-y-3">
              <li><Link href="/creators" className="text-sm transition-colors hover:text-white" style={{ color: '#3B82F6' }}>Apply Now</Link></li>
              <li><Link href="/talent" className="text-sm transition-colors hover:text-white" style={{ color: '#3B82F6' }}>Our Talent</Link></li>
              <li><Link href="/about" className="text-sm transition-colors hover:text-white" style={{ color: '#3B82F6' }}>About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Brands</h3>
            <ul className="space-y-3">
              <li><Link href="/brands" className="text-sm transition-colors hover:text-white" style={{ color: '#3B82F6' }}>Submit a Brief</Link></li>
              <li><Link href="/contact" className="text-sm transition-colors hover:text-white" style={{ color: '#3B82F6' }}>Contact</Link></li>
              <li><Link href="/news" className="text-sm transition-colors hover:text-white" style={{ color: '#3B82F6' }}>News</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #1E2A5E' }}>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>Privacy Policy</Link>
            <Link href="/terms" className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}>Terms</Link>
          </div>
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Mobileyes is a trading name of Gamefluence Pty Ltd (ACN 696 199 461). Sydney, Australia. admin@mobileyes.live
          </p>
        </div>
      </div>
    </footer>
  )
}
