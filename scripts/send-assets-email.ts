import { config } from 'dotenv'
config({ path: '.env.local' })

async function main() {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Mobileyes <admin@mobileyes.live>',
      to: ['joelamoskirk@gmail.com', 'admin@mobileyes.live'],
      subject: '🖨️ Officeworks Print Assets — Business Cards + T-Shirt',
      html: `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1e293b">
<h1 style="font-size:20px">Officeworks Print Assets</h1>
<p style="color:#64748b;font-size:13px">All files below are SVG. Open each link in Chrome → Right-click → Save Image As → PNG. Upload that PNG to Officeworks.</p>

<h2 style="font-size:16px;border-bottom:2px solid #EF4444;padding-bottom:6px;margin-top:24px">📇 Business Cards (90mm × 55mm)</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px">
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Front</td><td style="padding:8px;border:1px solid #e2e8f0"><a href="https://mobileyes.live/Mobileyes_BusinessCard_Front.svg">mobileyes.live/Mobileyes_BusinessCard_Front.svg</a></td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Back</td><td style="padding:8px;border:1px solid #e2e8f0"><a href="https://mobileyes.live/Mobileyes_BusinessCard_Back.svg">mobileyes.live/Mobileyes_BusinessCard_Back.svg</a></td></tr>
</table>
<p style="font-size:12px;color:#64748b">Contains: QR code linking to mobileyes.live/creators (UTM: event/qr_code/supanova). joel@mobileyes.live on front.</p>

<h2 style="font-size:16px;border-bottom:2px solid #3B82F6;padding-bottom:6px;margin-top:24px">👕 T-Shirt (Black, Size L)</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px">
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Front (left chest)</td><td style="padding:8px;border:1px solid #e2e8f0"><a href="https://mobileyes.live/Tshirt_Front_LeftChest.svg">mobileyes.live/Tshirt_Front_LeftChest.svg</a></td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Back (full)</td><td style="padding:8px;border:1px solid #e2e8f0"><a href="https://mobileyes.live/Tshirt_Back_Full.svg">mobileyes.live/Tshirt_Back_Full.svg</a></td></tr>
</table>
<p style="font-size:12px;color:#64748b">Front: icon + MOBILEYES + tagline (left chest). Back: icon + MOBILEYES + tagline + QR + "Get paid to play". QR links to mobileyes.live/creators (UTM tracked).</p>

<h2 style="font-size:16px;border-bottom:2px solid #EF4444;padding-bottom:6px;margin-top:24px">📋 Officeworks Instructions</h2>
<ol style="font-size:13px;padding-left:18px">
<li style="margin:6px 0"><strong>Business Cards:</strong> <a href="https://www.officeworks.com.au/print-copy/c/pcc/business-cards">officeworks.com.au/print-copy/c/pcc/business-cards</a> → Upload design → Standard 90×55mm → Front + Back</li>
<li style="margin:6px 0"><strong>T-Shirt:</strong> <a href="https://www.officeworks.com.au/print-copy/p/t-shirt-printing-pcaptshcp">officeworks.com.au/print-copy/p/t-shirt-printing-pcaptshcp</a> → Black shirt, Size L → Front print (left chest) + Back print (full)</li>
<li style="margin:6px 0">Select <strong>Click &amp; Collect</strong> for same-day pickup</li>
<li style="margin:6px 0">Files must be PNG. Open SVG links in Chrome → right-click image → "Save image as" → save as PNG → upload to Officeworks</li>
</ol>

<h2 style="font-size:16px;border-bottom:2px solid #3B82F6;padding-bottom:6px;margin-top:24px">⚠️ Important Notes</h2>
<ul style="font-size:13px;padding-left:18px">
<li style="margin:4px 0">T-shirt designs have black backgrounds for preview only — when saving as PNG for upload, the black simulates the shirt. Officeworks DTG will print the white/red elements onto their black garment.</li>
<li style="margin:4px 0">Business cards: the dark background IS part of the design (printed edge-to-edge)</li>
<li style="margin:4px 0">QR code is LIVE and tracked — scans will register in PostHog</li>
</ul>

<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8">
Mobileyes · Supanova Prep · June 2026
</div>
</div>`,
    }),
  })
  const data = await res.json()
  console.log('Email sent:', data)
}

main().catch(console.error)
