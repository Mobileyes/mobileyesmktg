import { NextResponse } from 'next/server'
import { runBatchVerification } from '@/lib/verification-engine'

/**
 * GET /api/admin/verifications/check
 * 
 * Vercel cron job — runs every 15 minutes.
 * Checks all active campaigns for new creator content,
 * scrapes attribution layer, captures proof, queues for approval.
 * 
 * Add to vercel.json:
 * { "crons": [{ "path": "/api/admin/verifications/check", "schedule": "0/15 * * * *" }] }
 */
export async function GET(request: Request) {
  // Verify cron secret (Vercel sends CRON_SECRET header)
  // FAIL-CLOSED: if CRON_SECRET is not configured, reject all requests
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    console.error('CRON_SECRET not configured — verification check endpoint disabled')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const results = await runBatchVerification()

    return NextResponse.json({
      success: true,
      ...results,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Verification check cron error:', err)
    return NextResponse.json({ error: 'Verification check failed' }, { status: 500 })
  }
}
