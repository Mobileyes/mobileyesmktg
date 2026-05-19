'use client'

import {
  BarChart3,
  Users,
  Megaphone,
  TrendingUp,
  Mail,
  Eye,
  Clock,
} from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">
          Public site conversions and business performance metrics
        </p>
      </div>

      {/* Public Site Conversions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Public Site Conversions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-blue-500" />
              <p className="text-sm text-gray-500">
                Creator Applications / Week
              </p>
            </div>
            <div className="h-32 flex items-center justify-center text-gray-300 text-xs">
              Trend chart (PostHog)
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Megaphone className="w-4 h-4 text-purple-500" />
              <p className="text-sm text-gray-500">
                Brand Brief Submissions / Week
              </p>
            </div>
            <div className="h-32 flex items-center justify-center text-gray-300 text-xs">
              Trend chart (PostHog)
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="text-sm text-gray-500">
                Application → Acceptance Rate
              </p>
            </div>
            <div className="h-32 flex items-center justify-center text-gray-300 text-xs">
              Funnel chart
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-indigo-500" />
              <p className="text-sm text-gray-500">News Article Views</p>
            </div>
            <div className="h-32 flex items-center justify-center text-gray-300 text-xs">
              Ranked list (PostHog)
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-orange-500" />
              <p className="text-sm text-gray-500">Email Open Rates</p>
            </div>
            <div className="h-32 flex items-center justify-center text-gray-300 text-xs">
              Resend webhook data
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-teal-500" />
              <p className="text-sm text-gray-500">Top Traffic Sources</p>
            </div>
            <div className="h-32 flex items-center justify-center text-gray-300 text-xs">
              PostHog session data
            </div>
          </div>
        </div>
      </div>

      {/* Business Metrics */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Business Metrics
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="text-sm text-gray-500">Revenue Per Month</p>
            </div>
            <div className="h-48 flex items-center justify-center text-gray-300 text-xs">
              Bar chart from billing data
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <p className="text-sm text-gray-500">Commission % Trend</p>
            </div>
            <div className="h-48 flex items-center justify-center text-gray-300 text-xs">
              Line chart — is margin improving?
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-purple-500" />
              <p className="text-sm text-gray-500">
                Creator Yield (avg revenue per active creator/month)
              </p>
            </div>
            <div className="h-48 flex items-center justify-center text-gray-300 text-xs">
              Metric + trend
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-orange-500" />
              <p className="text-sm text-gray-500">
                Campaign Cycle Time (avg days DRAFT → COMPLETE)
              </p>
            </div>
            <div className="h-48 flex items-center justify-center text-gray-300 text-xs">
              Metric + trend
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
