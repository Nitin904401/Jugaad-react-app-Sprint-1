import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAdminStats } from '../../api/admin';

interface AdminStats {
  totalVendors: number;
  totalUsers: number;
  totalProducts: number;
  approvedProducts: number;
  vendorsChange: number;
  usersChange: number;
}

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalVendors: 0,
    totalUsers: 0,
    totalProducts: 0,
    approvedProducts: 0,
    vendorsChange: 0,
    usersChange: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load admin stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    { label: 'Total Sales', value: '$1,250,430', change: '+5.2%', color: 'text-green-500' },
    { 
      label: 'Total Vendors', 
      value: loading ? '...' : stats.totalVendors.toLocaleString(), 
      change: loading ? '...' : `${stats.vendorsChange > 0 ? '+' : ''}${stats.vendorsChange}%`, 
      color: stats.vendorsChange >= 0 ? 'text-green-500' : 'text-red-500' 
    },
    { 
      label: 'Total Users', 
      value: loading ? '...' : stats.totalUsers.toLocaleString(), 
      change: loading ? '...' : `${stats.usersChange > 0 ? '+' : ''}${stats.usersChange}%`, 
      color: stats.usersChange >= 0 ? 'text-green-500' : 'text-red-500' 
    },
    { label: 'Orders Today', value: '452', change: '+10%', color: 'text-green-500' },
  ];

  const recentOrders = [
    { id: '#12548', vendor: 'AutoPro Parts', customer: 'John Doe', amount: '$250.00', status: 'Delivered', statusColor: 'bg-green-500/20 text-green-400' },
    { id: '#12547', vendor: 'GearHead Inc.', customer: 'Jane Smith', amount: '$120.50', status: 'Shipped', statusColor: 'bg-yellow-500/20 text-yellow-400' },
    { id: '#12546', vendor: 'Speedy Spares', customer: 'Mike Johnson', amount: '$45.99', status: 'Processing', statusColor: 'bg-blue-500/20 text-blue-400' },
    { id: '#12545', vendor: 'AutoPro Parts', customer: 'Sarah Lee', amount: '$89.00', status: 'Delivered', statusColor: 'bg-green-500/20 text-green-400' },
  ];

  const topVendors = [
    { name: 'AutoPro Parts', orders: '1,234 orders', amount: '$150,450' },
    { name: 'GearHead Inc.', orders: '987 orders', amount: '$123,890' },
    { name: 'Speedy Spares', orders: '852 orders', amount: '$98,210' },
    { name: 'RideSmooth', orders: '765 orders', amount: '$85,500' },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat) => (
          <div
            key={stat.label}
            className="backdrop-blur-xl rounded-xl p-6 border border-white/10 bg-white/5 text-white"
          >
            <p className="text-slate-300 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <p className={`${stat.color} font-medium text-sm mt-1`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Sales Overview Chart */}
      <div className="backdrop-blur-xl rounded-xl p-6 border border-white/10 bg-white/5 text-white mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">Sales Overview</h3>
            <p className="text-slate-400 text-sm mt-1">$89,234</p>
            <p className="text-slate-500 text-xs mt-1">vs. previous 30 days <span className="text-green-500">+12.5%</span></p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 text-sm hover:bg-slate-800 transition">
            Last 30 days ▼
          </button>
        </div>

        {/* Chart Container with SVG Line Chart */}
        <div className="relative h-64 w-full">
          <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="none">
            {/* Grid lines */}
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Horizontal grid lines */}
            <line x1="0" y1="75" x2="800" y2="75" stroke="#ffffff" strokeOpacity="0.05" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="#ffffff" strokeOpacity="0.05" />
            <line x1="0" y1="225" x2="800" y2="225" stroke="#ffffff" strokeOpacity="0.05" />

            {/* Chart line path - wavy sales trend */}
            <path
              d="M 0 200 Q 100 120, 200 150 T 400 100 T 600 130 T 800 80"
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Gradient fill under the line */}
            <path
              d="M 0 200 Q 100 120, 200 150 T 400 100 T 600 130 T 800 80 L 800 300 L 0 300 Z"
              fill="url(#chartGradient)"
            />

            {/* Vertical gridlines for weeks */}
            <line x1="200" y1="0" x2="200" y2="300" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="5,5" />
            <line x1="400" y1="0" x2="400" y2="300" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="5,5" />
            <line x1="600" y1="0" x2="600" y2="300" stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="5,5" />
          </svg>

          {/* Week labels */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-around text-xs text-slate-400 px-2">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </div>
      </div>

      {/* Recent Orders and Top Vendors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders Table */}
        <div className="backdrop-blur-xl rounded-xl p-6 border border-white/10 bg-white/5 text-white overflow-x-auto">
          <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
          <table className="w-full text-sm">
            <thead className="text-slate-400 text-xs uppercase">
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2">Order ID</th>
                <th className="text-left py-3 px-2">Vendor</th>
                <th className="text-left py-3 px-2">Customer</th>
                <th className="text-left py-3 px-2">Amount</th>
                <th className="text-left py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-3 px-2 font-medium">{order.id}</td>
                  <td className="py-3 px-2">{order.vendor}</td>
                  <td className="py-3 px-2">{order.customer}</td>
                  <td className="py-3 px-2">{order.amount}</td>
                  <td className="py-3 px-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Vendors */}
        <div className="backdrop-blur-xl rounded-xl p-6 border border-white/10 bg-white/5 text-white">
          <h3 className="text-lg font-bold mb-4">Top Vendors</h3>
          <div className="space-y-4">
            {topVendors.map((vendor, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {vendor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{vendor.name}</p>
                    <p className="text-xs text-slate-400">{vendor.orders}</p>
                  </div>
                </div>
                <p className="font-bold">{vendor.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
