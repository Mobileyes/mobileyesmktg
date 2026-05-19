import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getCampaign, createInvoice, updateCampaign } from '@/lib/db'
import { trackInvoiceGenerated } from '@/lib/posthog'

// POST /api/admin/campaigns/[id]/generate-invoice
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = await params
    const campaign = await getCampaign(id)

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    if (!campaign.campaignFee) {
      return NextResponse.json({ error: 'Campaign fee not set' }, { status: 400 })
    }

    const invoice = await createInvoice({
      campaignId: campaign.id,
      invoiceTo: campaign.clientName,
      invoiceEmail: campaign.clientEmail,
      amount: campaign.campaignFee,
    })

    await updateCampaign(id, { status: 'INVOICED' })
    trackInvoiceGenerated(invoice.mblId, invoice.amount)

    return NextResponse.json(invoice, { status: 201 })
  } catch (err) {
    console.error('Error generating invoice:', err)
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 })
  }
}
