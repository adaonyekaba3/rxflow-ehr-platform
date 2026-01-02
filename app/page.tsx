import Link from 'next/link'
import { Pill, Shield, Activity, Users, Zap, Clock, CheckCircle, ArrowRight, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-base sm:text-xl font-bold text-gray-900">RxFlow</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/login" className="text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium">Sign In</Link>
              <Link href="/register" className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-50 text-primary-700 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              AI-Powered Healthcare Platform
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Transform Your Pharmacy Operations with
              <span className="text-primary-500"> Intelligent Automation</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto px-2">
              RxFlow Intelligence connects fragmented healthcare infrastructure, automates prior authorizations,
              and delivers exceptional patient experiences through AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Link href="/register" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 flex items-center justify-center">
                Start Free Trial <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Link>
              <Link href="#demo" className="btn-outline text-base sm:text-lg px-6 sm:px-8 py-3">
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-20 max-w-4xl mx-auto">
            {[
              { value: '40%', label: 'Reduction in Abandonment' },
              { value: '18x', label: 'Faster PA Processing' },
              { value: '92%', label: 'AI Prediction Accuracy' },
              { value: '+45', label: 'NPS Improvement' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-500 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Everything You Need for Modern Pharmacy Operations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              A comprehensive platform that streamlines every aspect of prescription fulfillment and patient care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Shield,
                title: 'AI Prior Authorization',
                description: 'Automated PA submissions with 92% prediction accuracy. Reduce processing time from 72 hours to under 4 hours.',
                color: 'bg-blue-500',
              },
              {
                icon: Activity,
                title: 'Adherence Intelligence',
                description: 'ML-powered risk scoring identifies at-risk patients early. Personalized interventions improve outcomes.',
                color: 'bg-green-500',
              },
              {
                icon: Clock,
                title: 'Real-Time Tracking',
                description: 'Patients get live prescription status updates. Push notifications keep everyone informed.',
                color: 'bg-purple-500',
              },
              {
                icon: Users,
                title: 'Multi-Tenant Platform',
                description: 'Enterprise-ready architecture supports multiple pharmacy locations with centralized management.',
                color: 'bg-orange-500',
              },
              {
                icon: BarChart3,
                title: 'Analytics Dashboard',
                description: 'Comprehensive reporting on PA approval rates, adherence metrics, and operational efficiency.',
                color: 'bg-pink-500',
              },
              {
                icon: CheckCircle,
                title: 'Integrated POS',
                description: 'Seamless payment processing with Stripe integration. Handle copays, insurance, and split payments.',
                color: 'bg-teal-500',
              },
            ].map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
            Ready to Transform Your Pharmacy?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 px-2">
            Join hundreds of pharmacies already using RxFlow Intelligence to improve patient outcomes.
          </p>
          <Link href="/register" className="inline-flex items-center bg-white text-primary-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-primary-50 transition-colors text-sm sm:text-base">
            Start Your Free Trial <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-white font-bold text-sm sm:text-base">RxFlow Intelligence</span>
            </div>
            <p className="text-xs sm:text-sm text-center md:text-left">
              Product Case Study by Adaobi Onyekaba | Built for Foundation Health PM Application
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
