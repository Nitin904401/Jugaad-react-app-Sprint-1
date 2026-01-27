import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { vendorGetMe } from "../../api/vendor";
import VendorSidebar from './VendorSidebar';

/**
 * FinancialSetup.jsx
 * Single-file React component converted from the provided HTML page.
 * - Uses Tailwind utility classes.
 * - Uses Material Symbols via <span className="material-symbols-outlined">...</span>
 * - Minimal local state for bank fields + KYC file preview placeholders.
 * - Keep Tailwind and fonts loaded in your app as noted above.
 */

interface VendorData {
  id: number;
  name: string;
  email: string;
  company_name: string;
  business_type: string;
}

export default function FinancialSetup() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [accountHolder, setAccountHolder] = useState("AutoParts Ltd");
  const [ifsc, setIfsc] = useState("");
  const [accountNumber, setAccountNumber] = useState("123456789012");
  const [confirmAccount, setConfirmAccount] = useState("");
  const [panUploaded, setPanUploaded] = useState(true);
  const [panFileName, setPanFileName] = useState("pan_card_autoparts.pdf");
  const [panFileSize, setPanFileSize] = useState("2.4 MB");
  const [chequeFile, setChequeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch vendor data on mount
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const data = await vendorGetMe();
        setVendor(data);
      } catch (err) {
        console.error("Failed to fetch vendor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  function onChequeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setChequeFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // simulate upload / API call
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    alert("Saved & Submitted for Verification (simulated).");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <VendorSidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col h-full overflow-hidden relative bg-background-light dark:bg-background-dark">
        {/* Decorations */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto z-10 p-4 md:p-8 lg:px-12">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Heading */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Financial Setup &amp; Verification</h1>
                  <p className="text-[#9babbb] text-base max-w-2xl">Securely link your bank account for payouts and verify your identity to start receiving payments.</p>
                </div>
              </div>

              {/* Progress */}
              <div className="glass-panel p-4 rounded-xl flex flex-col gap-3" style={{ background: "rgba(30,39,51,0.4)", backdropFilter: "blur(12px)" }}>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-white flex items-center gap-2">
                    <span className="bg-primary/20 text-primary size-6 rounded-full flex items-center justify-center text-xs">3</span>
                    Step 3 of 4: Verification
                  </span>
                  <span className="text-primary">75% Completed</span>
                </div>
                <div className="h-2 w-full bg-[#3a4755] rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: "75%" }} />
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Bank Info */}
              <div className="lg:col-span-7 space-y-6">
                <div className="glass-panel rounded-xl p-6 md:p-8" style={{ background: "rgba(30,39,51,0.4)" }}>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-glass-border">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <span className="material-symbols-outlined">account_balance</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">Bank Information</h2>
                    <span className="ml-auto flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>lock</span>
                      Encrypted
                    </span>
                  </div>

                  <div className="space-y-5">
                    {/* Account Holder */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#9babbb]">Account Holder Name</label>
                      <div className="glass-input rounded-lg flex items-center px-3 h-12" style={{ background: "rgba(15,25,35,0.6)" }}>
                        <span className="material-symbols-outlined text-[#5a6b7c]" style={{ fontSize: 20 }}>person</span>
                        <input className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-[#5a6b7c] ml-2 text-sm" placeholder="e.g. John Doe / AutoParts Ltd" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
                        <span className="material-symbols-outlined text-green-500" style={{ fontSize: 20 }}>check_circle</span>
                      </div>
                    </div>

                    {/* IFSC / Bank Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#9babbb]">IFSC / Routing Number</label>
                        <div className="glass-input rounded-lg flex items-center px-3 h-12">
                          <span className="material-symbols-outlined text-[#5a6b7c]" style={{ fontSize: 20 }}>apartment</span>
                          <input className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-[#5a6b7c] ml-2 text-sm uppercase" placeholder="HDFC0001234" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#9babbb]">Bank Name</label>
                        <div className="glass-input rounded-lg flex items-center px-3 h-12 bg-white/5">
                          <input className="w-full bg-transparent border-none text-[#9babbb] focus:ring-0 ml-2 text-sm cursor-not-allowed" disabled type="text" value="HDFC Bank" />
                        </div>
                      </div>
                    </div>

                    {/* Account number */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#9babbb]">Account Number</label>
                      <div className="glass-input rounded-lg flex items-center px-3 h-12 group">
                        <span className="material-symbols-outlined text-[#5a6b7c]" style={{ fontSize: 20 }}>numbers</span>
                        <input className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-[#5a6b7c] ml-2 text-sm tracking-widest" placeholder="Enter account number" type="password" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        <button className="text-[#5a6b7c] hover:text-white transition-colors" onClick={(ev) => { ev.preventDefault(); alert("toggle visibility (mock)"); }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>visibility_off</span>
                        </button>
                      </div>
                    </div>

                    {/* Confirm account */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#9babbb]">Confirm Account Number</label>
                      <div className="glass-input rounded-lg flex items-center px-3 h-12">
                        <span className="material-symbols-outlined text-[#5a6b7c]" style={{ fontSize: 20 }}>lock</span>
                        <input className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-[#5a6b7c] ml-2 text-sm tracking-widest" placeholder="Re-enter account number" type="password" value={confirmAccount} onChange={(e) => setConfirmAccount(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust / security */}
                <div className="flex flex-wrap items-center gap-6 px-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: 24 }}>verified_user</span>
                    <span className="text-xs text-[#9babbb] font-medium">Bank Grade Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: 24 }}>lock</span>
                    <span className="text-xs text-[#9babbb] font-medium">256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: 24 }}>gavel</span>
                    <span className="text-xs text-[#9babbb] font-medium">PCI DSS Compliant</span>
                  </div>
                </div>
              </div>

              {/* Right: KYC & Actions */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass-panel rounded-xl p-6 flex flex-col h-full" style={{ background: "rgba(30,39,51,0.4)" }}>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-glass-border">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                      <span className="material-symbols-outlined">badge</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">KYC Documents</h2>
                  </div>

                  <div className="flex flex-col gap-6 flex-1">
                    {/* PAN */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium text-[#9babbb]">PAN Card</label>
                        <span className="text-xs text-green-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check</span> Uploaded</span>
                      </div>

                      <div className="relative flex items-center p-3 rounded-lg border border-green-500/30 bg-green-500/5 group">
                        <div className="size-10 rounded bg-[#27303a] flex items-center justify-center mr-3 text-red-400">
                          <span className="material-symbols-outlined">picture_as_pdf</span>
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <p className="text-sm text-white truncate font-medium">{panFileName}</p>
                          <p className="text-xs text-[#9babbb]">{panFileSize}</p>
                        </div>
                        <button className="p-2 text-[#9babbb] hover:text-red-400 transition-colors" onClick={() => { setPanUploaded(false); setPanFileName(""); setPanFileSize(""); }}>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Cancelled Cheque upload */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-[#9babbb]">Cancelled Cheque / Bank Statement</label>

                      <div className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#3e4c5a] rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                        <div className="size-12 rounded-full bg-[#27303a] group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-colors">
                          <span className="material-symbols-outlined text-[#9babbb] group-hover:text-primary" style={{ fontSize: 24 }}>cloud_upload</span>
                        </div>
                        <p className="text-sm text-white font-medium">Click to upload</p>
                        <p className="text-xs text-[#9babbb] mt-1 text-center">or drag and drop<br/>PDF, JPG (max 5MB)</p>
                        <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" onChange={onChequeChange} />
                        {chequeFile && (
                          <div className="mt-3 text-xs text-slate-300">
                            Selected: {chequeFile.name} ({Math.round(chequeFile.size / 1024)} KB)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="glass-panel rounded-xl p-6" style={{ background: "rgba(30,39,51,0.4)" }}>
                  <p className="text-xs text-[#9babbb] mb-4 text-center">
                    By clicking Submit, you agree to our <a className="text-primary hover:underline" href="#">Vendor Terms</a> and certify that the information provided is accurate.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button onClick={handleSubmit} className="flex items-center justify-center gap-2 w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5">
                      <span>{submitting ? "Submitting..." : "Save & Submit for Verification"}</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 w-full h-12 bg-[#27303a] hover:bg-[#323d4a] text-white font-semibold rounded-lg border border-[#3e4c5a] transition-all">
                      Save Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom spacing */}
            <div style={{ height: 16 }} />
          </div>
        </div>
      </main>
    </div>
  );
}
