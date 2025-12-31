'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Pill, Shield, Brain, Users, TrendingUp, TrendingDown, 
  Clock, CheckCircle, AlertTriangle, ArrowRight, Activity,
  CreditCard, Zap, Calendar
} from 'lucide-react'
import { cn, getStatusColor, formatRelativeTime } from '@/lib/utils'

// Mock data for demonstration
const stats = [
  { 
    name: 'Active Prescriptions', 
    value: '247', 
    change: '+12%', 
    trend: 'up',
    icon: Pill,
    color: 'bg-blue-500',
  },
  { 
    name: 'Pending Prior Auth', 
    value: '18', 
    change: '-25%', 
    trend: 'down',
    icon: Shield,
    color: 'bg-amber-500',
  },
  { 
    name: 'At-Risk Patients', 
    value: '23', 
    change: '+8%', 
    trend: 'up',
    icon: AlertTriangle,
    color: 'bg-red-500',
  },
  { 
    name: 'Today\'s Revenue', 
    value: '$4,821', 
    change: '+18%', 
    trend: 'up',
    icon: CreditCard,
    color: 'bg-green-500',
  },
]

const recentPrescriptions = [
  { id: 'RX-2024-001', patient: 'John Smith', medication: 'Metformin 500mg', status: 'READY_FOR_PICKUP', time: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 'RX-2024-002', patient: 'Maria Garcia', medication: 'Lisinopril 10mg', status: 'PROCESSING', time: new Date(Date.now() - 1000 * 60 * 60) },
  { id: 'RX-2024-003', patient: 'Robert Chen', medication: 'Atorvastatin 20mg', status: 'PRIOR_AUTH_PENDING', time: new Date(Date.now() - 1000 * 60 * 120) },
  { id: 'RX-2024-004', patient: 'Emily Davis', medication: 'Omeprazole 20mg', status: 'RECEIVED', time: new Date(Date.now() - 1000 * 60 * 180) },
]

const pendingPriorAuths = [
  { id: 'PA-001', patient: 'Sarah Johnson', medication: 'Humira 40mg', payer: 'Aetna', aiScore: 94, urgency: 'HIGH', submitted: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: 'PA-002', patient: 'Michael Brown', medication: 'Ozempic 0.5mg', payer: 'United', aiScore: 72, urgency: 'MEDIUM', submitted: new Date(Date.now() - 1000 * 60 * 60 * 4) },
  { id: 'PA-003', patient: 'Lisa Wilson', medication: 'Jardiance 10mg', payer: 'BCBS', aiScore: 88, urgency: 'LOW', submitted: new Date(Date.now() - 1000 * 60 * 60 * 6) },
]

const adherenceAlerts = [
  { id: 'P-001', name: 'James Wilson', riskScore: 85, factors: ['Cost sensitivity', 'Complex regimen'], medications: 3 },
  { id: 'P-002', name: 'Patricia Moore', riskScore: 72, factors: ['Transportation issues'], medications: 5 },
  { id: 'P-003', name: 'David Taylor', riskScore: 68, factors: ['Side effect concerns'], medications: 2 },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input py-2 text-sm"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="btn-primary flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Actions
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card">
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
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Prescriptions */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Prescriptions</h2>
            <Link href="/dashboard/prescriptions" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-100">
                  <th className="pb-3 pr-4">Rx #</th>
                  <th className="pb-3 pr-4">Patient</th>
                  <th className="pb-3 pr-4">Medication</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentPrescriptions.map((rx) => (
                  <tr key={rx.id} className="hover:bg-gray-50">
                    <td className="py-3 pr-4 text-sm font-medium text-primary-600">{rx.id}</td>
                    <td className="py-3 pr-4 text-sm text-gray-900">{rx.patient}</td>
                    <td className="py-3 pr-4 text-sm text-gray-600">{rx.medication}</td>
                    <td className="py-3 pr-4">
                      <span className={cn("inline-flex px-2 py-0.5 text-xs font-medium rounded-full", getStatusColor(rx.status))}>
                        {rx.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{formatRelativeTime(rx.time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prior Auth Queue */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Prior Auth Queue</h2>
            <Link href="/dashboard/prior-auth" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {pendingPriorAuths.map((pa) => (
              <div key={pa.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{pa.patient}</p>
                    <p className="text-sm text-gray-500">{pa.medication}</p>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded-full",
                    pa.urgency === 'HIGH' ? 'bg-red-100 text-red-700' :
                    pa.urgency === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  )}>
                    {pa.urgency}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{pa.payer}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5 text-purple-500" />
                      <span className={cn(
                        "font-medium",
                        pa.aiScore >= 80 ? 'text-green-600' : 
                        pa.aiScore >= 60 ? 'text-amber-600' : 'text-red-600'
                      )}>
                        {pa.aiScore}%
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{formatRelativeTime(pa.submitted)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Adherence Alerts */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Adherence Risk Alerts</h2>
              <p className="text-sm text-gray-500">Patients requiring intervention</p>
            </div>
          </div>
          <Link href="/dashboard/adherence" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adherenceAlerts.map((patient) => (
            <div key={patient.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                    patient.riskScore >= 80 ? 'bg-red-100 text-red-700' :
                    patient.riskScore >= 60 ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  )}>
                    {patient.riskScore}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-xs text-gray-500">{patient.medications} medications</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {patient.factors.map((factor, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {factor}
                  </span>
                ))}
              </div>
              <button className="w-full btn-primary text-sm py-1.5">
                Intervene
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">92%</p>
            <p className="text-sm text-gray-500">PA Auto-Approval Rate</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">3.2h</p>
            <p className="text-sm text-gray-500">Avg PA Processing</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">78%</p>
            <p className="text-sm text-gray-500">Avg PDC Score</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-xl">
            <Users className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">1,247</p>
            <p className="text-sm text-gray-500">Active Patients</p>
          </div>
        </div>
      </div>
    </div>
  )
}
