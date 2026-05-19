import Link from 'next/link'

export default function TermsPage() {
  return (
    <div>
      <section className="bg-slate-950 text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
          <p className="text-slate-400 mt-4">Last updated: May 2026</p>
        </div>
      </section>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. About These Terms</h2>
            <p className="text-slate-700 leading-relaxed">
              These terms govern your use of the Mobileyes website (mobileyes.live) operated by 
              Gamefluence Pty Ltd (ACN 696 199 461), trading as Mobileyes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Creator Representation</h2>
            <p className="text-slate-700 mb-3">
              Creator representation is governed by individual framework agreements between Gamefluence Pty Ltd 
              and each managed creator. Key terms include:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Standard commission: 25% of campaign fees (negotiable per campaign)</li>
              <li>Payment terms: within 4 days of content approval by the brand</li>
              <li>Non-exclusive representation unless otherwise agreed in writing</li>
              <li>Either party may terminate with 30 days written notice</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Campaign Terms</h2>
            <p className="text-slate-700 mb-3">
              Campaign terms are agreed per campaign between Mobileyes and the brand/agency. Standard terms:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Payment due within 4 days of invoice issue date</li>
              <li>All invoices issued in AUD unless otherwise agreed</li>
              <li>Content usage rights as specified in each campaign brief</li>
              <li>Cancellation fees apply if campaign is cancelled after creator briefing</li>
              <li>Campaign analytics provided within 48 hours of content completion</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Website Use</h2>
            <p className="text-slate-700 mb-3">By using this website you agree not to:</p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Submit false or misleading information in any form</li>
              <li>Attempt to access restricted areas of the site</li>
              <li>Use automated tools to scrape or collect data from the site</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Intellectual Property</h2>
            <p className="text-slate-700">
              The Mobileyes name, logo, and website content are the property of Gamefluence Pty Ltd. 
              Creator content remains the intellectual property of the creator unless otherwise agreed in campaign terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Limitation of Liability</h2>
            <p className="text-slate-700">
              To the maximum extent permitted by Australian law, Gamefluence Pty Ltd is not liable for 
              indirect, incidental, or consequential damages arising from use of this website or our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Governing Law</h2>
            <p className="text-slate-700">
              These terms are governed by the laws of New South Wales, Australia. 
              Any disputes will be resolved in the courts of New South Wales.
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
