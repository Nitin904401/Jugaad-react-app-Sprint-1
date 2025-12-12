import React from "react";
import { useNavigate } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';

export default function VendorPayments() {
  const stats = [
    { label: "Available Balance", amount: "$12,450.00", icon: "account_balance_wallet", trend: "+12.5%" },
    { label: "Pending Clearance", amount: "$450.00", icon: "pending" },
    { label: "Total Earnings", amount: "$45,200.00", icon: "attach_money", trend: "+8.2%" },
    { label: "Last Payout", amount: "$2,100.00", icon: "calendar_month" }
  ];

  const bars = [30,45,35,60,50,75,65,40,55,80,70,45,60,35,50,85,75,55,65,90];

  const transactions = [
    { date: "Oct 24, 2023", id: "#TRX-99281", method: "Bank Transfer", status: "Paid", amount: "$2,100.00" },
    { date: "Oct 18, 2023", id: "#TRX-99100", method: "PayPal", status: "Processing", amount: "$540.50" },
    { date: "Oct 10, 2023", id: "#TRX-98842", method: "Direct Deposit", status: "Paid", amount: "$1,250.00" },
    { date: "Sep 28, 2023", id: "#TRX-97551", method: "Bank Transfer", status: "Failed", amount: "$890.00" },
    { date: "Sep 15, 2023", id: "#TRX-96220", method: "PayPal", status: "Paid", amount: "$3,400.00" },
  ];

  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full bg-background-dark text-white font-display overflow-hidden">
      {/* Sidebar */}
      <VendorSidebar />

      {/* Main Body */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-[#1a2332] via-[#0f1923] to-[#0f1923]">
        {/* Header */}
        

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Top Section */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-2 max-w-2xl">
              <h2 className="text-4xl font-bold text-white">Payouts & Financials</h2>
              <p className="text-[#9babbb] text-lg">
                Manage your earnings, view transaction history, and request payouts.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#3a4755] bg-[#1a222d] hover:bg-[#27303a] text-white text-sm">
                <span className="material-symbols-outlined">download</span>
                Export Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-[0_0_20px_rgba(6,127,249,0.25)]">
                <span className="material-symbols-outlined">add_card</span>
                Request Payout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((card, i) => (
              <div key={i} className="glass-panel p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl text-primary">{card.icon}</span>
                </div>
                <p className="text-[#9babbb] text-sm mb-1">{card.label}</p>
                <h3 className="text-3xl font-bold text-white mb-2">{card.amount}</h3>
                {card.trend && (
                  <div className="flex items-center gap-1 text-emerald-400 text-sm bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    <span>{card.trend}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Payout History</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#27303a] text-xs text-[#9babbb]">142</span>
            </div>

            <div className="w-full h-24 bg-[#111418]/50 border-b border-white/10 flex items-end gap-1 p-4">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="w-[3%] bg-primary/20 rounded-t-sm transition-all duration-500 hover:bg-primary/40 cursor-pointer"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto glass-panel rounded-xl p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {["Date", "Transaction ID", "Method", "Status", "Amount", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9babbb] border-b border-white/10"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {transactions.map((tx, idx) => (
                  <tr key={tx.id} className="table-row-hover group transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4 text-sm text-[#9babbb] whitespace-nowrap font-mono">{tx.id}</td>
                    <td className="px-6 py-4 text-sm text-white whitespace-nowrap">{tx.method}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tx.status === "Paid" ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Paid
                        </span>
                      ) : tx.status === "Processing" ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Processing
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> {tx.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-white text-right whitespace-nowrap">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="p-1.5 rounded-lg text-[#9babbb] hover:text-white hover:bg-[#3a4755] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="p-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm text-[#9babbb]">Showing <span className="text-white font-medium">1-5</span> of <span className="text-white font-medium">142</span> transactions</span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-[#3a4755] text-[#9babbb] hover:text-white hover:bg-[#27303a] disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <button className="px-3 py-1 rounded-lg bg-primary text-white text-sm font-bold">1</button>
                <button className="px-3 py-1 rounded-lg hover:bg-[#27303a] text-[#9babbb] text-sm font-medium">2</button>
                <button className="px-3 py-1 rounded-lg hover:bg-[#27303a] text-[#9babbb] text-sm font-medium">3</button>
                <span className="text-[#9babbb]">...</span>
                <button className="p-2 rounded-lg border border-[#3a4755] text-[#9babbb] hover:text-white hover:bg-[#27303a]">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
