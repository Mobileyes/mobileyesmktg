'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MBIcon } from '@/components/brand/MBIcon'
import posthog from 'posthog-js'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@mobileyes.live')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      posthog.identify(email, { email })
      router.push('/admin')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Access denied')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0B0F2E' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <MBIcon size={48} className="mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold text-white tracking-[0.03em]">MOBILEYES</h1>
          <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Admin Platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
          {error && (
            <div className="p-3 rounded-lg text-sm text-red-300" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#3B82F6' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
