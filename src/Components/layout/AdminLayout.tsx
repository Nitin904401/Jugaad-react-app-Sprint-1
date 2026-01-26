// AdminLayout - Admin dashboard layout wrapper
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { icon: '📊', label: 'Dashboard', path: '/admin-panel/dashboard' },
    { icon: '📦', label: 'Products', path: '/admin-panel/products' },
    { icon: '🏢', label: 'Manage Vendors', path: '/admin-panel/vendors' },
    { icon: '�', label: 'Users', path: '/admin-panel/users' },
    { icon: '⚙️', label: 'Settings', path: '/admin-panel/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 lg:px-10 py-4 bg-slate-900/50 backdrop-blur-md z-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-8 text-blue-500">
            <svg viewBox="0 0 48 48" fill="none">
              <path
                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Jugaad Admin</h1>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium transition"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900/50 border-r border-white/10 p-6 overflow-y-auto flex-shrink-0">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
