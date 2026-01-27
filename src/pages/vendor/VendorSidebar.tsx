import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { vendorGetMe, vendorLogout } from "../../api/vendor";

interface VendorData {
  id: number;
  name: string;
  email: string;
  company_name: string;
  business_type: string;
}

const navItems = [
  { label: 'Overview', icon: 'dashboard', path: '/vendor/inventory', fill: true },
  { label: 'Orders', icon: 'shopping_cart', path: '/vendor/orders' },
  { label: 'Inventory', icon: 'inventory_2', path: '/vendor/inventory' },
  { label: 'Payouts', icon: 'payments', path: '/vendor/payments' },
  { label: 'Analytics', icon: 'analytics', path: '/vendor/analytics' },
  { label: 'Settings', icon: 'settings', path: '/vendor/settings' }
];

export default function VendorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("/api/vendor/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.name) {
            setVendor(data);
            localStorage.setItem("vendorData", JSON.stringify(data));
          }
        }
      } catch (err) {
        console.error("Error fetching vendor data:", err);
      } finally {
        setLoading(false);
      }
    };

    // Try to get from localStorage first as fallback
    const cached = localStorage.getItem("vendorData");
    if (cached) {
      try {
        setVendor(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse cached vendor data");
      }
    }

    fetchVendorData();
  }, []);

  const handleLogout = async () => {
    try {
      await vendorLogout();
      navigate("/vendor/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/vendor/login", { replace: true });
    }
  };

  const vendorName = vendor?.name || "Vendor";
  const vendorCompany = vendor?.company_name || "Business";
  const vendorInitial = (vendor?.name?.charAt(0) || vendor?.company_name?.charAt(0) || "V").toUpperCase();

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
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl bg-white/5 p-3 hover:bg-white/10 cursor-pointer transition-colors border border-white/5"
        >
          <div className="size-9 rounded-full bg-gradient-to-br from-[#067ff9] to-[#0557d4] flex items-center justify-center text-white font-bold text-sm">
            {vendorInitial}
          </div>
          <div className="flex flex-col overflow-hidden flex-1 text-left">
            <p className="text-white text-sm font-semibold truncate">{loading ? "Loading..." : vendorName}</p>
            <p className="text-slate-400 text-xs truncate">{loading ? "" : vendorCompany}</p>
          </div>
          <span className="material-symbols-outlined text-slate-400 hover:text-white">logout</span>
        </button>
      </div>
    </aside>
  );
}
