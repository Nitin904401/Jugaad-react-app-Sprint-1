import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const AdminVendorDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const avatar =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDAldEslvQ020bvA5Ti1SZiQHz1y_GNMXl_MEkqghJYMV_hQWs8wQjNnOEF1_BPxnsEF3zqjwMocUqH06J8ekXM4QDD-Ijwj79iPE3nPwvcjlpZ4KNM3G1m4Mj7VsWMTsRLVfVDJ2x5-HDPDHCH5GcSU7w0L1zNtTfGIlsN0VIFhzayZMpnIqn3sMTXBHZczLaXA4il-sBquhuVtBWv7igc7QcPsLUqogy8gPGYgKljajXT1GMt7PUHT_xIGDJqlV9OtrfAT7-e4cUp';

  const vendor = {
    name: 'Autopart Pro',
    merchantId: 'V-882941',
    joinDate: 'Oct 2023',
    status: 'Verified Vendor',
    businessName: 'Autopart Pro Solutions LLC',
    contactName: 'Jonathan Miller',
    phone: '+1 (555) 123-4567',
    email: 'contact@autopartpro.com',
    website: 'www.autopartpro.com',
    businessType: 'Authorized Dealer',
    gstin: '27AAXAA0080A1Z5',
    city: 'Los Angeles, California',
    address: '742 Evergreen Terrace, Industrial Area Phase 2, Suite 405, Los Angeles, CA 90001, United States',
  };

  const kycDocuments = [
    { name: 'PAN Card / ID Proof', status: 'Verified' },
    { name: 'Bank Proof (Cancelled Cheque)', status: 'Verified' },
  ];

  const logs = [
    { date: 'Oct 26, 2023 14:20', action: 'KYC Verified', admin: 'System Admin', remarks: 'Documents matches registration info' },
    { date: 'Oct 25, 2023 09:12', action: 'Registration Filed', admin: 'Vendor Self', remarks: 'Initial registration completed' },
  ];

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
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                ✓ {vendor.status}
              </span>
            </div>
            <p className="text-slate-400">
              Merchant ID: {vendor.merchantId} • Joined {vendor.joinDate}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition">
            ⊗ Suspend
          </button>
          <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 font-medium transition border border-red-500/30">
            ✕ Reject
          </button>
          <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition">
            ✓ Approve Registration
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon="💰" title="TOTAL SALES" value="$142,580.00" />
        <StatCard icon="⭐" title="VENDOR RATING" value="4.8 (120 Reviews)" />
        <StatCard icon="📦" title="TOTAL PRODUCTS" value="1,284" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Business Profile & Registration */}
        <div className="lg:col-span-2 space-y-8">
          {/* Business Profile */}
          <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">Business Profile</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">
                Edit Info
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Info label="Business Name" value={vendor.businessName} />
              <Info label="Email Address" value={vendor.email} />
              <Info label="Contact Name" value={vendor.contactName} />
              <Info label="Website" value={vendor.website} />
              <Info label="Phone Number" value={vendor.phone} />
              <Info label="Business Type" value={vendor.businessType} />
            </div>
          </div>

          {/* Registration & Address */}
          <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-white/5">
            <h3 className="text-lg font-bold text-white mb-8">Registration & Address</h3>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Info label="GSTIN / TAX ID" value={vendor.gstin} withBadge={true} />
                <Info label="Registered City" value={vendor.city} />
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase font-medium mb-3">Business Address</p>
                <p className="text-white leading-relaxed">{vendor.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - KYC Documents */}
        <div className="backdrop-blur-xl rounded-xl p-8 border border-white/10 bg-white/5 h-fit">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white">KYC Documents</h3>
          </div>

          <div className="space-y-6 mb-8">
            {kycDocuments.map((doc) => (
              <div key={doc.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium">{doc.name}</p>
                  <span className="text-green-400 flex items-center gap-1 text-sm font-medium">
                    ✓ {doc.status}
                  </span>
                </div>
                <div className="w-full h-40 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                  <div className="text-5xl">
                    {doc.name.includes('PAN') ? '💼' : '🏦'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full h-12 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-base transition flex items-center justify-center gap-2 border border-slate-600">
            ⬇️ Download All KYC Files
          </button>
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
                <th className="px-6 py-4 text-xs text-slate-400 uppercase font-medium text-left">Admin</th>
                <th className="px-6 py-4 text-xs text-slate-400 uppercase font-medium text-left">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-slate-300">{log.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{log.admin}</td>
                  <td className="px-6 py-4 text-slate-400">{log.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
