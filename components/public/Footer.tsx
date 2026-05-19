import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <h2 className="text-xl font-bold tracking-tight">MOBILEYES</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Live video gaming talent agency. Professional briefs. 4-day payment.
              Representing streaming creators across Australia and APAC.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { label: 'TikTok', href: 'https://tiktok.com/@mobileyes' },
                { label: 'YouTube', href: 'https://youtube.com/@mobileyes' },
                { label: 'Twitch', href: 'https://twitch.tv/mobileyes' },
                { label: 'LinkedIn', href: 'https://linkedin.com/company/mobileyes' },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors text-sm">
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Creators</h3>
            <ul className="space-y-3">
              <li><Link href="/creators" className="text-slate-500 hover:text-white text-sm transition-colors">Apply Now</Link></li>
              <li><Link href="/talent" className="text-slate-500 hover:text-white text-sm transition-colors">Our Talent</Link></li>
              <li><Link href="/about" className="text-slate-500 hover:text-white text-sm transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Brands</h3>
            <ul className="space-y-3">
              <li><Link href="/brands" className="text-slate-500 hover:text-white text-sm transition-colors">Submit a Brief</Link></li>
              <li><Link href="/contact" className="text-slate-500 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li><Link href="/news" className="text-slate-500 hover:text-white text-sm transition-colors">News</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Terms</Link>
          </div>
          <p className="text-slate-600 text-xs text-center">
            Mobileyes is a trading name of Gamefluence Pty Ltd (ACN 696 199 461). Sydney, Australia. admin@mobileyes.live
          </p>
        </div>
      </div>
    </footer>
  )
}
