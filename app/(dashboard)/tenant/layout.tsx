'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  Pill, Bell, Search, Menu, Home, FileText, Users, Activity,
  CreditCard, Settings, LogOut, BarChart3, Shield, Loader2, Inbox
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      toast.success('Logging out...')
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      toast.error('Failed to log out')
      setIsLoggingOut(false)
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/tenant', icon: Home },
    { name: 'Inbox', href: '/tenant/inbox', icon: Inbox, badge: 12 },
    { name: 'Prescriptions', href: '/tenant/prescriptions', icon: Pill },
    { name: 'Prior Auth', href: '/tenant/prior-auth', icon: FileText },
    { name: 'Patients', href: '/tenant/patients', icon: Users },
    { name: 'Adherence', href: '/tenant/adherence', icon: Activity },
    { name: 'POS / Payments', href: '/pos', icon: CreditCard },
    { name: 'Analytics', href: '/tenant/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/tenant/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 px-6 py-5 border-b border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">RxFlow</span>
              <p className="text-xs text-gray-500">Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-pink-50 text-pink-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-pink-600' : 'text-gray-400'}`} />
                    {item.name}
                  </div>
                  {item.badge && item.badge > 0 && (
                    <span className="ml-auto bg-pink-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-pink-700">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{session?.user?.email || 'user@example.com'}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-opacity"
              >
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
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
                <input type="text" placeholder="Search prescriptions, patients..." className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
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

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
