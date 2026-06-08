/**
 * Client Token — Signed JWT for Client Report Access
 * 
 * HMAC-SHA256 signed tokens with 30-day expiry.
 * Replaces the insecure base64-encoded campaign ID approach.
 * 
 * Uses Node.js native crypto — no external JWT library needed.
 */

import { createHmac } from 'crypto'

const TOKEN_EXPIRY_DAYS = 30
const ALGORITHM = 'HS256'

/**
 * Get the signing secret. Falls back to a derived key from CRON_SECRET
 * if CLIENT_TOKEN_SECRET is not explicitly set.
 */
function getSecret(): string {
  const secret = process.env.CLIENT_TOKEN_SECRET ?? process.env.CRON_SECRET
  if (!secret) {
    throw new Error('CLIENT_TOKEN_SECRET or CRON_SECRET must be set for token signing')
  }
  return secret
}

/**
 * Base64url encode (no padding)
 */
function base64url(data: string | Buffer): string {
  const buf = typeof data === 'string' ? Buffer.from(data) : data
  return buf.toString('base64url')
}

/**
 * Base64url decode
 */
function base64urlDecode(str: string): string {
  return Buffer.from(str, 'base64url').toString('utf-8')
}

/**
 * Sign a client access token for a campaign.
 * Returns a JWT-like token: header.payload.signature
 */
export async function signClientToken(campaignId: string): Promise<string> {
  const secret = getSecret()
  const now = Math.floor(Date.now() / 1000)
  const exp = now + TOKEN_EXPIRY_DAYS * 24 * 60 * 60

  const header = base64url(JSON.stringify({ alg: ALGORITHM, typ: 'JWT' }))
  const payload = base64url(JSON.stringify({
    sub: campaignId,
    iat: now,
    exp,
    iss: 'mobileyes',
  }))

  const signature = createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest('base64url')

  return `${header}.${payload}.${signature}`
}

/**
 * Verify and decode a client access token.
 * Returns the campaign ID if valid, null if expired or tampered.
 */
export async function verifyClientToken(token: string): Promise<string | null> {
  try {
    const secret = getSecret()
    const parts = token.split('.')

    if (parts.length !== 3) return null

    const [header, payload, signature] = parts

    // Verify signature
    const expectedSignature = createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64url')

    // Timing-safe comparison
    if (signature.length !== expectedSignature.length) return null
    const sigBuf = Buffer.from(signature)
    const expectedBuf = Buffer.from(expectedSignature)
    if (!sigBuf.equals(expectedBuf)) return null

    // Decode payload
    const decoded = JSON.parse(base64urlDecode(payload))

    // Check expiry
    const now = Math.floor(Date.now() / 1000)
    if (decoded.exp && decoded.exp < now) return null

    // Check issuer
    if (decoded.iss !== 'mobileyes') return null

    return decoded.sub ?? null
  } catch {
    return null
  }
}
