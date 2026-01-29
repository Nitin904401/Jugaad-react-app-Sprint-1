import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AddVehicle: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("My Garage");
  
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === "Profile Settings") {
      navigate("/profile");
    } else if (section === "My Garage") {
      navigate("/my-garage");
    }
    // Add other navigation logic as needed
  };

  const handleCancel = () => {
    navigate("/my-garage");
  };

  const handleSave = () => {
    // Add save logic here
    console.log({ year, make, model, variant, licensePlate });
    navigate("/my-garage");
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-[#0a101f] text-slate-900 dark:text-slate-100 overflow-hidden flex">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#0a101f] lg:flex z-20">
        <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-200 dark:border-white/5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">settings_input_component</span>
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-widest">SJAUTOPART</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Customer Portal</p>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
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
              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeSection === item.name
                  ? "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30 border-l-3 border-blue-600"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-[#1e293b]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-xs font-semibold truncate">{user?.name || "User"}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || ""}</p>
              </div>
            </div>
            <button onClick={() => logout()} className="text-slate-400 hover:text-white">
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold">Add New Vehicle</h2>
              <nav className="flex mt-1 text-sm text-slate-500">
                <button onClick={() => navigate("/my-garage")} className="hover:text-blue-600">
                  Garage
                </button>
                <span className="mx-2">/</span>
                <span className="dark:text-slate-300">Add Vehicle</span>
              </nav>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
              >
                Save Vehicle
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Vehicle Specifications Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-blue-600">directions_car</span>
                  <h3 className="text-lg font-semibold">Vehicle Specifications</h3>
                </div>

                <form className="space-y-8">
                  {/* Steps */}
                  <div className="flex items-center gap-4 mb-10">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                        1
                      </span>
                      <span className="text-xs font-medium dark:text-slate-200">Identification</span>
                    </div>
                    <div className="h-px flex-1 bg-slate-700/50"></div>
                    <div className="flex items-center gap-2 opacity-40">
                      <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-[10px] font-bold">
                        2
                      </span>
                      <span className="text-xs font-medium dark:text-slate-200">Details</span>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Year */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Manufacture Year
                      </label>
                      <div className="relative">
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full bg-slate-100 dark:bg-[#1e293b] border-transparent focus:border-blue-600 focus:ring-0 rounded-lg py-3 px-4 appearance-none cursor-pointer text-slate-900 dark:text-white"
                        >
                          <option value="">Select Year</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Make */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Make
                      </label>
                      <div className="relative">
                        <select
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                          className="w-full bg-slate-100 dark:bg-[#1e293b] border-transparent focus:border-blue-600 focus:ring-0 rounded-lg py-3 px-4 appearance-none cursor-pointer text-slate-900 dark:text-white"
                        >
                          <option value="">Select Make</option>
                          <option value="bmw">BMW</option>
                          <option value="tesla">Tesla</option>
                          <option value="audi">Audi</option>
                          <option value="mercedes">Mercedes-Benz</option>
                          <option value="porsche">Porsche</option>
                          <option value="toyota">Toyota</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Model */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Model
                      </label>
                      <div className="relative">
                        <select
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          className="w-full bg-slate-100 dark:bg-[#1e293b] border-transparent focus:border-blue-600 focus:ring-0 rounded-lg py-3 px-4 appearance-none cursor-pointer text-slate-900 dark:text-white"
                        >
                          <option value="">Select Model</option>
                          <option value="m4">M4</option>
                          <option value="models">Model S</option>
                          <option value="a4">A4</option>
                          <option value="911">911</option>
                          <option value="supra">Supra</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Variant */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Variant / Trim
                      </label>
                      <div className="relative">
                        <select
                          value={variant}
                          onChange={(e) => setVariant(e.target.value)}
                          className="w-full bg-slate-100 dark:bg-[#1e293b] border-transparent focus:border-blue-600 focus:ring-0 rounded-lg py-3 px-4 appearance-none cursor-pointer text-slate-900 dark:text-white"
                        >
                          <option value="">Select Variant</option>
                          <option value="competition">Competition</option>
                          <option value="plaid">Plaid</option>
                          <option value="standard">Standard Range</option>
                          <option value="gt3">GT3</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* License Plate */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      License Plate (Optional)
                    </label>
                    <input
                      type="text"
                      value={licensePlate}
                      onChange={(e) => setLicensePlate(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-[#1e293b] border-transparent focus:border-blue-600 focus:ring-0 rounded-lg py-3 px-4 text-slate-900 dark:text-white"
                      placeholder="e.g. ABC-1234"
                    />
                  </div>

                  {/* Info */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-blue-600">
                      <span className="material-symbols-outlined text-sm">info</span>
                      <p className="text-xs">Selecting the correct variant ensures we show compatible parts only.</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Sidebar Info */}
            <div className="space-y-6">
              {/* Garage Overview */}
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-semibold mb-6">Garage Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-[#1e293b] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          alt="Tesla Logo"
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSRHtoGPyLXiflu6bVwkPQVhzfaITCXyKBgjXxktoaUK8YRpDi7eySWw9M2kKbaOc17Lfp4x0jCW7J9I-CkGAx0en_HbK9uu3vH0DEWqXi_Qn0Xz8CjSw1_rOOEUC2Px0LyQwfR5xuWWY1iZyafypNyyO_DmsyX8v6SCFz0fki-nkU-NWGP7Xauak2vbClbHaUx9azlbuGyRbtU57lntem4i6VanqEX2jwwBPnmMuYhaC9yiSQeBDrpUlPis1z_bdm_EGFws0Nx8h6"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">2022 Tesla M...</p>
                        <p className="text-[10px] text-slate-500">Plaid • Black</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-500 text-sm">more_vert</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-[#1e293b] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-bold text-white">
                        BMW
                      </div>
                      <div>
                        <p className="text-sm font-semibold">2018 BMW M4</p>
                        <p className="text-[10px] text-slate-500">Competition • Blue</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-500 text-sm">more_vert</span>
                  </div>
                </div>
              </div>

              {/* Why add a vehicle */}
              <div className="bg-blue-600/10 border border-blue-600/20 p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-blue-600">tips_and_updates</span>
                  <div>
                    <h4 className="text-sm font-bold text-blue-600 mb-1">Why add a vehicle?</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      By adding your vehicle, our smart matching engine will automatically filter components, lubricants,
                      and accessories that are guaranteed to fit your specific build.
                    </p>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center text-center border border-white/5">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl text-slate-400">help_outline</span>
                </div>
                <h4 className="text-sm font-bold mb-1">Can't find your model?</h4>
                <p className="text-xs text-slate-500 mb-4">
                  Contact our support team to help you identify your vehicle specs.
                </p>
                <button className="text-xs font-bold text-blue-600 hover:underline">Chat with Support</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddVehicle;
export { AddVehicle };
