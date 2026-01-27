
import { useState, useEffect } from "react";
import VendorSidebar from "./VendorSidebar";
import { getVendorProfile, vendorUpdateProfile } from "../../api/vendor";
import Modal from "../../Components/common/Modal";

interface VendorData {
  id: string;
  name: string;
  email: string;
  company_name: string;
  business_type?: string;
  description?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  website?: string;
  tax_id?: string;
  status?: string;
  created_at?: string;
  currency?: string;
}

export default function VendorSettingsFull() {
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });
  const [shopName, setShopName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [currency, setCurrency] = useState("INR (₹)");

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const data = await getVendorProfile();
        setVendor(data);
        
        // Prefill form fields
        setShopName(data.company_name || "");
        setSupportEmail(data.email || "");
        setShopDescription(data.description || "");
        setPhoneNumber(data.phone_number || "");
        setWebsite(data.website || "");
        setStreetAddress(data.address || "");
        setCity(data.city || "");
        setState(data.state || "");
        setPostalCode(data.postal_code || "");
        setCountry(data.country || "India");
        setCurrency(data.currency || "INR (₹)");
      } catch (err) {
        console.error("Failed to fetch vendor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  const handleSaveChanges = async () => {
    setSaving(true);

    try {
      const updateData = {
        name: vendor?.name || "",
        email: supportEmail,
        phone_number: phoneNumber,
        company_name: shopName,
        business_type: vendor?.business_type || "",
        description: shopDescription,
        address: streetAddress,
        city: city,
        state: state,
        country: country,
        postal_code: postalCode,
        website: website,
        currency: currency,
      };

      const updatedVendor = await vendorUpdateProfile(updateData);
      setVendor(updatedVendor);
      setModal({
        isOpen: true,
        type: "success",
        title: "Success",
        message: "Settings updated successfully!",
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: err.message || "Failed to update settings. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#111418]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }


  return (
    <div className="relative min-h-screen font-display">
      {/* Explicit background layer so bg always shows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 85% 10%, rgba(6,127,249,0.06) 0%, rgba(6,127,249,0.03) 8%, transparent 25%), linear-gradient(180deg,#f5f7f8 0%, #ffffff 10%)",
        }}
      />

      {/* Inline styles copied from your HTML (scrollbars, glass-panel, toggle) */}
      <style>{`
        /* Custom Scrollbar for dark theme elegance */
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
            background: #36414f;
        }
        
        /* Glassmorphism utilities */
        .glass-panel {
            background: rgba(26, 33, 43, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Toggle Switch Animation */
        .toggle-checkbox:checked {
            right: 0;
            border-color: #067ff9;
        }
        .toggle-checkbox:checked + .toggle-label {
            background-color: #067ff9;
        }

        /* small helpers used in markup */
        .size-8 { width: 2rem; height: 2rem; }
        .size-10 { width: 2.5rem; height: 2.5rem; }
      `}</style>

      {/* Page content starts here */}
      <div className="flex h-screen w-full flex-col">
        
        <div className="flex flex-1 overflow-hidden">
          {/* Side Navigation */}
            <VendorSidebar vendor={vendor} />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-[#111418] p-4 lg:p-10 scroll-smooth">
            <div className="max-w-5xl mx-auto space-y-8 pb-10">
              {/* Page Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Vendor Profile</h1>
                  <p className="text-slate-500 dark:text-slate-400">Manage your public shop profile and contact details.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-[#27303a] font-medium text-sm hover:bg-slate-300 dark:hover:bg-[#36414f] transition-colors">Discard</button>
                    <button 
                      onClick={handleSaveChanges}
                      disabled={saving}
                      className="px-4 py-2 rounded-lg text-white bg-primary font-medium text-sm shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">save</span>
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
              </div>

              {/* Profile Avatar Header Section */}
              <div className="glass-panel rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start relative z-10">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center border-4 border-slate-200 dark:border-[#27303a] shadow-xl">
                      <span className="text-5xl font-bold text-white">{vendor?.company_name?.charAt(0).toUpperCase() || "V"}</span>
                      <button className="absolute -bottom-3 -right-3 h-10 w-10 bg-surface-dark dark:bg-[#27303a] text-white rounded-full flex items-center justify-center border-2 border-slate-50 dark:border-[#111418] hover:bg-primary transition-colors shadow-lg cursor-pointer">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{vendor?.company_name || "Vendor Name"}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                      Member since {vendor?.created_at ? new Date(vendor.created_at).getFullYear() : "2024"} • ID: #{vendor?.id?.slice(0, 8) || "VND-0000"}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                      {vendor?.status && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          vendor.status === 'approved' || vendor.status === 'active' 
                            ? 'bg-green-500/10 text-green-500 border-green-500/20'
                            : vendor.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                        </span>
                      )}
                      {vendor?.business_type && (
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold border border-blue-500/20">
                          {vendor.business_type}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full sm:w-auto mt-4 sm:mt-0 flex flex-col gap-2">
                    <button className="w-full sm:w-auto px-4 py-2.5 bg-slate-200 dark:bg-[#27303a] text-slate-700 dark:text-white text-sm font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-[#323b46] transition-colors border border-transparent dark:border-white/5">
                      View Public Storefront
                    </button>
                    <button className="w-full sm:w-auto px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">security</span>
                      Security &amp; Login
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Form Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left column */}
                <div className="xl:col-span-2 space-y-8">
                  {/* Basic Information Card */}
                  <div className="glass-panel rounded-xl p-6 dark:bg-[#1a212b]/40">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">storefront</span> Shop Details
                    </h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Shop Name</label>
                          <input 
                            className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" 
                            type="text" 
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Support Email</label>
                          <input 
                            className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" 
                            type="email" 
                            value={supportEmail}
                            onChange={(e) => setSupportEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Shop Description</label>
                        <textarea 
                          className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all resize-none shadow-sm" 
                          rows={4}
                          value={shopDescription}
                          onChange={(e) => setShopDescription(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <span className="text-xs text-slate-400">{shopDescription.length}/500 characters</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                          <input 
                            className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" 
                            type="tel" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Website</label>
                          <input 
                            className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" 
                            placeholder="https://" 
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Default Currency</label>
                          <select 
                            className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm transition-all shadow-sm"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                          >
                            <option>USD ($)</option>
                            <option>INR (₹)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Card */}
                  <div className="glass-panel rounded-xl p-6 dark:bg-[#1a212b]/40">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">location_on</span> Business Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Street Address</label>
                        <input 
                          className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" 
                          type="text"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                        <input 
                          className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" 
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">State / Province</label>
                        <input 
                          className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" 
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Zip / Postal Code</label>
                        <input 
                          className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all shadow-sm" 
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Country</label>
                        <select 
                          className="w-full rounded-lg bg-slate-50 dark:bg-[#0f151b] border-slate-200 dark:border-[#27303a] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary px-4 py-3 text-sm transition-all shadow-sm"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="UAE">UAE</option>
                          <option value="Europe">Europe</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-8">
                  <div className="glass-panel rounded-xl p-6 dark:bg-[#1a212b]/40">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">notifications_active</span> Email Alerts
                    </h3>
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">New Orders</p>
                          <p className="text-xs text-slate-500">Receive email when order is placed</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-all duration-300 focus:ring-0 checked:border-primary" id="toggle1" name="toggle" type="checkbox"/>
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer" htmlFor="toggle1"></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">Low Stock Warning</p>
                          <p className="text-xs text-slate-500">Alert when stock falls below 5</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-all duration-300 focus:ring-0 checked:border-primary" id="toggle2" name="toggle" type="checkbox"/>
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer" htmlFor="toggle2"></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">Return Requests</p>
                          <p className="text-xs text-slate-500">Notify upon new RMA request</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-all duration-300 focus:ring-0 checked:border-primary" id="toggle3" name="toggle" type="checkbox"/>
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer" htmlFor="toggle3"></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">Weekly Digest</p>
                          <p className="text-xs text-slate-500">Summary of performance stats</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-slate-300 appearance-none cursor-pointer transition-all duration-300 focus:ring-0 checked:border-primary" id="toggle4" name="toggle" type="checkbox"/>
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer" htmlFor="toggle4"></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel rounded-xl p-6 dark:bg-[#1a212b]/40 border-l-4 border-l-primary/50">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">code</span> API Access
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">LIVE</span>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-100 dark:bg-[#0f151b] rounded-lg border border-slate-200 dark:border-[#27303a]">
                        <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Public Key</p>
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono text-slate-700 dark:text-slate-300 truncate mr-2">pk_live_51Msz...2k92m</code>
                          <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-lg">content_copy</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-100 dark:bg-[#0f151b] rounded-lg border border-slate-200 dark:border-[#27303a]">
                        <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Secret Key</p>
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-mono text-slate-700 dark:text-slate-300 truncate mr-2">sk_live_****************</code>
                          <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button className="w-full py-2.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-lg">refresh</span> Roll API Keys
                        </button>
                        <p className="text-xs text-slate-500 mt-2 text-center">Rolling keys will invalidate existing integrations immediately.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
      
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
}
