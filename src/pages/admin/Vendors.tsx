import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminVendorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const vendors = [
    {
      name: 'Autopart Pro',
      email: 'contact@autopartpro.com',
      date: '2023-10-26',
      status: 'Approved',
      color: 'green',
    },
    {
      name: 'Speedy Spares',
      email: 'info@speedyspares.co',
      date: '2023-10-25',
      status: 'Pending',
      color: 'amber',
    },
    {
      name: 'Gearhead Supply',
      email: 'support@gearheadsupply.com',
      date: '2023-10-24',
      status: 'Suspended',
      color: 'red',
    },
    {
      name: 'AutoParts Hub',
      email: 'hello@autohub.com',
      date: '2023-10-23',
      status: 'Approved',
      color: 'green',
    },
    {
      name: 'Quick Parts Co',
      email: 'support@quickparts.com',
      date: '2023-10-22',
      status: 'Pending',
      color: 'amber',
    },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColorMap: Record<string, { bg: string; text: string }> = {
    Approved: { bg: 'bg-green-500/20', text: 'text-green-400' },
    Pending: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
    Suspended: { bg: 'bg-red-500/20', text: 'text-red-400' },
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Vendors</h1>
        <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition">
          ➕ Add New Vendor
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="flex h-12 rounded-lg bg-slate-800 border border-white/10 focus-within:border-blue-500 transition">
              <span className="px-4 flex items-center text-slate-400">🔍</span>
              <input
                className="flex-1 bg-transparent px-4 text-white placeholder:text-slate-400 focus:outline-none"
                placeholder="Search by vendor name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {['All', 'Pending', 'Approved', 'Suspended'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`h-10 px-4 rounded-lg text-sm font-medium transition ${
                status === statusFilter
                  ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-300 uppercase text-xs border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left">Vendor Name</th>
              <th className="px-6 py-4 text-left">Contact Email</th>
              <th className="px-6 py-4 text-left">Registration Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <tr key={vendor.email} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-medium text-white">{vendor.name}</td>
                  <td className="px-6 py-4 text-slate-400">{vendor.email}</td>
                  <td className="px-6 py-4 text-slate-400">{vendor.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColorMap[vendor.status].bg
                      } ${statusColorMap[vendor.status].text}`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => {
                        if (vendor.status === 'Approved') {
                          navigate(`/admin-panel/vendors/${vendor.email}`);
                        }
                      }}
                      className="text-blue-400 hover:text-blue-300 font-medium transition"
                    >
                      {vendor.status === 'Approved' && 'View Details'}
                      {vendor.status === 'Suspended' && 'Unsuspend'}
                      {vendor.status === 'Pending' && 'Approve'}
                    </button>
                    {vendor.status === 'Pending' && (
                      <button className="ml-4 text-red-400 hover:text-red-300 font-medium transition">
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  No vendors found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing <span className="text-white font-medium">1</span> to{' '}
          <span className="text-white font-medium">5</span> of{' '}
          <span className="text-white font-medium">42</span> results
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="size-9 rounded-lg bg-slate-800 text-white opacity-50 cursor-not-allowed"
          >
            ❮
          </button>
          <button className="size-9 rounded-lg bg-blue-600 text-white font-medium">
            1
          </button>
          <button className="size-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition">
            2
          </button>
          <button className="size-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition">
            3
          </button>
          <span className="text-slate-400">…</span>
          <button className="size-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition">
            9
          </button>
          <button className="size-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition">
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};
