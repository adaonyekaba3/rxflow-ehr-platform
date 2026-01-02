'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Pill, Bell, Search, Menu, Home, Building, Users, Activity, 
  CreditCard, Settings, LogOut, TrendingUp, AlertTriangle,
  CheckCircle, BarChart3, Globe, Shield, Zap
} from 'lucide-react'

const systemStats = [
  { label: 'Total Tenants', value: '147', change: '+12', icon: Building, color: 'bg-blue-500' },
  { label: 'Active Users', value: '2,847', change: '+156', icon: Users, color: 'bg-green-500' },
  { label: 'Prescriptions Today', value: '12,450', change: '+8%', icon: Pill, color: 'bg-purple-500' },
  { label: 'Platform Revenue', value: '$45.2K', change: '+22%', icon: CreditCard, color: 'bg-amber-500' },
]

const recentTenants = [
  { id: 1, name: 'Main Street Pharmacy', location: 'Boston, MA', users: 12, status: 'active', plan: 'Professional' },
  { id: 2, name: 'HealthFirst Rx', location: 'New York, NY', users: 8, status: 'active', plan: 'Enterprise' },
  { id: 3, name: 'Community Care Pharmacy', location: 'Chicago, IL', users: 5, status: 'trial', plan: 'Basic' },
  { id: 4, name: 'Wellness Pharmacy Group', location: 'Los Angeles, CA', users: 24, status: 'active', plan: 'Enterprise' },
]

const systemHealth = [
  { name: 'API Gateway', status: 'operational', uptime: '99.99%' },
  { name: 'Database', status: 'operational', uptime: '99.95%' },
  { name: 'AI/ML Services', status: 'operational', uptime: '99.90%' },
  { name: 'Payment Processing', status: 'operational', uptime: '100%' },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home, current: true },
    { name: 'Tenants', href: '/admin/tenants', icon: Building, current: false },
    { name: 'Users', href: '/admin/users', icon: Users, current: false },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, current: false },
    { name: 'Billing', href: '/admin/billing', icon: CreditCard, current: false },
    { name: 'System Health', href: '/admin/health', icon: Activity, current: false },
    { name: 'Settings', href: '/admin/settings', icon: Settings, current: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3 px-6 py-5 border-b border-gray-800">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">RxFlow Admin</span>
              <p className="text-xs text-gray-400">System Console</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">SA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">System Admin</p>
                <p className="text-xs text-gray-400 truncate">admin@rxflow.io</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-gray-500 hover:text-gray-700">
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          {/* System Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {systemStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} this week</p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Tenants */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Tenants</h2>
                <Link href="/admin/tenants" className="text-sm text-primary-600 hover:text-primary-700">View all</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 uppercase">
                      <th className="pb-3">Organization</th>
                      <th className="pb-3">Users</th>
                      <th className="pb-3">Plan</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentTenants.map((tenant) => (
                      <tr key={tenant.id} className="text-sm">
                        <td className="py-3">
                          <p className="font-medium text-gray-900">{tenant.name}</p>
                          <p className="text-gray-500 text-xs">{tenant.location}</p>
                        </td>
                        <td className="py-3 text-gray-600">{tenant.users}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs">
                            {tenant.plan}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            tenant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {tenant.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Health */}
            <div className="card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">System Health</h2>
                <span className="flex items-center text-xs sm:text-sm text-green-600">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  All systems operational
                </span>
              </div>
              <div className="space-y-2 sm:space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="font-medium text-sm sm:text-base text-gray-900 truncate">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{service.uptime} uptime</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
