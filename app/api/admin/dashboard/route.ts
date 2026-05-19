import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCreators, getOpenCampaigns, getBillingMetrics, getPaymentMetrics, getUnreadCount } from '@/lib/db'

// GET /api/admin/dashboard — all dashboard metrics in one call
export async function GET(request: Request) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    const [creators, openCampaigns, billing, payments, unreadInbox] = await Promise.all([
      getCreators('ACTIVE'),
      getOpenCampaigns(),
      getBillingMetrics(startOfMonth),
      getPaymentMetrics(startOfMonth),
      getUnreadCount(),
    ])

    return NextResponse.json({
      activeCreators: creators.length,
      openCampaigns: openCampaigns.length,
      monthlyBillings: billing.grossBillings,
      outstandingInvoices: billing.outstandingFromClients,
      creatorPaymentsOut: payments.totalPaid,
      outstandingToCreators: payments.outstandingToCreators,
      unreadInbox,
      // Commissions calculated from campaigns
      commissionsThisMonth: openCampaigns
        .filter((c) => c.status === 'COMPLETE' && c.campaignFee)
        .reduce((sum, c) => sum + (c.campaignFee! * c.commissionPct / 100), 0),
    })
  } catch (err) {
    console.error('Error fetching dashboard:', err)
    return NextResponse.json({ error: 'Failed to fetch dashboard' }, { status: 500 })
  }
}
