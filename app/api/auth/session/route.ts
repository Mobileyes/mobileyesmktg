import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { trackAdminEvent } from '@/lib/posthog'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mobileyes.live'
    const adminPassword = process.env.ADMIN_PASSWORD || ''

    // Trim whitespace from inputs
    const inputEmail = (email || '').trim().toLowerCase()
    const inputPassword = (password || '').trim()
    const expectedEmail = adminEmail.trim().toLowerCase()
    const expectedPassword = adminPassword.trim()

    if (inputEmail !== expectedEmail || inputPassword !== expectedPassword) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('__session', `admin_${Date.now()}`, {
      maxAge: 60 * 60 * 24 * 5,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })

    trackAdminEvent('admin_logged_in')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Session error:', (error as Error)?.message)
    return NextResponse.json({ error: 'Failed to sign in' }, { status: 500 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('__session')
  return NextResponse.json({ success: true })
}
