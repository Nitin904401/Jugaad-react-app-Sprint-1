import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVendorById, updateVendorStatus, type VendorDetails } from '../../api/vendors';
import Modal from '../../Components/common/Modal';

export const AdminVendorDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState<VendorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'success', title: '', message: '' });

  useEffect(() => {
    if (vendorId) {
      fetchVendorDetails();
    }
  }, [vendorId]);

  const fetchVendorDetails = async () => {
    try {
      const data = await getVendorById(vendorId!);
      setVendor(data);
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to load vendor details',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!vendor) return;
    setUpdatingStatus(true);

    try {
      await updateVendorStatus(vendor.id, newStatus);
      setVendor({ ...vendor, status: newStatus });
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
      setUpdatingStatus(false);
    }
  };

  const downloadKYCFiles = async () => {
    if (!vendor) return;
    
    const vendorName = vendor.name.replace(/\s+/g, '_').toLowerCase();
    
    const downloadFile = async (url: string, filename: string) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Download failed:', error);
      }
    };
    
    if (vendor.pan_document) {
      const extension = vendor.pan_document.substring(vendor.pan_document.lastIndexOf('.'));
      await downloadFile(`http://localhost:5050/${vendor.pan_document}`, `${vendorName}_pan${extension}`);
    }
    
    if (vendor.cheque_document) {
      const extension = vendor.cheque_document.substring(vendor.cheque_document.lastIndexOf('.'));
      await downloadFile(`http://localhost:5050/${vendor.cheque_document}`, `${vendorName}_bankproof${extension}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-white text-lg">Loading vendor details...</div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <div className="text-white text-lg mb-4">Vendor not found</div>
        <button
          onClick={() => navigate('/admin-panel/vendors')}
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Vendors
        </button>
      </div>
    );
  }

  const avatar = vendor.profile_picture 
    ? `http://localhost:5050/${vendor.profile_picture}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.name)}&size=200&background=3b82f6&color=fff`;

  const statusColors: Record<string, { bg: string; text: string }> = {
    approved: { bg: 'bg-green-500/20', text: 'text-green-400' },
    pending: { bg: 'bg-amber-500/20', text: 'text-amber-400' },
    suspended: { bg: 'bg-red-500/20', text: 'text-red-400' },
    rejected: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
  };

  const currentStatusColor = statusColors[vendor.status] || statusColors.pending;

  return (
    <div className="w-full">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin-panel/vendors')}
        className="mb-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition"
      >
        ← Back to Vendors
      </button>

      {/* Header Section */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div
            className="size-20 rounded-2xl bg-cover bg-center border border-white/10"
            style={{ backgroundImage: `url(${avatar})` }}
          />
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-bold text-white">{vendor.name}</h2>
              <span className={`px-3 py-1 rounded-full ${currentStatusColor.bg} ${currentStatusColor.text} text-sm font-medium`}>
                {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
              </span>
            </div>
            <p className="text-slate-400">
              Vendor ID: {vendor.id.substring(0, 8)} • Joined {new Date(vendor.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {vendor.status === 'approved' && (
            <button 
              onClick={() => handleStatusChange('suspended')}
              disabled={updatingStatus}
              className="flex items-center gap-2 h-10 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition disabled:opacity-50"
            >
              ⊗ Suspend
            </button>
          )}
          {vendor.status === 'pending' && (
            <>
              <button 
                onClick={() => handleStatusChange('rejected')}
                disabled={updatingStatus}
                className="flex items-center gap-2 h-10 px-4 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 font-medium transition border border-red-500/30 disabled:opacity-50"
              >
                ✕ Reject
              </button>
              <button 
                onClick={() => handleStatusChange('approved')}
                disabled={updatingStatus}
                className="flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-50"
              >
                ✓ Approve Registration
              </button>
            </>
          )}
          {vendor.status === 'suspended' && (
            <button 
              onClick={() => handleStatusChange('approved')}
              disabled={updatingStatus}
              className="flex items-center gap-2 h-10 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition disabled:opacity-50"
            >
              ✓ Unsuspend
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon="💰" title="TOTAL SALES" value="$0.00" />
        <StatCard icon="⭐" title="VENDOR RATING" value="New Vendor" />
        <StatCard icon="📦" title="TOTAL PRODUCTS" value="0" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Business Profile & Registration */}
        <div className="lg:col-span-2 space-y-8">
          {/* Business Profile */}
          <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">Business Profile</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Info label="Business Name" value={vendor.company_name || 'N/A'} />
              <Info label="Email Address" value={vendor.email} />
              <Info label="Contact Name" value={vendor.name} />
              <Info label="Website" value={vendor.website || 'N/A'} />
              <Info label="Phone Number" value={vendor.phone_number || 'N/A'} />
              <Info label="Business Type" value={vendor.business_type || 'N/A'} />
            </div>
          </div>

          {/* Registration & Address */}
          <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-white/5">
            <h3 className="text-lg font-bold text-white mb-8">Registration & Address</h3>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Info label="GSTIN / TAX ID" value={vendor.tax_id || 'N/A'} withBadge={!!vendor.tax_id} />
                <Info label="Registered City" value={vendor.city || 'N/A'} />
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase font-medium mb-3">Business Address</p>
                <p className="text-white leading-relaxed">
                  {vendor.address || 'No address provided'}
                  {vendor.city && vendor.postal_code && `, ${vendor.city}, ${vendor.postal_code}`}
                  {vendor.state && `, ${vendor.state}`}
                  {vendor.country && `, ${vendor.country}`}
                </p>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-white/5">
            <h3 className="text-lg font-bold text-white mb-8">Bank Details</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Info label="Account Holder Name" value={vendor.bank_account_holder || 'N/A'} />
              <Info label="Bank Name" value={vendor.bank_name || 'N/A'} />
              <Info label="Account Number" value={vendor.bank_account_number || 'N/A'} />
              <Info label="Routing Number" value={vendor.bank_routing_number || 'N/A'} />
            </div>
          </div>
        </div>

        {/* Right Column - KYC Documents */}
        <div>
          <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-white/5 h-full">
            <h3 className="text-lg font-bold text-white mb-8">KYC Documents</h3>
            {vendor.pan_document && (
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium">PAN Card / ID Proof</p>
                  <span className="text-green-400 flex items-center gap-1 text-sm font-medium">
                    ✓ Uploaded
                  </span>
                </div>
                <div className="w-full h-40 rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                  <img 
                    src={`http://localhost:5050/${vendor.pan_document}`} 
                    alt="PAN Document"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-5xl">💼</div>';
                    }}
                  />
                </div>
              </div>
            )}
            {vendor.cheque_document && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium">Bank Proof (Cancelled Cheque)</p>
                  <span className="text-green-400 flex items-center gap-1 text-sm font-medium">
                    ✓ Uploaded
                  </span>
                </div>
                <div className="w-full h-40 rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                  <img 
                    src={`http://localhost:5050/${vendor.cheque_document}`} 
                    alt="Cheque Document"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full text-5xl">🏦</div>';
                    }}
                  />
                </div>
              </div>
            )}
            {!vendor.pan_document && !vendor.cheque_document && (
              <p className="text-slate-400 text-center py-8">No KYC documents uploaded</p>
            )}
            {(vendor.pan_document || vendor.cheque_document) && (
              <button
                onClick={downloadKYCFiles}
                className="mt-6 w-full h-12 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-base transition flex items-center justify-center gap-2 border border-slate-600"
              >
                ⬇️ Download KYC Files
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recent Account Logs */}
      <div className="mt-8 backdrop-blur-xl rounded-xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">Recent Account Logs</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-xs text-slate-400 uppercase font-medium text-left">Date & Time</th>
                <th className="px-6 py-4 text-xs text-slate-400 uppercase font-medium text-left">Action</th>
                <th className="px-6 py-4 text-xs text-slate-400 uppercase font-medium text-left">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="hover:bg-white/5 transition">
                <td className="px-6 py-4 text-slate-300">
                  {new Date(vendor.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                    Registration Filed
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400">Vendor self-registration</td>
              </tr>
              {vendor.updated_at && vendor.updated_at !== vendor.created_at && (
                <tr className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-slate-300">
                    {new Date(vendor.updated_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                      Status Updated
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">Status changed to {vendor.status}</td>
                </tr>
              )}
            </tbody>
          </table>
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

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="backdrop-blur-xl rounded-xl p-6 border border-white/10 bg-white/5">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-3xl">{icon}</div>
      <p className="text-slate-400 text-xs uppercase font-medium">{title}</p>
    </div>
    <h4 className="text-2xl font-bold text-white">{value}</h4>
  </div>
);

interface InfoProps {
  label: string;
  value: string;
  withBadge?: boolean;
}

const Info: React.FC<InfoProps> = ({ label, value, withBadge }) => (
  <div>
    <p className="text-slate-400 text-xs uppercase font-medium mb-2">{label}</p>
    <div className="flex items-center gap-2">
      <p className="text-white">{value}</p>
      {withBadge && <span className="text-green-400">✓</span>}
    </div>
  </div>
);
