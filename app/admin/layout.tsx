'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import {
  LayoutDashboard,
  Inbox,
  Users,
  Megaphone,
  DollarSign,
  BarChart3,
  LogOut,
  Search,
  Radar,
  Send,
  TrendingUp,
  Calendar,
  Car,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/inbox', label: 'Inbox', icon: Inbox },
  { href: '/admin/outreach', label: 'Outreach', icon: Send },
  { href: '/admin/discover', label: 'Discover', icon: Radar },
  { href: '/admin/creators', label: 'Creators', icon: Users },
  { href: '/admin/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/admin/planner', label: 'Event Planner', icon: Calendar },
  { href: '/admin/trends', label: 'Market Trends', icon: TrendingUp },
  { href: '/admin/p1-sim', label: 'P1 Sim Racing', icon: Car },
  { href: '/admin/campaigns/roadburn', label: 'Roadburn (Tim)', icon: Car },
  { href: '/admin/brands', label: 'Brand Intel', icon: Search },
  { href: '/admin/billing', label: 'Billing', icon: DollarSign },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut(auth)
    await fetch('/api/auth/session', { method: 'DELETE' })
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <Link href="/admin" className="block">
            <h1 className="text-xl font-bold tracking-tight">MOBILEYES</h1>
            <p className="text-xs text-slate-400 mt-1">Admin Platform</p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
          <p className="text-xs text-slate-500 mt-3 px-3">
            Joel Kirk · admin@mobileyes.live
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
