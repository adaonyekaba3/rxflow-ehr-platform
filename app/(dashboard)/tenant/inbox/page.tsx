'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Inbox as InboxIcon, Mail, MailOpen, Reply, Archive, Trash2,
  Sparkles, Check, Search, Filter, Clock, TrendingUp,
  AlertCircle, CheckCircle, ChevronDown, MoreVertical
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Types
type MessageCategory =
  | 'REFILL_REQUEST'
  | 'LAB_RESULT'
  | 'PATIENT_QUESTION'
  | 'PA_UPDATE'
  | 'REFERRAL'
  | 'ADMINISTRATIVE'
  | 'URGENT_ALERT'

type SenderType = 'PATIENT' | 'PROVIDER' | 'SYSTEM' | 'PAYER'

interface InboxMessage {
  id: string
  subject: string
  body: string
  sender: string
  senderType: SenderType
  category: MessageCategory
  priority: 1 | 2 | 3 | 4 | 5
  status: 'UNREAD' | 'READ' | 'IN_PROGRESS' | 'REPLIED' | 'ARCHIVED'
  aiCategoryConfidence: number
  aiDraftAvailable: boolean
  createdAt: string
  patientName?: string
}

// Mock Data
const mockMessages: InboxMessage[] = [
  {
    id: 'MSG-001',
    subject: 'Chest pain after starting new medication',
    body: 'I started taking the Lisinopril you prescribed last week and I\'ve been having chest discomfort. Should I stop taking it?',
    sender: 'John Smith',
    senderType: 'PATIENT',
    category: 'URGENT_ALERT',
    priority: 1,
    status: 'UNREAD',
    aiCategoryConfidence: 0.96,
    aiDraftAvailable: true,
    createdAt: '2025-01-01T14:20:00Z',
    patientName: 'John Smith'
  },
  {
    id: 'MSG-002',
    subject: 'Refill Request: Metformin 500mg',
    body: 'Hi, I need a refill on my Metformin. I\'m running low and have about 5 days left. Can you please send it to CVS on Main Street? Thanks!',
    sender: 'Maria Garcia',
    senderType: 'PATIENT',
    category: 'REFILL_REQUEST',
    priority: 2,
    status: 'UNREAD',
    aiCategoryConfidence: 0.98,
    aiDraftAvailable: true,
    createdAt: '2025-01-01T14:05:00Z',
    patientName: 'Maria Garcia'
  },
  {
    id: 'MSG-003',
    subject: 'Lab Result: HbA1c - Robert Chen',
    body: 'Lab results are now available. HbA1c: 6.2% (Normal range: 4.0-5.6%). Previous: 6.8%.',
    sender: 'Quest Diagnostics',
    senderType: 'SYSTEM',
    category: 'LAB_RESULT',
    priority: 3,
    status: 'UNREAD',
    aiCategoryConfidence: 0.99,
    aiDraftAvailable: true,
    createdAt: '2025-01-01T13:30:00Z',
    patientName: 'Robert Chen'
  },
  {
    id: 'MSG-004',
    subject: 'Prior Authorization Approved: Humira',
    body: 'The prior authorization for Humira (adalimumab) 40mg has been approved by Aetna. Valid until: March 31, 2026.',
    sender: 'Aetna',
    senderType: 'PAYER',
    category: 'PA_UPDATE',
    priority: 4,
    status: 'READ',
    aiCategoryConfidence: 0.97,
    aiDraftAvailable: false,
    createdAt: '2025-01-01T12:15:00Z',
    patientName: 'James Wilson'
  },
  {
    id: 'MSG-005',
    subject: 'Question about medication interactions',
    body: 'I was wondering if I can take ibuprofen with my current prescriptions? I have a headache and wanted to check first.',
    sender: 'Sarah Johnson',
    senderType: 'PATIENT',
    category: 'PATIENT_QUESTION',
    priority: 3,
    status: 'UNREAD',
    aiCategoryConfidence: 0.94,
    aiDraftAvailable: true,
    createdAt: '2025-01-01T11:45:00Z',
    patientName: 'Sarah Johnson'
  },
  {
    id: 'MSG-006',
    subject: 'Referral Request: Cardiology',
    body: 'Please refer patient Emily Davis to cardiology for evaluation of irregular heartbeat noted during recent visit.',
    sender: 'Dr. Michael Brown',
    senderType: 'PROVIDER',
    category: 'REFERRAL',
    priority: 2,
    status: 'UNREAD',
    aiCategoryConfidence: 0.95,
    aiDraftAvailable: false,
    createdAt: '2025-01-01T10:30:00Z',
    patientName: 'Emily Davis'
  },
  {
    id: 'MSG-007',
    subject: 'Insurance verification needed',
    body: 'Patient David Kim\'s insurance information needs to be updated. Current policy shows as inactive.',
    sender: 'Billing Department',
    senderType: 'SYSTEM',
    category: 'ADMINISTRATIVE',
    priority: 4,
    status: 'READ',
    aiCategoryConfidence: 0.91,
    aiDraftAvailable: false,
    createdAt: '2025-01-01T09:00:00Z',
    patientName: 'David Kim'
  },
  {
    id: 'MSG-008',
    subject: 'Refill Request: Atorvastatin 20mg',
    body: 'Requesting refill for atorvastatin. Last filled 28 days ago.',
    sender: 'Thomas Anderson',
    senderType: 'PATIENT',
    category: 'REFILL_REQUEST',
    priority: 3,
    status: 'UNREAD',
    aiCategoryConfidence: 0.99,
    aiDraftAvailable: true,
    createdAt: '2025-01-01T08:45:00Z',
    patientName: 'Thomas Anderson'
  }
]

// Priority Badge Component
const PriorityBadge = ({ priority }: { priority: number }) => {
  const config = {
    1: { color: 'bg-red-500', label: 'Urgent', textColor: 'text-red-700', bgLight: 'bg-red-100' },
    2: { color: 'bg-orange-500', label: 'High', textColor: 'text-orange-700', bgLight: 'bg-orange-100' },
    3: { color: 'bg-yellow-500', label: 'Standard', textColor: 'text-yellow-700', bgLight: 'bg-yellow-100' },
    4: { color: 'bg-blue-500', label: 'Low', textColor: 'text-blue-700', bgLight: 'bg-blue-100' },
    5: { color: 'bg-gray-400', label: 'FYI', textColor: 'text-gray-700', bgLight: 'bg-gray-100' }
  }[priority]

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${config.color}`} />
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bgLight} ${config.textColor}`}>
        {config.label}
      </span>
    </div>
  )
}

// Category Badge Component
const CategoryBadge = ({ category }: { category: MessageCategory }) => {
  const config: Record<MessageCategory, { label: string; color: string }> = {
    REFILL_REQUEST: { label: 'Refill', color: 'bg-blue-100 text-blue-700' },
    LAB_RESULT: { label: 'Lab', color: 'bg-purple-100 text-purple-700' },
    PATIENT_QUESTION: { label: 'Question', color: 'bg-teal-100 text-teal-700' },
    PA_UPDATE: { label: 'PA Update', color: 'bg-pink-100 text-pink-700' },
    REFERRAL: { label: 'Referral', color: 'bg-indigo-100 text-indigo-700' },
    ADMINISTRATIVE: { label: 'Admin', color: 'bg-gray-100 text-gray-700' },
    URGENT_ALERT: { label: 'Urgent', color: 'bg-red-100 text-red-700' }
  }

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${config[category].color}`}>
      {config[category].label}
    </span>
  )
}

// Time ago helper
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hrs ago`
  return `${Math.floor(diffInMinutes / 1440)} days ago`
}

export default function InboxPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory | 'ALL'>('ALL')
  const [sortBy, setSortBy] = useState<'priority' | 'date' | 'category'>('priority')
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])

  // Stats
  const totalMessages = mockMessages.length
  const urgentCount = mockMessages.filter(m => m.priority === 1).length
  const unreadCount = mockMessages.filter(m => m.status === 'UNREAD').length
  const aiDraftsCount = mockMessages.filter(m => m.aiDraftAvailable).length

  // Category counts
  const categoryCounts = {
    ALL: mockMessages.length,
    REFILL_REQUEST: mockMessages.filter(m => m.category === 'REFILL_REQUEST').length,
    LAB_RESULT: mockMessages.filter(m => m.category === 'LAB_RESULT').length,
    PATIENT_QUESTION: mockMessages.filter(m => m.category === 'PATIENT_QUESTION').length,
    PA_UPDATE: mockMessages.filter(m => m.category === 'PA_UPDATE').length,
    REFERRAL: mockMessages.filter(m => m.category === 'REFERRAL').length,
    ADMINISTRATIVE: mockMessages.filter(m => m.category === 'ADMINISTRATIVE').length,
    URGENT_ALERT: mockMessages.filter(m => m.category === 'URGENT_ALERT').length
  }

  // Filter and sort messages
  const filteredMessages = mockMessages
    .filter(m => {
      const matchesSearch = m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           m.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           m.body.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'ALL' || m.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'priority') return a.priority - b.priority
      if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return a.category.localeCompare(b.category)
    })

  const toggleMessageSelection = (id: string) => {
    setSelectedMessages(prev =>
      prev.includes(id) ? prev.filter(msgId => msgId !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedMessages(filteredMessages.map(m => m.id))
  }

  const deselectAll = () => {
    setSelectedMessages([])
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Inbox Intelligence</h1>
          <Link href="/tenant/inbox/analytics" className="text-sm text-pink-600 hover:text-pink-700 flex items-center">
            View Analytics
            <TrendingUp className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <p className="text-gray-600">AI-powered message management and response</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-pink-500">
          <p className="text-sm text-gray-500 mb-1">Total Messages</p>
          <p className="text-2xl font-bold text-gray-900">{totalMessages}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-red-500">
          <p className="text-sm text-gray-500 mb-1">Urgent</p>
          <p className="text-2xl font-bold text-gray-900">{urgentCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-orange-500">
          <p className="text-sm text-gray-500 mb-1">Unread</p>
          <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-teal-500">
          <p className="text-sm text-gray-500 mb-1">AI Drafts Ready</p>
          <p className="text-2xl font-bold text-gray-900">{aiDraftsCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-purple-500">
          <p className="text-sm text-gray-500 mb-1">Avg Response Time</p>
          <p className="text-2xl font-bold text-gray-900">2.4 hrs</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-green-500">
          <p className="text-sm text-gray-500 mb-1">AI Assist Rate</p>
          <p className="text-2xl font-bold text-gray-900">73%</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient name, subject, content..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="priority">Sort by Priority</option>
            <option value="date">Sort by Date</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['ALL', 'REFILL_REQUEST', 'LAB_RESULT', 'PATIENT_QUESTION', 'PA_UPDATE', 'REFERRAL', 'ADMINISTRATIVE', 'URGENT_ALERT'] as const).map((cat) => {
            const labels = {
              ALL: 'All',
              REFILL_REQUEST: 'Refill Requests',
              LAB_RESULT: 'Lab Results',
              PATIENT_QUESTION: 'Patient Questions',
              PA_UPDATE: 'PA Updates',
              REFERRAL: 'Referrals',
              ADMINISTRATIVE: 'Administrative',
              URGENT_ALERT: 'Urgent Alerts'
            }

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  selectedCategory === cat
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {labels[cat]}
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {categoryCounts[cat]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedMessages.length > 0 && (
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-pink-900">
              {selectedMessages.length} message{selectedMessages.length !== 1 ? 's' : ''} selected
            </span>
            <button onClick={deselectAll} className="text-sm text-pink-700 hover:text-pink-900">
              Deselect All
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-outline text-sm flex items-center">
              <MailOpen className="w-4 h-4 mr-2" />
              Mark as Read
            </button>
            <button className="btn-outline text-sm flex items-center">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </button>
            <button className="btn-outline text-sm flex items-center">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Message List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Select All */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
              onChange={(e) => e.target.checked ? selectAll() : deselectAll()}
              className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
            />
            <span className="text-sm text-gray-600">
              {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Messages */}
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <InboxIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No messages found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                  message.status === 'UNREAD' && 'bg-pink-50/30'
                )}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedMessages.includes(message.id)}
                  onChange={() => toggleMessageSelection(message.id)}
                  className="mr-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Priority */}
                <div className="mr-4">
                  <PriorityBadge priority={message.priority} />
                </div>

                {/* Main Content */}
                <Link href={`/tenant/inbox/${message.id}`} className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={cn(
                      "font-medium text-sm",
                      message.status === 'UNREAD' ? 'text-gray-900' : 'text-gray-600'
                    )}>
                      {message.subject}
                    </span>
                    {message.aiDraftAvailable && (
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span>{message.sender}</span>
                    <span>•</span>
                    <CategoryBadge category={message.category} />
                    <span>•</span>
                    <span>{formatTimeAgo(message.createdAt)}</span>
                  </div>
                </Link>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle reply
                    }}
                  >
                    <Reply className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle archive
                    }}
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle more options
                    }}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
