import React, { useState } from "react";
import VendorLayout from "../../components/layout/VendorLayout";

/**
 * CreateManualOrder.jsx
 * - Function component version of your "Create Manual Order" HTML page
 * - Assumes Tailwind + Material Symbols are loaded globally (index.html)
 */

export default function CreateManualOrder() {
  // Sample product list (pulled from your HTML)
  const products = [
    {
      id: "BP-2024-X",
      name: "Ceramic Brake Pads",
      img:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDM3AXUFghJZsdXpDFSmbF0SvixShBQu8MWfZ6EESx-p5GbGZH-hmWuQK3-4ljWDn49TWSUqr_-Kb-1xOuCs8S8N7ij_2dqhUhFXYCspBqro2PXZEw6j3b2RjzOD3vmEly9E6Q75bbzTonDZQLc_vZHOAmv_zUm4S24FdyzBQ6UgDn3Of5WV0m76BRWEK6W8hiohDUML5ZYicZBTewIOhNcGv94Qvz9PcQ20DLyzROd3RvX3Cji1cr9Awg8AIrIf8YnnkHAwZKiVb4f",
      stock: 245,
      price: 45.0,
      stockColor: "green",
    },
    {
      id: "OF-9921-A",
      name: "Premium Oil Filter",
      img:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC7x_5qx__Za9raY4Bm7_cjG72p7rnnTwbEcr4LIx9z2eTlZyB-0mw6g6J8j_gYv_6YMrscGcCd5hwsYFJhkKWO5727dkdQUHbeRJyh8j12KiA-ybl4slEklGc9O3xB6gqUV79zqt4JynYbSSanEW-KStkC_A-KJGBOSBuaYu3QKF2Ff_egMjPvpdbScNmGVLhVt7g_vRVijdwAuGKVEXcTxhh0nH1hn2AaUz-LXBJFOo69GeRbgdxg1a36Kf04Bo2oUSaHXgqaAXgD",
      stock: 89,
      price: 12.5,
      stockColor: "green",
    },
    {
      id: "SP-4400-V",
      name: "Spark Plug Set (4pc)",
      img:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuChEnOLqIrrMr2kRE4nWSr2FQfOYqoh2sBk9APlPgkSikPVNjNoYDijoxJzEzJeXryjps4d4rPl3MdSNoeqwUol7YWO5Mz1hzXMi4Br__zWS6ZXR85I4uwh6XOWPn5eR0UcnD-yIHSUoxNJNRLImQ4tGuCI_31QWcnPISTMy6E6D_ZNyU0QAlO7mpwGeJqLmdx0_yDeR85m-jnugjAEAjby3ayYVGVSYR5ZM878qzVMa_0OScTeaO_rEHfPbOCB-VJ0_aCjfLmxhE9R",
      stock: 5,
      price: 28.99,
      stockColor: "yellow",
    },
  ];

  // Sample cart (pulled from your HTML)
  const [cart, setCart] = useState([
    {
      id: "ALT-1001",
      name: "Heavy Duty Alternator",
      img:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA-fhlnI_KVAL4XcOMySee9hdeg6dN7cMRtBW9Mdsbug7EZNfhLQ55YxDEsIz1Y1KjwW3dJFrseYeMvA6rBtZvMiJyAXmDr5IW9mfc-8krbxX5v9-_qQG8yJVdYCX5x7i9qs9GCpaqr04DILKx1S3Kjd_htmDQlJbdGsV1-mjHPHi_pqw2Kl3uPBkr4McqjFxZmPCrshB2tLT6mPxebGbRFRVdGCirQ3w5TQBnnNUd-yK9roiRhZAdTDt9bYjSyfHNbIYSNglsWBVfT",
      qty: 1,
      price: 120.0,
    },
    {
      id: "HLB-2001",
      name: "Xenon Headlight Bulb",
      img:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYv6gSXjA9j9b_T8S9fCXau8ngs0Zup-biN9dccuHv8OCL_YBYqoSxrZte-jP-tc4m52LxOr2lm3n0ao1Sl94SfXy2BRcJZg3NXn1nkD22mEeRAUhjYerSuUaOmlxPiTgRX2OGoCsO7ORdhRqwZcwncMALEO-J-q4avk7dBpitd1iHPJDKi_CMxODacoF60jt0oRbLLF8xndRnIewhgVMp1PqNKyPhOBhP1gm3xyRmLHvn-P_xis1-swojJDpaxpb6StPn4-KknA4G",
      qty: 2,
      price: 45.0,
    },
  ]);

  // simple cart helpers
  const updateQty = (id: string, newQty: number) => {
    setCart((c) =>
      c.map((it) => (it.id === id ? { ...it, qty: Math.max(0, newQty) } : it))
    );
  };
  const removeItem = (id: string) => setCart((c) => c.filter((it) => it.id !== id));

  // totals
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = 15.0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const grandTotal = +(subtotal + shipping + tax).toFixed(2);

  return (
    <VendorLayout>
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 relative">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6 relative z-10">
            {/* Left */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              <div className="flex flex-col gap-2 mb-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">Create Manual Order</h2>
                <p className="text-slate-400">Manually enter customer details and select parts to generate a new order.</p>
              </div>

              {/* Customer Details */}
              <section className="glass-panel rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">1</span>
                    Customer Details
                  </h3>
                  <button className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">search</span>
                    Find Existing Customer
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">First Name</label>
                    <input className="w-full glass-input rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-0" placeholder="e.g. John" type="text" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Last Name</label>
                    <input className="w-full glass-input rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-0" placeholder="e.g. Smith" type="text" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input className="w-full glass-input rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-0" placeholder="john.smith@example.com" type="email" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Phone Number</label>
                    <input className="w-full glass-input rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-0" placeholder="+1 (555) 000-0000" type="tel" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Company (Optional)</label>
                    <input className="w-full glass-input rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-0" placeholder="Company Name Ltd." type="text" />
                  </div>

                  <div className="md:col-span-2 pt-2 border-t border-slate-700/50 mt-2">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Shipping Address</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <input className="w-full glass-input rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-0" placeholder="Street Address" type="text" />
                      </div>
                      <div>
                        <input className="w-full glass-input rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-0" placeholder="City" type="text" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input className="w-full glass-input rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-0" placeholder="State/Prov" type="text" />
                        <input className="w-full glass-input rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:ring-0" placeholder="Zip/Postal" type="text" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <input className="rounded border-slate-600 bg-slate-800 text-primary focus:ring-offset-slate-900 focus:ring-primary" id="billing_same" type="checkbox" />
                      <label className="text-sm text-slate-400 select-none" htmlFor="billing_same">Billing address is same as shipping</label>
                    </div>
                  </div>
                </div>
              </section>

              {/* Product Selection */}
              <section className="glass-panel rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">2</span>
                    Add Products
                  </h3>

                  <div className="flex w-full md:w-auto gap-2">
                    <div className="relative w-full md:w-64">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-[20px]">search</span>
                      <input className="w-full glass-input rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:ring-0" placeholder="Search SKU or Name..." type="text" />
                    </div>
                    <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">filter_list</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-slate-800/60 bg-[#151b23]/50">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                      <tr>
                        <th className="px-4 py-3 font-medium">Product</th>
                        <th className="px-4 py-3 font-medium text-center">Stock</th>
                        <th className="px-4 py-3 font-medium text-right">Price</th>
                        <th className="px-4 py-3 font-medium w-32 text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800/50 text-sm">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/30 transition-colors group">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="h-10 w-10 rounded bg-slate-700 bg-cover bg-center shrink-0"
                                style={{ backgroundImage: `url("${p.img}")` }}
                                role="img"
                                aria-label={p.name}
                              />
                              <div>
                                <p className="font-medium text-white group-hover:text-primary transition-colors">{p.name}</p>
                                <p className="text-xs text-slate-500">SKU: {p.id}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                p.stockColor === "green"
                                  ? "bg-green-500/10 text-green-500"
                                  : p.stockColor === "yellow"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-red-500/10 text-red-500"
                              }`}
                            >
                              {p.stock} In Stock
                            </span>
                          </td>

                          <td className="px-4 py-3 text-right text-slate-300">${p.price.toFixed(2)}</td>

                          <td className="px-4 py-3 text-center">
                            <button className="text-primary hover:text-white hover:bg-primary px-3 py-1.5 rounded text-xs font-medium border border-primary/30 transition-all">Add</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 text-center">
                  <button className="text-xs text-slate-500 hover:text-white transition-colors">View all results</button>
                </div>
              </section>
            </div>

            {/* Right column: Order Summary */}
            <div className="w-full xl:w-[420px] shrink-0 flex flex-col gap-6">
              <div className="glass-panel rounded-xl p-6 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
                  Order Summary <span className="text-sm font-normal text-slate-400">#ORD-NEW</span>
                </h3>

                {/* Cart items */}
                <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-1">
                  {cart.map((it) => (
                    <div key={it.id} className="flex gap-3 bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">
                      <div
                        className="h-14 w-14 rounded bg-slate-700 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url("${it.img}")` }}
                        role="img"
                        aria-label={it.name}
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-white line-clamp-1">{it.name}</span>
                          <button onClick={() => removeItem(it.id)} className="text-slate-500 hover:text-red-400">
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>

                        <div className="flex justify-between items-end mt-1">
                          <div className="flex items-center border border-slate-600 rounded bg-slate-800">
                            <button onClick={() => updateQty(it.id, it.qty - 1)} className="px-2 py-0.5 text-slate-400 hover:text-white">-</button>
                            <input
                              className="w-8 p-0 text-center bg-transparent border-0 text-xs text-white focus:ring-0"
                              type="number"
                              value={it.qty}
                              onChange={(e) => updateQty(it.id, Number(e.target.value))}
                            />
                            <button onClick={() => updateQty(it.id, it.qty + 1)} className="px-2 py-0.5 text-slate-400 hover:text-white">+</button>
                          </div>
                          <span className="text-sm font-semibold text-white">${(it.price).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping */}
                <div className="mb-6">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">Shipping Method</label>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="relative flex items-center justify-between p-3 rounded-lg border border-primary bg-primary/10 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input defaultChecked name="shipping" type="radio" className="text-primary focus:ring-primary bg-slate-800 border-slate-600" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">Standard Delivery</span>
                          <span className="text-xs text-slate-400">3-5 Business Days</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-white">$15.00</span>
                    </label>

                    <label className="relative flex items-center justify-between p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input name="shipping" type="radio" className="text-primary focus:ring-primary bg-slate-800 border-slate-600" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-300">Express Shipping</span>
                          <span className="text-xs text-slate-500">1-2 Business Days</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-300">$35.00</span>
                    </label>
                  </div>
                </div>

                <hr className="border-slate-700/50 mb-6" />

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Shipping</span>
                    <span className="text-white">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                    <span className="text-base font-bold text-white">Grand Total</span>
                    <span className="text-2xl font-black text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">check</span>
                    Create Order
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 px-4 rounded-lg border border-slate-700 transition-colors">Save Draft</button>
                    <button onClick={() => setCart([])} className="bg-transparent hover:bg-red-500/10 text-slate-400 hover:text-red-500 font-medium py-2.5 px-4 rounded-lg border border-transparent hover:border-red-500/30 transition-colors">Clear</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-10" />
        </div>
      </div>
    </VendorLayout>
  );
}
