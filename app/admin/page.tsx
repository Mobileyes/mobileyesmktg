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
  BarChart3,
  Zap,
} from 'lucide-react'

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  href,
  color = 'blue',
  trend,
}: {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
  href: string
  color?: string
  trend?: { value: string; positive: boolean }
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
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
            {trend && (
              <p className={`text-xs mt-1 font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function AdminDashboard() {
  // These will be populated from Firestore in production
  const metrics = {
    activeCreators: 0,
    openCampaigns: 0,
    monthlyBillings: '$0',
    outstandingInvoices: '$0',
    commissionsThisMonth: '$0',
    creatorsPendingPayment: 0,
    unreadInbox: 0,
    campaignsDueThisWeek: 0,
    totalReach: '0',
    avgYield: '$0',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Mobileyes operations overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/campaigns"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Megaphone className="w-4 h-4" />
            New Campaign
          </Link>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Active Creators"
          value={metrics.activeCreators}
          subtitle="Managed roster"
          icon={Users}
          href="/admin/creators?status=active"
          color="green"
        />
        <MetricCard
          title="Open Campaigns"
          value={metrics.openCampaigns}
          subtitle="In progress"
          icon={Megaphone}
          href="/admin/campaigns?status=open"
          color="blue"
        />
        <MetricCard
          title="Monthly Billings"
          value={metrics.monthlyBillings}
          subtitle="This month (AUD)"
          icon={DollarSign}
          href="/admin/billing?period=this-month"
          color="purple"
        />
        <MetricCard
          title="Unread Briefs"
          value={metrics.unreadInbox}
          subtitle="From campaigns@"
          icon={Inbox}
          href="/admin/inbox"
          color="indigo"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Outstanding Invoices"
          value={metrics.outstandingInvoices}
          icon={AlertCircle}
          href="/admin/billing?status=outstanding"
          color="orange"
        />
        <MetricCard
          title="Commissions"
          value={metrics.commissionsThisMonth}
          subtitle="This month"
          icon={TrendingUp}
          href="/admin/billing?view=commissions"
          color="teal"
        />
        <MetricCard
          title="Pending Payments"
          value={metrics.creatorsPendingPayment}
          subtitle="Creators awaiting"
          icon={Clock}
          href="/admin/billing?view=creator-payments"
          color="red"
        />
        <MetricCard
          title="Due This Week"
          value={metrics.campaignsDueThisWeek}
          subtitle="Campaigns"
          icon={Calendar}
          href="/admin/campaigns?filter=due-soon"
          color="yellow"
        />
      </div>

      {/* Yield & Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Creator Yield */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-semibold text-gray-900">Creator Yield</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.avgYield}</p>
          <p className="text-xs text-gray-500 mt-1">Avg revenue per active creator/month</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Top performer</span>
              <span className="text-gray-900 font-medium">—</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Lowest performer</span>
              <span className="text-gray-900 font-medium">—</span>
            </div>
          </div>
        </div>

        {/* Total Reach */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-gray-900">Total Reach</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.totalReach}</p>
          <p className="text-xs text-gray-500 mt-1">Combined audience across all creators</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">YouTube</span>
              <span className="text-gray-900 font-medium">—</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Twitch</span>
              <span className="text-gray-900 font-medium">—</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Kick</span>
              <span className="text-gray-900 font-medium">—</span>
            </div>
          </div>
        </div>

        {/* Campaign Attribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <h3 className="text-sm font-semibold text-gray-900">Attribution</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">—</p>
          <p className="text-xs text-gray-500 mt-1">Tracked conversions this month</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">UTM clicks</span>
              <span className="text-gray-900 font-medium">—</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">OneLink installs</span>
              <span className="text-gray-900 font-medium">—</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Promo code uses</span>
              <span className="text-gray-900 font-medium">—</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity + Possible Collaborations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="text-gray-500 text-sm py-8 text-center">
            Activity will appear here once campaigns are running.
          </div>
        </div>

        {/* Suggested Collaborations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Suggested Collaborations</h3>
          <p className="text-xs text-gray-500 mb-4">
            Based on creator audiences, brand history, and upcoming campaigns
          </p>
          <div className="text-gray-500 text-sm py-8 text-center">
            Collaboration suggestions will appear once creator profiles are enriched with brand history and audience data.
          </div>
        </div>
      </div>

      {/* Accounts & Quick Links */}
      <div className="mt-8 bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Accounts & Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Platform</p>
            <ul className="space-y-1.5">
              <li><a href="https://mobileyes.live" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">mobileyes.live (live site)</a></li>
              <li><a href="https://vercel.com/joelamoskirk-5258s-projects/mobileyesmktg" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">Vercel Dashboard</a></li>
              <li><a href="https://github.com/Mobileyes/mobileyesmktg" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">GitHub Repo</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Google</p>
            <ul className="space-y-1.5">
              <li><a href="https://admin.google.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">Google Workspace Admin</a></li>
              <li><a href="https://console.firebase.google.com/u/0/project/mobileyes-ca894" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">Firebase Console</a></li>
              <li><a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">Google Cloud Console</a></li>
              <li><a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">Gmail (mobileyes.live)</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Services</p>
            <ul className="space-y-1.5">
              <li><a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">Resend (Email)</a></li>
              <li><a href="https://dev.twitch.tv/console" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">Twitch Developer Console</a></li>
              <li><a href="https://streamcharts.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">StreamCharts</a></li>
              <li><a href="https://account.squarespace.com/domains/managed/mobileyes.live/dns/dns-settings" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">Squarespace DNS</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Webhooks (for brands)</p>
            <ul className="space-y-1.5">
              <li className="text-xs text-slate-600 font-mono">/api/webhooks/appsflyer</li>
              <li className="text-xs text-slate-600 font-mono">/api/webhooks/conversions</li>
              <li className="text-xs text-slate-600 font-mono">/api/webhooks/resend</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
