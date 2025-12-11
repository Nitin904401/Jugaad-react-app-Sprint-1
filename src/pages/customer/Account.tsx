// Account page
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">📋 Recent Orders</h2>
          <p className="text-gray-600 text-sm">No orders yet</p>
        </div>

        {/* Wishlist */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">❤️ Wishlist</h2>
          <p className="text-gray-600 text-sm">No items in wishlist</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="danger" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
