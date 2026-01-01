'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Download, Calendar, TrendingUp, TrendingDown,
  Mail, Clock, CheckCircle, Sparkles, BarChart3
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

// Mock data for charts
const volumeByDay = [
  { date: 'Mon', count: 42, responded: 38 },
  { date: 'Tue', count: 38, responded: 35 },
  { date: 'Wed', count: 55, responded: 48 },
  { date: 'Thu', count: 47, responded: 44 },
  { date: 'Fri', count: 61, responded: 52 },
  { date: 'Sat', count: 23, responded: 21 },
  { date: 'Sun', count: 18, responded: 17 }
]

const byCategory = [
  { name: 'Refill Requests', value: 35, color: '#3B82F6' },
  { name: 'Lab Results', value: 20, color: '#A855F7' },
  { name: 'Patient Questions', value: 25, color: '#14B8A6' },
  { name: 'PA Updates', value: 10, color: '#EC4899' },
  { name: 'Other', value: 10, color: '#6B7280' }
]

const responseTimeData = [
  { date: 'Week 1', avgTime: 3.2 },
  { date: 'Week 2', avgTime: 2.9 },
  { date: 'Week 3', avgTime: 2.6 },
  { date: 'Week 4', avgTime: 2.4 }
]

const aiPerformance = [
  { metric: 'Drafts Generated', value: 156, color: '#14B8A6' },
  { metric: 'Accepted As-Is', value: 98, color: '#10B981' },
  { metric: 'Edited & Sent', value: 43, color: '#F59E0B' },
  { metric: 'Rejected', value: 15, color: '#EF4444' }
]

const performanceByCategory = [
  { category: 'Refills', generated: 45, accepted: 42, edited: 3 },
  { category: 'Labs', generated: 38, accepted: 32, edited: 6 },
  { category: 'Questions', generated: 52, accepted: 18, edited: 29 },
  { category: 'PA Updates', generated: 21, accepted: 6, edited: 5 }
]

export default function InboxAnalyticsPage() {
  const [dateRange, setDateRange] = useState('Last 30 days')

  const dateRanges = ['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'Custom']

  return (
    <>
      {/* Back Button */}
      <Link
        href="/tenant/inbox"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Inbox
      </Link>

      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inbox Analytics</h1>
          <p className="text-gray-600">Performance metrics and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            {dateRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          <button className="btn-outline flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4 border-l-pink-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Total Messages</p>
            <Mail className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">284</p>
          <div className="flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+18% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4 border-l-teal-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Avg Response Time</p>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">2.4 hrs</p>
          <div className="flex items-center text-xs text-green-600">
            <TrendingDown className="w-3 h-3 mr-1" />
            <span>-22% faster</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">AI Draft Accept Rate</p>
            <Sparkles className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">73%</p>
          <div className="flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+5% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Inbox Zero Days</p>
            <CheckCircle className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">12 days</p>
          <div className="flex items-center text-xs text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+3 days</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Overdue Messages</p>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">3</p>
          <div className="flex items-center text-xs text-red-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>SLA risk</span>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-teal-100 rounded-xl">
            <Sparkles className="w-6 h-6 text-teal-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Performance Summary</h3>
            <p className="text-gray-700 mb-3">
              AI assistance saved you approximately <strong className="text-teal-700">2.5 hours</strong> this week
              by generating 156 draft responses with a 73% acceptance rate.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">Time Saved</p>
                <p className="text-lg font-bold text-teal-600">2.5 hrs</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">Drafts Generated</p>
                <p className="text-lg font-bold text-teal-600">156</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">Acceptance Rate</p>
                <p className="text-lg font-bold text-teal-600">73%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Message Volume by Day */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Message Volume by Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={volumeByDay}>
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
              <Line
                type="monotone"
                dataKey="count"
                stroke="#EC4899"
                strokeWidth={2}
                name="Received"
                dot={{ fill: '#EC4899' }}
              />
              <Line
                type="monotone"
                dataKey="responded"
                stroke="#14B8A6"
                strokeWidth={2}
                name="Responded"
                dot={{ fill: '#14B8A6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Messages by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Messages by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={byCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {byCategory.map((entry, index) => (
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Response Time Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Response Time Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={responseTimeData}>
              <defs>
                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="avgTime"
                stroke="#EC4899"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTime)"
                name="Avg Response Time (hrs)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Assist Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Assist Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aiPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis dataKey="metric" type="category" stroke="#6b7280" fontSize={12} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {aiPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Performance by Category */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Performance by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceByCategory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="category" stroke="#6b7280" fontSize={12} />
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
            <Bar dataKey="generated" fill="#14B8A6" name="Generated" radius={[4, 4, 0, 0]} />
            <Bar dataKey="accepted" fill="#10B981" name="Accepted As-Is" radius={[4, 4, 0, 0]} />
            <Bar dataKey="edited" fill="#F59E0B" name="Edited & Sent" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
