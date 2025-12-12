import React from "react";

export default function VendorHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header className="glass-header sticky top-0 z-10 flex h-16 items-center justify-between px-6 lg:px-8 border-b border-white/10 bg-[#111418]/90 backdrop-blur-md">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-slate-400 hover:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="text-lg font-bold text-white">Vendor Portal</span>
      </div>
      <div className="hidden lg:flex flex-col">
        <h2 className="text-lg font-bold leading-tight text-white">{title}</h2>
        <p className="text-slate-400 text-xs">Welcome back, here's what's happening today.</p>
      </div>
      <div className="flex items-center gap-4 flex-1 justify-end">
        {children}
        <button className="relative rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-[#0f1923]"></span>
        </button>
      </div>
    </header>
  );
}
