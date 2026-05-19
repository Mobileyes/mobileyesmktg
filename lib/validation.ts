import { z } from 'zod'

/**
 * Input validation schemas for all public-facing forms.
 * CISO requirement: validate and sanitize all user input.
 */

export const creatorApplicationSchema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).trim().toLowerCase(),
  platform: z.enum(['TikTok', 'YouTube', 'Twitch', 'Kick', 'Instagram']),
  handleUrl: z.string().url().max(500),
  followerCount: z.coerce.number().int().min(0).max(500000000),
  avgViews: z.coerce.number().int().min(0).max(500000000).optional().nullable(),
  sessionLength: z.enum(['1-2hrs', '2-4hrs', '4-6hrs', '6+hrs']).optional().nullable(),
  audienceLocation: z.string().min(2).max(100),
  contentNiche: z.array(z.string().max(50)).max(10).default([]),
  gamingGenres: z.array(z.string().max(50)).max(15).default([]),
  whyJoin: z.string().max(2000).optional().nullable(),
})

export const brandBriefSchema = z.object({
  companyName: z.string().min(2).max(200).trim(),
  contactName: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).trim().toLowerCase(),
  objective: z.string().min(2).max(100),
  markets: z.array(z.string().max(50)).max(10).default([]),
  budget: z.string().min(1).max(100),
  platforms: z.array(z.string().max(50)).max(5).default([]),
  timeline: z.string().max(500).optional().nullable(),
  briefDetails: z.string().max(5000).optional().nullable(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).trim().toLowerCase(),
  subject: z.string().min(2).max(200).trim(),
  message: z.string().min(10).max(5000).trim(),
})

/**
 * Sanitize HTML from user input (prevent XSS)
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Rate limiting helper (simple in-memory for dev, use Redis in production)
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 3600000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count }
}
