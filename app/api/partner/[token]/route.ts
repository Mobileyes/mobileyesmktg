import { NextResponse } from 'next/server'
import { verifyPartnerToken } from '@/lib/partner-token'
import { getPartner } from '@/lib/db/partners'
import { getCampaign, getCampaignCreators } from '@/lib/db'
import { getVerificationsForCampaign } from '@/lib/db/verifications'
import { getCreator } from '@/lib/db/creators'

/**
 * GET /api/partner/[token]
 * 
 * Partner dashboard API. Returns:
 * - Partner profile
 * - Their campaigns with status/revenue
 * - Their creators with performance
 * - Conversion tracking (promo codes, UTM)
 * - Earnings summary
 * 
 * No auth required — secured via signed token (90-day expiry).
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params

    const partnerId = await verifyPartnerToken(token)
    if (!partnerId) {
      return NextResponse.json({ error: 'Invalid or expired link' }, { status: 401 })
    }

    const partner = await getPartner(partnerId)
    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
    }

    // Fetch campaigns
    const campaigns = []
    for (const campaignId of partner.campaignIds) {
      const campaign = await getCampaign(campaignId)
      if (!campaign) continue

      const creators = await getCampaignCreators(campaignId)
      const verifications = await getVerificationsForCampaign(campaignId)

      const approvedVerifications = verifications.filter(v => v.status === 'APPROVED')
      const totalViews = verifications.reduce((sum, v) => sum + (v.viewCountAtDetection ?? 0), 0)

      campaigns.push({
        id: campaign.id,
        mblId: campaign.mblId,
        title: campaign.title,
        status: campaign.status,
        creatorsCount: creators.length,
        totalViews,
        verificationsApproved: approvedVerifications.length,
        verificationsPending: verifications.filter(v => v.status === 'PENDING').length,
        promoCodesDetected: verifications.filter(v => v.promoCodeDetected).length,
        utmLinksDetected: verifications.filter(v => v.utmLinkDetected).length,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
      })
    }

    // Fetch creators
    const creators = []
    for (const creatorId of partner.creatorIds) {
      const creator = await getCreator(creatorId)
      if (!creator) continue
      creators.push({
        id: creator.id,
        mblId: creator.mblId,
        fullName: creator.fullName,
        platform: creator.platform,
        handleUrl: creator.handleUrl,
        followerCount: creator.followerCount,
        status: creator.status,
        contentNiche: creator.contentNiche,
      })
    }

    // Build summary
    const summary = {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => !['COMPLETE', 'PAID'].includes(c.status)).length,
      totalCreators: creators.length,
      totalViews: campaigns.reduce((sum, c) => sum + c.totalViews, 0),
      totalVerified: campaigns.reduce((sum, c) => sum + c.verificationsApproved, 0),
      totalPromoRedemptions: campaigns.reduce((sum, c) => sum + c.promoCodesDetected, 0),
      referralEarnings: partner.totalReferralEarnings,
    }

    return NextResponse.json({
      partner: {
        name: partner.name,
        company: partner.company,
        tier: partner.tier,
        tags: partner.tags,
      },
      summary,
      campaigns,
      creators,
    })
  } catch (err) {
    console.error('Partner dashboard error:', err)
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 })
  }
}
