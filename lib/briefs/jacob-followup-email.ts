/**
 * FOLLOW-UP EMAIL — Jacob (JacobTaborOz)
 * 
 * Post-call follow-up from Jul 3 2026 intro meeting.
 * 
 * Key points to cover:
 * - Summary of what we discussed and agreed on
 * - Non-exclusive agreement (20% commission on revenue)
 * - Attached: one-page overview + contract
 * - Confirm he's comfortable with Joel reaching out to P1 (Neil) 
 *   to confirm content schedules and rig spec
 * - Low pressure — single pilot video, his pace
 * - Next step: sign and return, then we brief Neil
 */

export const JACOB_FOLLOWUP_EMAIL = {
  to: 'jacob_tabor@outlook.com',
  subject: 'Mobileyes × JacobTaborOz — agreement + next steps',
  fromAlias: 'admin' as const,

  body: `Hi Jacob,

Good chatting yesterday. Wanted to follow up with everything we discussed so you've got it in writing.

Here's the summary of where we landed:

THE ARRANGEMENT
• Non-exclusive — you keep full control of your channel and can work with other brands directly
• 20% commission on any revenue we bring in (affiliate sales, brand fees). If we don't bring you money, you owe nothing.
• No multi-video obligation — we're starting with a single pilot project (rig rundown) to see how it works
• No deadlines pressure — I know you've got the day job and content is a passion project. Quality > speed.

THE PILOT PROJECT
• Custom flight sim rig rundown video — P1 Sim Rigs (Neil's company)
• They'd provide the rig (flight sim spec — HOTAS, pedals, MFDs mounted)
• You review it honestly using your military aviation expertise — no scripting
• Affiliate link + promo code for tracking
• You produce at your own pace (targeting one video in the next 4-8 weeks once the rig arrives)

WHAT I NEED FROM YOU
1. Review the attached one-pager (overview of how Mobileyes works)
2. Review and sign the agreement (non-exclusive, 20% — straightforward, no lock-in)
3. Let me know if you're happy for me to reach out to Neil at P1 to confirm the rig spec and content schedule

Once you're signed, I'll brief Neil, get the rig sorted, and you just focus on making great content.

Also — if there are any sim hardware or software brands you'd love to work with (or ones to avoid), let me know. Helps me match the right opportunities.

Looking forward to getting this rolling. This could be a really strong fit — your expertise makes this content genuinely useful to the audience, which is exactly what brands should be paying for.

Talk soon,

Joel Kirk
Mobileyes — mobileyes.live
admin@mobileyes.live`,
}

export type FollowUpEmail = typeof JACOB_FOLLOWUP_EMAIL
