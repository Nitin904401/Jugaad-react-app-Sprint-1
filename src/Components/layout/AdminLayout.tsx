// AdminLayout - Admin dashboard layout wrapper
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Header } from './Header';

export const AdminLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <aside className="w-64 bg-gray-100 border-r border-gray-300">
          <nav className="p-6 space-y-4">
            <Link
              to="/admin/dashboard"
              className="block px-4 py-2 hover:bg-primary-100 rounded text-gray-700"
            >
              📊 Dashboard
            </Link>
            <Link
              to="/admin/vendors"
              className="block px-4 py-2 hover:bg-primary-100 rounded text-gray-700"
            >
              🏢 Vendors
            </Link>
            <Link
              to="/admin/products"
              className="block px-4 py-2 hover:bg-primary-100 rounded text-gray-700"
            >
              📦 Products
            </Link>
            <Link
              to="/admin/orders"
              className="block px-4 py-2 hover:bg-primary-100 rounded text-gray-700"
            >
              📋 Orders
            </Link>
            <Link
              to="/admin/catalog"
              className="block px-4 py-2 hover:bg-primary-100 rounded text-gray-700"
            >
              📚 Catalog
            </Link>
          </nav>
        </aside>

        <main className="flex-grow px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
