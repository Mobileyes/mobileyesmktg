import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCampaigns } from '@/lib/db'

// GET /api/admin/billing — aggregate financial data from campaigns
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') ?? 'all' // 'this-month', 'this-quarter', 'this-year', 'all'

    const allCampaigns = await getCampaigns({})

    // Filter by period
    const now = new Date()
    const campaigns = allCampaigns.filter(c => {
      if (period === 'all') return true
      const created = new Date(c.createdAt)
      if (period === 'this-month') return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
      if (period === 'this-quarter') {
        const q = Math.floor(now.getMonth() / 3)
        const cq = Math.floor(created.getMonth() / 3)
        return q === cq && created.getFullYear() === now.getFullYear()
      }
      if (period === 'this-year') return created.getFullYear() === now.getFullYear()
      return true
    })

    // Calculate metrics
    const completedCampaigns = campaigns.filter(c => ['APPROVED', 'INVOICED', 'PAID', 'COMPLETE'].includes(c.status))
    const grossBillings = completedCampaigns.reduce((sum, c) => sum + (c.campaignFee ?? 0), 0)
    const totalCommissions = completedCampaigns.reduce((sum, c) => {
      const fee = c.campaignFee ?? 0
      const pct = c.commissionPct ?? 25
      return sum + (fee * pct / 100)
    }, 0)
    const creatorPaymentsOut = grossBillings - totalCommissions
    const netRevenue = totalCommissions

    // Outstanding
    const invoicedNotPaid = campaigns.filter(c => c.status === 'INVOICED')
    const outstandingFromClients = invoicedNotPaid.reduce((sum, c) => sum + (c.campaignFee ?? 0), 0)

    const approvedNotPaid = campaigns.filter(c => c.status === 'APPROVED')
    const outstandingToCreators = approvedNotPaid.reduce((sum, c) => {
      const fee = c.campaignFee ?? 0
      const pct = c.commissionPct ?? 25
      return sum + (fee - (fee * pct / 100))
    }, 0)

    // Pipeline (DRAFT + BRIEFING + SENT + IN_PROGRESS)
    const pipelineCampaigns = campaigns.filter(c => ['DRAFT', 'BRIEFING', 'SENT', 'IN_PROGRESS', 'REVIEW'].includes(c.status))
    const pipelineValue = pipelineCampaigns.reduce((sum, c) => sum + (c.campaignFee ?? 0), 0)
    const pipelineCommission = pipelineCampaigns.reduce((sum, c) => {
      const fee = c.campaignFee ?? 0
      const pct = c.commissionPct ?? 25
      return sum + (fee * pct / 100)
    }, 0)

    // Monthly breakdown
    const monthlyData: Record<string, { gross: number; commission: number; campaigns: number }> = {}
    completedCampaigns.forEach(c => {
      const month = new Date(c.createdAt).toISOString().slice(0, 7) // YYYY-MM
      if (!monthlyData[month]) monthlyData[month] = { gross: 0, commission: 0, campaigns: 0 }
      monthlyData[month].gross += c.campaignFee ?? 0
      monthlyData[month].commission += (c.campaignFee ?? 0) * (c.commissionPct ?? 25) / 100
      monthlyData[month].campaigns++
    })

    return NextResponse.json({
      metrics: {
        grossBillings,
        totalCommissions,
        creatorPaymentsOut,
        netRevenue,
        outstandingFromClients,
        outstandingToCreators,
        pipelineValue,
        pipelineCommission,
      },
      counts: {
        totalCampaigns: campaigns.length,
        completedCampaigns: completedCampaigns.length,
        activePipeline: pipelineCampaigns.length,
        invoicedNotPaid: invoicedNotPaid.length,
      },
      monthly: Object.entries(monthlyData).sort((a, b) => a[0].localeCompare(b[0])).map(([month, data]) => ({
        month,
        ...data,
      })),
    })
  } catch (err) {
    console.error('Billing API error:', err)
    return NextResponse.json({ error: 'Failed to fetch billing data' }, { status: 500 })
  }
}
