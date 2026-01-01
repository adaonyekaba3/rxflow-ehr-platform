'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  Shield, Clock, CheckCircle, XCircle, FileText, Eye, Edit,
  Zap, MoreVertical, Download, Send
} from 'lucide-react'

// Mock data
const stats = [
  {
    label: 'Active PA Requests',
    value: '23',
    change: '-8%',
    icon: Shield,
    borderColor: 'border-l-orange-500'
  },
  {
    label: 'Pending Review',
    value: '12',
    change: '+3%',
    icon: Clock,
    borderColor: 'border-l-teal-500'
  },
  {
    label: 'Approved This Week',
    value: '47',
    change: '+15%',
    icon: CheckCircle,
    borderColor: 'border-l-pink-500'
  },
  {
    label: 'Average Approval Time',
    value: '4.2hrs',
    change: '-22%',
    icon: Zap,
    borderColor: 'border-l-cyan-500'
  },
]

const priorAuths = [
  {
    paId: 'PA-001',
    patient: 'James Wilson',
    medication: 'Humira 40mg',
    payer: 'Aetna',
    aiConfidence: 94,
    submitted: '2h ago',
    status: 'SUBMITTED'
  },
  {
    paId: 'PA-002',
    patient: 'Emily Davis',
    medication: 'Ozempic 0.5mg',
    payer: 'United Healthcare',
    aiConfidence: 72,
    submitted: '4h ago',
    status: 'PENDING'
  },
  {
    paId: 'PA-003',
    patient: 'David Lee',
    medication: 'Jardiance 10mg',
    payer: 'BCBS',
    aiConfidence: 88,
    submitted: '6h ago',
    status: 'SUBMITTED'
  },
  {
    paId: 'PA-004',
    patient: 'Maria Rodriguez',
    medication: 'Eliquis 5mg',
    payer: 'Cigna',
    aiConfidence: 96,
    submitted: '1 day ago',
    status: 'APPROVED'
  },
  {
    paId: 'PA-005',
    patient: 'Robert Kim',
    medication: 'Lyrica 150mg',
    payer: 'Humana',
    aiConfidence: 45,
    submitted: '2 days ago',
    status: 'DENIED'
  },
  {
    paId: 'PA-006',
    patient: 'Jennifer Martinez',
    medication: 'Xarelto 20mg',
    payer: 'Medicare',
    aiConfidence: 91,
    submitted: '3h ago',
    status: 'SUBMITTED'
  },
  {
    paId: 'PA-007',
    patient: 'Michael Chen',
    medication: 'Enbrel 50mg',
    payer: 'Aetna',
    aiConfidence: 68,
    submitted: '5h ago',
    status: 'PENDING'
  },
  {
    paId: 'PA-008',
    patient: 'Sarah Thompson',
    medication: 'Dupixent 300mg',
    payer: 'BCBS',
    aiConfidence: 93,
    submitted: '1 day ago',
    status: 'APPROVED'
  },
]

const tabs = [
  { id: 'ALL', label: 'All' },
  { id: 'PENDING', label: 'Pending Review' },
  { id: 'SUBMITTED', label: 'Submitted' },
  { id: 'APPROVED', label: 'Approved' },
  { id: 'DENIED', label: 'Denied' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'SUBMITTED': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200'
    case 'DENIED': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getConfidenceColor = (score: number) => {
  if (score >= 80) return 'bg-green-500'
  if (score >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getConfidenceBarBg = (score: number) => {
  if (score >= 80) return 'bg-green-100'
  if (score >= 60) return 'bg-yellow-100'
  return 'bg-red-100'
}

const getConfidenceTextColor = (score: number) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

export default function PriorAuthPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('ALL')
  const [autoSubmit, setAutoSubmit] = useState(true)

  const filteredPAs = priorAuths.filter(pa => {
    if (activeTab === 'ALL') return true
    return pa.status === activeTab
  })

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Prior Authorization</h1>
        <p className="text-gray-600">AI-powered prior authorization management</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4 ${stat.borderColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') && stat.label.includes('Time') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last week
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <stat.icon className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Auto-Submit High Confidence PAs</h3>
            <p className="text-xs text-gray-500 mt-1">Automatically submit prior authorizations with AI confidence ≥ 85%</p>
          </div>
          <button
            onClick={() => setAutoSubmit(!autoSubmit)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoSubmit ? 'bg-pink-500' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoSubmit ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-100 border-b-0">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const count = tab.id === 'ALL' ? priorAuths.length : priorAuths.filter(pa => pa.status === tab.id).length
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* PA Queue Table */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PA ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Confidence</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPAs.map((pa, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 text-pink-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{pa.paId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{pa.patient}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{pa.medication}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{pa.payer}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className={`h-2 rounded-full ${getConfidenceBarBg(pa.aiConfidence)}`}>
                          <div
                            className={`h-2 rounded-full ${getConfidenceColor(pa.aiConfidence)}`}
                            style={{ width: `${pa.aiConfidence}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${getConfidenceTextColor(pa.aiConfidence)}`}>
                        {pa.aiConfidence}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{pa.submitted}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(pa.status)}`}>
                      {pa.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      {pa.status === 'PENDING' && (
                        <button className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredPAs.length}</span> of <span className="font-medium">{priorAuths.length}</span> prior authorizations
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-pink-500 text-white rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
