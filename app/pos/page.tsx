'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Pill, ArrowLeft, Search, Plus, Minus, Trash2, CreditCard, 
  Banknote, Loader2, CheckCircle, Receipt, User, Phone, Mail,
  Printer, Download, X, Shield
} from 'lucide-react'
import toast from 'react-hot-toast'

// Mock prescription data (in real app, this would come from API)
const availablePrescriptions = [
  { id: 'RX-001', patient: 'John Smith', medication: 'Metformin 500mg', quantity: 60, price: 12.00, copay: 8.00, insuranceCovered: 4.00 },
  { id: 'RX-002', patient: 'John Smith', medication: 'Lisinopril 10mg', quantity: 30, price: 15.50, copay: 10.00, insuranceCovered: 5.50 },
  { id: 'RX-003', patient: 'Maria Garcia', medication: 'Atorvastatin 20mg', quantity: 30, price: 22.00, copay: 15.00, insuranceCovered: 7.00 },
  { id: 'RX-004', patient: 'Robert Chen', medication: 'Omeprazole 20mg', quantity: 30, price: 18.00, copay: 12.00, insuranceCovered: 6.00 },
]

const otcProducts = [
  { id: 'OTC-001', name: 'Tylenol Extra Strength 100ct', price: 12.99 },
  { id: 'OTC-002', name: 'Advil 50ct', price: 9.99 },
  { id: 'OTC-003', name: 'Zyrtec 30ct', price: 24.99 },
  { id: 'OTC-004', name: 'Mucinex DM 20ct', price: 15.99 },
  { id: 'OTC-005', name: 'Band-Aid Variety Pack', price: 6.99 },
]

interface CartItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  total: number
  type: 'rx' | 'otc'
  patient?: string
}

export default function POSPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [transactionComplete, setTransactionComplete] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' })

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.0625 // 6.25% tax
  const total = subtotal + tax

  const addToCart = (item: any, type: 'rx' | 'otc') => {
    const existingItem = cart.find(c => c.id === item.id)
    
    if (existingItem) {
      setCart(cart.map(c => 
        c.id === item.id 
          ? { ...c, quantity: c.quantity + 1, total: (c.quantity + 1) * c.unitPrice }
          : c
      ))
    } else {
      const price = type === 'rx' ? item.copay : item.price
      setCart([...cart, {
        id: item.id,
        name: type === 'rx' ? item.medication : item.name,
        quantity: 1,
        unitPrice: price,
        total: price,
        type,
        patient: type === 'rx' ? item.patient : undefined,
      }])
    }
    toast.success('Added to cart')
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty, total: newQty * item.unitPrice }
      }
      return item
    }))
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const processPayment = async () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate API call to create Stripe payment intent
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In real app, this would call /api/stripe/checkout
      // const response = await fetch('/api/stripe/checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items: cart, total, paymentMethod }),
      // })

      setTransactionComplete(true)
      setShowReceipt(true)
      toast.success('Payment successful!')
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const resetTransaction = () => {
    setCart([])
    setPaymentMethod(null)
    setTransactionComplete(false)
    setShowReceipt(false)
    setCustomerInfo({ name: '', phone: '', email: '' })
  }

  const filteredRx = availablePrescriptions.filter(rx => 
    rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.medication.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredOTC = otcProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/tenant" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Point of Sale</h1>
                <p className="text-xs text-gray-500">RxFlow Intelligence</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Terminal #1</span>
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Product Selection */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search prescriptions or products..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Ready Prescriptions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Pill className="w-5 h-5 mr-2 text-pink-500" />
              Ready Prescriptions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRx.map((rx) => (
                <div
                  key={rx.id}
                  onClick={() => addToCart(rx, 'rx')}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-pink-300 hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{rx.medication}</p>
                      <p className="text-sm text-gray-500">{rx.patient}</p>
                    </div>
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">Ready</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Qty: {rx.quantity} • Copay: ${rx.copay.toFixed(2)}
                    </div>
                    <button className="p-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OTC Products */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-purple-500" />
              OTC Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredOTC.map((product) => (
                <div
                  key={product.id}
                  onClick={() => addToCart(product, 'otc')}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-purple-300 hover:shadow-md cursor-pointer transition-all"
                >
                  <p className="font-medium text-gray-900 text-sm mb-2">{product.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button className="p-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Cart */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          {/* Cart Header */}
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Current Transaction</h2>
            <p className="text-sm text-gray-500">{cart.length} item(s)</p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No items in cart</p>
                <p className="text-sm text-gray-400">Click a product to add it</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                        {item.patient && (
                          <p className="text-xs text-gray-500">{item.patient}</p>
                        )}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 bg-white border border-gray-200 rounded hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 bg-white border border-gray-200 rounded hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium text-gray-900">${item.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-4 border-t border-gray-100 space-y-4">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (6.25%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'cash'
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span className="font-medium">Cash</span>
              </button>
            </div>

            {/* Process Payment Button */}
            <button
              onClick={processPayment}
              disabled={cart.length === 0 || isProcessing}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete Sale (${total.toFixed(2)})
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Transaction Complete</h3>
              <button onClick={resetTransaction} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Payment Successful</h4>
                <p className="text-gray-500 mt-1">Transaction #TXN-{Date.now().toString(36).toUpperCase()}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-2 text-sm">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${item.total.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="btn-outline flex items-center justify-center">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button className="btn-outline flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </button>
              </div>
              
              <button onClick={resetTransaction} className="w-full btn-primary mt-4">
                New Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
