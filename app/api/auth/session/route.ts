import { NextResponse } from 'next/server'
import { createSessionCookie, verifyIdToken } from '@/lib/auth'
import { cookies } from 'next/headers'

// POST /api/auth/session — create session cookie from Firebase ID token
export async function POST(request: Request) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 })
    }

    // Verify the ID token
    const decoded = await verifyIdToken(idToken)
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Check if user is admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Access denied. Admin only.' },
        { status: 403 }
      )
    }

    // Create session cookie
    const sessionCookie = await createSessionCookie(idToken)

    // Set the cookie
    const cookieStore = await cookies()
    cookieStore.set('__session', sessionCookie, {
      maxAge: 60 * 60 * 24 * 5, // 5 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

// DELETE /api/auth/session — sign out (clear session cookie)
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('__session')
  return NextResponse.json({ success: true })
}
