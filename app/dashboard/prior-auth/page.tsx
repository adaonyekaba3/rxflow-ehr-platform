'use client'

import { useState } from 'react'
import { 
  Shield, Search, Filter, Brain, Clock, CheckCircle, XCircle,
  AlertTriangle, ChevronDown, Eye, Send, RefreshCw, FileText,
  TrendingUp, Zap, Users
} from 'lucide-react'
import { cn, getStatusColor, formatRelativeTime } from '@/lib/utils'

const priorAuths = [
  { 
    id: 'PA-2024-001', 
    patient: 'Sarah Johnson', 
    medication: 'Humira 40mg', 
    payer: 'Aetna',
    aiScore: 94,
    status: 'AUTO_SUBMITTED',
    urgency: 'URGENT',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    diagnosis: 'Rheumatoid Arthritis',
    prescriber: 'Dr. Michael Chen',
  },
  { 
    id: 'PA-2024-002', 
    patient: 'Michael Brown', 
    medication: 'Ozempic 0.5mg', 
    payer: 'United Healthcare',
    aiScore: 72,
    status: 'UNDER_REVIEW',
    urgency: 'ROUTINE',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    diagnosis: 'Type 2 Diabetes',
    prescriber: 'Dr. Lisa Wang',
  },
  { 
    id: 'PA-2024-003', 
    patient: 'Lisa Wilson', 
    medication: 'Jardiance 10mg', 
    payer: 'BCBS',
    aiScore: 88,
    status: 'APPROVED',
    urgency: 'ROUTINE',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    diagnosis: 'Type 2 Diabetes with CKD',
    prescriber: 'Dr. Robert Smith',
  },
  { 
    id: 'PA-2024-004', 
    patient: 'James Taylor', 
    medication: 'Eliquis 5mg', 
    payer: 'Cigna',
    aiScore: 45,
    status: 'DENIED',
    urgency: 'URGENT',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    diagnosis: 'Atrial Fibrillation',
    prescriber: 'Dr. Amanda Lee',
    denialReason: 'Step therapy required - must try Warfarin first',
  },
  { 
    id: 'PA-2024-005', 
    patient: 'Emily Davis', 
    medication: 'Dupixent 300mg', 
    payer: 'Aetna',
    aiScore: 81,
    status: 'PENDING',
    urgency: 'ROUTINE',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    diagnosis: 'Moderate-Severe Eczema',
    prescriber: 'Dr. Jennifer Park',
  },
]

const stats = [
  { label: 'Total Pending', value: '18', icon: Clock, color: 'bg-amber-500' },
  { label: 'Auto-Approved Today', value: '12', icon: Zap, color: 'bg-green-500' },
  { label: 'Avg Processing Time', value: '3.2h', icon: TrendingUp, color: 'bg-blue-500' },
  { label: 'AI Accuracy (30d)', value: '92%', icon: Brain, color: 'bg-purple-500' },
]

export default function PriorAuthPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedPA, setSelectedPA] = useState<typeof priorAuths[0] | null>(null)

  const filteredPAs = priorAuths.filter(pa => {
    const matchesSearch = 
      pa.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pa.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pa.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || pa.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getAIScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-amber-600 bg-amber-50'
    return 'text-red-600 bg-red-50'
  }

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'EMERGENCY': return 'bg-red-100 text-red-700 border-red-200'
      case 'URGENT': return 'bg-amber-100 text-amber-700 border-amber-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prior Authorization</h1>
          <p className="text-gray-500">AI-powered prior authorization management</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Send className="w-4 h-4" />
          New PA Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-lg", stat.color)}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient, medication, or PA #..."
              className="input pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input w-full sm:w-48"
          >
            <option value="all">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="AUTO_SUBMITTED">Auto-Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="APPROVED">Approved</option>
            <option value="DENIED">Denied</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* PA List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3">PA # / Patient</th>
                <th className="px-4 py-3">Medication</th>
                <th className="px-4 py-3">Payer</th>
                <th className="px-4 py-3">AI Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Urgency</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPAs.map((pa) => (
                <tr key={pa.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-primary-600">{pa.id}</p>
                      <p className="text-sm text-gray-900">{pa.patient}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-gray-900">{pa.medication}</p>
                      <p className="text-xs text-gray-500">{pa.diagnosis}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{pa.payer}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-sm font-medium",
                        getAIScoreColor(pa.aiScore)
                      )}>
                        {pa.aiScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      getStatusColor(pa.status)
                    )}>
                      {pa.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
                      getUrgencyStyle(pa.urgency)
                    )}>
                      {pa.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {formatRelativeTime(pa.submittedAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedPA(pa)}
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {pa.status === 'DENIED' && (
                        <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPA && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedPA(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Prior Authorization Details</h3>
              <button onClick={() => setSelectedPA(null)} className="p-1 rounded-lg hover:bg-gray-100">
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* PA Info */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{selectedPA.id}</p>
                  <h4 className="text-xl font-bold text-gray-900">{selectedPA.patient}</h4>
                </div>
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                  getStatusColor(selectedPA.status)
                )}>
                  {selectedPA.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Medication</p>
                  <p className="font-medium text-gray-900">{selectedPA.medication}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Diagnosis</p>
                  <p className="font-medium text-gray-900">{selectedPA.diagnosis}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Payer</p>
                  <p className="font-medium text-gray-900">{selectedPA.payer}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Prescriber</p>
                  <p className="font-medium text-gray-900">{selectedPA.prescriber}</p>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <h5 className="font-semibold text-purple-900">AI Analysis</h5>
                </div>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold",
                    getAIScoreColor(selectedPA.aiScore)
                  )}>
                    {selectedPA.aiScore}%
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-purple-800">
                      {selectedPA.aiScore >= 80 
                        ? 'High likelihood of approval. Request auto-submitted.'
                        : selectedPA.aiScore >= 60
                        ? 'Moderate likelihood. Review recommended before submission.'
                        : 'Low likelihood. Consider alternative medications or appeal strategy.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Denial Reason */}
              {selectedPA.denialReason && (
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h5 className="font-semibold text-red-900">Denial Reason</h5>
                  </div>
                  <p className="text-sm text-red-800">{selectedPA.denialReason}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedPA.status === 'DENIED' && (
                  <button className="btn-primary flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    File Appeal
                  </button>
                )}
                <button className="btn-secondary flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
