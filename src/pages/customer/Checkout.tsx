// Checkout page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/common/Button';

export const CheckoutPage: React.FC = () => {
  const { items, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMethod: 'card'
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('Order placed successfully! 🎉');
    navigate('/account');
  };

  const shippingCost = 200;
  const subtotal = getTotalPrice();
  const total = subtotal + shippingCost;

  const steps = [
    { number: 1, title: 'Shipping', icon: '📦' },
    { number: 2, title: 'Payment', icon: '💳' },
    { number: 3, title: 'Confirm', icon: '✓' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-8 rounded-2xl mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Secure Checkout</h1>
              <p className="text-primary-100 mt-2">Complete your purchase in 3 easy steps</p>
            </div>
            <div className="text-5xl">🛒</div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 flex justify-between items-center max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all
                ${currentStep >= step.number 
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' 
                  : 'bg-gray-300 text-gray-600'
                }
              `}>
                {step.icon}
              </div>

              {/* Step Title */}
              <div className="ml-3">
                <p className="text-xs text-gray-600">Step {step.number}</p>
                <p className={`font-bold ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-600'}`}>
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`
                  h-1 flex-1 mx-3 rounded-full transition-all
                  ${currentStep > step.number ? 'bg-primary-500' : 'bg-gray-300'}
                `} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  📦 Shipping Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setCurrentStep(2)}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  💳 Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    { value: 'card', label: '💳 Credit/Debit Card', description: 'Visa, Mastercard, RuPay' },
                    { value: 'upi', label: '📱 UPI', description: 'Google Pay, PhonePe, Paytm' },
                    { value: 'netbanking', label: '🏦 Net Banking', description: 'All major Indian banks' },
                    { value: 'wallet', label: '👛 Digital Wallet', description: 'PayPal, Apple Pay, Google Wallet' }
                  ].map((method) => (
                    <label key={method.value} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all" style={{
                      borderColor: formData.paymentMethod === method.value ? '#295BAC' : undefined,
                      backgroundColor: formData.paymentMethod === method.value ? '#e8f0fa' : undefined
                    }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleInputChange}
                        className="w-5 h-5 mt-1"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{method.label}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
                  <p className="text-sm text-blue-900">
                    <span className="font-bold">🔒 Secure & Encrypted:</span> Your payment information is fully encrypted and secure.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setCurrentStep(1)}
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    ← Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold"
                  >
                    Review Order →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  ✓ Review & Confirm
                </h2>

                {/* Address Summary */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">📦 Shipping Address</h3>
                  <p className="text-gray-700">
                    {formData.fullName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.state} {formData.postalCode}
                  </p>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">💳 Payment Method</h3>
                  <p className="text-gray-700">
                    {formData.paymentMethod === 'card' && '💳 Credit/Debit Card'}
                    {formData.paymentMethod === 'upi' && '📱 UPI'}
                    {formData.paymentMethod === 'netbanking' && '🏦 Net Banking'}
                    {formData.paymentMethod === 'wallet' && '👛 Digital Wallet'}
                  </p>
                </div>

                <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
                  <p className="text-sm text-green-900">
                    ✓ By placing this order, you agree to our Terms & Conditions and return policy.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                  >
                    ← Back
                  </Button>
                  <Button 
                    onClick={handleCheckout}
                    isLoading={isProcessing}
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold"
                  >
                    {isProcessing ? 'Processing...' : '✓ Place Order'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto border-b border-gray-200 pb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.title.substring(0, 25)}...</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900 text-right">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">₹{shippingCost.toLocaleString()}</span>
                </div>
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-xl border-2 border-primary-200">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
                <p className="flex items-center gap-2">🔒 <span>Secure encrypted payment</span></p>
                <p className="flex items-center gap-2">✓ <span>Fast shipping available</span></p>
                <p className="flex items-center gap-2">📞 <span>24/7 customer support</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
