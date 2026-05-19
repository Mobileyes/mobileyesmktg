import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div>
      <section className="bg-slate-950 text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          <p className="text-slate-400 mt-4">Last updated: May 2026</p>
        </div>
      </section>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Who We Are</h2>
            <p className="text-slate-700 leading-relaxed">
              Mobileyes is a trading name of Gamefluence Pty Ltd (ACN 696 199 461), registered in Australia. 
              We operate the website mobileyes.live and provide talent management services for gaming and streaming creators.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <p className="text-slate-700 mb-3">We collect information you provide directly:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Creator applications: name, email, platform details, follower counts, content niche</li>
              <li>Brand briefs: company name, contact details, campaign requirements</li>
              <li>Contact form submissions: name, email, message content</li>
            </ul>
            <p className="text-slate-700 mt-4 mb-3">We automatically collect:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Website analytics via PostHog (page views, form interactions — anonymised)</li>
              <li>Google Analytics data (anonymised traffic patterns)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>To review creator applications and manage our talent roster</li>
              <li>To respond to brand briefs and campaign enquiries</li>
              <li>To send campaign briefs, invoices, and payment confirmations</li>
              <li>To provide campaign analytics and performance reporting</li>
              <li>To improve our website and services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Sharing</h2>
            <p className="text-slate-700 mb-3">
              We do not sell your personal information. We share data only with:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Service providers (email delivery, hosting, analytics) under data processing agreements</li>
              <li>Brand partners — only creator information relevant to a specific campaign, and only with creator consent</li>
              <li>Platform APIs (YouTube, Twitch, Kick, TikTok) — to collect performance analytics for managed creators</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Retention</h2>
            <p className="text-slate-700">
              We retain creator and campaign data for the duration of our business relationship plus 7 years for tax and legal compliance. 
              You can request deletion at any time by emailing admin@mobileyes.live.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights</h2>
            <p className="text-slate-700">
              Under Australian Privacy Principles, you have the right to access, correct, or delete your personal information. 
              Contact us at admin@mobileyes.live.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Cookies & Analytics</h2>
            <p className="text-slate-700">
              We use essential cookies for site functionality and analytics cookies (PostHog, Google Analytics) to understand how visitors use our site. 
              You can disable analytics cookies in your browser settings without affecting site functionality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contact</h2>
            <p className="text-slate-700">
              Gamefluence Pty Ltd (trading as Mobileyes)<br />
              ACN 696 199 461<br />
              Sydney, NSW, Australia<br />
              <a href="mailto:admin@mobileyes.live" className="text-blue-600 hover:text-blue-700">admin@mobileyes.live</a>
            </p>
          </div>

          <div className="pt-8 border-t border-slate-200">
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">← Back to home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
