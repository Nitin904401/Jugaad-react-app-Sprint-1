// AdminLayout - Admin dashboard layout wrapper
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { adminLogout, getAdminProfile } from '../../api/admin';

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
  profile_picture?: string;
}

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminData | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getAdminProfile();
        setAdmin(data);
      } catch (err) {
        console.error('Failed to fetch admin profile:', err);
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    try {
      await adminLogout();
      navigate('/admin-panel/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const navItems = [
    { icon: 'dashboard', label: 'Overview', path: '/admin-panel/dashboard' },
    { icon: 'shopping_cart', label: 'Orders', path: '/admin-panel/orders' },
    { icon: 'inventory_2', label: 'Inventory', path: '/admin-panel/products' },
    { icon: 'store', label: 'Vendors', path: '/admin-panel/vendors' },
    { icon: 'group', label: 'Users', path: '/admin-panel/users' },
    { icon: 'monitoring', label: 'Analytics', path: '/admin-panel/analytics' },
    { icon: 'settings', label: 'Settings', path: '/admin-panel/settings' },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white h-screen flex">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#111418] lg:flex z-20">
          <div className="flex h-16 items-center gap-3 px-6 border-b border-white/5 flex-shrink-0">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[20px]">directions_car</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-bold leading-tight tracking-tight">S J A U T O P A R T</h1>
              <p className="text-slate-400 text-xs font-medium">Admin Portal</p>
            </div>
          </div>
          
          <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full ${
                  isActive(item.path)
                    ? 'bg-primary/20 text-primary font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
              <div className="size-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                {admin?.profile_picture ? (
                  <img src={admin.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-sm font-bold">
                    {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
                  </span>
                )}
              </div>
              <div className="flex flex-col overflow-hidden flex-1">
                <p className="text-white text-sm font-semibold truncate">{admin?.name || 'Admin User'}</p>
                <p className="text-slate-400 text-xs truncate">{admin?.role === 'admin' ? 'Administrator' : admin?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
  );
};
