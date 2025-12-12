// VendorOrders.jsx
// Single-file React component converted from your HTML.
// NOTE: keep Google Fonts, Material Symbols and the Tailwind <script> in your app's index.html (or _document for Next.js).

import React from "react";
import { useNavigate } from "react-router-dom";
import VendorSidebar from './VendorSidebar';

export default function VendorOrders() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <VendorSidebar />

      {/* Main */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-6 py-8 flex flex-col gap-8">
        {/* Page Header & Key Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">Order Management</h1>
            <p className="text-slate-400 text-base max-w-2xl">Track real-time orders, manage shipments, and update statuses efficiently.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all text-sm">
              <span className="material-symbols-outlined text-[20px]">file_download</span>
              Export CSV
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all text-sm"
              onClick={() => navigate('/vendor/create-manual-order')}
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Create Manual Order
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="glass-panel p-5 rounded-xl flex flex-col gap-1 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">+12%</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">New Orders</p>
            <p className="text-2xl font-bold text-white">24</p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-5 rounded-xl flex flex-col gap-1 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                <span className="material-symbols-outlined">package_2</span>
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">+5%</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Ready to Ship</p>
            <p className="text-2xl font-bold text-white">18</p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-5 rounded-xl flex flex-col gap-1 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <span className="flex items-center text-xs font-medium text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">0%</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">In Transit</p>
            <p className="text-2xl font-bold text-white">45</p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-5 rounded-xl flex flex-col gap-1 hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="flex items-center text-xs font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">-2%</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Today's Revenue</p>
            <p className="text-2xl font-bold text-white">$4,250</p>
          </div>
        </div>

        {/* Filters & Tooling */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center glass-panel p-2 rounded-xl">
          <div className="w-full lg:w-96 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400">search</span>
            </div>
            <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:text-sm" placeholder="Search order ID, customer, or SKU..." type="text" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 px-2 lg:px-0 no-scrollbar">
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium shadow-lg shadow-primary/25">All Orders</button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 text-sm font-medium transition-all">New <span className="ml-1 text-xs bg-white/10 px-1.5 rounded-full">12</span></button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 text-sm font-medium transition-all">Processing</button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 text-sm font-medium transition-all">Shipped</button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 text-sm font-medium transition-all">Returns</button>
          </div>

          <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors ml-auto">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Last 30 Days
            <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
          </button>
        </div>

        {/* Orders Table */}
        <div className="glass-panel rounded-xl overflow-hidden flex flex-col min-h-[500px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400 bg-white/5">
                  <th className="p-4 font-semibold w-12 text-center">
                    <input className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900 cursor-pointer" type="checkbox" />
                  </th>
                  <th className="p-4 font-semibold">Order Details</th>
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold">Customer</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {/* Row 1 */}
                <tr className="group hover:bg-white/5 transition-colors">
                  <td className="p-4 text-center">
                    <input className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" type="checkbox" />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <a className="text-primary font-bold hover:underline" href="#">#ORD-7829</a>
                      <span className="text-slate-400 text-xs mt-1">Today, 10:23 AM</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded bg-white/10 overflow-hidden shrink-0 border border-white/10">
                        <img alt="Brake Caliper" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUuB4XX6wnNi9uVpKynLkgyDIRdCeF7MLl_uuBbQ9PFmfybIsQ3CUVMOu6ppbZMRL1tYj1hvr-4J-4XaPGvMmmm_HgGUBiug1p7QtsOZ-Sm-bYPEjDcUSK03x7D4f6G2NwUr47nCH4igmPffsbXV_mwUsqUICzOT5VHwjtk22ArPSO-cA5JF3DMdlkJtHS_JZfiXNm934GFSdJ5FsBP3spzhLkNiDKzTvnBVzWARV4qXWMPv_FJRgnl9kJ6D7LCm32hyecitGbgdiI" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">Brembo Brake Caliper</span>
                        <span className="text-slate-500 text-xs">SKU: BR-4022-X</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold border border-indigo-500/30">JD</div>
                      <span className="text-slate-300">John Doe</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white font-medium">$145.00</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                      <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
                      New Order
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="View Address">
                        <span className="material-symbols-outlined text-[20px]">location_on</span>
                      </button>
                      <button className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg text-xs font-semibold transition-colors">
                        Pack Order
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="group hover:bg-white/5 transition-colors">
                  <td className="p-4 text-center">
                    <input className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" type="checkbox" />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <a className="text-white font-bold hover:text-primary transition-colors" href="#">#ORD-7828</a>
                      <span className="text-slate-400 text-xs mt-1">Yesterday, 4:15 PM</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded bg-white/10 overflow-hidden shrink-0 border border-white/10">
                        <img alt="Oil Filter" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy5golhH98M3JUcRmiNYqoLSr6RREtGVNwZBqly2Oak_l3jf0zux0uXY1_dP8EbUJeRquLqnX-EdAvDHRsBaqLhPjmMPYSO-kAdxv2-kmxDgq0t30q7sT7sP0cpwPIWSgs7jHVG5KJvc7hiX0zhmHEZxk5c1mPUa0bew2sqPzs1_cBrkLxydZPu_BvxFr6ubjbVq_ulL_DLFiSZSNkUuTF519PrzMqYQEQHjwQoCiKa565LlEQxAJMZFcKBw78f5fPkJywuVmksZg4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">Premium Oil Filter</span>
                        <span className="text-slate-500 text-xs">SKU: FL-9921-A</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold border border-emerald-500/30">AS</div>
                      <span className="text-slate-300">Alice Smith</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white font-medium">$24.99</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">Packed</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Print Label">
                        <span className="material-symbols-outlined text-[20px]">print</span>
                      </button>
                      <button className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white border border-primary rounded-lg text-xs font-semibold transition-colors shadow-lg shadow-primary/20">Ship Order</button>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="group hover:bg-white/5 transition-colors">
                  <td className="p-4 text-center">
                    <input className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" type="checkbox" />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <a className="text-white font-bold hover:text-primary transition-colors" href="#">#ORD-7825</a>
                      <span className="text-slate-400 text-xs mt-1">Oct 24, 2023</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded bg-white/10 overflow-hidden shrink-0 border border-white/10">
                        <img alt="Spark Plugs" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqwItQOLFLduTGS6DBhNh9-B6xeptEbqSpPDpgOWRSMzNymaj3DmRwRza7gD_nXuUL3ifwtKglO4d6fpqR-QfiVPJzeJUdTva5TLocs4oxnJ-zTFgbS8g92VaouyOd_OpbzIyJvOb9n5bWaJ7rPPQhhYj821pXFSbfzOgBYBdgwD51WIgdTSt_PyoXD3j6TMfcdDxxnTy75Y3H-qIaFMz9I90s-G3wjyMNMm6HhgNhIkktJk97Zc2vGpk3nFs_g0cBlrxCKvI_tr60" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">Iridium Spark Plugs (4)</span>
                        <span className="text-slate-500 text-xs">SKU: SP-8812-Set</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img alt="Customer" className="size-6 rounded-full border border-white/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB94FKfvN-KmmbPnR6TJJEgTsLtAMswdETdp1HAoQkWkOkVyI4r2x0k_w9J3bhNCiTHc8UZqK1qpeB6BeJHjmVtYw7fyzr3poYqc-rGUJP4hQOdJ4A8EJ8DEGkYNGuWhCENRXqOKmiZ1bJDq6KadykLXvcvn-0xxa-iuLrIz7_SqRRWbmTjJWvTPrcKzyycIDLzjtph0PV25BUH1ehqXBOvqoRML7MFOeZ-p38isfV8YpV0Nb_ik-Vvai4aQDN56eJBUmghYfJxYiTz" />
                      <span className="text-slate-300">Robert Fox</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white font-medium">$68.50</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">Shipped</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Track Order">
                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="group hover:bg-white/5 transition-colors opacity-75 hover:opacity-100">
                  <td className="p-4 text-center">
                    <input className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" type="checkbox" />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <a className="text-white font-bold hover:text-primary transition-colors" href="#">#ORD-7811</a>
                      <span className="text-slate-400 text-xs mt-1">Oct 20, 2023</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded bg-white/10 overflow-hidden shrink-0 border border-white/10">
                        <img alt="Battery" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnR0YgeRPc3NgN_8uPGdO_l_EwmCty6udfYMWGu3C3aNnomg6ZuPFUicS5084rc5hkIn4Mie63scFKiZyiecZYtmiWcOusLP3mn_zvRIALtvXZi1P2_FX8dOuAJNNOXy2bnCEFJqu_T1z7vIkIBTP1kjbdm3_SHwWdf2YieaTG9YP3CDLvUDwtdgc7DkMYZshBypQbOzWh5LyMgpmnJVeeqfiAdzYCHxRZqqor9T_zov9t06V8IyDp_pr-Hv40ggSwWzhQQ00KqE8h" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">12V Car Battery</span>
                        <span className="text-slate-500 text-xs">SKU: BT-1200-H</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center text-xs font-bold border border-pink-500/30">MK</div>
                      <span className="text-slate-300">Mary K.</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white font-medium">$129.99</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Delivered</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="View Proof">
                        <span className="material-symbols-outlined text-[20px]">image</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="group hover:bg-white/5 transition-colors">
                  <td className="p-4 text-center">
                    <input className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-slate-900 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" type="checkbox" />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <a className="text-white font-bold hover:text-primary transition-colors" href="#">#ORD-7802</a>
                      <span className="text-slate-400 text-xs mt-1">Oct 18, 2023</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded bg-white/10 overflow-hidden shrink-0 border border-white/10">
                        <img alt="Headlight" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8ohcZGVwJslpSmmmmYD6mh6sMIEDXMFEk8EGIKn6hDaeTXhDKBJkTtoP9hOMw4n-axn5a0z5G6ibrLhhRa27dD4kVCOl2NQEXbTb9QxqCJHoA-0_G1bd5kS1nJnxffeoFmUM5Sov5qOzaR-yXp8h3dj3rjpMjDap29tXMNdorUgECCBziAFWAYqX8E3zY2yAiDXnI_z9iHH93UtfV9Jq1nb28RGnwRa6AF2UGAg_fmkxNjcbE6mpX6RnHlzchARzm-vB_VGzoqn7z" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">LED Headlight Bulb Pair</span>
                        <span className="text-slate-500 text-xs">SKU: LED-HL-9005</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-bold border border-cyan-500/30">TW</div>
                      <span className="text-slate-300">Tom Walker</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-white font-medium">$45.00</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">Returned</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-semibold transition-colors">Process Refund</button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-auto border-t border-white/10 p-4 flex items-center justify-between bg-white/5">
            <p className="text-sm text-slate-400">Showing <span className="text-white font-medium">1-5</span> of <span className="text-white font-medium">42</span> orders</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors">Next</button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export const VendorOrdersPage = VendorOrders;
