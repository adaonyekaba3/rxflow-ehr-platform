'use client'

import { useState } from 'react'
import { 
  Pill, Search, Plus, Filter, Clock, CheckCircle, AlertTriangle,
  Package, Truck, XCircle, Eye, Edit, RefreshCw, MoreVertical,
  TrendingUp, TrendingDown, Calendar
} from 'lucide-react'
import { cn, getStatusColor, formatRelativeTime, formatDate } from '@/lib/utils'

const prescriptions = [
  {
    id: 'RX-2024-001',
    patient: 'John Smith',
    medication: 'Metformin 500mg',
    dosage: '500mg twice daily',
    quantity: 90,
    refillsRemaining: 5,
    status: 'READY_FOR_PICKUP',
    cost: 45.00,
    copay: 12.00,
    prescriber: 'Dr. Michael Chen',
    pharmacy: 'Main Street Location',
    prescribedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    pickupBy: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: 'RX-2024-002',
    patient: 'Maria Garcia',
    medication: 'Lisinopril 10mg',
    dosage: '10mg once daily',
    quantity: 30,
    refillsRemaining: 11,
    status: 'PROCESSING',
    cost: 28.00,
    copay: 8.50,
    prescriber: 'Dr. Lisa Wang',
    pharmacy: 'Main Street Location',
    prescribedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    pickupBy: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: 'RX-2024-003',
    patient: 'Robert Chen',
    medication: 'Atorvastatin 20mg',
    dosage: '20mg once daily at bedtime',
    quantity: 30,
    refillsRemaining: 3,
    status: 'PRIOR_AUTH_PENDING',
    cost: 85.00,
    copay: 22.00,
    prescriber: 'Dr. Robert Smith',
    pharmacy: 'Downtown Location',
    prescribedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    pickupBy: null,
  },
  {
    id: 'RX-2024-004',
    patient: 'Emily Davis',
    medication: 'Omeprazole 20mg',
    dosage: '20mg once daily before breakfast',
    quantity: 30,
    refillsRemaining: 8,
    status: 'RECEIVED',
    cost: 32.00,
    copay: 15.00,
    prescriber: 'Dr. Jennifer Park',
    pharmacy: 'Main Street Location',
    prescribedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    pickupBy: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: 'RX-2024-005',
    patient: 'James Wilson',
    medication: 'Amlodipine 5mg',
    dosage: '5mg once daily',
    quantity: 30,
    refillsRemaining: 0,
    status: 'COMPLETED',
    cost: 22.00,
    copay: 10.00,
    prescriber: 'Dr. Amanda Lee',
    pharmacy: 'Main Street Location',
    prescribedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    pickupBy: null,
  },
]

const stats = [
  { label: 'Total Active', value: '247', change: '+15%', trend: 'up', icon: Pill },
  { label: 'Ready for Pickup', value: '34', change: '+8%', trend: 'up', icon: CheckCircle },
  { label: 'Pending PA', value: '12', change: '-20%', trend: 'down', icon: Clock },
  { label: 'Completed Today', value: '28', change: '+25%', trend: 'up', icon: Package },
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'RECEIVED', label: 'Received' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'PRIOR_AUTH_PENDING', label: 'PA Pending' },
  { value: 'READY_FOR_PICKUP', label: 'Ready for Pickup' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { value: 'COMPLETED', label: 'Completed' },
]

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRx, setSelectedRx] = useState<typeof prescriptions[0] | null>(null)

  const filteredRx = prescriptions.filter(rx => {
    const matchesSearch = 
      rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || rx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'READY_FOR_PICKUP': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'PROCESSING': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
      case 'PRIOR_AUTH_PENDING': return <AlertTriangle className="w-4 h-4 text-amber-600" />
      case 'OUT_FOR_DELIVERY': return <Truck className="w-4 h-4 text-indigo-600" />
      case 'COMPLETED': return <Package className="w-4 h-4 text-gray-600" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-500">Manage and track all prescriptions</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Prescription
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
              placeholder="Search by patient, medication, or Rx #..."
              className="input pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input w-full sm:w-48"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Prescriptions Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredRx.map((rx) => (
          <div 
            key={rx.id} 
            className="card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedRx(rx)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  {rx.id}
                </span>
                <h3 className="font-semibold text-gray-900 mt-2">{rx.medication}</h3>
                <p className="text-sm text-gray-500">{rx.dosage}</p>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(rx.status)}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {rx.patient.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{rx.patient}</p>
                <p className="text-xs text-gray-500">{rx.prescriber}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                getStatusColor(rx.status)
              )}>
                {rx.status.replace(/_/g, ' ')}
              </span>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">${rx.copay.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Copay</p>
              </div>
            </div>

            {rx.refillsRemaining === 0 && (
              <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  No refills remaining
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedRx(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-600 font-medium">{selectedRx.id}</p>
                <h3 className="text-lg font-bold text-gray-900">{selectedRx.medication}</h3>
              </div>
              <button onClick={() => setSelectedRx(null)} className="p-1 rounded-lg hover:bg-gray-100">
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Status</span>
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                  getStatusColor(selectedRx.status)
                )}>
                  {getStatusIcon(selectedRx.status)}
                  {selectedRx.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Patient</p>
                  <p className="font-medium text-gray-900">{selectedRx.patient}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Prescriber</p>
                  <p className="font-medium text-gray-900">{selectedRx.prescriber}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Quantity</p>
                  <p className="font-medium text-gray-900">{selectedRx.quantity} units</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Refills Remaining</p>
                  <p className={cn(
                    "font-medium",
                    selectedRx.refillsRemaining === 0 ? 'text-red-600' : 'text-gray-900'
                  )}>
                    {selectedRx.refillsRemaining}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Total Cost</p>
                  <p className="font-medium text-gray-900">${selectedRx.cost.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Patient Copay</p>
                  <p className="font-medium text-green-600">${selectedRx.copay.toFixed(2)}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Prescribed</span>
                  <span className="text-sm text-gray-900">{formatDate(selectedRx.prescribedAt)}</span>
                </div>
                {selectedRx.pickupBy && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-500">Pickup By</span>
                    <span className="text-sm text-gray-900">{formatDate(selectedRx.pickupBy)}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Process Refill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
