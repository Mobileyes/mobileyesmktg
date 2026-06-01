'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="text-white py-32 px-6 relative overflow-hidden" style={{ background: '#0B0F2E' }}>
        <div className="relative max-w-5xl mx-auto">
          <p className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#3B82F6' }}>Contact</p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Let&apos;s talk.
          </h1>
          <p className="text-xl max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Whether you&apos;re a creator, a brand, or just want to chat about the streaming creator economy — we respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#0B0F2E' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
                  <Mail className="w-5 h-5" style={{ color: '#3B82F6' }} />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">General</p>
                  <a href="mailto:admin@mobileyes.live" className="text-sm hover:opacity-80" style={{ color: '#3B82F6' }}>admin@mobileyes.live</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
                  <Mail className="w-5 h-5" style={{ color: '#3B82F6' }} />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">All Enquiries</p>
                  <a href="mailto:admin@mobileyes.live" className="text-sm hover:opacity-80" style={{ color: '#3B82F6' }}>admin@mobileyes.live</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(168,85,247,0.1)' }}>
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Location</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Sydney, NSW, Australia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(20,184,166,0.1)' }}>
                  <Clock className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Response Time</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(34,197,94,0.15)' }}>
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl" style={{ backgroundColor: '#111633', border: '1px solid #1E2A5E' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/40" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/40" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Subject *</label>
                  <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/40" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message *</label>
                  <textarea rows={6} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-white placeholder-white/40" style={{ backgroundColor: '#0B0F2E', border: '1px solid #1E2A5E' }} />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 text-lg">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
