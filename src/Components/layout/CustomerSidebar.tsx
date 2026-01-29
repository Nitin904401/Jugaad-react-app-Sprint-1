import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface CustomerSidebarProps {
  activeSection?: string;
}

const CustomerSidebar: React.FC<CustomerSidebarProps> = ({ activeSection = "" }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "Home", icon: "home", path: "/" },
    { name: "Profile Settings", icon: "person", path: "/profile" },
    { name: "My Garage", icon: "garage", path: "/my-garage" },
    { name: "Orders", icon: "shopping_bag", path: "/orders" },
    { name: "Addresses", icon: "location_on", path: "/addresses" },
    { name: "Security", icon: "lock", path: "/security" },
    { name: "Payment Methods", icon: "credit_card", path: "/payment-methods" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0f1d] lg:flex z-20">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-white/5">
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 bg-blue-600 flex items-center justify-center text-white">
          <span className="text-xl">🚗</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-base font-bold leading-tight tracking-tight">S J A U T O P A R T</h1>
          <p className="text-slate-400 text-xs font-medium">Customer Portal</p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigate(item.path)}
            className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeSection === item.name
                ? "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 rounded-xl bg-white/5 p-3 hover:bg-white/10 cursor-pointer transition-colors border border-white/5"
        >
          <div className="size-9 rounded-full bg-gradient-to-br from-[#067ff9] to-[#0557d4] flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex flex-col overflow-hidden flex-1 text-left">
            <p className="text-white text-sm font-semibold truncate">{user?.name || "User"}</p>
            <p className="text-slate-400 text-xs truncate">{user?.email || ""}</p>
          </div>
          <span className="material-symbols-outlined text-slate-400 hover:text-white text-[20px]">logout</span>
        </button>
      </div>
    </aside>
  );
};

export default CustomerSidebar;
