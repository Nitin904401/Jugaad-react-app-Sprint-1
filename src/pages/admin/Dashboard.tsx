// Admin Dashboard page
import React from 'react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">🏢</div>
          <p className="text-gray-600 text-sm">Total Vendors</p>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">📦</div>
          <p className="text-gray-600 text-sm">Total Products</p>
          <p className="text-2xl font-bold">128</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">📋</div>
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-2xl font-bold">2,456</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">💰</div>
          <p className="text-gray-600 text-sm">Platform Revenue</p>
          <p className="text-2xl font-bold">₹28.5L</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Recent Vendors</h2>
          <div className="space-y-2 text-sm">
            <p>Premium Auto Parts - Rating: 4.8/5</p>
            <p>Quick Spare Parts - Rating: 4.6/5</p>
            <p>Original Parts Hub - Rating: 4.7/5</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Platform Stats</h2>
          <div className="space-y-2 text-sm">
            <p>Active Users: 5,234</p>
            <p>Avg Order Value: ₹8,950</p>
            <p>Pending Approvals: 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};
