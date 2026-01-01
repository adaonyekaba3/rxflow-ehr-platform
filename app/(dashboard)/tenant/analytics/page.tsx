'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  TrendingUp, DollarSign, Pill, Shield, Download,
  Calendar, FileText
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

// Mock data for charts
const prescriptionVolumeData = [
  { date: 'Jan 1', volume: 245, filled: 198, pending: 47 },
  { date: 'Jan 8', volume: 289, filled: 234, pending: 55 },
  { date: 'Jan 15', volume: 312, filled: 267, pending: 45 },
  { date: 'Jan 22', volume: 298, filled: 256, pending: 42 },
  { date: 'Jan 29', volume: 334, filled: 289, pending: 45 },
  { date: 'Feb 5', volume: 356, filled: 312, pending: 44 },
  { date: 'Feb 12', volume: 378, filled: 334, pending: 44 },
]

const priorAuthData = [
  { payer: 'Aetna', approved: 45, denied: 8, pending: 12 },
  { payer: 'United', approved: 38, denied: 12, pending: 9 },
  { payer: 'BCBS', approved: 52, denied: 6, pending: 15 },
  { payer: 'Cigna', approved: 34, denied: 9, pending: 8 },
  { payer: 'Medicare', approved: 41, denied: 5, pending: 11 },
  { payer: 'Humana', approved: 29, denied: 7, pending: 6 },
]

const revenueData = [
  { date: 'Jan 1', revenue: 12450, copays: 3200, insurance: 9250 },
  { date: 'Jan 8', revenue: 14320, copays: 3650, insurance: 10670 },
  { date: 'Jan 15', revenue: 15890, copays: 4100, insurance: 11790 },
  { date: 'Jan 22', revenue: 14670, copays: 3890, insurance: 10780 },
  { date: 'Jan 29', revenue: 16240, copays: 4320, insurance: 11920 },
  { date: 'Feb 5', revenue: 17850, copays: 4670, insurance: 13180 },
  { date: 'Feb 12', revenue: 18920, copays: 4950, insurance: 13970 },
]

const payerDistributionData = [
  { name: 'Aetna', value: 24, color: '#EC4899' },
  { name: 'United Healthcare', value: 21, color: '#8B5CF6' },
  { name: 'BCBS', value: 18, color: '#06B6D4' },
  { name: 'Medicare', value: 16, color: '#14B8A6' },
  { name: 'Cigna', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 9, color: '#6B7280' },
]

const stats = [
  {
    label: 'Total Revenue',
    value: '$127,340',
    change: '+18%',
    icon: DollarSign,
    borderColor: 'border-l-orange-500'
  },
  {
    label: 'Prescriptions Filled',
    value: '1,890',
    change: '+12%',
    icon: Pill,
    borderColor: 'border-l-teal-500'
  },
  {
    label: 'PA Approval Rate',
    value: '87%',
    change: '+5%',
    icon: Shield,
    borderColor: 'border-l-pink-500'
  },
  {
    label: 'Avg Processing Time',
    value: '4.2hrs',
    change: '-22%',
    icon: TrendingUp,
    borderColor: 'border-l-cyan-500'
  },
]

const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Custom']

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [selectedRange, setSelectedRange] = useState('Last 30 days')

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            {dateRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="px-4 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4 ${stat.borderColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') && stat.label.includes('Time') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last period
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <stat.icon className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Prescription Volume Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Prescription Volume Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prescriptionVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="volume" stroke="#EC4899" strokeWidth={2} name="Total Volume" />
              <Line type="monotone" dataKey="filled" stroke="#14B8A6" strokeWidth={2} name="Filled" />
              <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Prior Auth Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Prior Auth Performance by Payer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorAuthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="payer" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend />
              <Bar dataKey="approved" fill="#14B8A6" name="Approved" radius={[4, 4, 0, 0]} />
              <Bar dataKey="denied" fill="#EF4444" name="Denied" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#F59E0B" name="Pending" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCopays" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#EC4899"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Total Revenue"
              />
              <Area
                type="monotone"
                dataKey="copays"
                stroke="#8B5CF6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCopays)"
                name="Copays"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Payer Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Payer Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={payerDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {payerDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
