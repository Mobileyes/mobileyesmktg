import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // Creator statuses
    APPLICANT: 'bg-yellow-100 text-yellow-800',
    ACTIVE: 'bg-green-100 text-green-800',
    PAUSED: 'bg-orange-100 text-orange-800',
    INACTIVE: 'bg-gray-100 text-gray-800',
    // Campaign statuses
    DRAFT: 'bg-gray-100 text-gray-800',
    BRIEFING: 'bg-blue-100 text-blue-800',
    SENT: 'bg-indigo-100 text-indigo-800',
    IN_PROGRESS: 'bg-purple-100 text-purple-800',
    REVIEW: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    INVOICED: 'bg-teal-100 text-teal-800',
    PAID: 'bg-emerald-100 text-emerald-800',
    COMPLETE: 'bg-green-200 text-green-900',
    // Invoice statuses
    OVERDUE: 'bg-red-100 text-red-800',
    VOID: 'bg-gray-200 text-gray-600',
    // Payment statuses
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    FAILED: 'bg-red-100 text-red-800',
    // Inbox statuses
    UNREAD: 'bg-blue-100 text-blue-800',
    READ: 'bg-gray-100 text-gray-800',
    CONVERTED: 'bg-green-100 text-green-800',
    DISMISSED: 'bg-red-100 text-red-800',
  }
  return colors[status] ?? 'bg-gray-100 text-gray-800'
}
