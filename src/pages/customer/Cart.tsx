import React, { useState } from "react";
import { Link } from "react-router-dom";

export const CartPage: React.FC = () => {
  const [discountCode, setDiscountCode] = useState("");
  
  const cartItems = [
    {
      id: 1,
      shipment: 1,
      vendor: "Performance Parts Co.",
      freeShipping: true,
      name: "Brembo Ceramic Brake Pads - Front",
      sku: "BRM-FRT",
      price: 45.00,
      quantity: 1,
      inStock: true,
      fits: "2018 Toyota Camry",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8cQ5klR2Hc3ZpRej8eQ46niFZuZno1QIYRb3CPMgdLN_eOCRGwVNGCKiZIQQKoI49TrorqgVetLtI1kosaC258UvBuYaMaWZB3DoW6SqXMedmw0KEJ0sYyAOYIMjhRLuMcODMLeMJiNwtdq62t5ubknqLhCbS-g8w8q_cK2zRz3AKrPSesAw3Y8REtoBzq4_WxExQYtWrq0Nvur741wS1Ax926RiZEG-oEcBB4D4dyB09sejHjvPqarn_z0lrV55kPtAXaCN5wp7w"
    },
    {
      id: 2,
      shipment: 2,
      vendor: "OEM Warehouse",
      freeShipping: false,
      name: "Motorcraft Spark Plug",
      sku: "SP-459",
      price: 6.00,
      originalPrice: 24.00,
      quantity: 4,
      inStock: true,
      fits: "2018 Toyota Camry",
      image: "https://via.placeholder.com/100x100/374151/ffffff?text=Spark+Plug"
    },
    {
      id: 3,
      shipment: 2,
      vendor: "OEM Warehouse",
      freeShipping: false,
      name: "Cabin Air Filter",
      sku: "CAF-001",
      price: 12.00,
      quantity: 1,
      inStock: true,
      lowStock: true,
      fits: "2018 Toyota Camry",
      image: "https://via.placeholder.com/100x100/374151/ffffff?text=Air+Filter"
    }
  ];

  const subtotal = 81.00;
  const shipping = 15.00;
  const taxEstimate = 6.50;
  const savings = 6.00;
  const orderTotal = 102.50;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Shopping Cart <span className="text-slate-400">(3 Items)</span></h1>
            <Link to="/" className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Shipment 1 */}
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-700/50 px-6 py-3 border-b border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-semibold">📦</span>
                    <span className="font-medium">Shipment 1 of 2</span>
                    <span className="text-sm text-slate-300">Sold by Performance Parts Co.</span>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">Free Shipping Eligible</span>
                </div>
              </div>
              
              {cartItems.filter(item => item.shipment === 1).map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Shipment 2 */}
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="bg-slate-700/50 px-6 py-3 border-b border-slate-600">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-semibold">📦</span>
                  <span className="font-medium">Shipment 2 of 2</span>
                  <span className="text-sm text-slate-300">Sold by OEM Warehouse</span>
                </div>
              </div>
              
              {cartItems.filter(item => item.shipment === 2).map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 sticky top-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-300">Subtotal (3 items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Tax Estimate</span>
                  <span>${taxEstimate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span>Savings</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-slate-600 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Order Total</span>
                  <span className="text-2xl font-bold">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4 flex items-center justify-center gap-2">
                Proceed to Checkout
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">DISCOUNT CODE</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="flex justify-center space-x-2 mb-6">
                <div className="w-8 h-6 bg-slate-700 rounded flex items-center justify-center text-xs">💳</div>
                <div className="w-8 h-6 bg-slate-700 rounded flex items-center justify-center text-xs">🏧</div>
                <div className="w-8 h-6 bg-slate-700 rounded flex items-center justify-center text-xs">📱</div>
                <div className="w-8 h-6 bg-slate-700 rounded flex items-center justify-center text-xs">🏦</div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-400 mb-1">Buyer Protection Guarantee</h4>
                    <p className="text-xs text-slate-300">Full refund if the item is not as described or not delivered.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem: React.FC<{ item: any }> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="p-6 border-b border-slate-600 last:border-b-0">
      <div className="flex gap-4">
        <div 
          className="w-24 h-24 bg-slate-700 rounded-lg bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url("${item.image}")` }}
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-slate-400 text-sm">SKU: {item.sku}</p>
              {item.fits && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-green-400 text-sm">Fits 2018 Toyota Camry</span>
                </div>
              )}
              {item.inStock ? (
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-400 text-sm">In Stock</span>
                </div>
              ) : null}
              {item.lowStock && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-orange-400 text-sm">⚠️ Only 2 left</span>
                </div>
              )}
            </div>
            
            <div className="text-right">
              {item.originalPrice && (
                <div className="text-slate-400 text-sm line-through">${item.originalPrice.toFixed(2)}</div>
              )}
              <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
              {item.originalPrice && (
                <div className="text-sm">Total: ${(item.price * quantity).toFixed(2)}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-slate-300 hover:text-white text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
              <button className="flex items-center gap-2 text-slate-300 hover:text-white text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Save for Later
              </button>
            </div>
            
            <div className="flex items-center border border-slate-600 rounded-lg overflow-hidden bg-slate-700">
              <button 
                onClick={() => updateQuantity(quantity - 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
                className="w-12 h-10 text-center bg-transparent border-none outline-none"
              />
              <button 
                onClick={() => updateQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;