'use client'

import { useState } from 'react'
import { 
  Brain, Search, Filter, AlertTriangle, TrendingUp, TrendingDown,
  Users, Activity, Heart, Phone, Mail, MessageSquare, CheckCircle,
  ChevronRight, Zap, Target, Clock
} from 'lucide-react'
import { cn } from '@/lib/utils'

const riskPatients = [
  {
    id: 'P-001',
    name: 'James Wilson',
    riskScore: 89,
    trend: 'up',
    medications: 4,
    pdcScore: 52,
    factors: ['Cost sensitivity', 'Complex regimen', 'No recent refills'],
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    interventions: ['Reminder call', 'Cost assistance referral'],
    phone: '(555) 123-4567',
    email: 'james.wilson@email.com',
  },
  {
    id: 'P-002',
    name: 'Patricia Moore',
    riskScore: 78,
    trend: 'stable',
    medications: 6,
    pdcScore: 61,
    factors: ['Transportation issues', 'Multiple pharmacies'],
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    interventions: ['Delivery enrollment', 'Pharmacy consolidation'],
    phone: '(555) 234-5678',
    email: 'patricia.moore@email.com',
  },
  {
    id: 'P-003',
    name: 'David Taylor',
    riskScore: 72,
    trend: 'down',
    medications: 3,
    pdcScore: 68,
    factors: ['Side effect concerns', 'Recent hospitalization'],
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    interventions: ['MTM consultation', 'Provider follow-up'],
    phone: '(555) 345-6789',
    email: 'david.taylor@email.com',
  },
  {
    id: 'P-004',
    name: 'Susan Anderson',
    riskScore: 85,
    trend: 'up',
    medications: 5,
    pdcScore: 48,
    factors: ['Cognitive decline', 'Lives alone', 'Multiple conditions'],
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
    interventions: ['Caregiver engagement', 'Pill organizer', 'Sync refills'],
    phone: '(555) 456-7890',
    email: 'susan.anderson@email.com',
  },
  {
    id: 'P-005',
    name: 'Michael Brown',
    riskScore: 65,
    trend: 'down',
    medications: 2,
    pdcScore: 74,
    factors: ['New to therapy', 'Insurance change'],
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    interventions: ['Education session', 'Benefits verification'],
    phone: '(555) 567-8901',
    email: 'michael.brown@email.com',
  },
]

const stats = [
  { label: 'High Risk Patients', value: '23', change: '-12%', trend: 'down', icon: AlertTriangle, color: 'bg-red-500' },
  { label: 'Avg PDC Score', value: '78%', change: '+5%', trend: 'up', icon: Heart, color: 'bg-green-500' },
  { label: 'Interventions Today', value: '15', change: '+25%', trend: 'up', icon: Zap, color: 'bg-blue-500' },
  { label: 'Success Rate', value: '68%', change: '+8%', trend: 'up', icon: Target, color: 'bg-purple-500' },
]

const interventionTypes = [
  { id: 'call', name: 'Phone Call', icon: Phone, description: 'Direct outreach to patient' },
  { id: 'email', name: 'Email', icon: Mail, description: 'Send personalized message' },
  { id: 'sms', name: 'Text Message', icon: MessageSquare, description: 'Quick reminder or check-in' },
  { id: 'mtm', name: 'MTM Consult', icon: Brain, description: 'Schedule medication therapy review' },
]

export default function AdherencePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [selectedPatient, setSelectedPatient] = useState<typeof riskPatients[0] | null>(null)
  const [showInterventionModal, setShowInterventionModal] = useState(false)

  const filteredPatients = riskPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === 'all' || 
      (riskFilter === 'critical' && patient.riskScore >= 80) ||
      (riskFilter === 'high' && patient.riskScore >= 60 && patient.riskScore < 80) ||
      (riskFilter === 'medium' && patient.riskScore < 60)
    return matchesSearch && matchesRisk
  })

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50 border-red-200'
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  const getPDCColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Adherence Intelligence</h1>
          <p className="text-gray-500">AI-powered patient adherence monitoring and intervention</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Run Analysis
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Bulk Outreach
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-lg", stat.color)}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight Banner */}
      <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-900">AI Insight</h3>
            <p className="text-sm text-purple-700 mt-1">
              Based on analysis of 1,247 patients, <strong>23 patients</strong> are at high risk of non-adherence 
              this week. Early intervention could prevent an estimated <strong>$45,000</strong> in adverse health outcomes.
              Top risk factors: cost sensitivity (42%), complex regimens (28%), transportation (18%).
            </p>
          </div>
          <button className="btn-primary bg-purple-600 hover:bg-purple-700">
            View Full Report
          </button>
        </div>
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
              placeholder="Search patients..."
              className="input pl-10"
            />
          </div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="input w-full sm:w-48"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical (80+)</option>
            <option value="high">High (60-79)</option>
            <option value="medium">Medium (&lt;60)</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Risk Patients List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="card hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Patient Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold border-2",
                  getRiskColor(patient.riskScore)
                )}>
                  {patient.riskScore}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                    {patient.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                    {patient.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-500" />}
                  </div>
                  <p className="text-sm text-gray-500">
                    {patient.medications} medications • PDC: {' '}
                    <span className={getPDCColor(patient.pdcScore)}>{patient.pdcScore}%</span>
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {patient.factors.map((factor, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Interventions */}
              <div className="lg:w-64">
                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Recommended Actions</p>
                <div className="space-y-1">
                  {patient.interventions.slice(0, 2).map((intervention, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-3 h-3 text-primary-500" />
                      {intervention}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setSelectedPatient(patient)
                    setShowInterventionModal(true)
                  }}
                  className="btn-primary"
                >
                  Intervene
                </button>
                <button className="btn-secondary p-2">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Intervention Modal */}
      {showInterventionModal && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowInterventionModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Initiate Intervention</h3>
              <p className="text-sm text-gray-500 mt-1">Select intervention type for {selectedPatient.name}</p>
            </div>
            <div className="p-6 space-y-3">
              {interventionTypes.map((type) => (
                <button
                  key={type.id}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all text-left flex items-center gap-4"
                >
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <type.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{type.name}</p>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowInterventionModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
