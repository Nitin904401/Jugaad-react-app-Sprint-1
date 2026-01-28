import React, { useEffect, useState } from "react";
import VendorSidebar from './VendorSidebar';
import { getVendorProfile } from '../../api/vendor';

interface VendorData {
  id: number;
  name: string;
  email: string;
  company_name: string;
  business_type: string;
}

export default function VendorAnalytics() {
  const [vendor, setVendor] = useState<VendorData | null>(null);

  useEffect(() => {
    const loadVendorProfile = async () => {
      try {
        const data = await getVendorProfile();
        setVendor(data);
      } catch (err) {
        console.error('Failed to fetch vendor profile:', err);
      }
    };
    loadVendorProfile();
  }, []);

  return (
    <div className="flex h-screen w-full">
      {/* Inline critical CSS (scrollbar + small helpers). Keep Tailwind config & fonts in index.html */}
      <style>{`
        /* Custom scrollbar for dark theme */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0f1923;
        }
        ::-webkit-scrollbar-thumb {
            background: #27303a;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #374151;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27303a; }
        .glass-panel { background: rgba(30, 35, 45, 0.6); border: 1px solid rgba(255,255,255,0.08); }
        .chart-grid-lines line { stroke: rgba(255, 255, 255, 0.05); }
        /* small utilities used in markup */
        .size-2 { width: .5rem; height: .5rem; }
        .size-6 { width: 1.5rem; height: 1.5rem; }
        .size-8 { width: 2rem; height: 2rem; }
        .size-10 { width: 2.5rem; height: 2.5rem; }
        .size-24 { width: 6rem; height: 6rem; }
        .size-full { width: 100%; height: 100%; }
      `}</style>

      {/* Sidebar */}
      <VendorSidebar vendor={vendor} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

        {/* Top Header */}

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10 scroll-smooth">
          <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-10">
            {/* Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">Sales &amp; Performance</h1>
                <p className="text-slate-500 dark:text-[#9babbb] text-base font-normal">Hello, AutoParts Inc. Here is your daily performance overview.</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-primary/25 transition-all">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Export Report
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <button className="glass-panel h-9 flex items-center gap-2 px-4 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors border-primary/30 text-white bg-primary/10">
                Last 7 Days
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>

              <button className="glass-panel h-9 flex items-center gap-2 px-4 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors text-white">
                This Month
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>

              <button className="glass-panel h-9 flex items-center gap-2 px-4 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors text-white">
                Category: All Parts
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>

              <button className="glass-panel h-9 flex items-center gap-2 px-4 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors text-white">
                Region: Global
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Revenue */}
              <div className="glass-panel p-5 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-6xl">payments</span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white text-sm font-medium">Total Revenue</p>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-white">$12,450</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-auto">
                  <div className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    12%
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">vs last month</span>
                </div>

                <svg className="absolute bottom-0 left-0 w-full h-12 opacity-30" preserveAspectRatio="none" viewBox="0 0 100 20">
                  <path className="text-emerald-500" d="M0 15 Q 20 18, 40 10 T 80 5 T 100 12 V 20 H 0 Z" fill="currentColor"></path>
                </svg>
              </div>

              {/* Orders */}
              <div className="glass-panel p-5 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-6xl">shopping_cart</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Orders Processed</p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-white">85</h3>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 text-xs font-bold flex items-center gap-1">5 pending</div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">needs attention</span>
                </div>
              </div>

              {/* Top Part */}
              <div className="glass-panel p-5 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-6xl">stars</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Top Selling Part</p>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-1 line-clamp-1 text-white">Brake Pad Set</h3>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 text-xs font-bold flex items-center gap-1">45 sold</div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">this month</span>
                </div>
              </div>

              {/* Returns */}
              <div className="glass-panel p-5 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-6xl">assignment_return</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Returns Rate</p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-1 text-white">2.1%</h3>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">trending_down</span>
                    0.5%
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-500">improved</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Area Chart */}
              <div className="glass-panel p-6 lg:col-span-2 flex flex-col h-[400px]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Revenue vs Order Volume</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Last 30 Days Performance</p>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-slate-400">more_horiz</span>
                  </button>
                </div>

                {/* Custom Chart Visualization (SVG) */}
                <div className="relative flex-1 w-full h-full">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#067ff9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#067ff9" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    <g className="chart-grid-lines">
                      <line strokeWidth="1" x1="0" x2="800" y1="0" y2="0" />
                      <line strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="75" y2="75" />
                      <line strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="150" y2="150" />
                      <line strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="225" y2="225" />
                      <line strokeWidth="1" x1="0" x2="800" y1="300" y2="300" />
                    </g>

                    {/* Area Path */}
                    <path d="M0,250 C100,240 150,180 200,190 S300,100 400,120 S500,60 600,80 S700,20 800,50 V300 H0 Z" fill="url(#gradientArea)"></path>
                    {/* Line Path */}
                    <path d="M0,250 C100,240 150,180 200,190 S300,100 400,120 S500,60 600,80 S700,20 800,50" fill="none" filter="drop-shadow(0 0 8px rgba(6, 127, 249, 0.5))" stroke="#067ff9" strokeLinecap="round" strokeWidth="3"></path>

                    {/* Static Tooltip Indicator */}
                    <circle cx="600" cy="80" fill="#0f1923" r="6" stroke="#067ff9" strokeWidth="3" />
                    <line opacity="0.5" stroke="#067ff9" strokeDasharray="3 3" strokeWidth="1" x1="600" x2="600" y1="80" y2="300" />

                    {/* Tooltip Box */}
                    <g transform="translate(540, 20)">
                      <rect fill="#1e293b" height="50" rx="8" stroke="rgba(255,255,255,0.1)" width="120" />
                      <text fill="#9babbb" fontFamily="Inter" fontSize="12" textAnchor="middle" x="60" y="20">Oct 24, 2023</text>
                      <text fill="white" fontFamily="Inter" fontSize="14" fontWeight="700" textAnchor="middle" x="60" y="38">$3,450.00</text>
                    </g>
                  </svg>

                  {/* X Axis Labels */}
                  <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
                    <span>Oct 1</span>
                    <span>Oct 7</span>
                    <span>Oct 14</span>
                    <span>Oct 21</span>
                    <span>Oct 28</span>
                  </div>
                </div>
              </div>

              {/* Top Products & Velocity */}
              <div className="flex flex-col gap-6">
                {/* Popularity List */}
                <div className="glass-panel p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-4">Top Products</h3>
                  <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="size-10 rounded-lg bg-cover bg-center" data-alt="Brake Pads" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB06MabyxXP0Mt_CVYZXmoGACM1Exw_pkYJdkt9ncrng0SzunHWmzMrIAEuZhJ0I0r5rxsMX0KG4eNCw9pqTedxAqWL8Px09A-7PRLn-2QchNRgFgFzBD45nCHANbeN1V45up9rYNmbQpTQY_bAmTpi1DtnOIh7AlIGDw_BmNyByRG1wUvgHoankCdvTvRna7QqfndNWhrZ1DU97xFYUp1_YkZmDP0e1IH_mTIprbQecWNY29B6qwdRC0Z-PUFCCv2EgBIb9bHydLlv')" }} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Ceramic Brake Pads</p>
                        <p className="text-xs text-slate-400">45 sold</p>
                      </div>
                      <span className="text-sm font-bold text-primary">$4,500</span>
                    </div>

                    <div className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="size-10 rounded-lg bg-cover bg-center" data-alt="Oil Filter" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAk3mXENmm7CS8OMHER_qPJM1BSsVjikrAGK4xu1M4T9R5sZaqL0IlbdVRzbIoAgPD5TG3tOXcOGH-WjLQOCluZPZdwBDFE_4WF6_V8GP1cqQen8Vr9mGeWAj57MQZ9HNnl3VDWr_O9m66bdNM7mJ8K9eBIydq5isvSOeP62W830I3SPDXvEvn-wez8AHwd3bemFs6cFkQzdvby2PeOGsA4zfIrf_eC2sy0yECUxwxxheD5vAIaOknqIZ6l9gczNdfUWYib2t9sr5oH')" }} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Premium Oil Filter</p>
                        <p className="text-xs text-slate-400">32 sold</p>
                      </div>
                      <span className="text-sm font-bold text-primary">$640</span>
                    </div>

                    <div className="flex items-center gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="size-10 rounded-lg bg-cover bg-center" data-alt="Spark Plugs" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9SGdOHvcd7K0hjGXYZDx-7FR_Qlku4v1lmbvsYraN2G8XRlofJImNFC1ctL_1Uqg8FSDPbn3dP02mlMhyLPkK98HFaV5-l8KP59J9eNnlV5HqnV8nlBGLip1Nl2rpS0idkB3uTfpf7gfCvfzMaLSZzJOpYJ1q2oytGa1SmrSveYhfpsUPZbZ7kVyHQ-SimiEl582EcGIiMl7l6R0SpzVsoNIrbvArVhMIp-r3aVAha1vyEnR-_7RPmr_FeKvBfGvMuqXUonNL5f6L')" }} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Spark Plug Set (4)</p>
                        <p className="text-xs text-slate-400">28 sold</p>
                      </div>
                      <span className="text-sm font-bold text-primary">$1,120</span>
                    </div>
                  </div>
                </div>

                {/* Inventory Velocity Gauge */}
                <div className="glass-panel p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-bold text-white">Stock Turnover</h3>
                    <span className="text-emerald-500 text-xs font-bold">+5%</span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="relative size-24 shrink-0">
                      <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" fill="none" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                        <circle cx="50" cy="50" fill="none" r="40" stroke="#067ff9" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" strokeWidth="10" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xl font-bold text-white">75%</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-primary" />
                        <p className="text-xs text-slate-400">Fast Moving</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-white/20" />
                        <p className="text-xs text-slate-400">Slow Moving</p>
                      </div>

                      <p className="text-xs text-slate-500 mt-1">Healthy Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="glass-panel overflow-hidden">
              <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2 top-2 text-slate-400 text-[18px]">search</span>
                    <input className="bg-black/20 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors w-48" placeholder="Search order ID..." type="text" />
                  </div>

                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors border border-white/5">
                    <span className="material-symbols-outlined text-[16px]">filter_list</span>
                    Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-white/5 text-xs uppercase font-semibold text-slate-300">
                    <tr>
                      <th className="px-6 py-4" scope="col">Order ID</th>
                      <th className="px-6 py-4" scope="col">Product Name</th>
                      <th className="px-6 py-4" scope="col">Date</th>
                      <th className="px-6 py-4" scope="col">Customer</th>
                      <th className="px-6 py-4" scope="col">Status</th>
                      <th className="px-6 py-4 text-right" scope="col">Amount</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">#ORD-7752</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="size-8 rounded bg-cover bg-center" data-alt="Alternator" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcUhSZ1SC1Zruow8I1nbUZccLLShwHW5fN57FrPLcsvOE0K2vHPfIrkmw9EYSH5QGCne_ABI3y1TiVG_NTDYix8jghZ2AZwTtHruadt-Dz-Z4OeT3tkihGx9nZCzRaK8B7n2uxp2YFS3qhKpkhZN-ep3RKu5OpQF-HrhgAAIwpmzohY5NCO5dIj_D8eAktDmFQr5YufyK_lW_PVf94uKBXAxTylX7ZC5q49tP5gEcyBQUtsHZZoE2FOAVTrDUHhSZ1KL5Bx3nDhOpz')" }} />
                        Alternator Gen-X
                      </td>
                      <td className="px-6 py-4">Oct 24, 2023</td>
                      <td className="px-6 py-4">AutoFix Garage</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500 ring-1 ring-inset ring-emerald-500/20">Completed</span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-white">$245.00</td>
                    </tr>

                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">#ORD-7751</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="size-8 rounded bg-cover bg-center" data-alt="Headlight" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6abXzWlR07crrGp-si-pUPNgcpCo1YVNFXYpD1jK2j3ytcZflkpWYNz3FNU96wEVaU0euT0szmbATW4wvkzMB57nW4F-ri9bVRDkELqN0jt5Els6ATDKTkk8PIOwRg2DC4uM6ZhVsD4MwDh0BFOBjmHkWly6VoJSDmIeZITO7gbTfw82EWHElhHsZfu3L4Wogg6qbGLsb1UP4PMuDdn76bg9GW31q2EUTYgEvz2Qr5OuVb9MLmrvdIHcPql3MV48jVG0zDK05vp11')" }} />
                        LED Headlight Kit
                      </td>
                      <td className="px-6 py-4">Oct 24, 2023</td>
                      <td className="px-6 py-4">Mike's Mechanics</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20">Processing</span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-white">$129.99</td>
                    </tr>

                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">#ORD-7750</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="size-8 rounded bg-cover bg-center" data-alt="Tire" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKQXumOgdqCKEAf3Ht92apnUqRUxbYTuAgRJevulxdxFULA286-4dG6XP-gYlDjlcgufccoUPik_AkSltiyOaZBd93o9HS3RINcXFdwIaosqlEjv9nAIUqxW--FAs7tjuq1p6RBJuiGKsLIZJHu2TLWVqLlLrJ4CtnlLalHJDLq7I1JvgZ2r52K8GxUGaw6jz7yKTrshafVXG6ZzEt6TFw2ANdyLgElmVU_yStsfHmUwFIbjGvazWcHoD4MePBATyydSGeNXIUkNK_')" }} />
                        All-Season Tire
                      </td>
                      <td className="px-6 py-4">Oct 23, 2023</td>
                      <td className="px-6 py-4">Speedy Lube</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-500 ring-1 ring-inset ring-amber-500/20">Pending</span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-white">$89.50</td>
                    </tr>

                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">#ORD-7749</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="size-8 rounded bg-cover bg-center" data-alt="Battery" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOFMVLV8NjPkc7wLORgSn3w_uf6uzIgPjRyV8ekPqPlrIRtxl9EfVlf_f1ybFta8-n8EnFn_Ooh35h3Im2XJkyjWe0YR3LQ1OUPc7n99-KqY0sfRuFmxN5DRvVI9aVSpVkNLmP4xQvIdnMntUVWSvkkNIcEAe7aTYk4qgH9YSAl9w5ztgYo7fA087cEHhEynQcu6-63Dxw9mGIT0_YV5D0NERfcSpLI0LRajc1eJCJN-hzIjNHpG_z4g0Pa8dK7wLtqTKDUwQCB-1G')" }} />
                        Car Battery 12V
                      </td>
                      <td className="px-6 py-4">Oct 23, 2023</td>
                      <td className="px-6 py-4">Westside Auto</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500 ring-1 ring-inset ring-emerald-500/20">Completed</span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-white">$150.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-400">
                <p>Showing 4 of 128 transactions</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50 transition-colors">Previous</button>
                  <button className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors text-white">Next</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Named export for AppRouter compatibility
export const VendorAnalyticsPage = VendorAnalytics;
