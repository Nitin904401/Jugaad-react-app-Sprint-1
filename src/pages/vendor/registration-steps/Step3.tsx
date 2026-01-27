import React from "react";

interface Step3Props {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "pan_document" | "cheque_document"
  ) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, handleInputChange, handleFileChange }) => {
  return (
    <div className="w-full">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel: Bank Details */}
        <div className="glass-panel rounded-xl p-8 flex flex-col gap-6" style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <h2 className="text-white text-xl font-bold">Financial Information</h2>
          </div>

          <div className="space-y-4">
            {/* Account Holder Name */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium leading-normal">Account Holder Name</label>
              <input
                className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-white/10 bg-white/5 h-12 placeholder:text-[#9babbb]/50 px-4 text-base font-normal"
                placeholder="Exact name as per bank records"
                type="text"
                name="bank_account_holder"
                value={formData.bank_account_holder}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bank Name */}
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium leading-normal">Bank Name</label>
                <input
                  className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-white/10 bg-white/5 h-12 placeholder:text-[#9babbb]/50 px-4 text-base font-normal"
                  placeholder="e.g. JPMorgan Chase"
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleInputChange}
                />
              </div>

              {/* IFSC / SWIFT Code */}
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium leading-normal">IFSC / SWIFT Code</label>
                <input
                  className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-white/10 bg-white/5 h-12 placeholder:text-[#9babbb]/50 px-4 text-base font-normal"
                  placeholder="e.g. SBIN0001234"
                  type="text"
                  name="bank_routing_number"
                  value={formData.bank_routing_number}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Account Number */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium leading-normal">Account Number</label>
              <input
                className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-white/10 bg-white/5 h-12 placeholder:text-[#9babbb]/50 px-4 text-base font-normal"
                placeholder="Enter account number"
                type="password"
                name="bank_account_number"
                value={formData.bank_account_number}
                onChange={handleInputChange}
              />
            </div>

            {/* Confirm Account Number */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium leading-normal">Confirm Account Number</label>
              <input
                className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-white/10 bg-white/5 h-12 placeholder:text-[#9babbb]/50 px-4 text-base font-normal"
                placeholder="Re-enter account number"
                type="password"
                name="bank_account_confirmation"
                value={formData.bank_account_confirmation}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Warning Message */}
          <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3">
            <span className="material-symbols-outlined text-amber-500">info</span>
            <p className="text-amber-200/80 text-xs leading-relaxed">
              Ensure that the bank account name matches your registered business name exactly to avoid payment delays.
            </p>
          </div>
        </div>

        {/* Right Panel: KYC Uploads */}
        <div className="glass-panel rounded-xl p-8 flex flex-col gap-6" style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <span className="material-symbols-outlined">description</span>
            </div>
            <h2 className="text-white text-xl font-bold">Identity Verification</h2>
          </div>

          <div className="space-y-6">
            {/* Upload Box 1 - PAN Card */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium">PAN Card / Tax ID</label>
              <label className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl">upload_file</span>
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-semibold">
                    Drop PAN Card here or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-[#9babbb] text-xs mt-1">PDF, JPG or PNG up to 5MB</p>
                  {formData.pan_document && (
                    <p className="text-green-400 text-xs mt-2">✓ {formData.pan_document.name}</p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "pan_document")}
                />
              </label>
            </div>

            {/* Upload Box 2 - Cheque */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-medium">Cancelled Cheque / Bank Statement</label>
              <label className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-semibold">
                    Drop Cheque here or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-[#9babbb] text-xs mt-1">PDF, JPG or PNG up to 5MB</p>
                  {formData.cheque_document && (
                    <p className="text-green-400 text-xs mt-2">✓ {formData.cheque_document.name}</p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "cheque_document")}
                />
              </label>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-auto pt-6 flex items-start gap-4 text-[#9babbb]">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <p className="text-[11px] leading-normal uppercase tracking-widest font-bold">
              All documents are stored in a PCI-DSS compliant vault with AES-256 encryption.
            </p>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="mt-8 glass-panel rounded-xl p-8" style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined">lock</span>
          </div>
          <h2 className="text-white text-xl font-bold">Create Your Password</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium leading-normal">Password</label>
            <input
              className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-white/10 bg-white/5 h-12 placeholder:text-[#9babbb]/50 px-4 text-base font-normal"
              placeholder="Enter a strong password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-sm font-medium leading-normal">Confirm Password</label>
            <input
              className="form-input w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-white/10 bg-white/5 h-12 placeholder:text-[#9babbb]/50 px-4 text-base font-normal"
              placeholder="Confirm your password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
