import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const EditVehicle: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("My Garage");
  const [currentStep, setCurrentStep] = useState(1);

  // Pre-populate with existing vehicle data (in real app, fetch from API)
  const [year, setYear] = useState("2022");
  const [make, setMake] = useState("Tesla");
  const [model, setModel] = useState("Model S");
  const [variant, setVariant] = useState("Plaid");
  const [licensePlate, setLicensePlate] = useState("KNT-4521");
  
  // Step 2 fields
  const [fuelType, setFuelType] = useState("Electric");
  const [transmission, setTransmission] = useState("Automatic");
  const [engineSize, setEngineSize] = useState("Tri-Motor (Electric)");
  const [vehicleNickname, setVehicleNickname] = useState("Prachi's Tesla");

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === "Profile Settings") {
      navigate("/profile");
    } else if (section === "My Garage") {
      navigate("/my-garage");
    }
  };

  const handleCancel = () => {
    navigate("/my-garage");
  };

  const handleSave = () => {
    // Add save logic here
    console.log({ 
      id, 
      year, 
      make, 
      model, 
      variant, 
      licensePlate,
      fuelType,
      transmission,
      engineSize,
      vehicleNickname
    });
    navigate("/my-garage");
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-[#0a0f1d] text-slate-900 dark:text-slate-100 overflow-hidden flex">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 dark:border-[#1f2937] bg-white dark:bg-[#0a0f1d] lg:flex z-20 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">directions_car</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider">SJAUTOPART</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Customer Portal</p>
          </div>
        </div>
        <nav className="flex-1 mt-4">
          {[
            { name: "Profile Settings", icon: "person" },
            { name: "My Garage", icon: "garage" },
            { name: "Orders", icon: "shopping_bag" },
            { name: "Addresses", icon: "location_on" },
            { name: "Security", icon: "lock" },
            { name: "Payment Methods", icon: "credit_card" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.name)}
              className={`w-full text-left flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeSection === item.name
                  ? "bg-blue-600/10 text-blue-500 border-r-3 border-blue-600"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t border-slate-200 dark:border-[#1f2937]">
          <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-xs font-semibold">{user?.name || "User"}</p>
                <p className="text-[10px] text-slate-500">{user?.email || ""}</p>
              </div>
            </div>
            <button onClick={() => logout()}>
              <span className="material-symbols-outlined text-slate-400 text-lg group-hover:text-white">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold">Edit Vehicle</h2>
            <nav className="flex text-xs text-slate-500 mt-1 gap-1">
              <button onClick={() => navigate("/my-garage")} className="hover:underline">
                Garage
              </button>
              <span>/</span>
              <span className="text-blue-600">Edit Vehicle</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg border border-slate-200 dark:border-[#1f2937] text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              Save Changes
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="px-8 pb-12 grid grid-cols-12 gap-8">
          {/* Left Column - Form */}
          <div className="col-span-8">
            <section className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 dark:border-[#1f2937]">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-blue-600">directions_car</span>
                <h3 className="text-lg font-semibold">Vehicle Specifications</h3>
              </div>

              {/* Steps */}
              <div className="flex items-center mb-10">
                <div className="flex items-center relative">
                  <div className={`w-8 h-8 rounded-full ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-600/20 text-blue-600'} flex items-center justify-center text-xs font-bold z-10`}>
                    1
                  </div>
                  <span className={`ml-3 text-sm font-medium ${currentStep === 1 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Identification</span>
                  <div className="w-48 h-px bg-slate-200 dark:bg-[#1f2937] mx-4"></div>
                </div>
                <div className={`flex items-center ${currentStep === 1 ? 'opacity-40' : ''}`}>
                  <div className={`w-8 h-8 rounded-full ${currentStep === 2 ? 'bg-blue-600 text-white' : 'border-2 border-slate-300 dark:border-slate-700'} flex items-center justify-center text-xs font-bold`}>
                    2
                  </div>
                  <span className={`ml-3 text-sm font-medium ${currentStep === 2 ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Details</span>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-6">
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      {/* Year */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                          Manufacture Year
                        </label>
                        <div className="relative">
                          <select
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                          >
                            <option>2024</option>
                            <option>2023</option>
                            <option>2022</option>
                            <option>2021</option>
                            <option>2020</option>
                            <option>2019</option>
                            <option>2018</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>

                      {/* Make */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                          Make
                        </label>
                        <div className="relative">
                          <select
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                          >
                            <option>Tesla</option>
                            <option>BMW</option>
                            <option>Porsche</option>
                            <option>Audi</option>
                            <option>Mercedes-Benz</option>
                            <option>Toyota</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {/* Model */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                          Model
                        </label>
                        <div className="relative">
                          <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                          >
                            <option>Model S</option>
                            <option>Model 3</option>
                            <option>Model X</option>
                            <option>Model Y</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>

                      {/* Variant */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                          Variant / Trim
                        </label>
                        <div className="relative">
                          <select
                            value={variant}
                            onChange={(e) => setVariant(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                          >
                            <option>Plaid</option>
                            <option>Long Range</option>
                            <option>Standard</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* License Plate */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                        License Plate (Optional)
                      </label>
                      <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                        placeholder="e.g. ABC-1234"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex items-center gap-2 pt-4">
                      <span className="material-symbols-outlined text-blue-600 text-base">info</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Selecting the correct variant ensures we show compatible parts only.
                      </p>
                    </div>

                    {/* Next Button */}
                    <div className="flex justify-end pt-6">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 font-medium"
                      >
                        Next Step
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      {/* Fuel Type */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                          Fuel Type
                        </label>
                        <div className="relative">
                          <select
                            value={fuelType}
                            onChange={(e) => setFuelType(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                          >
                            <option>Electric</option>
                            <option>Petrol</option>
                            <option>Diesel</option>
                            <option>Hybrid</option>
                            <option>CNG</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>

                      {/* Transmission */}
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                          Transmission
                        </label>
                        <div className="relative">
                          <select
                            value={transmission}
                            onChange={(e) => setTransmission(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                          >
                            <option>Automatic</option>
                            <option>Manual</option>
                            <option>CVT</option>
                            <option>DCT</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Engine Size/Type */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                        Engine Size / Type
                      </label>
                      <div className="relative">
                        <select
                          value={engineSize}
                          onChange={(e) => setEngineSize(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-900 dark:text-white"
                        >
                          <option>Tri-Motor (Electric)</option>
                          <option>Dual-Motor (Electric)</option>
                          <option>1.5L Turbo</option>
                          <option>2.0L Turbo</option>
                          <option>3.0L V6</option>
                          <option>4.0L V8</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Vehicle Nickname */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                        Vehicle Nickname
                      </label>
                      <input
                        type="text"
                        value={vehicleNickname}
                        onChange={(e) => setVehicleNickname(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                        placeholder="e.g. My Daily Driver"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex items-center gap-2 pt-4">
                      <span className="material-symbols-outlined text-blue-600 text-base">info</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Provide accurate details for better diagnostic tools and maintenance reminders.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-6">
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="px-8 py-3 border border-slate-200 dark:border-[#1f2937] text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </>
                )}
              </form>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Garage Overview */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold px-1">Garage Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-blue-600 bg-blue-600/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-[#1f2937]">
                      <img
                        alt="Tesla Logo"
                        className="w-6 h-6 object-contain opacity-70"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSRHtoGPyLXiflu6bVwkPQVhzfaITCXyKBgjXxktoaUK8YRpDi7eySWw9M2kKbaOc17Lfp4x0jCW7J9I-CkGAx0en_HbK9uu3vH0DEWqXi_Qn0Xz8CjSw1_rOOEUC2Px0LyQwfR5xuWWY1iZyafypNyyO_DmsyX8v6SCFz0fki-nkU-NWGP7Xauak2vbClbHaUx9azlbuGyRbtU57lntem4i6VanqEX2jwwBPnmMuYhaC9yiSQeBDrpUlPis1z_bdm_EGFws0Nx8h6"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold">2022 Tesla M...</p>
                      <p className="text-[10px] text-slate-500">Plaid • Black</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-lg">more_vert</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-[#1f2937] bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <img
                        alt="BMW Logo"
                        className="w-6 h-6 object-contain brightness-0 invert"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuApnXoMgWDfPxmSZhY8lSa8NwXdgu6Thzp3dDk-4X7RAOsbompa8mcZUOaSiJ4I5PH6332IuxtCwnVBP6EAVGnFAGMhB0VV4hsoGcmjq7kN-3ObAzZoM2F9cCCuTo7BtXLkF6T7F78TgYjudEHTDncsJjpZ9z_bGKzthdZlZr603hCEa8QvCaZZ27xKcU6oH77Ko6BR9M_u8CxPpgWVOd49mvdIjyyTLLv7nzEWpaktW-0GhUU14Co4TNko0gEDcDq5RbP8zWG_qRvS"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold">2018 BMW M4</p>
                      <p className="text-[10px] text-slate-500">Competition • Blue</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-lg">more_vert</span>
                </div>
              </div>
            </div>

            {/* Why add a vehicle */}
            <div className="p-5 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex gap-4">
              <span className="material-symbols-outlined text-blue-600 mt-1">lightbulb</span>
              <div>
                <h4 className="text-sm font-bold text-blue-600 mb-1">Why add a vehicle?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  By adding your vehicle, our smart matching engine will automatically filter components, lubricants, and
                  accessories that are guaranteed to fit your specific build.
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-[#1f2937] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-slate-400">help_outline</span>
              </div>
              <div>
                <h4 className="text-sm font-bold">Can't find your model?</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Contact our support team to help you identify your vehicle specs.
                </p>
              </div>
              <button className="text-blue-600 text-sm font-semibold hover:underline">Chat with Support</button>
            </div>
          </div>
        </div>
      </main>

      {/* Help Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-12 h-12 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center text-white hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </div>
  );
};

export default EditVehicle;
export { EditVehicle };
