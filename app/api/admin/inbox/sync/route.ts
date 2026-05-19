import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { briefExistsByGmailId, createInboxBrief } from '@/lib/db'
import { createDossier } from '@/lib/db/dossiers'
import { isFabulateEmail, extractCreatorHandles, researchCreator } from '@/lib/fabulate'

// GET /api/admin/inbox/sync — sync campaigns@ inbox to Firestore
// Called by: Vercel cron every 15 minutes + manual trigger
export async function GET() {
  try {
    if (
      !process.env.GMAIL_CLIENT_ID ||
      !process.env.GMAIL_CLIENT_SECRET ||
      !process.env.GMAIL_REFRESH_TOKEN ||
      process.env.GMAIL_REFRESH_TOKEN === 'PLACEHOLDER'
    ) {
      return NextResponse.json({
        synced: false,
        message: 'Gmail API credentials not configured',
      })
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET
    )
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    })

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread label:inbox',
      maxResults: 20,
    })

    let syncedCount = 0
    const dossiersPending: string[] = []

    for (const message of response.data.messages ?? []) {
      const exists = await briefExistsByGmailId(message.id!)
      if (exists) continue

      const full = await gmail.users.messages.get({
        userId: 'me',
        id: message.id!,
      })
      const headers = full.data.payload?.headers ?? []
      const subject = headers.find((h) => h.name === 'Subject')?.value ?? '(No subject)'
      const from = headers.find((h) => h.name === 'From')?.value ?? '(Unknown)'
      const bodyPreview = full.data.snippet ?? ''

      const brief = await createInboxBrief({
        gmailMessageId: message.id!,
        from,
        subject,
        bodyPreview,
        receivedAt: new Date(Number(full.data.internalDate)).toISOString(),
      })

      syncedCount++

      // If from Fabulate, auto-create dossiers for extracted creator handles
      if (isFabulateEmail(from)) {
        const handles = extractCreatorHandles(bodyPreview + ' ' + subject)
        for (const handle of handles) {
          const research = await researchCreator(handle)
          await createDossier({
            creatorHandle: handle.handle,
            platform: handle.platform,
            handleUrl: handle.url,
            followerCount: research.followerCount,
            avgViews: research.avgViews,
            engagementRate: research.engagementRate,
            audienceLocation: research.audienceLocation,
            contentNiche: research.contentNiche,
            recentBrandDeals: research.recentBrandDeals,
            estimatedRateLow: research.estimatedRate?.low ?? null,
            estimatedRateHigh: research.estimatedRate?.high ?? null,
            rateBasis: research.estimatedRate?.basis ?? null,
            fitScore: 50,
            redFlags: [],
            briefingNotes: [research.notes],
            campaignId: null,
            inboxBriefId: brief.id,
            researchedAt: new Date().toISOString(),
            status: 'PENDING',
          })
          dossiersPending.push(handle.handle)
        }
      }
    }

    return NextResponse.json({
      synced: true,
      count: syncedCount,
      dossiersPending,
    })
  } catch (err) {
    console.error('Error syncing inbox:', err)
    return NextResponse.json({ synced: false, error: 'Sync failed' }, { status: 500 })
  }
}
