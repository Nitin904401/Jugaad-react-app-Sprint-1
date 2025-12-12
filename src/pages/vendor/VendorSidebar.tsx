import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Overview', icon: 'dashboard', path: '/vendor/dashboard', fill: true },
  { label: 'Orders', icon: 'shopping_cart', path: '/vendor/orders' },
  { label: 'Inventory', icon: 'inventory_2', path: '/vendor/inventory' },
  { label: 'Payouts', icon: 'payments', path: '/vendor/payments' },
  { label: 'Analytics', icon: 'analytics', path: '/vendor/analytics' },
  { label: 'Settings', icon: 'settings', path: '/vendor/settings' }
];

export default function VendorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#111418] lg:flex z-20">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-white/5">
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 bg-primary flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-[20px]">directions_car</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-base font-bold leading-tight tracking-tight">S J A U T O P A R T</h1>
          <p className="text-slate-400 text-xs font-medium">Vendor Portal</p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item, idx) => (
          <button
            key={item.label}
            onClick={() => item.path !== '#' && navigate(item.path)}
            className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              location.pathname === item.path
                ? 'bg-primary/20 text-primary group hover:bg-primary/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined" style={item.fill ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
            <span className={`text-sm font-medium${item.label === 'Overview' ? ' font-semibold' : ''}`}>{item.label}</span>
            {item.label === 'Orders' && (
              <span className="ml-auto bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">8</span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
          <div
            className="size-9 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9dk5nKwdBV4cuAYFQf6JqkQeLaEgCTjedMAM_u4mlkJPGwx1IMA8ioBw90oNNjLaxFqj0a4q9Ga9Gd4ivccenA5l5RAG6ap7cbd0bi-_DLL25hRgc9sODVttSFA6dXa-5ihuNv0x60E3tu6WMiU853huvkDjhPmEEGndYFZKVicXPv07BBQPjbhpkulSYO1HnpNG0GnkdXT-DveoSnF7PEwugupL6UEDy2yfakwxQJEUYl_hjxOvB3xD3BDihFw5NKknJfqT1K8X5')",
            }}
          />
          <div className="flex flex-col overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">Alex Johnson</p>
            <p className="text-slate-400 text-xs truncate">TurboSupplies Inc.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
