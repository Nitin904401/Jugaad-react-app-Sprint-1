import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getVendorProfile } from "../../api/vendor";

export default function VendorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const data = await getVendorProfile();
        setVendor(data);
      } catch (err) {
        console.error("Failed to fetch vendor:", err);
      }
    };
    fetchVendor();
  }, []);

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
        <button onClick={() => navigate('/vendor/dashboard')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full ${isActive('/vendor/dashboard') ? 'bg-primary/20 text-primary font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="text-sm">Overview</span>
        </button>
        <button onClick={() => navigate('/vendor/orders')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full ${isActive('/vendor/orders') ? 'bg-primary/20 text-primary font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-sm">Orders</span>
          <span className="ml-auto bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">8</span>
        </button>
        <button onClick={() => navigate('/vendor/inventory')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full ${isActive('/vendor/inventory') ? 'bg-primary/20 text-primary font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-sm">Inventory</span>
        </button>
        <button onClick={() => navigate('/vendor/financial-setup')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full ${isActive('/vendor/financial-setup') ? 'bg-primary/20 text-primary font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
          <span className="material-symbols-outlined">credit_card</span>
          <span className="text-sm">Financials</span>
        </button>
        <button onClick={() => navigate('/vendor/payouts')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full ${isActive('/vendor/payouts') ? 'bg-primary/20 text-primary font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="text-sm">Payouts</span>
        </button>
        <button onClick={() => navigate('/vendor/analytics')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full ${isActive('/vendor/analytics') ? 'bg-primary/20 text-primary font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
          <span className="material-symbols-outlined">monitoring</span>
          <span className="text-sm">Analytics</span>
        </button>
        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm">Settings</span>
        </a>
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
          <div className="size-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center overflow-hidden">
            {vendor?.profile_picture ? (
              <img 
                src={vendor.profile_picture.startsWith('http') ? vendor.profile_picture : `http://localhost:5050/${vendor.profile_picture}`} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-white text-sm font-bold">{vendor?.name?.charAt(0).toUpperCase() || "V"}</span>
            )}
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-white text-sm font-semibold truncate">{vendor?.name || "Vendor"}</p>
            <p className="text-slate-400 text-xs truncate">{vendor?.company_name || "Loading..."}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
