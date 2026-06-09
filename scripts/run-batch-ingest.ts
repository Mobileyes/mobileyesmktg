/**
 * Run batch ingest locally using firebase-admin credentials.
 * Execute: npx tsx scripts/run-batch-ingest.ts
 */

// Load env vars
import { config } from 'dotenv'
config({ path: '.env.local' })

// Set Google credentials for local Firestore access
process.env.GOOGLE_APPLICATION_CREDENTIALS = './firebase-service-account.json'

import { batchIngestCreators } from '../lib/batch-ingest'

const NATHAN_BATCH_1 = [
  // Confirmed TikTok handles
  'https://www.tiktok.com/@claudiaarose15',
  'https://www.youtube.com/@theroject',
  'https://www.tiktok.com/@stackgemma',
  'https://www.tiktok.com/@isabella.mcgavin',

  // Confirmed Instagram/custom domains — use email resolution
  'roj@theroject.com',
  'cast@thecastpatrol.com.au',
  'contact@wordsbyamber.com',
  'tamaradavisholland@gmail.com',
  'jasmin.deang@gmail.com',
  'lily.noonan97@gmail.com',
  'elizaanneboyd@gmail.com',
  'aaronboundy10@gmail.com',
  'jessicarose1901@gmail.com',
  'kjvelos@outlook.com',
  'violetscully12@gmail.com',
  'my3ratbagz@gmail.com',
  'collabwithkrystel@gmail.com',
  'joycevillareal94@gmail.com',
]

async function main() {
  console.log('🚀 Starting Nathan Batch 1 Ingest...')
  console.log(`   ${NATHAN_BATCH_1.length} entries to process\n`)

  const results = await batchIngestCreators(NATHAN_BATCH_1, 'FABULATE', 'Nathan Batch 1 - June 2026')

  console.log('\n═══════════════════════════════════════')
  console.log('   BATCH INGEST RESULTS')
  console.log('═══════════════════════════════════════\n')

  const matched = results.filter(r => r.status === 'CREATED' || r.status === 'MATCHED')
  const notFound = results.filter(r => r.status === 'NOT_FOUND')
  const errors = results.filter(r => r.status === 'ERROR')
  const existing = results.filter(r => r.status === 'ALREADY_EXISTS')

  console.log(`✅ Created/Matched: ${matched.length}`)
  console.log(`❌ Not Found: ${notFound.length}`)
  console.log(`⚠️  Errors: ${errors.length}`)
  console.log(`📋 Already Exists: ${existing.length}`)
  console.log('')

  // Print matched creators
  if (matched.length > 0) {
    console.log('── SUCCESSFULLY INGESTED ──────────────')
    for (const r of matched) {
      console.log(`  ${r.matchedHandle ?? r.input}`)
      console.log(`    Platform: ${r.matchedPlatform}`)
      console.log(`    Followers: ${r.followerCount?.toLocaleString() ?? 'Unknown'}`)
      console.log(`    Engagement: ${r.engagementRate ? `${r.engagementRate}%` : 'N/A'}`)
      console.log(`    Tier: ${r.marketTier}`)
      console.log(`    Rate: ${r.estimatedRate ?? 'N/A'}`)
      console.log(`    MBL ID: ${r.mblId}`)
      console.log('')
    }
  }

  // Print not found
  if (notFound.length > 0) {
    console.log('── NOT FOUND (manual lookup needed) ──')
    for (const r of notFound) {
      console.log(`  ❌ ${r.input}`)
      console.log(`     Reason: ${r.error}`)
      console.log('')
    }
  }

  // Print errors
  if (errors.length > 0) {
    console.log('── ERRORS ────────────────────────────')
    for (const r of errors) {
      console.log(`  ⚠️  ${r.input}: ${r.error}`)
    }
  }

  console.log('\n═══════════════════════════════════════')
  console.log('   Done. Check /admin/creators in dashboard.')
  console.log('═══════════════════════════════════════')
}

main().catch(console.error)
