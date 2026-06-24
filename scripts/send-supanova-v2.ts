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
      subject: '🎯 SUPANOVA V2 — Gaming Creator Scouting List (Micro/Macro Targets)',
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
<strong style="font-size:13px;letter-spacing:0.03em">GAMEFLUENCE × MOBILEYES</strong>
<h1 style="margin-top:12px;font-size:20px;color:white">Supanova Creator Scouting — Micro/Macro Targets</h1>
<p style="color:rgba(255,255,255,0.6);font-size:12px">June 19–21 · Sydney Showgrounds · Who to find on the floor</p>
</div>

<div style="background:white;padding:24px;border:1px solid #e2e8f0;border-radius:0 0 12px 12px">

<div style="background:#eff6ff;border:1px solid #bfdbfe;padding:14px;border-radius:8px;margin-bottom:20px">
<strong style="color:#1d4ed8;font-size:12px">WHY MICRO/MACRO GAMING CREATORS:</strong>
<p style="font-size:13px;margin-top:6px;color:#1e293b">The big AU names (Loserfruit 2.9M, LazarBeam 23M, Lachlan 15M, MrFreshAsian 6M) are all repped by Click/PWR/Luminosity. Gamefluence's opportunity is the 5K–100K tier: un-repped, growing, genuine engagement, hungry for proper brand deals, and currently leaving money on the table because nobody is negotiating for them. These creators will be ON THE FLOOR at Supanova as attendees — not behind signing tables.</p>
</div>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #EF4444;padding-bottom:6px">🎮 MACRO TARGETS (50K–500K) — Aware, Approach Later</h2>
<p style="font-size:12px;color:#64748b;margin-bottom:12px">These are bigger names likely at Supanova. Note them, see if they're repped. If independent, that's gold.</p>

<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:12px">
<tr style="background:#f8fafc"><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Creator</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Platform</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Size</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Notes</th></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">David Wellman</td><td style="padding:8px;border:1px solid #e2e8f0">YouTube/IG</td><td style="padding:8px;border:1px solid #e2e8f0">465K IG, 170K YT</td><td style="padding:8px;border:1px solid #e2e8f0">Retro gaming + ASMR. Daily content. AU-based. Likely independent. Check for management.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Crayator</td><td style="padding:8px;border:1px solid #e2e8f0">YouTube/Twitch</td><td style="padding:8px;border:1px solid #e2e8f0">389K IG, ~1M YT</td><td style="padding:8px;border:1px solid #e2e8f0">Fortnite/variety. Was in Click Mgmt orbit. May be independent now — verify. Sydney.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">BazzaGazza</td><td style="padding:8px;border:1px solid #e2e8f0">YouTube/Twitch</td><td style="padding:8px;border:1px solid #e2e8f0">~500K YT</td><td style="padding:8px;border:1px solid #e2e8f0">Variety gaming, comedy. AU-based. Check rep status.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">WolfCryGaming</td><td style="padding:8px;border:1px solid #e2e8f0">YouTube/TikTok</td><td style="padding:8px;border:1px solid #e2e8f0">~50K</td><td style="padding:8px;border:1px solid #e2e8f0">Xbox achievement hunter. 3M+ Gamerscore. Adelaide but likely at Supanova. Niche but dedicated audience.</td></tr>
</table>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #3B82F6;padding-bottom:6px;margin-top:28px">🎯 MICRO TARGETS (5K–50K) — Your Sweet Spot</h2>
<p style="font-size:12px;color:#64748b;margin-bottom:12px">These are the un-repped creators walking the floor. They have real engagement, growing audiences, and zero management infrastructure. This is where Gamefluence wins.</p>

<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:12px">
<tr style="background:#f8fafc"><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Type</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Where to Spot Them</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">What to Say</th></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Twitch/Kick Streamers (5K–30K)</td><td style="padding:8px;border:1px solid #e2e8f0">Walking floor with ring lights, filming "IRL" streams, wearing merch with their own branding, at gaming booth activations</td><td style="padding:8px;border:1px solid #e2e8f0">"Hey, I noticed you streaming/filming — are you on Twitch? I run a gaming talent agency. We do 4-day payment and tech-verified campaigns. Can I grab your handle?"</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Cosplay Creators (10K–100K)</td><td style="padding:8px;border:1px solid #e2e8f0">In elaborate costumes with photographers, posing for group shots, with followers asking for photos. Check their badge — many have creator/exhibitor passes.</td><td style="padding:8px;border:1px solid #e2e8f0">"Your costume is insane. Do you post your builds on TikTok/IG? I represent gaming and cosplay creators for brand campaigns — would love to chat if you're open to it."</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Gaming TikTokers (10K–50K)</td><td style="padding:8px;border:1px solid #e2e8f0">Filming short-form at booths, doing "POV" content, reaction videos to merch/games. Usually in small groups. Phone always out with ring light attachment.</td><td style="padding:8px;border:1px solid #e2e8f0">"Are you creating content here? What's your TikTok? We work with gaming creators on brand campaigns — 4-day payment, no BS."</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Artist Alley Creators</td><td style="padding:8px;border:1px solid #e2e8f0">Alley section — artists selling prints/merch who also have large social followings from their art content. These are often 20K–100K on IG/TikTok.</td><td style="padding:8px;border:1px solid #e2e8f0">"Your art is great — do you do brand collaborations? We represent creators who work with gaming and pop culture brands."</td></tr>
</table>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #EF4444;padding-bottom:6px;margin-top:28px">🔍 How to Identify Un-Repped Creators on the Floor</h2>
<ol style="padding-left:18px;font-size:13px">
<li style="margin:6px 0"><strong>Check their bio on the spot:</strong> Pull up their TikTok/IG/Twitch. If bio says "managed by" or "bookings@agency.com" — they're taken. If it just has a personal email or no management mention — they're independent.</li>
<li style="margin:6px 0"><strong>Ask directly:</strong> "Do you have a manager or agency handling your brand deals?" — it's not weird at a convention. They'll tell you.</li>
<li style="margin:6px 0"><strong>Look for the pain signals:</strong> "I've done a few brand deals but they always pay late" / "I don't know what to charge" / "I get DMs from brands but never know if they're legit" — these are your sign-up signals.</li>
<li style="margin:6px 0"><strong>Creator badges:</strong> Supanova often gives creators special passes. Look for different coloured lanyards/badges — they indicate exhibitors or media/creator attendees vs general public.</li>
</ol>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #3B82F6;padding-bottom:6px;margin-top:28px">💰 Why They Should Sign (your talking points)</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:12px">
<tr style="background:#f8fafc"><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Pain Point</th><th style="padding:8px;border:1px solid #e2e8f0;text-align:left">Your Answer</th></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0">"Brands pay me 30-90 days late"</td><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">We pay in 4 business days. We carry the float. You never chase an invoice.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0">"I don't know what to charge"</td><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">We negotiate rates based on market data. We know what brands pay because we've been on their side for 20 years.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0">"I get random DMs from brands"</td><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">We filter. You only see briefs that match your audience. No spray-and-pray.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0">"How do I prove my content worked?"</td><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">Tech-verified delivery. We auto-detect your content, capture proof, fire attribution events to brand ad dashboards.</td></tr>
<tr><td style="padding:8px;border:1px solid #e2e8f0">"Other agencies take 30-40%"</td><td style="padding:8px;border:1px solid #e2e8f0;font-weight:bold">We take 20%. And we pay faster. The maths is simple.</td></tr>
</table>

<h2 style="font-size:16px;color:#0f172a;border-bottom:2px solid #EF4444;padding-bottom:6px;margin-top:28px">📱 Immediate Action When You Meet Someone</h2>
<ol style="padding-left:18px;font-size:13px">
<li style="margin:6px 0">Get their handle (TikTok/Twitch/YouTube/Kick)</li>
<li style="margin:6px 0">Follow them from @mobileyes.live right there</li>
<li style="margin:6px 0">Show them mobileyes.live on your phone (the video hero proves you're legit)</li>
<li style="margin:6px 0">Say: "I'll DM you after the weekend — no pressure, just a chat about what we do"</li>
<li style="margin:6px 0">Note down: name, handle, platform, rough follower count, what games/content, repped Y/N</li>
</ol>

<div style="margin-top:24px;padding:16px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px">
<strong style="color:#dc2626;font-size:12px">⚠️ DO NOT:</strong>
<ul style="padding-left:16px;font-size:12px;margin-top:6px;color:#1e293b">
<li>Hard sell on the floor — this is a first touch only</li>
<li>Promise specific brand deals or money</li>
<li>Approach anyone mid-stream/mid-content (wait until they're done)</li>
<li>Approach creators who clearly have management (matching merch, handlers, booth space)</li>
</ul>
</div>

<div style="margin-top:24px;padding:16px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px">
<strong style="color:#166534;font-size:12px">✅ REMEMBER:</strong>
<p style="font-size:13px;margin-top:6px;color:#1e293b">The goal is NOT to sign anyone at Supanova. The goal is to collect 10-20 handles of un-repped gaming creators you can DM next week with a proper personalised message. First touch today, sign next week.</p>
</div>

<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8">
Gamefluence × Mobileyes · Supanova Creator Scouting v2 · June 2026<br>
Joel Kirk · Founder · admin@mobileyes.live · mobileyes.live
</div>
</div></div>`
}

main().catch(console.error)
