import React, { useState } from 'react';

export const AdminUsersPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      name: 'Olivia Rhye',
      email: 'olivia@example.com',
      role: 'Vendor',
      status: 'Active',
      color: 'green',
    },
    {
      name: 'Phoenix Baker',
      email: 'phoenix@example.com',
      role: 'Customer',
      status: 'Active',
      color: 'green',
    },
    {
      name: 'Lana Steiner',
      email: 'lana@example.com',
      role: 'Vendor',
      status: 'Blocked',
      color: 'red',
    },
    {
      name: 'John Anderson',
      email: 'john@example.com',
      role: 'Customer',
      status: 'Active',
      color: 'green',
    },
    {
      name: 'Sarah Mitchell',
      email: 'sarah@example.com',
      role: 'Vendor',
      status: 'Active',
      color: 'green',
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, { bg: string; text: string; icon: string }> = {
    Active: { bg: 'bg-green-500/20', text: 'text-green-400', icon: 'check_circle' },
    Blocked: { bg: 'bg-red-500/20', text: 'text-red-400', icon: 'block' },
  };

  return (
    <div className="w-full">
      {/* Title */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Users</h1>
        <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition">
          ➕ Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 flex flex-wrap gap-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur mb-6">
        <div className="flex-grow">
          <div className="flex h-12 rounded-lg bg-white/5 border border-white/10 focus-within:border-blue-500 transition">
            <span className="px-4 flex items-center text-white/50">🔍</span>
            <input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 px-2 text-white placeholder:text-white/40 focus:outline-none"
            />
          </div>
        </div>

        {['All', 'Active', 'Blocked'].map((label) => (
          <button
            key={label}
            onClick={() => setStatusFilter(label)}
            className={`flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium transition ${
              label === statusFilter
                ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white/80'
            }`}
          >
            {label}
            <span>▼</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 text-white/60 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left w-[40%]">User Info</th>
              <th className="px-6 py-4 text-left w-[20%]">Role</th>
              <th className="px-6 py-4 text-left w-[20%]">Status</th>
              <th className="px-6 py-4 text-left w-[20%]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.email} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-white/60 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/80">{user.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span
                        className={`font-medium ${
                          user.status === 'Active'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`flex items-center gap-2 font-bold transition ${
                        user.status === 'Active'
                          ? 'text-red-400 hover:text-red-300'
                          : 'text-green-400 hover:text-green-300'
                      }`}
                    >
                      <span className="text-lg">
                        {user.status === 'Active' ? '🚫' : '✅'}
                      </span>
                      {user.status === 'Active' ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-white/60">
                  No users found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
