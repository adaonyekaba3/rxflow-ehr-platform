'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  Pill, TrendingUp, Clock, CheckCircle, Plus, Search,
  Filter, Download, MoreVertical, Eye, Edit, Printer
} from 'lucide-react'

// Mock data
const stats = [
  {
    label: 'Total Prescriptions',
    value: '847',
    change: '+12%',
    icon: Pill,
    borderColor: 'border-l-orange-500'
  },
  {
    label: 'Processing Today',
    value: '156',
    change: '+8%',
    icon: Clock,
    borderColor: 'border-l-teal-500'
  },
  {
    label: 'Ready for Pickup',
    value: '89',
    change: '+5%',
    icon: CheckCircle,
    borderColor: 'border-l-pink-500'
  },
  {
    label: 'Completed This Month',
    value: '2,341',
    change: '+18%',
    icon: TrendingUp,
    borderColor: 'border-l-cyan-500'
  },
]

const prescriptions = [
  {
    rxNumber: 'RX-2024-001',
    patient: 'John Smith',
    medication: 'Metformin 500mg',
    status: 'READY',
    prescribed: '2024-01-15',
    filled: '2024-01-16',
    payer: 'Aetna'
  },
  {
    rxNumber: 'RX-2024-002',
    patient: 'Maria Garcia',
    medication: 'Lisinopril 10mg',
    status: 'PROCESSING',
    prescribed: '2024-01-15',
    filled: '-',
    payer: 'United Healthcare'
  },
  {
    rxNumber: 'RX-2024-003',
    patient: 'Robert Chen',
    medication: 'Atorvastatin 20mg',
    status: 'PENDING',
    prescribed: '2024-01-14',
    filled: '-',
    payer: 'BCBS'
  },
  {
    rxNumber: 'RX-2024-004',
    patient: 'Sarah Johnson',
    medication: 'Omeprazole 20mg',
    status: 'READY',
    prescribed: '2024-01-14',
    filled: '2024-01-15',
    payer: 'Cigna'
  },
  {
    rxNumber: 'RX-2024-005',
    patient: 'Michael Brown',
    medication: 'Amlodipine 5mg',
    status: 'COMPLETED',
    prescribed: '2024-01-13',
    filled: '2024-01-14',
    payer: 'Medicare'
  },
  {
    rxNumber: 'RX-2024-006',
    patient: 'Emily Davis',
    medication: 'Levothyroxine 50mcg',
    status: 'PROCESSING',
    prescribed: '2024-01-15',
    filled: '-',
    payer: 'Aetna'
  },
  {
    rxNumber: 'RX-2024-007',
    patient: 'David Wilson',
    medication: 'Gabapentin 300mg',
    status: 'READY',
    prescribed: '2024-01-14',
    filled: '2024-01-15',
    payer: 'Humana'
  },
  {
    rxNumber: 'RX-2024-008',
    patient: 'Jennifer Lee',
    medication: 'Sertraline 50mg',
    status: 'PENDING',
    prescribed: '2024-01-15',
    filled: '-',
    payer: 'United Healthcare'
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'PROCESSING': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'READY': return 'bg-green-100 text-green-800 border-green-200'
    case 'COMPLETED': return 'bg-gray-100 text-gray-800 border-gray-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function PrescriptionsPage() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = rx.rxNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rx.medication.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || rx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
        <p className="text-gray-600">Manage and track all prescription orders</p>
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

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by RX number, patient, or medication..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="READY">Ready</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
            <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Prescription
            </button>
          </div>
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RX Number</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescribed</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filled</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPrescriptions.map((rx, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{rx.rxNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{rx.patient}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{rx.medication}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(rx.status)}`}>
                      {rx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{rx.prescribed}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{rx.filled}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{rx.payer}</span>
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
                        <Printer className="w-4 h-4" />
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
            Showing <span className="font-medium">{filteredPrescriptions.length}</span> of <span className="font-medium">{prescriptions.length}</span> prescriptions
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
