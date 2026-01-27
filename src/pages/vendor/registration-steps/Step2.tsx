import React from "react";

interface Step2Props {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleInputChange }) => {
  return (
    <div className="glass-card rounded-xl p-8 shadow-2xl" style={{
      background: "rgba(27, 33, 39, 0.7)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    }}>
      <div className="mb-8">
        <h1 className="text-white text-xl font-bold mb-2">Legal Compliance</h1>
        <p className="text-white/60 text-sm leading-relaxed">
          Please provide your legal business information for compliance and verification. This data ensures you can legally trade on our global marketplace.
        </p>
      </div>

      <form className="flex flex-col gap-6">
        {/* Business Name */}
        <div className="flex flex-col gap-2">
          <label className="text-white/80 text-sm font-medium px-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">corporate_fare</span>
            Legal Business Name
          </label>
          <input
            className="form-input flex w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary/50 border border-white/10 bg-white/5 focus:border-primary h-12 placeholder:text-white/30 px-4 text-sm transition-all"
            placeholder="e.g. Precision Parts Ltd."
            type="text"
            name="legal_business_name"
            value={formData.legal_business_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GSTIN */}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-sm font-medium px-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">license</span>
              GSTIN / Tax ID
            </label>
            <input
              className="form-input flex w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary/50 border border-white/10 bg-white/5 focus:border-primary h-12 placeholder:text-white/30 px-4 text-sm transition-all"
              placeholder="Enter 15-digit GSTIN"
              type="text"
              name="tax_id"
              value={formData.tax_id}
              onChange={handleInputChange}
            />
          </div>

          {/* Business Type */}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-sm font-medium px-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">category</span>
              Business Type
            </label>
            <select
              className="form-select flex w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary/50 border border-white/10 bg-white/5 focus:border-primary h-12 px-4 text-sm transition-all appearance-none"
              name="business_type"
              value={formData.business_type}
              onChange={handleInputChange}
            >
              <option className="bg-background-dark" value="">
                Select Category
              </option>
              <option className="bg-background-dark" value="manufacturer">
                Manufacturer
              </option>
              <option className="bg-background-dark" value="wholesaler">
                Wholesaler / Distributor
              </option>
              <option className="bg-background-dark" value="retailer">
                Retailer
              </option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="text-white/80 text-sm font-medium px-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">location_on</span>
            Registered Office Address
          </label>
          <textarea
            className="form-input flex w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary/50 border border-white/10 bg-white/5 focus:border-primary p-4 text-sm placeholder:text-white/30 transition-all resize-none"
            placeholder="Full street address, building number, etc."
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-sm font-medium px-1">City</label>
            <input
              className="form-input flex w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary/50 border border-white/10 bg-white/5 focus:border-primary h-12 placeholder:text-white/30 px-4 text-sm transition-all"
              placeholder="e.g. Detroit"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          {/* Zip Code */}
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-sm font-medium px-1">Zip / Pincode</label>
            <input
              className="form-input flex w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary/50 border border-white/10 bg-white/5 focus:border-primary h-12 placeholder:text-white/30 px-4 text-sm transition-all"
              placeholder="6-digit code"
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;
