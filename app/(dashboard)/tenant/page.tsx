'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { 
  Pill, Bell, Search, Menu, Home, FileText, Users, Activity, 
  CreditCard, Settings, LogOut, ChevronRight, Clock, CheckCircle, 
  AlertTriangle, TrendingUp, Package, Zap, BarChart3, Shield
} from 'lucide-react'

// Mock data
const stats = [
  { label: 'Active Prescriptions', value: '847', change: '+12%', icon: Pill, color: 'bg-blue-500' },
  { label: 'Pending Prior Auth', value: '23', change: '-8%', icon: Shield, color: 'bg-amber-500' },
  { label: 'Ready for Pickup', value: '156', change: '+5%', icon: Package, color: 'bg-green-500' },
  { label: "Today's Revenue", value: '$12,450', change: '+18%', icon: CreditCard, color: 'bg-purple-500' },
]

const recentPrescriptions = [
  { id: 'RX-2024-001', patient: 'John Smith', medication: 'Metformin 500mg', status: 'ready', time: '10 min ago' },
  { id: 'RX-2024-002', patient: 'Maria Garcia', medication: 'Lisinopril 10mg', status: 'processing', time: '25 min ago' },
  { id: 'RX-2024-003', patient: 'Robert Chen', medication: 'Atorvastatin 20mg', status: 'prior-auth', time: '1 hour ago' },
  { id: 'RX-2024-004', patient: 'Sarah Johnson', medication: 'Omeprazole 20mg', status: 'ready', time: '2 hours ago' },
  { id: 'RX-2024-005', patient: 'Michael Brown', medication: 'Amlodipine 5mg', status: 'picked-up', time: '3 hours ago' },
]

const priorAuthQueue = [
  { id: 'PA-001', patient: 'James Wilson', medication: 'Humira 40mg', payer: 'Aetna', aiScore: 94, submitted: '2h ago' },
  { id: 'PA-002', patient: 'Emily Davis', medication: 'Ozempic 0.5mg', payer: 'United', aiScore: 72, submitted: '4h ago' },
  { id: 'PA-003', patient: 'David Lee', medication: 'Jardiance 10mg', payer: 'BCBS', aiScore: 88, submitted: '6h ago' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ready': return 'bg-green-100 text-green-800'
    case 'processing': return 'bg-blue-100 text-blue-800'
    case 'prior-auth': return 'bg-amber-100 text-amber-800'
    case 'picked-up': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'ready': return <CheckCircle className="w-4 h-4" />
    case 'processing': return <Clock className="w-4 h-4" />
    case 'prior-auth': return <AlertTriangle className="w-4 h-4" />
    default: return <Package className="w-4 h-4" />
  }
}

export default function TenantDashboard() {
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    { name: 'Dashboard', href: '/tenant', icon: Home, current: true },
    { name: 'Prescriptions', href: '/tenant/prescriptions', icon: Pill, current: false },
    { name: 'Prior Auth', href: '/tenant/prior-auth', icon: FileText, current: false },
    { name: 'Patients', href: '/tenant/patients', icon: Users, current: false },
    { name: 'Adherence', href: '/tenant/adherence', icon: Activity, current: false },
    { name: 'POS / Payments', href: '/pos', icon: CreditCard, current: false },
    { name: 'Analytics', href: '/tenant/analytics', icon: BarChart3, current: false },
    { name: 'Settings', href: '/tenant/settings', icon: Settings, current: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 px-6 py-5 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">RxFlow</span>
              <p className="text-xs text-gray-500">Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${item.current ? 'text-primary-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{session?.user?.email || 'user@example.com'}</p>
              </div>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search prescriptions, patients..." className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/pos" className="btn-primary flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Open POS
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}!</h1>
            <p className="text-gray-600">Here's what's happening with your pharmacy today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from yesterday
                    </p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Prescriptions */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Prescriptions</h2>
                <Link href="/tenant/prescriptions" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentPrescriptions.map((rx) => (
                  <div key={rx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(rx.status)}`}>
                        {getStatusIcon(rx.status)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{rx.patient}</p>
                        <p className="text-sm text-gray-500">{rx.medication}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(rx.status)}`}>
                        {rx.status.replace('-', ' ')}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{rx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prior Auth Queue */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Prior Auth Queue</h2>
                <Link href="/tenant/prior-auth" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                  View all <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-3">
                {priorAuthQueue.map((pa) => (
                  <div key={pa.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-amber-100">
                        <Zap className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{pa.patient}</p>
                        <p className="text-sm text-gray-500">{pa.medication} • {pa.payer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <div className={`w-12 h-2 rounded-full ${pa.aiScore >= 80 ? 'bg-green-200' : 'bg-amber-200'}`}>
                          <div className={`h-2 rounded-full ${pa.aiScore >= 80 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${pa.aiScore}%` }}></div>
                        </div>
                        <span className={`text-sm font-medium ${pa.aiScore >= 80 ? 'text-green-600' : 'text-amber-600'}`}>{pa.aiScore}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{pa.submitted}</p>
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
