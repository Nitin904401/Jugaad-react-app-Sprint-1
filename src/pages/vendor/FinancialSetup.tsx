import { useState, useEffect } from "react";
import { vendorGetMe } from "../../api/vendor";
import VendorSidebar from './VendorSidebar';
import Modal from '../../Components/common/Modal';

interface VendorData {
  id: string;
  name: string;
  email: string;
  company_name: string;
  business_type: string;
  bank_account_holder?: string;
  bank_routing_number?: string;
  bank_account_number?: string;
  bank_name?: string;
  pan_document?: string;
  cheque_document?: string;
}

export default function FinancialSetup() {
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [accountHolder, setAccountHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccount, setConfirmAccount] = useState("");
  
  const [chequeFile, setChequeFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showConfirmAccount, setShowConfirmAccount] = useState(false);
  
  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });
  // Check if account numbers match
  const accountNumbersMatch = accountNumber.length > 0 && confirmAccount.length > 0 && accountNumber === confirmAccount;
  const showMismatchError = confirmAccount.length > 0 && accountNumber.length > 0 && accountNumber !== confirmAccount;


  // Fetch vendor data on mount
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const data = await vendorGetMe();
        setVendor(data);
        
        // Pre-fill form with existing data
        if (data.bank_account_holder) setAccountHolder(data.bank_account_holder);
        if (data.bank_routing_number) setIfsc(data.bank_routing_number);
        if (data.bank_account_number) setAccountNumber(data.bank_account_number);
        if (data.bank_name) setBankName(data.bank_name);
      } catch (err) {
        console.error("Failed to fetch vendor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  const onPanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPanFile(e.target.files[0]);
    }
  };

  function onChequeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setChequeFile(file);
  }

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      
      if (accountHolder) formData.append("bank_account_holder", accountHolder);
      if (ifsc) formData.append("bank_routing_number", ifsc);
      if (accountNumber) formData.append("bank_account_number", accountNumber);
      if (bankName) formData.append("bank_name", bankName);
      
      if (panFile) formData.append("pan_document", panFile);
      if (chequeFile) formData.append("cheque_document", chequeFile);

      const { vendorUpdateFinancial } = await import("../../api/vendor");
      await vendorUpdateFinancial(formData);
      
      setModal({
        isOpen: true,
        type: "success",
        title: "Draft Saved Successfully",
        message: "Your financial information has been saved as draft.",
      });

      const { vendorGetMe } = await import("../../api/vendor");
      const updatedData = await vendorGetMe();
      setVendor(updatedData);
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Failed to Save Draft",
        message: err.message || "An error occurred while saving.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!accountHolder || !ifsc || !accountNumber || !bankName) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Incomplete Information",
        message: "Please fill in all bank account fields.",
      });
      return;
    }

    if (accountNumber !== confirmAccount) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Account Number Mismatch",
        message: "Account numbers do not match.",
      });
      return;
    }

    if (!panFile && !vendor?.pan_document) {
      setModal({
        isOpen: true,
        type: "error",
        title: "PAN Document Required",
        message: "Please upload your PAN card document.",
      });
      return;
    }

    if (!chequeFile && !vendor?.cheque_document) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Cheque Document Required",
        message: "Please upload a cancelled cheque or bank statement.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      
      formData.append("bank_account_holder", accountHolder);
      formData.append("bank_routing_number", ifsc);
      formData.append("bank_account_number", accountNumber);
      formData.append("bank_name", bankName);
      
      if (panFile) formData.append("pan_document", panFile);
      if (chequeFile) formData.append("cheque_document", chequeFile);

      const { vendorSubmitFinancial } = await import("../../api/vendor");
      await vendorSubmitFinancial(formData);
      
      setModal({
        isOpen: true,
        type: "success",
        title: "Submitted for Verification",
        message: "Your financial information has been submitted successfully.",
      });

      const { vendorGetMe } = await import("../../api/vendor");
      const updatedData = await vendorGetMe();
      setVendor(updatedData);
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Submission Failed",
        message: err.message || "An error occurred.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full overflow-hidden">
        <VendorSidebar />
        <div className="flex-1 flex items-center justify-center bg-background-dark">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
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
                        <div className="glass-input rounded-lg flex items-center px-3 h-12">
                          <span className="material-symbols-outlined text-[#5a6b7c]" style={{ fontSize: 20 }}>account_balance</span>
                          <input className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-[#5a6b7c] ml-2 text-sm" placeholder="e.g. HDFC Bank, ICICI Bank" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    {/* Account number */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#9babbb]">Account Number</label>
                      <div className={`glass-input rounded-lg flex items-center px-3 h-12 group ${showMismatchError ? 'border border-red-500/50' : accountNumbersMatch ? 'border border-green-500/50' : ''}`}>
                        <span className="material-symbols-outlined text-[#5a6b7c]" style={{ fontSize: 20 }}>numbers</span>
                        <input className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-[#5a6b7c] ml-2 text-sm tracking-widest" placeholder="Enter account number" type={showAccountNumber ? "text" : "password"} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        <button type="button" className="text-[#5a6b7c] hover:text-white transition-colors" onClick={() => setShowAccountNumber(!showAccountNumber)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{showAccountNumber ? "visibility" : "visibility_off"}</span>
                        </button>
                      </div>
                      {showMismatchError && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>error</span>
                          Account numbers do not match
                        </p>
                      )}
                      {accountNumbersMatch && (
                        <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>
                          Account numbers match
                        </p>
                      )}
                    </div>

                    {/* Confirm account */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-[#9babbb]">Confirm Account Number</label>
                      <div className={`glass-input rounded-lg flex items-center px-3 h-12 ${showMismatchError ? 'border border-red-500/50' : accountNumbersMatch ? 'border border-green-500/50' : ''}`}>
                        <span className="material-symbols-outlined text-[#5a6b7c]" style={{ fontSize: 20 }}>lock</span>
                        <input className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-[#5a6b7c] ml-2 text-sm tracking-widest" placeholder="Re-enter account number" type={showConfirmAccount ? "text" : "password"} value={confirmAccount} onChange={(e) => setConfirmAccount(e.target.value)} />
                        <button type="button" className="text-[#5a6b7c] hover:text-white transition-colors" onClick={() => setShowConfirmAccount(!showConfirmAccount)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{showConfirmAccount ? "visibility" : "visibility_off"}</span>
                        </button>
                      </div>
                      {showMismatchError && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>error</span>
                          Account numbers do not match
                        </p>
                      )}
                      {accountNumbersMatch && (
                        <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span>
                          Account numbers match
                        </p>
                      )}
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
                        {(panFile || vendor?.pan_document) && (
                          <span className="text-xs text-green-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">check</span> Uploaded
                          </span>
                        )}
                      </div>

                      {panFile || vendor?.pan_document ? (
                        <div className="relative flex items-center p-3 rounded-lg border border-green-500/30 bg-green-500/5 group">
                          <div className="size-10 rounded bg-[#27303a] flex items-center justify-center mr-3 text-red-400">
                            <span className="material-symbols-outlined">picture_as_pdf</span>
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-sm text-white truncate font-medium">
                              {panFile ? panFile.name : vendor?.pan_document?.split('/').pop() || 'pan_document.pdf'}
                            </p>
                            <p className="text-xs text-[#9babbb]">
                              {panFile ? `${(panFile.size / 1024 / 1024).toFixed(2)} MB` : 'Uploaded'}
                            </p>
                          </div>
                          <button 
                            className="p-2 text-[#9babbb] hover:text-red-400 transition-colors" 
                            onClick={() => setPanFile(null)}
                            type="button"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#3e4c5a] rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                          <div className="size-12 rounded-full bg-[#27303a] group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-colors">
                            <span className="material-symbols-outlined text-[#9babbb] group-hover:text-primary" style={{ fontSize: 24 }}>cloud_upload</span>
                          </div>
                          <p className="text-sm text-white font-medium">Click to upload PAN Card</p>
                          <p className="text-xs text-[#9babbb] mt-1 text-center">PDF, JPG (max 5MB)</p>
                          <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={onPanChange} />
                        </div>
                      )}
                    </div>

                    {/* Cancelled Cheque upload */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium text-[#9babbb]">Cancelled Cheque / Bank Statement</label>
                        {(chequeFile || vendor?.cheque_document) && (
                          <span className="text-xs text-green-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">check</span> Uploaded
                          </span>
                        )}
                      </div>

                      {chequeFile || vendor?.cheque_document ? (
                        <div className="relative flex items-center p-3 rounded-lg border border-green-500/30 bg-green-500/5 group">
                          <div className="size-10 rounded bg-[#27303a] flex items-center justify-center mr-3 text-red-400">
                            <span className="material-symbols-outlined">picture_as_pdf</span>
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-sm text-white truncate font-medium">
                              {chequeFile ? chequeFile.name : vendor?.cheque_document?.split('/').pop() || 'cheque_document.pdf'}
                            </p>
                            <p className="text-xs text-[#9babbb]">
                              {chequeFile ? `${(chequeFile.size / 1024 / 1024).toFixed(2)} MB` : 'Uploaded'}
                            </p>
                          </div>
                          <button 
                            className="p-2 text-[#9babbb] hover:text-red-400 transition-colors" 
                            onClick={() => setChequeFile(null)}
                            type="button"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#3e4c5a] rounded-xl hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                          <div className="size-12 rounded-full bg-[#27303a] group-hover:bg-primary/20 flex items-center justify-center mb-3 transition-colors">
                            <span className="material-symbols-outlined text-[#9babbb] group-hover:text-primary" style={{ fontSize: 24 }}>cloud_upload</span>
                          </div>
                          <p className="text-sm text-white font-medium">Click to upload</p>
                          <p className="text-xs text-[#9babbb] mt-1 text-center">or drag and drop<br/>PDF, JPG (max 5MB)</p>
                          <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={onChequeChange} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="glass-panel rounded-xl p-6" style={{ background: "rgba(30,39,51,0.4)" }}>
                  <p className="text-xs text-[#9babbb] mb-4 text-center">
                    By clicking Submit, you agree to our <a className="text-primary hover:underline" href="#">Vendor Terms</a> and certify that the information provided is accurate.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={handleSubmit} 
                      disabled={submitting}
                      className="flex items-center justify-center gap-2 w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{submitting ? "Submitting..." : "Save & Submit for Verification"}</span>
                      {!submitting && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                    </button>
                    <button 
                      onClick={handleSaveDraft}
                      disabled={submitting}
                      className="flex items-center justify-center gap-2 w-full h-12 bg-[#27303a] hover:bg-[#323d4a] text-white font-semibold rounded-lg border border-[#3e4c5a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Saving..." : "Save Draft"}
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

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}
