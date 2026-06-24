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
      to: ['admin@mobileyes.live', 'joelamoskirk@gmail.com'],
      subject: '🎮 SUPANOVA SYDNEY — Your Battle Plan (June 19-21)',
      html: getEmailHtml(),
    }),
  })
  const data = await res.json()
  console.log('Email sent:', data)
}

function getEmailHtml() {
  return `<div style="font-family:-apple-system,sans-serif;max-width:640px;margin:0 auto;padding:20px;color:#1e293b">
<div style="background:#0B0F2E;color:white;padding:28px 24px;border-radius:12px 12px 0 0">
<div style="display:inline-block;width:10px;height:10px;background:#EF4444;border-radius:50%;margin-right:8px"></div>
<strong style="font-size:13px;letter-spacing:0.03em">MOBILEYES × GAMEFLUENCE</strong>
<h1 style="margin-top:12px;font-size:22px;color:white">Supanova Sydney — Battle Plan</h1>
<p style="color:rgba(255,255,255,0.6);font-size:12px">June 19–21, 2026 · Sydney Showgrounds · Ticket ID: 46963932</p>
</div>

<div style="background:white;padding:24px;border:1px solid #e2e8f0;border-radius:0 0 12px 12px">

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #EF4444;padding-bottom:6px">📍 Event Intel</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px">
<tr><td style="padding:8px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0;width:120px">Dates</td><td style="padding:8px;border:1px solid #e2e8f0">Friday 19 June (Level Up) → Sunday 21 June</td></tr>
<tr><td style="padding:8px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0">Location</td><td style="padding:8px;border:1px solid #e2e8f0">Sydney Showground, Sydney Olympic Park, NSW</td></tr>
<tr><td style="padding:8px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0">Your Pass</td><td style="padding:8px;border:1px solid #e2e8f0">3-Day Supa-Fan Weekend Pass (Ticket #46963932)</td></tr>
<tr><td style="padding:8px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0">Hours</td><td style="padding:8px;border:1px solid #e2e8f0">Fri 10AM–6PM · Sat–Sun 10AM–6PM</td></tr>
</table>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #3B82F6;padding-bottom:6px;margin-top:28px">🎯 Your Mission</h2>
<ol style="padding-left:18px;font-size:14px">
<li style="margin:8px 0"><strong>Scout gaming/streaming creators</strong> — walk the floor, look for content creators filming, cosplayers with followings, Twitch/YouTube personalities</li>
<li style="margin:8px 0"><strong>Network with gaming brands</strong> — visit PlayStation, Xbox, Bandai Namco, Nintendo, indie booths. Collect marketing contacts.</li>
<li style="margin:8px 0"><strong>Attend Level Up (Friday)</strong> — career panels, industry networking. Your B2B day.</li>
<li style="margin:8px 0"><strong>Post content from the event</strong> — TikTok from the floor, tag @mobileyes.live. Prove you are in the scene.</li>
<li style="margin:8px 0"><strong>Collect contacts</strong> — business cards, LinkedIn, IG follows. Every interaction = potential lead.</li>
</ol>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #EF4444;padding-bottom:6px;margin-top:28px">🏢 Brands to Find at Booths</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px">
<tr style="background:#f8fafc"><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Brand</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Why</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Ask For</th></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">PlayStation ANZ</td><td style="padding:8px;border:1px solid #e2e8f0">Major publisher, always activating</td><td style="padding:8px;border:1px solid #e2e8f0">Marketing/PR contact for creator campaigns</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Xbox ANZ</td><td style="padding:8px;border:1px solid #e2e8f0">Game Pass launches need creator reach</td><td style="padding:8px;border:1px solid #e2e8f0">Community/influencer marketing lead</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Bandai Namco ANZ</td><td style="padding:8px;border:1px solid #e2e8f0">Anime + gaming (Dragon Ball, Tekken)</td><td style="padding:8px;border:1px solid #e2e8f0">AU marketing manager</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Nintendo ANZ</td><td style="padding:8px;border:1px solid #e2e8f0">Selective, high-budget creator partnerships</td><td style="padding:8px;border:1px solid #e2e8f0">PR agency name (usually external)</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Indie Studios</td><td style="padding:8px;border:1px solid #e2e8f0">Launching titles, need awareness</td><td style="padding:8px;border:1px solid #e2e8f0">Budget + launch date + platform</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Hardware (Logitech, Razer, HyperX)</td><td style="padding:8px;border:1px solid #e2e8f0">Peripheral launches, creator sponsorships</td><td style="padding:8px;border:1px solid #e2e8f0">AU marketing contact</td></tr>
</table>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #3B82F6;padding-bottom:6px;margin-top:28px">🎤 Key Guests (Creator Angles)</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px">
<tr style="background:#f8fafc"><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Guest</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Relevance</th></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Adam Savage</td><td style="padding:8px;border:1px solid #e2e8f0">YouTube creator (Tested, 6M+), maker/cosplay community leader. Talk to him about AU creator ecosystem.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Karl Urban</td><td style="padding:8px;border:1px solid #e2e8f0">The Boys / Dredd — massive fandom. Sydney exclusive. Content opp: photo/video near his panel.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Simon Pegg</td><td style="padding:8px;border:1px solid #e2e8f0">Star Trek/MI franchise. Geek culture icon. Content opp.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Japanese VA Stars (TokuSpirits)</td><td style="padding:8px;border:1px solid #e2e8f0">Anime community crossover. Niche but hyper-engaged audience.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">AU Animation Creators</td><td style="padding:8px;border:1px solid #e2e8f0">Upside Down Animation, Princess Bento Studio — local talent to potentially represent.</td></tr>
</table>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #EF4444;padding-bottom:6px;margin-top:28px">💬 Qualification Questions (at brand booths)</h2>
<ol style="padding-left:18px;font-size:13px">
<li style="margin:6px 0">"What does your creator/influencer marketing look like for ANZ launches?"</li>
<li style="margin:6px 0">"Who handles influencer partnerships in AU — in-house or agency?"</li>
<li style="margin:6px 0">"Any upcoming titles launching in the next 3-6 months?"</li>
<li style="margin:6px 0">"What platforms matter most for your audience?"</li>
<li style="margin:6px 0">"Open to a quick chat next week about how we work with gaming creators?"</li>
</ol>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #3B82F6;padding-bottom:6px;margin-top:28px">📋 Day-by-Day Plan</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:13px">
<tr style="background:#f8fafc"><th style="padding:8px;border:1px solid #e2e8f0">Day</th><th style="padding:8px;border:1px solid #e2e8f0">Focus</th><th style="padding:8px;border:1px solid #e2e8f0">Output</th></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Friday 19 (Level Up)</td><td style="padding:8px;border:1px solid #e2e8f0">B2B networking, panels, brand contacts</td><td style="padding:8px;border:1px solid #e2e8f0">Industry contacts, 2-3 TikToks</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Saturday 20</td><td style="padding:8px;border:1px solid #e2e8f0">Biggest day. All booths. Brand marketing teams. Scout creators.</td><td style="padding:8px;border:1px solid #e2e8f0">Brand leads, creator contacts, floor content</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Sunday 21</td><td style="padding:8px;border:1px solid #e2e8f0">Follow-up conversations. Quieter, deeper chats.</td><td style="padding:8px;border:1px solid #e2e8f0">Confirmed meetings for next week</td></tr>
</table>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #EF4444;padding-bottom:6px;margin-top:28px">📱 Content to Post</h2>
<ul style="padding-left:18px;font-size:13px">
<li style="margin:6px 0">TikTok: floor walks, booths, cosplay, energy — stories > polished</li>
<li style="margin:6px 0">Tag brands whose booths you visit</li>
<li style="margin:6px 0">Catch creators filming = your intro opportunity</li>
<li style="margin:6px 0">Post to @mobileyes.live — shows you are active and present</li>
</ul>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #3B82F6;padding-bottom:6px;margin-top:28px">🎒 Bring</h2>
<ul style="padding-left:18px;font-size:13px">
<li>Phone charged + portable charger</li>
<li>QR code to mobileyes.live on phone</li>
<li>Notebook for capturing conversations</li>
<li>Comfortable shoes (15K+ steps)</li>
</ul>

<div style="margin-top:28px;padding:16px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px">
<strong style="color:#1d4ed8;font-size:13px">🔑 Elevator Pitch (10 seconds):</strong>
<p style="font-size:14px;margin-top:8px;color:#1e293b">"I run Mobileyes and Gamefluence — we represent gaming and streaming creators for brand campaigns across ANZ. Tech-verified delivery, 4-day creator payment. We prove performance with data, not promises."</p>
</div>

<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8">
Mobileyes × Gamefluence · Supanova Battle Plan · June 2026<br>
Joel Kirk · Founder · admin@mobileyes.live · mobileyes.live
</div>
</div></div>`
}

main().catch(console.error)
