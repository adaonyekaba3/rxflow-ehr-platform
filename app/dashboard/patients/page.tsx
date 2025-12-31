'use client'

import { useState } from 'react'
import { 
  Users, Search, Plus, Filter, Phone, Mail, Calendar,
  Activity, AlertTriangle, ChevronRight, MoreVertical,
  Edit, Trash2, Eye, Heart, Pill, TrendingUp, TrendingDown
} from 'lucide-react'
import { cn, getStatusColor, formatDate } from '@/lib/utils'

const patients = [
  {
    id: 'P-001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: new Date('1965-03-15'),
    memberId: 'AET-123456789',
    insuranceProvider: 'Aetna',
    adherenceScore: 85,
    riskLevel: 'LOW',
    activePrescriptions: 3,
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 'P-002',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: new Date('1978-07-22'),
    memberId: 'UHC-987654321',
    insuranceProvider: 'United Healthcare',
    adherenceScore: 62,
    riskLevel: 'HIGH',
    activePrescriptions: 5,
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: 'P-003',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'robert.chen@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: new Date('1952-11-08'),
    memberId: 'BCBS-456789123',
    insuranceProvider: 'Blue Cross Blue Shield',
    adherenceScore: 91,
    riskLevel: 'LOW',
    activePrescriptions: 2,
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: 'P-004',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: new Date('1985-04-30'),
    memberId: 'CIG-789123456',
    insuranceProvider: 'Cigna',
    adherenceScore: 45,
    riskLevel: 'CRITICAL',
    activePrescriptions: 7,
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
  {
    id: 'P-005',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@email.com',
    phone: '(555) 567-8901',
    dateOfBirth: new Date('1970-09-12'),
    memberId: 'AET-321654987',
    insuranceProvider: 'Aetna',
    adherenceScore: 72,
    riskLevel: 'MEDIUM',
    activePrescriptions: 4,
    lastVisit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
]

const stats = [
  { label: 'Total Patients', value: '1,247', change: '+12%', trend: 'up', icon: Users },
  { label: 'High Risk', value: '23', change: '-8%', trend: 'down', icon: AlertTriangle },
  { label: 'Avg Adherence', value: '78%', change: '+5%', trend: 'up', icon: Heart },
  { label: 'Active Rx', value: '3,421', change: '+18%', trend: 'up', icon: Pill },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null)

  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase()
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.memberId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === 'all' || patient.riskLevel === riskFilter
    return matchesSearch && matchesRisk
  })

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return 'bg-red-100 text-red-700'
      case 'HIGH': return 'bg-orange-100 text-orange-700'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-green-100 text-green-700'
    }
  }

  const getAdherenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const calculateAge = (dob: Date) => {
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const m = today.getMonth() - dob.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500">Manage patient records and adherence</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Patient
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary-100 rounded-lg">
                <stat.icon className="w-5 h-5 text-primary-600" />
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

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or member ID..."
              className="input pl-10"
            />
          </div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="input w-full sm:w-48"
          >
            <option value="all">All Risk Levels</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Insurance</th>
                <th className="px-4 py-3">Adherence</th>
                <th className="px-4 py-3">Risk Level</th>
                <th className="px-4 py-3">Active Rx</th>
                <th className="px-4 py-3">Last Visit</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-700">
                          {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {calculateAge(patient.dateOfBirth)} years old • {patient.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Mail className="w-3 h-3" />
                        {patient.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{patient.insuranceProvider}</p>
                      <p className="text-xs text-gray-500">{patient.memberId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            patient.adherenceScore >= 80 ? 'bg-green-500' :
                            patient.adherenceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: `${patient.adherenceScore}%` }}
                        />
                      </div>
                      <span className={cn("text-sm font-medium", getAdherenceColor(patient.adherenceScore))}>
                        {patient.adherenceScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      getRiskStyle(patient.riskLevel)
                    )}>
                      {patient.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-900">{patient.activePrescriptions}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {formatDate(patient.lastVisit)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setSelectedPatient(patient)}
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of{' '}
            <span className="font-medium">{patients.length}</span> patients
          </p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary py-1.5 px-3 text-sm">Previous</button>
            <button className="btn-secondary py-1.5 px-3 text-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Patient</h3>
            </div>
            <form className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name</label>
                  <input type="text" className="input" placeholder="John" />
                </div>
                <div>
                  <label className="label">Last Name</label>
                  <input type="text" className="input" placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="label">Email Address</label>
                <input type="email" className="input" placeholder="john.smith@email.com" />
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input type="tel" className="input" placeholder="(555) 123-4567" />
              </div>
              <div>
                <label className="label">Date of Birth</label>
                <input type="date" className="input" />
              </div>
              <div>
                <label className="label">Insurance Provider</label>
                <select className="input">
                  <option value="">Select provider...</option>
                  <option value="aetna">Aetna</option>
                  <option value="uhc">United Healthcare</option>
                  <option value="bcbs">Blue Cross Blue Shield</option>
                  <option value="cigna">Cigna</option>
                </select>
              </div>
              <div>
                <label className="label">Member ID</label>
                <input type="text" className="input" placeholder="AET-123456789" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
