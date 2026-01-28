import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVendors, updateVendorStatus, type AdminVendor } from '../../api/vendors';
import Modal from '../../Components/common/Modal';

export const AdminVendorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vendors, setVendors] = useState<AdminVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingVendorId, setUpdatingVendorId] = useState<string | null>(null);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'success', title: '', message: '' });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await getAllVendors();
      setVendors(data);
    } catch (err) {
      console.error('Failed to fetch vendors:', err);
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to load vendors',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (vendorId: string, newStatus: string) => {
    setUpdatingVendorId(vendorId);

    try {
      await updateVendorStatus(vendorId, newStatus);
      // Update local state
      setVendors(vendors.map(vendor => 
        vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
      ));
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: `Vendor ${newStatus} successfully`,
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to update vendor status',
      });
    } finally {
      setUpdatingVendorId(null);
    }
  };



  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter.toLowerCase() === vendor.status?.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const statusColorMap: Record<string, { bg: string; text: string }> = {
    approved: { bg: 'bg-green-500/20', text: 'text-green-400' },
    pending: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
    suspended: { bg: 'bg-red-500/20', text: 'text-red-400' },
    rejected: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-white text-lg">Loading vendors...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Vendors</h1>
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
                <tr key={vendor.id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-medium text-white">{vendor.name}</td>
                  <td className="px-6 py-4 text-slate-400">{vendor.email}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(vendor.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColorMap[vendor.status?.toLowerCase()]?.bg || 'bg-gray-500/20'
                      } ${statusColorMap[vendor.status?.toLowerCase()]?.text || 'text-gray-400'}`}
                    >
                      {vendor.status?.charAt(0).toUpperCase() + vendor.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {vendor.status === 'approved' && (
                        <button 
                          onClick={() => navigate(`/admin-panel/vendors/${vendor.id}`)}
                          className="text-blue-400 hover:text-blue-300 font-medium transition"
                        >
                          View Details
                        </button>
                      )}
                      {vendor.status === 'suspended' && (
                        <button 
                          onClick={() => handleStatusChange(vendor.id, 'approved')}
                          disabled={updatingVendorId === vendor.id}
                          className="text-green-400 hover:text-green-300 font-medium transition disabled:opacity-50"
                        >
                          {updatingVendorId === vendor.id ? 'Updating...' : 'Unsuspend'}
                        </button>
                      )}
                      {vendor.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(vendor.id, 'approved')}
                            disabled={updatingVendorId === vendor.id}
                            className="text-green-400 hover:text-green-300 font-medium transition disabled:opacity-50"
                          >
                            {updatingVendorId === vendor.id ? 'Updating...' : 'Approve'}
                          </button>
                          <button 
                            onClick={() => handleStatusChange(vendor.id, 'rejected')}
                            disabled={updatingVendorId === vendor.id}
                            className="text-red-400 hover:text-red-300 font-medium transition disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {vendor.status === 'approved' && (
                        <button 
                          onClick={() => handleStatusChange(vendor.id, 'suspended')}
                          disabled={updatingVendorId === vendor.id}
                          className="text-red-400 hover:text-red-300 font-medium transition disabled:opacity-50"
                        >
                          Suspend
                        </button>
                      )}
                    </div>
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
          Showing <span className="text-white font-medium">{filteredVendors.length > 0 ? 1 : 0}</span> to{' '}
          <span className="text-white font-medium">{filteredVendors.length}</span> of{' '}
          <span className="text-white font-medium">{vendors.length}</span> results
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
            ❯
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};
