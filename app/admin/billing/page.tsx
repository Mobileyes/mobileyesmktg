'use client'

import { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

type TimePeriod = 'this-month' | 'this-quarter' | 'this-year' | 'lifetime'

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'commissions' | 'creator-payments'
  >('overview')
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('this-month')

  // Placeholder metrics — will be API-driven
  const metrics = {
    grossBillings: 0,
    totalCommissions: 0,
    creatorPaymentsOut: 0,
    netRevenue: 0,
    outstandingFromClients: 0,
    outstandingToCreators: 0,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-500 mt-1">
            Financial overview, commissions, and creator payments
          </p>
        </div>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="this-month">This Month</option>
          <option value="this-quarter">This Quarter</option>
          <option value="this-year">This Year</option>
          <option value="lifetime">Lifetime</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'commissions', label: 'Commissions' },
          { key: 'creator-payments', label: 'Creator Payments' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Metric Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Gross Billings</p>
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(metrics.grossBillings)}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Total Commissions</p>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(metrics.totalCommissions)}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Net Revenue</p>
                <ArrowUpRight className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {formatCurrency(metrics.netRevenue)}
              </p>
            </div>
          </div>

          {/* Outstanding */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-orange-200 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <p className="text-sm font-medium text-gray-700">
                  Outstanding (owed by clients)
                </p>
              </div>
              <p className="text-xl font-bold text-orange-700">
                {formatCurrency(metrics.outstandingFromClients)}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-red-200 p-6">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <p className="text-sm font-medium text-gray-700">
                  Outstanding (owed to creators)
                </p>
              </div>
              <p className="text-xl font-bold text-red-700">
                {formatCurrency(metrics.outstandingToCreators)}
              </p>
            </div>
          </div>

          {/* Monthly Trend Placeholder */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Monthly Trend (Rolling 12 Months)
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
              Chart will render here once billing data is available.
              <br />
              (Recharts bar chart: gross billings + commissions by month)
            </div>
          </div>
        </div>
      )}

      {/* Commissions Tab */}
      {activeTab === 'commissions' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Campaign
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Client
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Campaign Fee
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Commission %
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Commission AUD
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-gray-500 text-sm"
                >
                  No commission data yet. Complete campaigns will appear here.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Creator Payments Tab */}
      {activeTab === 'creator-payments' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Payment ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Creator
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Campaign
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Due Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-gray-500 text-sm"
                >
                  No pending creator payments. Approved content will generate
                  payment records here.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
