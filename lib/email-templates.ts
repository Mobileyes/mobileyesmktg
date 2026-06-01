/**
 * Email Template Helpers
 * Brand-compliant HTML email components per Brand Assets v1.0
 * 
 * Rules:
 * - Font: Arial 14px (web-safe fallback for Space Grotesk)
 * - Header: #0B0F2E navy background, white MOBILEYES wordmark
 * - Red divider: 2px solid #EF4444
 * - Footer: legal text, ACN, admin@mobileyes.live
 * - All emails from admin@mobileyes.live
 */

export const EMAIL_HEADER = `
<div style="background: #0B0F2E; padding: 24px 32px; text-align: left;">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="width: 12px; height: 12px; background: radial-gradient(circle, #EF4444, #B91C1C); border-radius: 50%;"></td>
      <td style="padding-left: 10px;">
        <span style="color: white; font-family: Arial, sans-serif; font-size: 16px; font-weight: 800; letter-spacing: 0.03em;">MOBILEYES</span>
      </td>
    </tr>
  </table>
</div>
`

export const EMAIL_FOOTER = `
<div style="padding: 24px 32px; border-top: 2px solid #EF4444;">
  <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif;">
    <tr>
      <td style="padding-right: 12px; vertical-align: top;">
        <div style="width: 36px; height: 36px; background: #1A0008; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <div style="width: 12px; height: 12px; background: radial-gradient(circle, #EF4444, #B91C1C); border-radius: 50%;"></div>
        </div>
      </td>
      <td style="vertical-align: top;">
        <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1e293b;">Joel Kirk</p>
        <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">Founder · Mobileyes</p>
        <p style="margin: 8px 0 0; font-size: 12px;">
          <a href="mailto:admin@mobileyes.live" style="color: #3B82F6; text-decoration: none;">admin@mobileyes.live</a>
        </p>
        <p style="margin: 2px 0 0; font-size: 12px;">
          <a href="https://mobileyes.live" style="color: #3B82F6; text-decoration: none;">mobileyes.live</a>
        </p>
        <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">Sydney, NSW · Australia</p>
      </td>
    </tr>
  </table>
  <p style="margin: 16px 0 0; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; font-family: Arial, sans-serif;">
    Live streaming talent agency · Representing creators across AU and APAC<br/>
    Mobileyes (trading as Gamefluence Pty Ltd · ACN 696 199 461)
  </p>
</div>
`

export const EMAIL_FOOTER_BRIEF = `
<div style="padding: 24px 32px; border-top: 2px solid #EF4444;">
  <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif;">
    <tr>
      <td style="padding-right: 12px; vertical-align: top;">
        <div style="width: 36px; height: 36px; background: #1A0008; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <div style="width: 12px; height: 12px; background: radial-gradient(circle, #EF4444, #B91C1C); border-radius: 50%;"></div>
        </div>
      </td>
      <td style="vertical-align: top;">
        <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1e293b;">Joel Kirk</p>
        <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">Founder · Mobileyes</p>
        <p style="margin: 8px 0 0; font-size: 12px;">
          <a href="mailto:admin@mobileyes.live" style="color: #3B82F6; text-decoration: none;">admin@mobileyes.live</a>
        </p>
        <p style="margin: 2px 0 0; font-size: 12px;">
          <a href="https://mobileyes.live" style="color: #3B82F6; text-decoration: none;">mobileyes.live</a>
        </p>
        <p style="margin: 6px 0 0; font-size: 12px; color: #16a34a;">⚡ 4-day creator payment guarantee</p>
      </td>
    </tr>
  </table>
  <div style="margin: 12px 0 0; padding: 10px 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;">
    <p style="margin: 0; font-size: 12px; color: #1d4ed8; font-family: Arial, sans-serif;">
      Accepting creator campaign briefs · Creator, UA, and full-funnel options available
    </p>
  </div>
  <p style="margin: 12px 0 0; font-size: 11px; color: #94a3b8; font-family: Arial, sans-serif;">
    Mobileyes (trading as Gamefluence Pty Ltd · ACN 696 199 461) · mobileyes.live
  </p>
</div>
`

/**
 * Wrap email content in branded template
 */
export function wrapEmail(body: string, variant: 'standard' | 'brief' = 'standard'): string {
  const footer = variant === 'brief' ? EMAIL_FOOTER_BRIEF : EMAIL_FOOTER
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
      ${EMAIL_HEADER}
      <div style="padding: 32px; font-size: 14px; line-height: 1.6; color: #1e293b;">
        ${body}
      </div>
      ${footer}
    </div>
  `
}
