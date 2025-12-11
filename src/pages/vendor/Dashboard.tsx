// Vendor Dashboard page
import React from 'react';

export const VendorDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Vendor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">📦</div>
          <p className="text-gray-600 text-sm">Total Products</p>
          <p className="text-2xl font-bold">25</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">📋</div>
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-2xl font-bold">156</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">💰</div>
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold">₹2,45,680</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">⭐</div>
          <p className="text-gray-600 text-sm">Avg Rating</p>
          <p className="text-2xl font-bold">4.8</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-2 text-sm">
            <p>No recent orders</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <div className="space-y-2 text-sm">
            <p>Response Time: 2 hours</p>
            <p>Orders This Month: 24</p>
            <p>Pending Orders: 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};
