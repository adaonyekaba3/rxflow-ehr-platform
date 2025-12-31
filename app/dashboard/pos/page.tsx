'use client'

import { useState } from 'react'
import { 
  CreditCard, DollarSign, Receipt, Search, Plus, Minus,
  Trash2, ShoppingCart, CheckCircle, Clock, X, Scan,
  Loader2, Wallet, Building2, Heart
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

// Mock data
const prescriptionsReady = [
  { id: 'RX-2024-001', patient: 'John Smith', medication: 'Metformin 500mg', quantity: 90, copay: 12.00 },
  { id: 'RX-2024-005', patient: 'John Smith', medication: 'Lisinopril 10mg', quantity: 30, copay: 8.50 },
  { id: 'RX-2024-008', patient: 'Maria Garcia', medication: 'Omeprazole 20mg', quantity: 30, copay: 15.00 },
  { id: 'RX-2024-012', patient: 'Robert Chen', medication: 'Atorvastatin 20mg', quantity: 30, copay: 22.00 },
]

const otcProducts = [
  { id: 'OTC-001', name: 'Ibuprofen 200mg', price: 8.99, category: 'Pain Relief' },
  { id: 'OTC-002', name: 'Vitamin D3 1000IU', price: 12.99, category: 'Vitamins' },
  { id: 'OTC-003', name: 'Allergy Relief 24hr', price: 18.99, category: 'Allergy' },
  { id: 'OTC-004', name: 'Hand Sanitizer 8oz', price: 4.99, category: 'First Aid' },
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  type: 'prescription' | 'otc'
  patient?: string
}

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'cash', name: 'Cash', icon: DollarSign },
  { id: 'hsa', name: 'HSA/FSA', icon: Heart },
  { id: 'insurance', name: 'Insurance Only', icon: Building2 },
]

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'otc'>('prescriptions')
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' })

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find(i => i.id === item.id)
    if (existingItem) {
      setCart(cart.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
    toast.success(`Added ${item.name} to cart`)
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(i => i.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(i => {
      if (i.id === id) {
        const newQty = i.quantity + delta
        return newQty > 0 ? { ...i, quantity: newQty } : i
      }
      return i
    }).filter(i => i.quantity > 0))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.0625 // 6.25% tax on OTC only
  const otcSubtotal = cart.filter(i => i.type === 'otc').reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxAmount = otcSubtotal * 0.0625
  const total = subtotal + taxAmount

  const processPayment = async () => {
    setIsProcessing(true)
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Payment processed successfully!')
      setCart([])
      setShowPaymentModal(false)
      setCardDetails({ number: '', expiry: '', cvc: '' })
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const filteredPrescriptions = prescriptionsReady.filter(rx =>
    rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredOTC = otcProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Point of Sale</h1>
          <p className="text-gray-500">Process prescription pickups and sales</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            View Transactions
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100%-5rem)]">
        {/* Product Selection */}
        <div className="lg:col-span-2 card flex flex-col h-full">
          {/* Search & Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by patient, Rx #, or product..."
                className="input pl-10"
              />
            </div>
            <button className="btn-secondary flex items-center gap-2 whitespace-nowrap">
              <Scan className="w-4 h-4" />
              Scan Barcode
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === 'prescriptions' 
                  ? "border-primary-500 text-primary-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              Ready Prescriptions ({prescriptionsReady.length})
            </button>
            <button
              onClick={() => setActiveTab('otc')}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === 'otc' 
                  ? "border-primary-500 text-primary-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              OTC Products
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'prescriptions' ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {filteredPrescriptions.map((rx) => (
                  <button
                    key={rx.id}
                    onClick={() => addToCart({
                      id: rx.id,
                      name: rx.medication,
                      price: rx.copay,
                      quantity: 1,
                      type: 'prescription',
                      patient: rx.patient,
                    })}
                    className="p-4 border border-gray-200 rounded-lg text-left hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                        {rx.id}
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        ${rx.copay.toFixed(2)}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900">{rx.medication}</p>
                    <p className="text-sm text-gray-500">Qty: {rx.quantity} • {rx.patient}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredOTC.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      type: 'otc',
                    })}
                    className="p-4 border border-gray-200 rounded-lg text-left hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <span className="text-xs text-gray-500">{product.category}</span>
                    <p className="font-medium text-gray-900 mt-1">{product.name}</p>
                    <p className="text-lg font-bold text-green-600 mt-2">
                      ${product.price.toFixed(2)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cart */}
        <div className="card flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Cart</h2>
            {cart.length > 0 && (
              <span className="ml-auto bg-primary-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {cart.length} items
              </span>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingCart className="w-12 h-12 mb-2" />
                <p>Cart is empty</p>
                <p className="text-sm">Add items to begin</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      {item.patient && (
                        <p className="text-xs text-gray-500">{item.patient}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (OTC only)</span>
                <span className="text-gray-900">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full btn-primary py-3 mt-4 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Process Payment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPaymentModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fade-in">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-6">Payment</h3>

            {/* Amount */}
            <div className="text-center mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-4xl font-bold text-gray-900">${total.toFixed(2)}</p>
            </div>

            {/* Payment Method Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={cn(
                    "p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all",
                    selectedPayment === method.id
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <method.icon className={cn(
                    "w-6 h-6",
                    selectedPayment === method.id ? "text-primary-600" : "text-gray-400"
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    selectedPayment === method.id ? "text-primary-600" : "text-gray-600"
                  )}>
                    {method.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Card Input (if card selected) */}
            {selectedPayment === 'card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="label">Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Secured by Stripe. Your card details are encrypted.
                </p>
              </div>
            )}

            {selectedPayment === 'cash' && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  Collect <strong>${total.toFixed(2)}</strong> in cash from the customer.
                </p>
              </div>
            )}

            <button
              onClick={processPayment}
              disabled={isProcessing}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Complete Payment
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
