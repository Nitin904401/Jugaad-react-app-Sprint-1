import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../../Components/layout/CustomerSidebar";

const Addresses: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("John Doe");
  const [addressType, setAddressType] = useState("Home");
  const [streetAddress, setStreetAddress] = useState("1234 Motorsports Blvd, Apt 48");
  const [city, setCity] = useState("Los Angeles");
  const [state, setState] = useState("CA");
  const [zipCode, setZipCode] = useState("90012");
  const [country, setCountry] = useState("United States");
  const [isPrimary, setIsPrimary] = useState(true);

  const handleCancel = () => {
    // Reset form or navigate back
    navigate("/profile");
  };

  const handleSaveAddress = () => {
    // Save address logic here
    console.log("Saving address:", {
      fullName,
      addressType,
      streetAddress,
      city,
      state,
      zipCode,
      country,
      isPrimary,
    });
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-[#0a0f1d] text-slate-900 dark:text-white overflow-hidden flex">
      <CustomerSidebar activeSection="Addresses" />

      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0a0f1d] p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Addresses</h2>
            <p className="text-slate-500 text-sm">Manage your delivery and billing locations</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-700 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAddress}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
            >
              Save Address
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Address Form */}
          <div>
            <div className="bg-white dark:bg-[#161d2f] p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3 mb-8 border-b border-slate-200 dark:border-white/5 pb-4">
                <span className="material-symbols-outlined text-blue-600">pin_drop</span>
                <h3 className="text-xl font-bold">Address Details</h3>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Address Type
                    </label>
                    <select
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                    >
                      <option>Home</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                    placeholder="Street address and apartment number"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      State
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="State"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                      placeholder="ZIP Code"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                  <div className="flex items-center space-x-3">
                    <span className="material-symbols-outlined text-blue-600">verified_user</span>
                    <div>
                      <p className="font-semibold text-sm">Set as Primary Address</p>
                      <p className="text-xs text-slate-500">This address will be used by default for shipping.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPrimary}
                      onChange={(e) => setIsPrimary(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Addresses;
