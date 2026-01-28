import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';
import { getLowStockProducts } from '../../api/vendor';

/**
 * VendorDashboard.jsx
 * Single-file React component converted from provided HTML.
 * - Tailwind classes preserved.
 * - Material Symbols used as <span className="material-symbols-outlined">...</span>
 * - Images kept as hotlinks in inline styles / <img>.
 */

interface LowStockProduct {
  id: number;
  name: string;
  sku: string;
  quantity_in_stock: number;
  status: string;
}

export default function VendorDashboard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
  const [loadingLowStock, setLoadingLowStock] = useState(true);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [orders] = useState([
    { id: "#ORD-001", name: "Brembo Brake Pads", customer: "John Doe", date: "Oct 24, 2023", status: "Shipped", total: "$120.00" },
    { id: "#ORD-002", name: "Oil Filter Premium", customer: "Jane Smith", date: "Oct 24, 2023", status: "Processing", total: "$15.50" },
    { id: "#ORD-003", name: "NGK Spark Plugs (x4)", customer: "Mike Ross", date: "Oct 23, 2023", status: "Pending", total: "$45.00" },
    { id: "#ORD-004", name: "Air Filter Box", customer: "Sarah Connor", date: "Oct 23, 2023", status: "Delivered", total: "$89.99" },
  ]);

  useEffect(() => {
    loadLowStockProducts();
  }, []);

  const loadLowStockProducts = async () => {
    try {
      setLoadingLowStock(true);
      const products = await getLowStockProducts();
      setLowStockProducts(products);
    } catch (error) {
      console.error("Failed to load low stock products:", error);
    } finally {
      setLoadingLowStock(false);
    }
  };

  const handleDismissNotification = (productId: number) => {
    setLowStockProducts(prev => prev.filter(p => p.id !== productId));
  };

  const getSeverity = (quantity: number) => {
    if (quantity <= 2) return "red";
    if (quantity <= 5) return "orange";
    return "yellow";
  };

  const getQuantityText = (quantity: number) => {
    if (quantity <= 2) return `Only ${quantity} left`;
    if (quantity <= 5) return `Only ${quantity} left`;
    return `${quantity} left (Threshold: 10)`;
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <VendorSidebar />

      {/* Main */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Background blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header */}
        <header className="glass-header sticky top-0 z-10 flex h-16 items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <button className="text-slate-400 hover:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="text-lg font-bold">Dashboard</span>
          </div>

          <div className="hidden lg:flex flex-col">
            <h2 className="text-lg font-bold leading-tight text-white">Vendor Dashboard</h2>
            <p className="text-slate-400 text-xs">Welcome back, here's what's happening today.</p>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="relative hidden sm:block max-w-md w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search orders, parts, or customers..."
                className="block w-full rounded-lg border-0 bg-white/5 py-2 pl-10 pr-4 text-white ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-primary focus:bg-white/10 sm:text-sm sm:leading-6 transition-all"
              />
            </div>

            <button 
              onClick={() => setShowNotificationPanel(!showNotificationPanel)}
              className="relative rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">notifications</span>
              {lowStockProducts.length > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {lowStockProducts.length}
                </span>
              )}
            </button>

            
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-xl flex flex-col gap-4 group hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-blue-500/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">shopping_bag</span>
                </div>
                <span className="flex items-center text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> +5%
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Total Orders</p>
                <h3 className="text-2xl font-bold text-white">1,245</h3>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl flex flex-col gap-4 group hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-blue-500/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="flex items-center text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> +12%
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Monthly Revenue</p>
                <h3 className="text-2xl font-bold text-white">$12,450</h3>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl flex flex-col gap-4 group hover:bg-white/5 transition-colors ring-1 ring-orange-500/20">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                  <span className="material-symbols-outlined">pending_actions</span>
                </div>
                <span className="text-orange-400 text-xs font-bold bg-orange-400/10 px-2 py-1 rounded-full">Action Needed</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Pending Orders</p>
                <h3 className="text-2xl font-bold text-white">8</h3>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl flex flex-col gap-4 group hover:bg-white/5 transition-colors ring-1 ring-red-500/20">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <span className="text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded-full">Warning</span>
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Low Stock Items</p>
                <h3 className="text-2xl font-bold text-white">{lowStockProducts.length}</h3>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="glass-panel rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Sales Performance</h3>
                <p className="text-slate-400 text-sm">Revenue trends over the last 30 days</p>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/5">
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-primary rounded-md shadow-sm">30 Days</button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors">90 Days</button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors">YTD</button>
              </div>
            </div>

            <div className="h-[300px] w-full relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#067ff9" stopOpacity="0.5"></stop>
                    <stop offset="100%" stopColor="#067ff9" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>

                {/* Grid */}
                <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="0" y2="0" />
                <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="50" y2="50" />
                <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="100" y2="100" />
                <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="150" y2="150" />
                <line stroke="rgba(255,255,255,0.1)" strokeWidth="1" x1="0" x2="800" y1="200" y2="200" />

                <path d="M0,150 C50,140 100,160 150,130 C200,100 250,110 300,80 C350,50 400,70 450,60 C500,50 550,20 600,30 C650,40 700,20 750,10 L800,0 V200 H0 Z" fill="url(#chartGradient)"></path>
                <path d="M0,150 C50,140 100,160 150,130 C200,100 250,110 300,80 C350,50 400,70 450,60 C500,50 550,20 600,30 C650,40 700,20 750,10 L800,0" fill="none" stroke="#067ff9" strokeLinecap="round" strokeWidth="3"></path>

                <circle cx="150" cy="130" fill="#0f1923" r="4" stroke="#067ff9" strokeWidth="2"></circle>
                <circle cx="300" cy="80" fill="#0f1923" r="4" stroke="#067ff9" strokeWidth="2"></circle>
                <circle cx="450" cy="60" fill="#0f1923" r="4" stroke="#067ff9" strokeWidth="2"></circle>
                <circle cx="600" cy="30" fill="#0f1923" r="4" stroke="#067ff9" strokeWidth="2"></circle>

                <g transform="translate(600, -10)">
                  <rect fill="#1e293b" height="26" rx="4" stroke="rgba(255,255,255,0.1)" width="60" x="-30" y="-35"></rect>
                  <text fill="white" fontFamily="Inter" fontSize="12" fontWeight="bold" textAnchor="middle" x="0" y="-18">$2,100</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Orders + Low stock */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="xl:col-span-2 glass-panel rounded-xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                <button onClick={() => navigate('/vendor/orders')} className="text-sm text-primary hover:text-blue-400 font-medium">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/5 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Part Name</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody className="text-sm divide-y divide-white/5">
                    {orders.map((o) => (
                      <tr key={o.id} className="group hover:bg-white/5 transition-colors cursor-pointer">
                        <td className="px-6 py-4 font-medium text-white">{o.id}</td>
                        <td className="px-6 py-4 text-slate-300">{o.name}</td>
                        <td className="px-6 py-4 text-slate-400">{o.customer}</td>
                        <td className="px-6 py-4 text-slate-400">{o.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                            o.status === "Shipped" ? "bg-emerald-400/10 text-emerald-400" :
                            o.status === "Processing" ? "bg-amber-400/10 text-amber-400" :
                            o.status === "Pending" ? "bg-slate-400/10 text-slate-400" :
                            "bg-emerald-400/10 text-emerald-400"
                          }`}>
                            <span className="size-1.5 rounded-full" style={{
                              background: o.status === "Shipped" ? "#34D399" : o.status === "Processing" ? "#F59E0B" : "#94A3B8",
                              display: "inline-block",
                              width: 8,
                              height: 8,
                              borderRadius: 9999
                            }} />
                            {o.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white font-medium text-right">{o.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="glass-panel rounded-xl flex flex-col">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-400">warning</span>
                  <h3 className="text-lg font-bold text-white">Low Stock Alerts</h3>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-4">
                {loadingLowStock ? (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-slate-400 text-sm">Loading...</p>
                  </div>
                ) : lowStockProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <span className="material-symbols-outlined text-green-400 text-4xl mb-2">check_circle</span>
                    <p className="text-slate-400 text-sm">All products have sufficient stock</p>
                  </div>
                ) : (
                  lowStockProducts.map((product) => {
                    const severity = getSeverity(product.quantity_in_stock);
                    return (
                      <div key={product.id} className="bg-white/5 rounded-lg p-4 border border-white/5 flex items-center justify-between group hover:border-red-500/30 transition-all">
                        <div className="flex flex-col gap-1">
                          <h4 className="text-white font-medium text-sm">{product.name}</h4>
                          <p className={`${severity === "red" ? "text-red-400" : "text-orange-400"} text-xs font-bold`}>
                            {getQuantityText(product.quantity_in_stock)}
                          </p>
                          <p className="text-slate-500 text-xs">SKU: {product.sku}</p>
                        </div>
                        <button 
                          onClick={() => navigate(`/vendor/edit-product/${product.id}`)}
                          className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                        >
                          Restock
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-auto p-4 border-t border-white/5 text-center">
                <button 
                  onClick={() => navigate('/vendor/inventory')}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Go to Inventory Management →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Notification Side Panel */}
      {showNotificationPanel && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setShowNotificationPanel(false)}
          />
          
          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-[#0f1923] border-l border-white/10 z-50 shadow-2xl flex flex-col">
            {/* Panel Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <span className="material-symbols-outlined text-red-400">warning</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Low Stock Alerts</h3>
                  <p className="text-xs text-slate-400">
                    {lowStockProducts.length} {lowStockProducts.length === 1 ? 'item needs' : 'items need'} attention
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNotificationPanel(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {loadingLowStock ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-slate-400 text-sm">Loading notifications...</p>
                  </div>
                </div>
              ) : lowStockProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-green-400 text-4xl">check_circle</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">All Good!</h4>
                  <p className="text-slate-400 text-sm text-center">All products have sufficient stock levels</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lowStockProducts.map((product) => {
                    const severity = getSeverity(product.quantity_in_stock);
                    return (
                      <div 
                        key={product.id} 
                        className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-red-500/30 transition-all group relative"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div 
                            className="flex-1 cursor-pointer"
                            onClick={() => {
                              setShowNotificationPanel(false);
                              navigate(`/vendor/edit-product/${product.id}`);
                            }}
                          >
                            <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-slate-500 text-xs">SKU: {product.sku}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDismissNotification(product.id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                              title="Dismiss notification"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-bold ${
                            severity === "red" ? "text-red-400" : "text-orange-400"
                          }`}>
                            {getQuantityText(product.quantity_in_stock)}
                          </p>
                          <button
                            onClick={() => {
                              setShowNotificationPanel(false);
                              navigate(`/vendor/edit-product/${product.id}`);
                            }}
                            className="p-1 rounded hover:bg-white/10 transition-colors"
                          >
                            <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors text-sm">
                              arrow_forward
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export { VendorDashboard as VendorDashboardPage };
