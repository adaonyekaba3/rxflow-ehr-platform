'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  Users, UserPlus, TrendingUp, Activity, Pill, Plus,
  Search, Filter, Download, Eye, Edit, Phone, Mail, MoreVertical
} from 'lucide-react'

// Mock data
const stats = [
  {
    label: 'Total Patients',
    value: '2,847',
    change: '+12%',
    icon: Users,
    borderColor: 'border-l-orange-500'
  },
  {
    label: 'New This Month',
    value: '156',
    change: '+18%',
    icon: UserPlus,
    borderColor: 'border-l-teal-500'
  },
  {
    label: 'Active Prescriptions',
    value: '4,231',
    change: '+8%',
    icon: Pill,
    borderColor: 'border-l-pink-500'
  },
  {
    label: 'Avg Adherence Score',
    value: '87%',
    change: '+5%',
    icon: Activity,
    borderColor: 'border-l-cyan-500'
  },
]

const patients = [
  {
    name: 'John Smith',
    dob: '1975-03-15',
    contact: '(555) 123-4567',
    email: 'john.smith@email.com',
    payer: 'Aetna',
    activeRx: 5,
    adherenceScore: 92,
    lastVisit: '2024-01-10'
  },
  {
    name: 'Maria Garcia',
    dob: '1982-07-22',
    contact: '(555) 234-5678',
    email: 'maria.g@email.com',
    payer: 'United Healthcare',
    activeRx: 3,
    adherenceScore: 78,
    lastVisit: '2024-01-12'
  },
  {
    name: 'Robert Chen',
    dob: '1968-11-30',
    contact: '(555) 345-6789',
    email: 'r.chen@email.com',
    payer: 'BCBS',
    activeRx: 7,
    adherenceScore: 45,
    lastVisit: '2024-01-08'
  },
  {
    name: 'Sarah Johnson',
    dob: '1990-05-18',
    contact: '(555) 456-7890',
    email: 'sarah.j@email.com',
    payer: 'Cigna',
    activeRx: 2,
    adherenceScore: 95,
    lastVisit: '2024-01-14'
  },
  {
    name: 'Michael Brown',
    dob: '1955-09-25',
    contact: '(555) 567-8901',
    email: 'm.brown@email.com',
    payer: 'Medicare',
    activeRx: 9,
    adherenceScore: 88,
    lastVisit: '2024-01-11'
  },
  {
    name: 'Emily Davis',
    dob: '1978-12-03',
    contact: '(555) 678-9012',
    email: 'emily.d@email.com',
    payer: 'Aetna',
    activeRx: 4,
    adherenceScore: 62,
    lastVisit: '2024-01-13'
  },
  {
    name: 'David Wilson',
    dob: '1985-04-17',
    contact: '(555) 789-0123',
    email: 'd.wilson@email.com',
    payer: 'Humana',
    activeRx: 6,
    adherenceScore: 91,
    lastVisit: '2024-01-09'
  },
  {
    name: 'Jennifer Lee',
    dob: '1972-08-28',
    contact: '(555) 890-1234',
    email: 'jennifer.lee@email.com',
    payer: 'United Healthcare',
    activeRx: 3,
    adherenceScore: 38,
    lastVisit: '2024-01-15'
  },
]

const getAdherenceColor = (score: number) => {
  if (score >= 80) return 'bg-green-100 text-green-800 border-green-200'
  if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return 'bg-red-100 text-red-800 border-red-200'
}

const getAdherenceLabel = (score: number) => {
  if (score >= 80) return 'Good'
  if (score >= 60) return 'Fair'
  return 'At Risk'
}

export default function PatientsPage() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.contact.includes(searchQuery)
    return matchesSearch
  })

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <p className="text-gray-600">Manage patient records and adherence tracking</p>
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

      {/* Search & Actions Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Patient
            </button>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active RX</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adherence</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-pink-700">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                        <p className="text-xs text-gray-500">{patient.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{patient.dob}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {patient.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{patient.payer}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {patient.activeRx} Rx
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getAdherenceColor(patient.adherenceScore)}`}>
                        {getAdherenceLabel(patient.adherenceScore)}
                      </span>
                      <span className="text-xs text-gray-500">{patient.adherenceScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{patient.lastVisit}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                        <Mail className="w-4 h-4" />
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-pink-500 text-white rounded-lg text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              3
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
