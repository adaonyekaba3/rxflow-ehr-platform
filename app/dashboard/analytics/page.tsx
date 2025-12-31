'use client'

import { useState } from 'react'
import { 
  BarChart3, TrendingUp, TrendingDown, Calendar, Download,
  DollarSign, Users, Pill, Shield, Activity, Clock, Target
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 42000, transactions: 890 },
  { month: 'Feb', revenue: 45000, transactions: 920 },
  { month: 'Mar', revenue: 48000, transactions: 980 },
  { month: 'Apr', revenue: 52000, transactions: 1050 },
  { month: 'May', revenue: 49000, transactions: 1010 },
  { month: 'Jun', revenue: 55000, transactions: 1120 },
  { month: 'Jul', revenue: 58000, transactions: 1180 },
]

const paData = [
  { month: 'Jan', approved: 85, denied: 12, pending: 8 },
  { month: 'Feb', approved: 88, denied: 10, pending: 6 },
  { month: 'Mar', approved: 90, denied: 8, pending: 5 },
  { month: 'Apr', approved: 92, denied: 7, pending: 4 },
  { month: 'May', approved: 91, denied: 8, pending: 5 },
  { month: 'Jun', approved: 94, denied: 5, pending: 3 },
  { month: 'Jul', approved: 95, denied: 4, pending: 2 },
]

const adherenceData = [
  { name: 'Excellent (>90%)', value: 35, color: '#10B981' },
  { name: 'Good (80-90%)', value: 28, color: '#3B82F6' },
  { name: 'Fair (60-80%)', value: 22, color: '#F59E0B' },
  { name: 'Poor (<60%)', value: 15, color: '#EF4444' },
]

const rxByCategory = [
  { category: 'Cardiovascular', count: 342 },
  { category: 'Diabetes', count: 287 },
  { category: 'Mental Health', count: 198 },
  { category: 'Pain Management', count: 156 },
  { category: 'Respiratory', count: 134 },
  { category: 'Other', count: 230 },
]

const stats = [
  { label: 'Total Revenue', value: '$58,240', change: '+18%', trend: 'up', icon: DollarSign },
  { label: 'Prescriptions Filled', value: '1,842', change: '+12%', trend: 'up', icon: Pill },
  { label: 'PA Approval Rate', value: '95%', change: '+3%', trend: 'up', icon: Shield },
  { label: 'Avg PDC Score', value: '78%', change: '+5%', trend: 'up', icon: Activity },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Monitor performance and track key metrics</p>
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
            <option value="1y">Last year</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
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

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Monthly revenue and transactions</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0F4C81" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0F4C81" 
                  strokeWidth={2}
                  fill="url(#revenueGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PA Performance Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Prior Authorization Performance</h3>
              <p className="text-sm text-gray-500">Approval, denial, and pending rates</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                <Legend />
                <Bar dataKey="approved" name="Approved" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="denied" name="Denied" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Adherence Distribution */}
        <div className="card">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900">Adherence Distribution</h3>
            <p className="text-sm text-gray-500">Patient PDC score breakdown</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={adherenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {adherenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {adherenceData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prescriptions by Category */}
        <div className="card lg:col-span-2">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900">Prescriptions by Category</h3>
            <p className="text-sm text-gray-500">Distribution of filled prescriptions</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rxByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                <YAxis type="category" dataKey="category" stroke="#9CA3AF" fontSize={12} width={100} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                <Bar dataKey="count" fill="#0F4C81" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Avg PA Processing Time', value: '3.2 hours', target: '< 4 hours', status: 'good' },
            { label: 'First-Fill Adherence', value: '82%', target: '> 80%', status: 'good' },
            { label: 'Patient Satisfaction (NPS)', value: '+42', target: '> +40', status: 'good' },
            { label: 'Rx Abandonment Rate', value: '18%', target: '< 15%', status: 'warning' },
          ].map((kpi) => (
            <div key={kpi.label} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{kpi.label}</span>
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  kpi.status === 'good' ? 'bg-green-500' : 'bg-amber-500'
                )} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-xs text-gray-500 mt-1">Target: {kpi.target}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
