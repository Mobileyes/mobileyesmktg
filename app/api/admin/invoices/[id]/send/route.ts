import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { getInvoice, updateInvoice, getCampaign } from '@/lib/db'
import { sendInvoiceEmail } from '@/lib/resend'

// POST /api/admin/invoices/[id]/send
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, error } = await requireAdmin(request)
  if (!authorized) return NextResponse.json({ error }, { status: 401 })

  try {
    const { id } = await params
    const invoice = await getInvoice(id)

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    const campaign = await getCampaign(invoice.campaignId)

    await sendInvoiceEmail({
      to: invoice.invoiceEmail,
      clientName: invoice.invoiceTo,
      invoiceId: invoice.mblId,
      campaignTitle: campaign?.title ?? 'Campaign',
      amount: invoice.amount,
    })

    await updateInvoice(id, { status: 'SENT' })

    return NextResponse.json({ success: true, invoiceId: invoice.mblId })
  } catch (err) {
    console.error('Error sending invoice:', err)
    return NextResponse.json({ error: 'Failed to send invoice' }, { status: 500 })
  }
}
