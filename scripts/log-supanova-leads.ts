import { config } from 'dotenv'
config({ path: '.env.local' })
process.env.GOOGLE_APPLICATION_CREDENTIALS = './firebase-service-account.json'

async function main() {
  const { getAdminDb } = await import('../lib/firebase-admin')
  const db = getAdminDb()
  const now = new Date().toISOString()

  const leads = [
    {
      companyName: 'Jamin Games',
      contactName: 'Ben Molenaar',
      contactTitle: 'Lead Developer',
      contactEmail: 'ben@jamingames.com.au',
      website: 'jamingames.com.au',
      type: 'STUDIO',
      source: 'SUPANOVA_JUN2026',
      notes: 'Indie game studio. Met at Supanova Sydney June 2026. Potential brand client — would hire creators to stream/promote their games.',
      status: 'MET',
      createdAt: now,
    },
    {
      companyName: 'TKFY - The Kids From Yesterday',
      contactName: 'Mike Roberts',
      contactTitle: 'Studio Head & Creator',
      contactEmail: 'mike@tkfy.co',
      website: 'tkfy.co',
      type: 'STUDIO',
      source: 'SUPANOVA_JUN2026',
      notes: 'Indie studio with uber-style game. Perfect for sim rig creators collab. Mike is also a creator. Met at Supanova Sydney June 2026. HIGH POTENTIAL — log for future collab.',
      status: 'MET',
      createdAt: now,
    },
    {
      companyName: 'Dawoozles',
      contactName: 'Dawoozles',
      contactTitle: 'Indie Developer',
      contactEmail: 'dawoozles@gmail.com',
      website: 'dawoozles.itch.io',
      type: 'STUDIO',
      source: 'SUPANOVA_JUN2026',
      notes: 'Indie game dev on itch.io. Met at Supanova Sydney June 2026. Potential brand client for creator campaigns when launching titles.',
      status: 'MET',
      createdAt: now,
    },
  ]

  for (const lead of leads) {
    const ref = await db.collection('brandLeads').add(lead)
    console.log(`✅ ${lead.companyName} — ${ref.id}`)
  }
  console.log('\nAll 3 Supanova brand leads logged to Firestore.')
}

main().catch(console.error)
