import React from "react";

interface Step1Props {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, handleInputChange }) => {
  return (
    <div className="glass-panel rounded-xl p-8 shadow-2xl" style={{
      background: "rgba(27, 33, 39, 0.7)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    }}>
      <div className="space-y-6">
        {/* Business Name */}
        <div className="flex flex-col gap-2">
          <label className="text-white/90 text-sm font-semibold ml-1">Business Name</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
              factory
            </span>
            <input
              className="form-input w-full rounded-lg text-white border border-white/10 bg-white/5 focus:border-primary focus:ring-0 h-14 pl-12 pr-4 placeholder:text-white/20 text-base font-normal transition-all"
              style={{
                boxShadow: "0 0 15px rgba(6, 127, 249, 0.3)",
              }}
              placeholder="e.g., Apex Auto Parts"
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Person */}
          <div className="flex flex-col gap-2">
            <label className="text-white/90 text-sm font-semibold ml-1">Contact Person</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                person
              </span>
              <input
                className="form-input w-full rounded-lg text-white border border-white/10 bg-white/5 focus:border-primary focus:ring-0 h-14 pl-12 pr-4 placeholder:text-white/20 text-base font-normal transition-all"
                style={{
                  boxShadow: "0 0 15px rgba(6, 127, 249, 0.3)",
                }}
                placeholder="Full Name"
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-white/90 text-sm font-semibold ml-1">Phone Number</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                call
              </span>
              <input
                className="form-input w-full rounded-lg text-white border border-white/10 bg-white/5 focus:border-primary focus:ring-0 h-14 pl-12 pr-4 placeholder:text-white/20 text-base font-normal transition-all"
                style={{
                  boxShadow: "0 0 15px rgba(6, 127, 249, 0.3)",
                }}
                placeholder="+1 (555) 000-0000"
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-2">
          <label className="text-white/90 text-sm font-semibold ml-1">Work Email Address</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
              mail
            </span>
            <input
              className="form-input w-full rounded-lg text-white border border-white/10 bg-white/5 focus:border-primary focus:ring-0 h-14 pl-12 pr-4 placeholder:text-white/20 text-base font-normal transition-all"
              style={{
                boxShadow: "0 0 15px rgba(6, 127, 249, 0.3)",
              }}
              placeholder="work@company.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
