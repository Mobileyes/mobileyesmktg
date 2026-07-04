/**
 * Partner Token — Signed JWT for Partner Dashboard Access
 * 
 * Partners (like Neil/P1) get a persistent login token.
 * Longer expiry than client tokens (90 days).
 * Scoped to a partnerId which maps to their campaigns + creators.
 */

import { createHmac } from 'crypto'

const TOKEN_EXPIRY_DAYS = 90

function getSecret(): string {
  const secret = process.env.PARTNER_TOKEN_SECRET ?? process.env.CLIENT_TOKEN_SECRET ?? process.env.CRON_SECRET
  if (!secret) {
    throw new Error('PARTNER_TOKEN_SECRET or CRON_SECRET must be set')
  }
  return secret
}

function base64url(data: string | Buffer): string {
  const buf = typeof data === 'string' ? Buffer.from(data) : data
  return buf.toString('base64url')
}

function base64urlDecode(str: string): string {
  return Buffer.from(str, 'base64url').toString('utf-8')
}

export async function signPartnerToken(partnerId: string): Promise<string> {
  const secret = getSecret()
  const now = Math.floor(Date.now() / 1000)
  const exp = now + TOKEN_EXPIRY_DAYS * 24 * 60 * 60

  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = base64url(JSON.stringify({
    sub: partnerId,
    type: 'partner',
    iat: now,
    exp,
    iss: 'mobileyes',
  }))

  const signature = createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url')

  return `${header}.${payload}.${signature}`
}

export async function verifyPartnerToken(token: string): Promise<string | null> {
  try {
    const secret = getSecret()
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [header, payload, signature] = parts

    const expectedSignature = createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64url')

    const sigBuf = Buffer.from(signature)
    const expectedBuf = Buffer.from(expectedSignature)
    if (sigBuf.length !== expectedBuf.length || !sigBuf.equals(expectedBuf)) return null

    const decoded = JSON.parse(base64urlDecode(payload))

    const now = Math.floor(Date.now() / 1000)
    if (decoded.exp && decoded.exp < now) return null
    if (decoded.iss !== 'mobileyes') return null
    if (decoded.type !== 'partner') return null

    return decoded.sub ?? null
  } catch {
    return null
  }
}
