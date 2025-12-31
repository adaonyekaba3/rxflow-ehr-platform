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
