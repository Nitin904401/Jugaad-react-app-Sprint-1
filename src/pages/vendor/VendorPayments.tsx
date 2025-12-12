import React from "react";
import VendorLayout from "../../components/layout/VendorLayout";

export default function VendorPayments() {
  const sampleRows = [
    { date: "2025-12-01", id: "TXN-1001", method: "Bank Transfer", status: "Completed", amount: "$2,100.00" },
    { date: "2025-11-20", id: "TXN-0998", method: "Bank Transfer", status: "Pending", amount: "$450.00" },
    { date: "2025-11-05", id: "TXN-0987", method: "UPI", status: "Completed", amount: "$1,250.00" },
  ];

  return (
    <VendorLayout>
      <main className="flex-1 flex flex-col h-full overflow-hidden px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Payouts & Financials</h2>
            <p className="text-slate-400">Manage your earnings, view transaction history, and request payouts.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-[#0f1720] hover:bg-[#111827] text-white text-sm">
              <span className="material-symbols-outlined">download</span>
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg">
              <span className="material-symbols-outlined">add_card</span>
              Request Payout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {[ 
            { label: "Available Balance", amount: "$12,450.00", icon: "account_balance_wallet", trend: "+12.5%" },
            { label: "Pending Clearance", amount: "$450.00", icon: "pending" },
            { label: "Total Earnings", amount: "$45,200.00", icon: "attach_money", trend: "+8.2%" },
            { label: "Last Payout", amount: "$2,100.00", icon: "calendar_month" }
          ].map((card, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-primary">{card.icon}</span>
              </div>
              <p className="text-slate-400 text-sm mb-1">{card.label}</p>
              <h3 className="text-2xl font-bold text-white mb-2">{card.amount}</h3>
              {card.trend && (
                <div className="flex items-center gap-1 text-emerald-400 text-sm bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span>{card.trend}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Payout History</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#111827] text-xs text-slate-400">{sampleRows.length}</span>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  { ["Date", "Transaction ID", "Method", "Status", "Amount", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-white/5">{h}</th>
                  )) }
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sampleRows.map((r) => (
                  <tr key={r.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-300">{r.date}</td>
                    <td className="px-4 py-3 font-medium text-white">{r.id}</td>
                    <td className="px-4 py-3 text-slate-300">{r.method}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${r.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'}`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{r.amount}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="px-3 py-1 rounded-lg bg-white/5 text-white text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </VendorLayout>
  );
}

export { VendorPayments as VendorPaymentsPage };
            
