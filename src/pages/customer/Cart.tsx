// Cart page
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/common/Button';

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const shippingCost = 200;

  // Group items by vendor
  const itemsByVendor = useMemo(() => {
    const grouped: Record<string, typeof items> = {};
    items.forEach((item) => {
      if (!grouped[item.vendorName]) {
        grouped[item.vendorName] = [];
      }
      grouped[item.vendorName].push(item);
    });
    return grouped;
  }, [items]);

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  const subtotal = getTotalPrice();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
          <Link to="/search">
            <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold">
              🔍 Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-8 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          <p className="text-primary-100 mt-2">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {/* Items by Vendor */}
          {Object.entries(itemsByVendor).map(([vendor, vendorItems]) => (
            <div key={vendor} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Vendor Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">🏪 {vendor}</h3>
                <p className="text-sm text-gray-600 mt-1">{vendorItems.length} item{vendorItems.length !== 1 ? 's' : ''}</p>
              </div>

              {/* Items */}
              <div className="space-y-4 p-6">
                {vendorItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                    {/* Product Image */}
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-24 h-24 object-cover rounded-xl shadow-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.vendorName}</p>
                      <p className="text-lg font-bold text-primary-600">₹{item.price.toLocaleString()}</p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col items-end gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border-2 border-gray-300 rounded-lg bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                        >
                          −
                        </button>
                        <span className="px-4 font-bold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for this item */}
                      <p className="text-sm text-gray-600">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold hover:underline"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Coupon Section */}
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 border-2 border-primary-200">
            <h3 className="font-bold text-gray-900 mb-4">💰 Have a coupon code?</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-3 bg-white border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500"
              />
              <Button 
                onClick={applyCoupon}
                className="bg-green-500 hover:bg-green-600 text-white font-bold"
              >
                Apply
              </Button>
            </div>
            <p className="text-xs text-green-700 mt-2">💡 Try "SAVE10" for 10% discount</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>

            {/* Breakdown */}
            <div className="space-y-3 border-b border-gray-200 pb-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount ({Math.round(discount * 100)}%)</span>
                  <span>−₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-semibold">₹{shippingCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-xl border-2 border-primary-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-bold">Total Amount</span>
                <span className="text-3xl font-bold text-primary-600">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link to="/checkout" className="block">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold">
                ✓ Proceed to Checkout
              </Button>
            </Link>

            {/* Continue Shopping */}
            <Link to="/search" className="block">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full border-2 border-primary-300 text-primary-600 hover:bg-primary-50"
              >
                Continue Shopping
              </Button>
            </Link>

            {/* Trust Badges */}
            <div className="space-y-3 text-sm text-gray-600 pt-4 border-t border-gray-200">
              <p className="flex items-center gap-2">✅ <span>Secure checkout</span></p>
              <p className="flex items-center gap-2">🔒 <span>Your payment is safe</span></p>
              <p className="flex items-center gap-2">📦 <span>Fast shipping available</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
