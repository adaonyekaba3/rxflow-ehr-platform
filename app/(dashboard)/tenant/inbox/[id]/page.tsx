'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft, Mail, User, Calendar, Tag, AlertCircle, Sparkles,
  Check, Edit, RefreshCw, Send, Phone, MessageSquare, FileText,
  CheckCircle, XCircle, Info
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

// Types (same as inbox page)
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

// Mock Data (same as inbox page)
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

// AI Drafts
const aiDrafts: Record<string, { draft: string; confidence: number }> = {
  'MSG-001': {
    draft: `Hi John,

Thank you for reaching out about your symptoms. Chest discomfort after starting Lisinopril can occur and should be evaluated promptly.

Please STOP taking the Lisinopril immediately and contact our office or go to urgent care if symptoms worsen. We'll schedule a follow-up appointment to discuss alternative medications.

If you experience severe chest pain, shortness of breath, or arm pain, please call 911 or go to the emergency room.

Best regards,
RxFlow Pharmacy Team`,
    confidence: 0.89
  },
  'MSG-002': {
    draft: `Hi Maria,

Your Metformin 500mg refill has been approved and sent to CVS Pharmacy on Main Street. It should be ready for pickup within 2-4 hours.

If you have any questions, please don't hesitate to reach out.

Best regards,
RxFlow Pharmacy Team`,
    confidence: 0.96
  },
  'MSG-003': {
    draft: `Dear Robert,

Great news! Your recent HbA1c test came back at 6.2%, which shows improvement from your previous result of 6.8%.

Keep up the excellent work with your diabetes management. We'll continue monitoring at your next scheduled appointment.

Best regards,
RxFlow Pharmacy Team`,
    confidence: 0.94
  },
  'MSG-005': {
    draft: `Hi Sarah,

Thank you for checking before taking any additional medications. Based on your current prescriptions, occasional use of ibuprofen for headaches should be safe.

However, please limit use to 400-600mg and avoid taking it regularly. If headaches persist, please schedule an appointment so we can discuss further.

Best regards,
RxFlow Pharmacy Team`,
    confidence: 0.91
  },
  'MSG-008': {
    draft: `Hi Thomas,

Your Atorvastatin 20mg refill has been processed and sent to your preferred pharmacy. It should be ready for pickup within 2-4 hours.

As a reminder, please continue taking this medication daily as prescribed for optimal cholesterol management.

Best regards,
RxFlow Pharmacy Team`,
    confidence: 0.97
  }
}

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
    REFILL_REQUEST: { label: 'Refill Request', color: 'bg-blue-100 text-blue-700' },
    LAB_RESULT: { label: 'Lab Result', color: 'bg-purple-100 text-purple-700' },
    PATIENT_QUESTION: { label: 'Patient Question', color: 'bg-teal-100 text-teal-700' },
    PA_UPDATE: { label: 'PA Update', color: 'bg-pink-100 text-pink-700' },
    REFERRAL: { label: 'Referral', color: 'bg-indigo-100 text-indigo-700' },
    ADMINISTRATIVE: { label: 'Administrative', color: 'bg-gray-100 text-gray-700' },
    URGENT_ALERT: { label: 'Urgent Alert', color: 'bg-red-100 text-red-700' }
  }

  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${config[category].color}`}>
      {config[category].label}
    </span>
  )
}

export default function MessageDetailPage() {
  const params = useParams()
  const messageId = params.id as string

  const [editMode, setEditMode] = useState(false)
  const [draftText, setDraftText] = useState('')
  const [isRegenerating, setIsRegenerating] = useState(false)

  // Find message
  const message = mockMessages.find(m => m.id === messageId)
  const aiDraft = message ? aiDrafts[message.id] : null

  if (!message) {
    return (
      <div className="text-center py-12">
        <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Message not found</p>
        <Link href="/tenant/inbox" className="text-pink-600 hover:text-pink-700 text-sm mt-2 inline-block">
          Return to Inbox
        </Link>
      </div>
    )
  }

  const handleSendDraft = () => {
    toast.success('Draft sent successfully!')
  }

  const handleEdit = () => {
    setDraftText(aiDraft?.draft || '')
    setEditMode(true)
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRegenerating(false)
    toast.success('Draft regenerated!')
  }

  const handleWriteManually = () => {
    setDraftText('')
    setEditMode(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  // Quick actions based on category
  const getQuickActions = () => {
    switch (message.category) {
      case 'REFILL_REQUEST':
        return (
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve Refill
            </button>
            <button className="btn-outline flex items-center">
              <XCircle className="w-4 h-4 mr-2" />
              Deny with Reason
            </button>
            <button className="btn-outline flex items-center">
              <Info className="w-4 h-4 mr-2" />
              Request More Info
            </button>
          </div>
        )
      case 'LAB_RESULT':
        return (
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Acknowledge
            </button>
            <button className="btn-outline flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Order Follow-up
            </button>
            <button className="btn-outline flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Contact Patient
            </button>
          </div>
        )
      case 'PATIENT_QUESTION':
        return (
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Send AI Draft
            </button>
            <button className="btn-outline flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Schedule Call
            </button>
            <button className="btn-outline flex items-center">
              <User className="w-4 h-4 mr-2" />
              Forward to Provider
            </button>
          </div>
        )
      case 'PA_UPDATE':
        return (
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              View PA
            </button>
            <button className="btn-outline flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Notify Patient
            </button>
            <button className="btn-outline flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Archive
            </button>
          </div>
        )
      default:
        return (
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Reply
            </button>
            <button className="btn-outline flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Complete
            </button>
          </div>
        )
    }
  }

  return (
    <>
      {/* Back Button */}
      <Link
        href="/tenant/inbox"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Inbox
      </Link>

      {/* Message Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{message.subject}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  From: <strong>{message.sender}</strong> ({message.senderType})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{formatDate(message.createdAt)}</span>
              </div>
              <CategoryBadge category={message.category} />
              <PriorityBadge priority={message.priority} />
            </div>
            {message.patientName && (
              <div className="mt-3">
                <Link
                  href={`/tenant/patients`}
                  className="text-sm text-pink-600 hover:text-pink-700 flex items-center"
                >
                  <User className="w-4 h-4 mr-1" />
                  View Patient Profile: {message.patientName}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Message Body */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 whitespace-pre-wrap">{message.body}</p>
        </div>
      </div>

      {/* AI Draft Panel */}
      {aiDraft && !editMode && (
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span className="font-semibold text-gray-900">AI Draft Response</span>
            </div>
            <span className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
              {(aiDraft.confidence * 100).toFixed(0)}% confidence
            </span>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">
              {aiDraft.draft}
            </pre>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSendDraft}
              className="btn-primary flex items-center"
            >
              <Check className="w-4 h-4 mr-2" />
              Send as Draft
            </button>
            <button
              onClick={handleEdit}
              className="btn-outline flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="btn-outline flex items-center disabled:opacity-50"
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", isRegenerating && "animate-spin")} />
              Regenerate
            </button>
            <button
              onClick={handleWriteManually}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Write Manually
            </button>
          </div>
        </div>
      )}

      {/* Response Composer */}
      {editMode && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose Response</h3>
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            placeholder="Type your response here..."
            rows={12}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-sans"
          />
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => {
                toast.success('Response sent!')
                setEditMode(false)
              }}
              className="btn-primary flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Response
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        {getQuickActions()}
      </div>
    </>
  )
}
