'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  Activity, AlertTriangle, TrendingUp, Users, Phone,
  Mail, MessageSquare, Calendar, ChevronRight
} from 'lucide-react'

// Mock data
const stats = [
  {
    label: 'At-Risk Patients',
    value: '127',
    change: '+8%',
    icon: AlertTriangle,
    borderColor: 'border-l-orange-500'
  },
  {
    label: 'Avg Adherence Rate',
    value: '87%',
    change: '+5%',
    icon: Activity,
    borderColor: 'border-l-teal-500'
  },
  {
    label: 'Interventions This Month',
    value: '234',
    change: '+12%',
    icon: MessageSquare,
    borderColor: 'border-l-pink-500'
  },
  {
    label: 'Improved Adherence',
    value: '89',
    change: '+18%',
    icon: TrendingUp,
    borderColor: 'border-l-cyan-500'
  },
]

const atRiskPatients = [
  {
    name: 'Robert Chen',
    age: 56,
    medication: 'Atorvastatin 20mg',
    riskScore: 85,
    riskLevel: 'high',
    lastRefill: '45 days ago',
    missedRefills: 3,
    riskFactors: ['Multiple Missed Refills', 'No Recent Contact', 'High Complexity'],
    intervention: 'Schedule counseling call + medication sync',
    phone: '(555) 345-6789',
    email: 'r.chen@email.com'
  },
  {
    name: 'Jennifer Lee',
    age: 52,
    medication: 'Sertraline 50mg',
    riskScore: 78,
    riskLevel: 'high',
    lastRefill: '38 days ago',
    missedRefills: 2,
    riskFactors: ['Cost Concerns', 'Missed Refills', 'Prior PA Issues'],
    intervention: 'Financial assistance program + copay card',
    phone: '(555) 890-1234',
    email: 'jennifer.lee@email.com'
  },
  {
    name: 'Emily Davis',
    age: 46,
    medication: 'Levothyroxine 50mcg',
    riskScore: 62,
    riskLevel: 'medium',
    lastRefill: '28 days ago',
    missedRefills: 1,
    riskFactors: ['Late Refills', 'Multiple Pharmacies'],
    intervention: 'Auto-refill enrollment + reminder setup',
    phone: '(555) 678-9012',
    email: 'emily.d@email.com'
  },
  {
    name: 'Michael Torres',
    age: 63,
    medication: 'Metformin 500mg',
    riskScore: 71,
    riskLevel: 'medium',
    lastRefill: '32 days ago',
    missedRefills: 2,
    riskFactors: ['Transportation Barriers', 'Forgetfulness'],
    intervention: 'Delivery setup + medication organizer',
    phone: '(555) 234-9876',
    email: 'm.torres@email.com'
  },
  {
    name: 'Patricia Wilson',
    age: 58,
    medication: 'Lisinopril 10mg',
    riskScore: 55,
    riskLevel: 'medium',
    lastRefill: '25 days ago',
    missedRefills: 1,
    riskFactors: ['Inconsistent Pickup', 'Side Effects Concern'],
    intervention: 'Pharmacist consultation + side effect management',
    phone: '(555) 567-3421',
    email: 'p.wilson@email.com'
  },
]

const getRiskColor = (level: string) => {
  switch (level) {
    case 'high': return {
      ring: 'stroke-red-500',
      bg: 'bg-red-50',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-800 border-red-200'
    }
    case 'medium': return {
      ring: 'stroke-yellow-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    default: return {
      ring: 'stroke-green-500',
      bg: 'bg-green-50',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-800 border-green-200'
    }
  }
}

const getRiskFactorColor = (factor: string) => {
  if (factor.includes('Cost') || factor.includes('Financial')) return 'bg-purple-100 text-purple-700 border-purple-200'
  if (factor.includes('Missed')) return 'bg-red-100 text-red-700 border-red-200'
  if (factor.includes('Side Effect')) return 'bg-orange-100 text-orange-700 border-orange-200'
  if (factor.includes('Transportation')) return 'bg-blue-100 text-blue-700 border-blue-200'
  return 'bg-gray-100 text-gray-700 border-gray-200'
}

export default function AdherencePage() {
  const { data: session } = useSession()
  const [selectedRisk, setSelectedRisk] = useState('all')

  const filteredPatients = atRiskPatients.filter(patient => {
    if (selectedRisk === 'all') return true
    return patient.riskLevel === selectedRisk
  })

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Adherence Intelligence</h1>
        <p className="text-gray-600">AI-powered medication adherence monitoring and interventions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4 ${stat.borderColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <stat.icon className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedRisk('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedRisk === 'all'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Patients ({atRiskPatients.length})
          </button>
          <button
            onClick={() => setSelectedRisk('high')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedRisk === 'high'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            High Risk ({atRiskPatients.filter(p => p.riskLevel === 'high').length})
          </button>
          <button
            onClick={() => setSelectedRisk('medium')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedRisk === 'medium'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Medium Risk ({atRiskPatients.filter(p => p.riskLevel === 'medium').length})
          </button>
        </div>
      </div>

      {/* At-Risk Patients List */}
      <div className="space-y-4">
        {filteredPatients.map((patient, index) => {
          const colors = getRiskColor(patient.riskLevel)
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                {/* Risk Score Circle */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-100"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - patient.riskScore / 100)}`}
                        className={colors.ring}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-2xl font-bold ${colors.text}`}>{patient.riskScore}</span>
                      <span className="text-xs text-gray-500">Risk</span>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">Age {patient.age} • {patient.medication}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors.badge}`}>
                      {patient.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Last Refill</p>
                      <p className="text-sm font-medium text-gray-900">{patient.lastRefill}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Missed Refills</p>
                      <p className="text-sm font-medium text-gray-900">{patient.missedRefills} times</p>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Risk Factors:</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.riskFactors.map((factor, i) => (
                        <span key={i} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskFactorColor(factor)}`}>
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Intervention */}
                  <div className={`p-3 rounded-lg ${colors.bg} mb-4`}>
                    <p className="text-xs text-gray-600 mb-1">Recommended Intervention:</p>
                    <p className="text-sm font-medium text-gray-900">{patient.intervention}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Patient
                    </button>
                    <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Send Email
                    </button>
                    <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      SMS
                    </button>
                    <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule
                    </button>
                    <button className="ml-auto px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg text-sm font-medium flex items-center gap-2">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients in this category</h3>
          <p className="text-gray-600">All patients in this risk level have been addressed.</p>
        </div>
      )}
    </>
  )
}
