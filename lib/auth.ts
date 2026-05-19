import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = '__session'
const SESSION_EXPIRY = 60 * 60 * 24 * 5 * 1000 // 5 days

/**
 * Verify the session cookie and return the decoded token
 * Returns null if no valid session
 */
export async function getServerSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionCookie) return null

    const { getAdminAuth } = await import('./firebase-admin')
    const adminAuth = getAdminAuth()
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true)
    return decodedToken
  } catch {
    return null
  }
}

/**
 * Check if the current user is the admin
 */
export async function isAdmin(): Promise<boolean> {
  const session = await getServerSession()
  if (!session) return false
  return session.email === process.env.ADMIN_EMAIL
}

/**
 * Create a session cookie from a Firebase ID token
 */
export async function createSessionCookie(idToken: string): Promise<string> {
  const { getAdminAuth } = await import('./firebase-admin')
  const adminAuth = getAdminAuth()
  return adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRY,
  })
}

/**
 * Verify an ID token (for API routes)
 */
export async function verifyIdToken(token: string) {
  try {
    const { getAdminAuth } = await import('./firebase-admin')
    const adminAuth = getAdminAuth()
    return await adminAuth.verifyIdToken(token)
  } catch {
    return null
  }
}

/**
 * Middleware helper — verify admin access for API routes
 */
export async function requireAdmin(request: Request): Promise<{
  authorized: boolean
  error?: string
}> {
  // Check session cookie first
  const session = await getServerSession()
  if (session && session.email === process.env.ADMIN_EMAIL) {
    return { authorized: true }
  }

  // Check Authorization header
  const authHeader = request.headers.get('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    const decoded = await verifyIdToken(token)
    if (decoded && decoded.email === process.env.ADMIN_EMAIL) {
      return { authorized: true }
    }
  }

  return { authorized: false, error: 'Unauthorized' }
}
