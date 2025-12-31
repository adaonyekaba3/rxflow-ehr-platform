import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function generateRxNumber(): string {
  const prefix = 'RX'
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
  return `${prefix}-${year}-${random}`
}

export function generatePANumber(): string {
  const prefix = 'PA'
  const timestamp = Date.now().toString(36).toUpperCase()
  return `${prefix}-${timestamp}`
}

export function generateTransactionNumber(): string {
  const prefix = 'TXN'
  const timestamp = Date.now().toString(36).toUpperCase()
  return `${prefix}-${timestamp}`
}

export function calculateAdherenceRisk(factors: {
  refillHistory: number
  costSensitivity: number
  complexityScore: number
  lastContact: number
}): number {
  const weights = {
    refillHistory: 0.3,
    costSensitivity: 0.25,
    complexityScore: 0.25,
    lastContact: 0.2,
  }

  return Math.round(
    factors.refillHistory * weights.refillHistory +
    factors.costSensitivity * weights.costSensitivity +
    factors.complexityScore * weights.complexityScore +
    factors.lastContact * weights.lastContact
  )
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    READY: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    APPROVED: 'bg-green-100 text-green-800',
    DENIED: 'bg-red-100 text-red-800',
    SUBMITTED: 'bg-blue-100 text-blue-800',
    HIGH: 'bg-red-100 text-red-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    LOW: 'bg-green-100 text-green-800',
  }
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } else {
    return formatDate(then)
  }
}
