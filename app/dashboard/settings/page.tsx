'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Settings, Building2, Users, CreditCard, Shield, Bell, 
  Key, Globe, Mail, Save, Plus, Trash2, Edit, CheckCircle,
  AlertTriangle, Crown, Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const tabs = [
  { id: 'organization', name: 'Organization', icon: Building2 },
  { id: 'team', name: 'Team Members', icon: Users },
  { id: 'billing', name: 'Billing & Plan', icon: CreditCard },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'integrations', name: 'Integrations', icon: Globe },
]

const teamMembers = [
  { id: '1', name: 'Ada Okonkwo', email: 'ada@rxflow.com', role: 'ADMIN', status: 'active', avatar: 'AO' },
  { id: '2', name: 'John Smith', email: 'john@rxflow.com', role: 'PHARMACIST', status: 'active', avatar: 'JS' },
  { id: '3', name: 'Maria Garcia', email: 'maria@rxflow.com', role: 'TECHNICIAN', status: 'active', avatar: 'MG' },
  { id: '4', name: 'David Chen', email: 'david@rxflow.com', role: 'STAFF', status: 'pending', avatar: 'DC' },
]

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    features: ['Up to 500 patients', '3 team members', 'Basic PA automation', 'Email support'],
    current: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 299,
    features: ['Up to 2,000 patients', '10 team members', 'Full PA automation', 'Adherence AI', 'Priority support'],
    current: true,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: null,
    features: ['Unlimited patients', 'Unlimited team', 'Custom integrations', 'Dedicated success manager', 'SLA guarantee'],
    current: false,
  },
]

const integrations = [
  { id: 'epic', name: 'Epic EHR', description: 'Connect to Epic for patient data sync', status: 'connected', icon: '🏥' },
  { id: 'surescripts', name: 'Surescripts', description: 'E-prescribing network', status: 'connected', icon: '📋' },
  { id: 'stripe', name: 'Stripe', description: 'Payment processing', status: 'connected', icon: '💳' },
  { id: 'twilio', name: 'Twilio', description: 'SMS notifications', status: 'disconnected', icon: '📱' },
  { id: 'salesforce', name: 'Salesforce', description: 'CRM integration', status: 'disconnected', icon: '☁️' },
]

export default function SettingsPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('organization')
  const [isSaving, setIsSaving] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const [orgSettings, setOrgSettings] = useState({
    name: 'RxFlow Pharmacy Group',
    slug: 'rxflow-pharmacy',
    address: '123 Main Street',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101',
    phone: '(555) 123-4567',
    email: 'contact@rxflowpharmacy.com',
    npi: '1234567890',
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Settings saved successfully!')
    setIsSaving(false)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'organization':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Organization Name</label>
                  <input
                    type="text"
                    value={orgSettings.name}
                    onChange={(e) => setOrgSettings({ ...orgSettings, name: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Organization Slug</label>
                  <input
                    type="text"
                    value={orgSettings.slug}
                    onChange={(e) => setOrgSettings({ ...orgSettings, slug: e.target.value })}
                    className="input"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Address</label>
                  <input
                    type="text"
                    value={orgSettings.address}
                    onChange={(e) => setOrgSettings({ ...orgSettings, address: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">City</label>
                  <input
                    type="text"
                    value={orgSettings.city}
                    onChange={(e) => setOrgSettings({ ...orgSettings, city: e.target.value })}
                    className="input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">State</label>
                    <input
                      type="text"
                      value={orgSettings.state}
                      onChange={(e) => setOrgSettings({ ...orgSettings, state: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">ZIP Code</label>
                    <input
                      type="text"
                      value={orgSettings.zipCode}
                      onChange={(e) => setOrgSettings({ ...orgSettings, zipCode: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    value={orgSettings.phone}
                    onChange={(e) => setOrgSettings({ ...orgSettings, phone: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    value={orgSettings.email}
                    onChange={(e) => setOrgSettings({ ...orgSettings, email: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">NPI Number</label>
                  <input
                    type="text"
                    value={orgSettings.npi}
                    onChange={(e) => setOrgSettings({ ...orgSettings, npi: e.target.value })}
                    className="input"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button onClick={handleSave} disabled={isSaving} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )

      case 'team':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <p className="text-sm text-gray-500">Manage who has access to your organization</p>
              </div>
              <button onClick={() => setShowInviteModal(true)} className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Invite Member
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-700">{member.avatar}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <select className="text-sm border border-gray-200 rounded-lg px-2 py-1" defaultValue={member.role}>
                          <option value="ADMIN">Admin</option>
                          <option value="PHARMACIST">Pharmacist</option>
                          <option value="TECHNICIAN">Technician</option>
                          <option value="STAFF">Staff</option>
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <span className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                          member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        )}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'billing':
        return (
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Crown className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900">Professional Plan</p>
                    <p className="text-sm text-primary-700">$299/month • Renews Jan 15, 2025</p>
                  </div>
                </div>
                <button className="btn-secondary">Manage Subscription</button>
              </div>
            </div>

            {/* Plans */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={cn(
                      "p-6 rounded-xl border-2 relative",
                      plan.current ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                    )}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                        Most Popular
                      </span>
                    )}
                    <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                    <div className="mt-2 mb-4">
                      {plan.price ? (
                        <span className="text-3xl font-bold text-gray-900">${plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></span>
                      ) : (
                        <span className="text-xl font-semibold text-gray-900">Custom Pricing</span>
                      )}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className={cn(
                      "w-full py-2 rounded-lg font-medium",
                      plan.current 
                        ? 'bg-primary-100 text-primary-700 cursor-default'
                        : 'btn-primary'
                    )}>
                      {plan.current ? 'Current Plan' : plan.price ? 'Upgrade' : 'Contact Sales'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <button className="btn-secondary text-sm">Update</button>
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Key className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Password</p>
                      <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <button className="btn-secondary">Change Password</button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Shield className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="btn-primary">Enable</button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Globe className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Active Sessions</p>
                      <p className="text-sm text-gray-500">Manage your logged in devices</p>
                    </div>
                  </div>
                  <button className="btn-secondary">View Sessions</button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">HIPAA Compliance</h3>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Your organization is HIPAA compliant</p>
                    <p className="text-sm text-green-700">All security measures are active and up to date</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { id: 'pa', label: 'Prior Authorization Updates', description: 'Get notified when PA status changes' },
                { id: 'rx', label: 'Prescription Alerts', description: 'Notifications for prescription events' },
                { id: 'adherence', label: 'Adherence Alerts', description: 'High-risk patient notifications' },
                { id: 'billing', label: 'Billing Notifications', description: 'Payment and invoice alerts' },
                { id: 'system', label: 'System Updates', description: 'Platform updates and maintenance' },
              ].map((setting) => (
                <div key={setting.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{setting.label}</p>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      Email
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      Push
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Integrations</h3>
              <div className="space-y-3">
                {integrations.map((integration) => (
                  <div key={integration.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{integration.name}</p>
                        <p className="text-sm text-gray-500">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                        integration.status === 'connected' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      )}>
                        {integration.status}
                      </span>
                      <button className={integration.status === 'connected' ? 'btn-secondary' : 'btn-primary'}>
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Access</h3>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-900">API Key</p>
                    <p className="text-sm text-gray-500">Use this key for API integrations</p>
                  </div>
                  <button className="btn-secondary text-sm">Regenerate</button>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg font-mono text-sm text-gray-700">
                  rxf_live_••••••••••••••••••••••••••••
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your organization and account settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 card">
          {renderTabContent()}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowInviteModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Invite Team Member</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Email Address</label>
                <input type="email" className="input" placeholder="colleague@company.com" />
              </div>
              <div>
                <label className="label">Role</label>
                <select className="input">
                  <option value="STAFF">Staff</option>
                  <option value="TECHNICIAN">Technician</option>
                  <option value="PHARMACIST">Pharmacist</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowInviteModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button className="btn-primary flex-1">Send Invite</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
