import Link from 'next/link'
import {
  Users,
  Megaphone,
  DollarSign,
  Inbox,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
} from 'lucide-react'

// Dashboard metric card component
function MetricCard({
  title,
  value,
  icon: Icon,
  href,
  color = 'blue',
}: {
  title: string
  value: string | number
  icon: React.ElementType
  href: string
  color?: string
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    teal: 'bg-teal-50 text-teal-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  }

  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function AdminDashboard() {
  // In production, these would be real database queries
  // For now, showing the structure with placeholder data
  const metrics = {
    activeCreators: 0,
    openCampaigns: 0,
    monthlyBillings: '$0',
    outstandingInvoices: '$0',
    commissionsThisMonth: '$0',
    creatorsPendingPayment: 0,
    unreadInbox: 0,
    campaignsDueThisWeek: 0,
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of Mobileyes operations
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Active Creators"
          value={metrics.activeCreators}
          icon={Users}
          href="/admin/creators?status=active"
          color="green"
        />
        <MetricCard
          title="Open Campaigns"
          value={metrics.openCampaigns}
          icon={Megaphone}
          href="/admin/campaigns?status=open"
          color="blue"
        />
        <MetricCard
          title="Monthly Billings (AUD)"
          value={metrics.monthlyBillings}
          icon={DollarSign}
          href="/admin/billing?period=this-month"
          color="purple"
        />
        <MetricCard
          title="Outstanding Invoices"
          value={metrics.outstandingInvoices}
          icon={AlertCircle}
          href="/admin/billing?status=outstanding"
          color="orange"
        />
        <MetricCard
          title="Commissions This Month"
          value={metrics.commissionsThisMonth}
          icon={TrendingUp}
          href="/admin/billing?view=commissions"
          color="teal"
        />
        <MetricCard
          title="Creators Pending Payment"
          value={metrics.creatorsPendingPayment}
          icon={Clock}
          href="/admin/billing?view=creator-payments"
          color="red"
        />
        <MetricCard
          title="Unread Inbox Briefs"
          value={metrics.unreadInbox}
          icon={Inbox}
          href="/admin/inbox"
          color="indigo"
        />
        <MetricCard
          title="Campaigns Due This Week"
          value={metrics.campaignsDueThisWeek}
          icon={Calendar}
          href="/admin/campaigns?filter=due-soon"
          color="yellow"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="text-gray-500 text-sm py-8 text-center">
          No recent activity. Campaign data will appear here once the database is connected.
        </div>
      </div>
    </div>
  )
}
