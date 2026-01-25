import React from "react";
import { useNavigate } from 'react-router-dom';

// InventoryDashboard.jsx
// Single-file React component conversion of the provided HTML Inventory Management page.
// NOTE: keep your global Tailwind + Google Fonts + Material Symbols link tags in index.html or _document (Next.js).


import VendorSidebar from './VendorSidebar';

function InventoryDashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <VendorSidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-dark">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
              {/* Page Heading & Actions */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-3xl font-black text-white tracking-tight">Products Overview</h1>
                  <p className="text-[#9babbb]">Manage your product listings, stock levels, and pricing effectively.</p>
                </div>
                <button
                  className="flex items-center gap-2 h-10 px-5 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,127,249,0.3)]"
                  onClick={() => navigate('/vendor/add-new-part')}
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  <span>Add New Part</span>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-panel p-5 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#9babbb] text-sm font-medium">Total Products</p>
                    <p className="text-white text-3xl font-bold">1,240</p>
                    <div className="flex items-center gap-1 text-[#0bda5b] text-xs font-bold bg-[#0bda5b]/10 px-2 py-0.5 rounded w-fit mt-1">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      <span>+5% this month</span>
                    </div>
                  </div>
                  <div className="size-12 rounded-full bg-[#27303a] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">inventory_2</span>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-xl flex items-center justify-between group hover:border-orange-500/30 transition-all">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#9babbb] text-sm font-medium">Low Stock Alerts</p>
                    <p className="text-white text-3xl font-bold">12</p>
                    <div className="flex items-center gap-1 text-orange-400 text-xs font-bold bg-orange-400/10 px-2 py-0.5 rounded w-fit mt-1">
                      <span className="material-symbols-outlined text-[14px]">warning</span>
                      <span>Needs Attention</span>
                    </div>
                  </div>
                  <div className="size-12 rounded-full bg-[#27303a] flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">priority_high</span>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-xl flex items-center justify-between group hover:border-green-500/30 transition-all">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#9babbb] text-sm font-medium">Active Listings</p>
                    <p className="text-white text-3xl font-bold">1,100</p>
                    <div className="flex items-center gap-1 text-[#0bda5b] text-xs font-bold bg-[#0bda5b]/10 px-2 py-0.5 rounded w-fit mt-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      <span>98% Operational</span>
                    </div>
                  </div>
                  <div className="size-12 rounded-full bg-[#27303a] flex items-center justify-center text-[#0bda5b] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">visibility</span>
                  </div>
                </div>
              </div>

              {/* Filters & Search Bar */}
              <div className="glass-panel p-2 rounded-xl flex flex-col md:flex-row gap-2 items-center sticky top-0 z-10 backdrop-blur-xl">
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[#9babbb]">search</span>
                  </div>
                  <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-[#27303a]/50 text-white placeholder-[#9babbb] focus:ring-2 focus:ring-primary/50 focus:bg-[#27303a] transition-all sm:text-sm" placeholder="Search by SKU, Name, or Category" type="text" />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  <select className="form-select bg-[#27303a]/50 border-none text-white text-sm rounded-lg focus:ring-primary/50 focus:bg-[#27303a] py-2.5 pl-3 pr-10 min-w-[140px] cursor-pointer hover:bg-[#27303a]">
                    <option>All Categories</option>
                    <option>Brakes</option>
                    <option>Engine</option>
                    <option>Suspension</option>
                    <option>Electrical</option>
                  </select>
                  <select className="form-select bg-[#27303a]/50 border-none text-white text-sm rounded-lg focus:ring-primary/50 focus:bg-[#27303a] py-2.5 pl-3 pr-10 min-w-[140px] cursor-pointer hover:bg-[#27303a]">
                    <option>Stock Status</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#27303a]/50 hover:bg-[#27303a] text-white rounded-lg transition-colors border-none min-w-[100px]">
                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    <span className="text-sm font-medium">More</span>
                  </button>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[#27303a]/50 border-b border-[#27303a]">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider w-[60px]">
                          <input className="rounded border-[#3f4a56] bg-[#1c252e] text-primary focus:ring-offset-[#111418]" type="checkbox" />
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Product Details</th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#9babbb] uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27303a]">

                      {/* Row 1 */}
                      <tr className="table-row-hover group transition-colors">
                        <td className="px-6 py-4">
                          <input className="rounded border-[#3f4a56] bg-[#1c252e] text-primary focus:ring-offset-[#111418]" type="checkbox" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-[#27303a] bg-cover bg-center border border-[#3f4a56]" data-alt="Brake pads product image" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFZqMQ1AhXHbzOgIkDvAwN79V12zU1Tta9XLhjdV_AkQAGzBFuiKrajm3H9vZIiDx28vzFoipO9Y9W-3BJJzeoGGkZ3OTCIAgVBt2eZMu1yNW3FaYVzhz5beaw_fwG1TJTJorgTUZqHL-Y507njjbUMU0kPWfWAkM45RThDT95eerRjTHWxK90NK_xiLc_f6l8KrE8qHLSrtJ7-Qkl9WsqAohGAlsJW47wzZtlpw0Grc7KcvZLHbE-7ZWDmTu-n3uKXAM40kOokq7n')"}} />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">Ceramic Brake Pads (Front)</span>
                              <span className="text-xs text-[#9babbb]">SKU: BP-990-FR</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#27303a] text-gray-300">Brakes</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-white">$45.00</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">150</span>
                              <span className="text-xs text-[#9babbb]">units</span>
                            </div>
                            <div className="w-24 h-1.5 bg-[#27303a] rounded-full overflow-hidden">
                              <div className="h-full bg-[#0bda5b] w-3/4 rounded-full" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#0bda5b]/10 text-[#0bda5b] border border-[#0bda5b]/20">
                            <span className="size-1.5 rounded-full bg-[#0bda5b]" />
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right"> 
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-white hover:bg-[#27303a] transition-colors" title="Edit">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Delete">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="table-row-hover group transition-colors">
                        <td className="px-6 py-4">
                          <input className="rounded border-[#3f4a56] bg-[#1c252e] text-primary focus:ring-offset-[#111418]" type="checkbox" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-[#27303a] bg-cover bg-center border border-[#3f4a56]" data-alt="Car battery product image" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARmzEpx4Ww20BMnhKqwWYjkK0bmAyae2EmPiASAPzo5oXPVLqvwrp2woJGvg2njmPR_5fsIIKDf-STXLzNcQJeX54yhVTQ5rPFeOtcUTZZJA5vx8es52trlovGPTjGmhsg55YnCVnNcY4K0Bw6e1nJ-giZ5p44brs1bmviuUJPXRFBsy7tU6bS_gXyREyExMhSyGjou14qAWMVzBCKfJsgUP-13JO893q8JrBwjU_ddNEWzI_RWNOmZFKIzFKi4-sXX9ZPPusrlg9l')"}} />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">Premium AGM Battery</span>
                              <span className="text-xs text-[#9babbb]">SKU: BAT-AGM-70</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#27303a] text-gray-300">Electrical</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-white">$189.99</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-orange-400">4</span>
                              <span className="text-xs text-[#9babbb]">units</span>
                            </div>
                            <div className="w-24 h-1.5 bg-[#27303a] rounded-full overflow-hidden">
                              <div className="h-full bg-orange-400 w-[10%] rounded-full" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-400/10 text-orange-400 border border-orange-400/20">
                            <span className="size-1.5 rounded-full bg-orange-400 animate-pulse" />
                            Low Stock
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-white hover:bg-[#27303a] transition-colors" title="Edit">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Delete">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="table-row-hover group transition-colors">
                        <td className="px-6 py-4">
                          <input className="rounded border-[#3f4a56] bg-[#1c252e] text-primary focus:ring-offset-[#111418]" type="checkbox" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-[#27303a] bg-cover bg-center border border-[#3f4a56]" data-alt="Oil filter product image" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcffISXtXBVd47y4PwTRmu8y6YbJz43aIktjWT7aXTV5NboZJncrN19Is5Yoly6d5EfY6DsJXDlt0U2bCw2BXSoPcpt5v5N3IiX8Kmy7pDGsyrdrg8vHhXR1gqOomnjoNuqraebokcCr9b5rj-WmNOID7FJxjDIQ-fZ8dFyfD3jHGih9Tqf5WBR3fIGcRGCRMqhyoszQ3yOdi1hhAt-WFqiiSyKMDoNlHofivWgEIA3srtNiIC0nMlxPRlirjoFgZEU8Rb9dah1xPD')"}} />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">High Performance Oil Filter</span>
                              <span className="text-xs text-[#9babbb]">SKU: OF-HP-22</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#27303a] text-gray-300">Engine</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-white">$14.50</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">82</span>
                              <span className="text-xs text-[#9babbb]">units</span>
                            </div>
                            <div className="w-24 h-1.5 bg-[#27303a] rounded-full overflow-hidden">
                              <div className="h-full bg-[#0bda5b] w-1/2 rounded-full" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#0bda5b]/10 text-[#0bda5b] border border-[#0bda5b]/20">
                            <span className="size-1.5 rounded-full bg-[#0bda5b]" />
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-white hover:bg-[#27303a] transition-colors" title="Edit">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Delete">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="table-row-hover group transition-colors">
                        <td className="px-6 py-4">
                          <input className="rounded border-[#3f4a56] bg-[#1c252e] text-primary focus:ring-offset-[#111418]" type="checkbox" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-[#27303a] bg-cover bg-center border border-[#3f4a56]" data-alt="Spark plugs product image" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6WPyYTLWjaUbedmEIdA-bszj0ICgjZqKjVV2xqGTpaUgPHoFMRxQNgro5gC02DBcO_FhhEQjcYjbR2HZIJxyREvFLxiP3oFueiTuW2JGTM7XBUsq2oGqmsvrvWLawPQMFcGwSJzSuSJfGqx94TzmDrK33d9zt2xbdmRbBeankMA2FJXa4EXZuGCufKKvE8t7hjnFsTqwhohOprassn-RCJBKRKhfBHoydfsi5587HBLshPZZrZk9ijbJHCdX2iQkT0tk1NLZaRdVG')"}} />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">Iridium Spark Plugs (4-Pack)</span>
                              <span className="text-xs text-[#9babbb]">SKU: SP-IR-44</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#27303a] text-gray-300">Ignition</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-white">$42.00</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-red-500">0</span>
                              <span className="text-xs text-[#9babbb]">units</span>
                            </div>
                            <div className="w-24 h-1.5 bg-[#27303a] rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 w-0 rounded-full" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                            <span className="size-1.5 rounded-full bg-red-500" />
                            Out of Stock
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-white hover:bg-[#27303a] transition-colors" title="Edit">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Delete">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 5 */}
                      <tr className="table-row-hover group transition-colors">
                        <td className="px-6 py-4">
                          <input className="rounded border-[#3f4a56] bg-[#1c252e] text-primary focus:ring-offset-[#111418]" type="checkbox" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-[#27303a] bg-cover bg-center border border-[#3f4a56]" data-alt="Headlight bulb product image" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB90CLJgkx8l78m1PCcuiOwh8tP-H1MLjrz5qGcRLojulnPE4-Hka_sczHgZkIwA3vSHRe7DcFoCILUW5QFhiyzGlPTGRfZBV8XCrybSVcZ3L0U4P4vxBkql-ZvkrMZCN8zJVmWgt4VOXRqaIYlySQICgUg5oIXKsbzuJlNC727cZFTbiVbNpjwEwsqU4kl1n365U7xAdBglyKluzCLiNPB9riJq4tXTf2he2seT5ZiW_1ZKpGB6QAJzLfIYJq3aRK8EcYAz_UpLLIB')"}} />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">LED Headlight Bulbs H11</span>
                              <span className="text-xs text-[#9babbb]">SKU: LED-H11-X2</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#27303a] text-gray-300">Lighting</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-white">$65.00</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">210</span>
                              <span className="text-xs text-[#9babbb]">units</span>
                            </div>
                            <div className="w-24 h-1.5 bg-[#27303a] rounded-full overflow-hidden">
                              <div className="h-full bg-[#0bda5b] w-full rounded-full" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#0bda5b]/10 text-[#0bda5b] border border-[#0bda5b]/20">
                            <span className="size-1.5 rounded-full bg-[#0bda5b]" />
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-white hover:bg-[#27303a] transition-colors" title="Edit">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button className="p-1.5 rounded-md text-[#9babbb] hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Delete">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#27303a]/50 border-t border-[#27303a]">
                  <p className="text-sm text-[#9babbb]">Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">1,240</span> results</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded border border-[#3f4a56] text-sm text-[#9babbb] hover:text-white hover:bg-[#27303a] disabled:opacity-50 transition-colors">Previous</button>
                    <button className="px-3 py-1 rounded bg-primary text-sm text-white font-medium hover:bg-blue-600 transition-colors">1</button>
                    <button className="px-3 py-1 rounded border border-[#3f4a56] text-sm text-[#9babbb] hover:text-white hover:bg-[#27303a] transition-colors">2</button>
                    <button className="px-3 py-1 rounded border border-[#3f4a56] text-sm text-[#9babbb] hover:text-white hover:bg-[#27303a] transition-colors">3</button>
                    <span className="text-[#9babbb] px-1">...</span>
                    <button className="px-3 py-1 rounded border border-[#3f4a56] text-sm text-[#9babbb] hover:text-white hover:bg-[#27303a] transition-colors">Next</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
  );
}

export default InventoryDashboard;
