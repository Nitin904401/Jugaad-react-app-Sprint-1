import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createVehicle } from "../../api/vehicles";
import Modal from "../../Components/common/Modal";

const AddVehicle: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("My Garage");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });
  
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  
  // Step 2 fields
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [vehicleNickname, setVehicleNickname] = useState("");
  const [vehicleImage, setVehicleImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVehicleImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setVehicleImage(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    if (!year || !make || !model) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Please fill in Year, Make, and Model fields",
      });
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("year", year);
      formData.append("make", make);
      formData.append("model", model);
      if (variant) formData.append("variant", variant);
      if (licensePlate) formData.append("license_plate", licensePlate);
      if (fuelType) formData.append("fuel_type", fuelType);
      if (transmission) formData.append("transmission", transmission);
      if (engineSize) formData.append("engine_size", engineSize);
      if (vehicleNickname) formData.append("vehicle_nickname", vehicleNickname);
      if (vehicleImage) formData.append("vehicle_image", vehicleImage);

      const res = await fetch("/api/vehicles", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create vehicle");
      }

      setModal({
        isOpen: true,
        type: "success",
        title: "Vehicle Added!",
        message: "Your vehicle has been added successfully.",
      });

      setTimeout(() => {
        navigate("/my-garage");
      }, 1500);
    } catch (err: any) {
      console.error("Error creating vehicle:", err);
      setModal({
        isOpen: true,
        type: "error",
        title: "Failed to Add Vehicle",
        message: err.message || "Failed to add vehicle. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!year || !make || !model) {
        setModal({
          isOpen: true,
          type: "error",
          title: "Required Fields",
          message: "Please fill in Year, Make, and Model before proceeding to next step.",
        });
        return;
      }
      setCurrentStep(2);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
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
                      <span className={`w-6 h-6 rounded-full ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-600/20 text-blue-600'} flex items-center justify-center text-[10px] font-bold`}>
                        1
                      </span>
                      <span className={`text-xs font-medium ${currentStep === 1 ? 'dark:text-white' : 'dark:text-slate-400'}`}>Identification</span>
                    </div>
                    <div className="h-px flex-1 bg-slate-700/50"></div>
                    <div className={`flex items-center gap-2 ${currentStep === 1 ? 'opacity-40' : ''}`}>
                      <span className={`w-6 h-6 rounded-full ${currentStep === 2 ? 'bg-blue-600 text-white' : 'border border-slate-500'} flex items-center justify-center text-[10px] font-bold`}>
                        2
                      </span>
                      <span className={`text-xs font-medium ${currentStep === 2 ? 'dark:text-white' : 'dark:text-slate-400'}`}>Details</span>
                    </div>
                  </div>

                  {/* Step 1 - Identification */}
                  {currentStep === 1 && (
                    <>
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
                              <option value="BMW">BMW</option>
                              <option value="Tesla">Tesla</option>
                              <option value="Audi">Audi</option>
                              <option value="Mercedes-Benz">Mercedes-Benz</option>
                              <option value="Porsche">Porsche</option>
                              <option value="Toyota">Toyota</option>
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
                              <option value="M4">M4</option>
                              <option value="Model S">Model S</option>
                              <option value="A4">A4</option>
                              <option value="911">911</option>
                              <option value="Supra">Supra</option>
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
                              <option value="Competition">Competition</option>
                              <option value="Plaid">Plaid</option>
                              <option value="Long Range">Long Range</option>
                              <option value="Standard Range">Standard Range</option>
                              <option value="GT3">GT3</option>
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

                  {/* Step 2 - Details */}
                  {currentStep === 2 && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Fuel Type */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Fuel Type
                          </label>
                          <div className="relative">
                            <select
                              value={fuelType}
                              onChange={(e) => setFuelType(e.target.value)}
                              className="w-full bg-slate-100 dark:bg-[#1e293b] border-transparent focus:border-blue-600 focus:ring-0 rounded-lg py-3 px-4 appearance-none cursor-pointer text-slate-900 dark:text-white"
                            >
                              <option value="">Select Fuel Type</option>
                              <option value="Electric">Electric</option>
                              <option value="Petrol">Petrol</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="CNG">CNG</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              expand_more
                            </span>
                          </div>
                        </div>

                        {/* Transmission */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Transmission
                          </label>
                          <div className="relative">
                            <select
                              value={transmission}
                              onChange={(e) => setTransmission(e.target.value)}
                              className="w-full bg-slate-100 dark:bg-[#1e293b] border-transparent focus:border-blue-600 focus:ring-0 rounded-lg py-3 px-4 appearance-none cursor-pointer text-slate-900 dark:text-white"
                            >
                              <option value="">Select Transmission</option>
                              <option value="Automatic">Automatic</option>
                              <option value="Manual">Manual</option>
                              <option value="CVT">CVT</option>
                              <option value="DCT">DCT</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Engine Size/Type */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Engine Size / Type
                        </label>
                        <div className="relative">
                          <select
                            value={engineSize}
                            onChange={(e) => setEngineSize(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-[#1e293b] border-transparent focus:border-blue-600 focus:ring-0 rounded-lg py-3 px-4 appearance-none cursor-pointer text-slate-900 dark:text-white"
                          >
                            <option value="">Select Engine Size</option>
                            <option value="Tri-Motor (Electric)">Tri-Motor (Electric)</option>
                            <option value="Dual-Motor (Electric)">Dual-Motor (Electric)</option>
                            <option value="1.5L Turbo">1.5L Turbo</option>
                            <option value="2.0L Turbo">2.0L Turbo</option>
                            <option value="3.0L V6">3.0L V6</option>
                            <option value="4.0L V8">4.0L V8</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            expand_more
                          </span>
                        </div>
                      </div>

                      {/* Vehicle Nickname */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Vehicle Nickname
                        </label>
                        <input
                          type="text"
                          value={vehicleNickname}
                          onChange={(e) => setVehicleNickname(e.target.value)}
                          className="w-full bg-slate-100 dark:bg-[#1e293b] border-transparent focus:border-blue-600 focus:ring-0 rounded-lg py-3 px-4 text-slate-900 dark:text-white"
                          placeholder="e.g. My Daily Driver"
                        />
                      </div>

                      {/* Vehicle Image Upload */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Vehicle Image (Optional)
                          </label>
                          {imagePreview && (
                            <span className="text-xs text-green-400 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">check</span> Uploaded
                            </span>
                          )}
                        </div>

                        {imagePreview ? (
                          <div className="relative flex items-center p-3 rounded-lg border border-green-500/30 bg-green-500/5">
                            <div className="size-16 rounded bg-slate-200 dark:bg-[#27303a] flex items-center justify-center mr-3 overflow-hidden">
                              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <p className="text-sm text-slate-900 dark:text-white truncate font-medium">
                                {vehicleImage?.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {vehicleImage ? `${(vehicleImage.size / 1024 / 1024).toFixed(2)} MB` : ''}
                              </p>
                            </div>
                            <button 
                              className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-400 transition-colors" 
                              onClick={handleRemoveImage}
                              type="button"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </div>
                        ) : (
                          <div className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl hover:border-blue-600 hover:bg-blue-50/5 transition-all cursor-pointer group">
                            <div className="size-12 rounded-full bg-slate-100 dark:bg-[#27303a] group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 flex items-center justify-center mb-3 transition-colors">
                              <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:text-blue-600" style={{ fontSize: 24 }}>cloud_upload</span>
                            </div>
                            <p className="text-sm text-slate-900 dark:text-white font-medium">Click to upload vehicle image</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">JPG, PNG, WEBP (max 5MB)</p>
                            <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleImageChange} />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-blue-600">
                          <span className="material-symbols-outlined text-sm">info</span>
                          <p className="text-xs">Provide accurate details for better diagnostic tools and maintenance reminders.</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between pt-6">
                        <button
                          type="button"
                          onClick={handlePrevious}
                          className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={isSaving}
                          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSaving ? "Saving..." : "Save Vehicle"}
                        </button>
                      </div>
                    </>
                  )}
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

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default AddVehicle;
export { AddVehicle };
