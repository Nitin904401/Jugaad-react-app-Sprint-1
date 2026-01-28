import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, CreateProductData } from "../../api/products";

/**
 * AddNewPart Component
 * - Complete functional form for adding new auto parts
 * - Includes image upload, vehicle compatibility, and all product details
 * - Saves to database via API
 */

interface VehicleCompatibility {
  make: string;
  model: string;
  variant: string;
  years: string;
}

interface ImageFile {
  id: number;
  name: string;
  status: "Uploading" | "Uploaded" | "Error";
  url: string | null;
  file?: File;
  base64?: string;
}

export default function AddNewPart() {
  const navigate = useNavigate();
  
  // Form state
  const [partName, setPartName] = useState("");
  const [sku, setSku] = useState("");
  const [oem, setOem] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [brandType, setBrandType] = useState("OEM");
  const [condition, setCondition] = useState("New");
  
  // Vehicle compatibility
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [vehicles, setVehicles] = useState<VehicleCompatibility[]>([]);
  
  // Images
  const [images, setImages] = useState<ImageFile[]>([]);
  
  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Image handling
  function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }
    
    const id = Date.now();
    const url = URL.createObjectURL(file);
    
    // Convert to base64 for persistence
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImages((p) => [...p, { id, name: file.name, status: "Uploaded", url, file, base64: base64String }]);
    };
    reader.readAsDataURL(file);
  }

  function removeImage(id: number) {
    setImages((p) => p.filter((im) => im.id !== id));
  }

  // Vehicle compatibility
  function handleAddVehicle() {
    if (!selectedMake) {
      setError("Please select a make");
      return;
    }
    
    const newVehicle: VehicleCompatibility = {
      make: selectedMake,
      model: selectedModel || "All Models",
      variant: selectedVariant || "All Variants",
      years: selectedYears || "All Years"
    };
    
    setVehicles((p) => [...p, newVehicle]);
    
    // Reset selections
    setSelectedMake("");
    setSelectedModel("");
    setSelectedVariant("");
    setSelectedYears("");
  }

  function removeVehicle(index: number) {
    setVehicles((p) => p.filter((_, i) => i !== index));
  }

  function getVehicleDisplayText(vehicle: VehicleCompatibility): string {
    const parts = [vehicle.make];
    if (vehicle.model !== "All Models") parts.push(vehicle.model);
    if (vehicle.variant !== "All Variants") parts.push(vehicle.variant);
    if (vehicle.years !== "All Years") parts.push(`(${vehicle.years})`);
    return parts.join(" ");
  }

  // Form validation
  function validateForm(): boolean {
    setError(null);
    
    if (!partName.trim()) {
      setError("Part name is required");
      return false;
    }
    
    if (!category) {
      setError("Category is required");
      return false;
    }
    
    if (!price || parseFloat(price) <= 0) {
      setError("Valid selling price is required");
      return false;
    }
    
    return true;
  }

  // Submit handlers
  async function handleSubmit(status: 'draft' | 'published') {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepare product data
      const productData: CreateProductData = {
        name: partName,
        sku: sku || undefined,
        oem_reference: oem || undefined,
        category,
        brand: brand || undefined,
        mrp: mrp ? parseFloat(mrp) : undefined,
        price: parseFloat(price),
        quantity_in_stock: qty ? parseInt(qty) : 0,
        brand_type: brandType,
        condition,
        description: description || undefined,
        compatible_vehicles: vehicles.length > 0 ? vehicles : undefined,
        images: images.map(img => img.base64 || img.url || "").filter(Boolean),
        status
      };
      
      await createProduct(productData);
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate('/vendor/inventory');
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePublish() {
    handleSubmit('published');
  }

  function handleSaveDraft() {
    handleSubmit('draft');
  }

  // Calculate discount percentage
  const discountPercent = mrp && price && parseFloat(mrp) > parseFloat(price)
    ? Math.round(((parseFloat(mrp) - parseFloat(price)) / parseFloat(mrp)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
      <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 pb-2 border-b border-white/5">
            <div className="flex flex-col gap-1">
              <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.02em]">Add New Part</h1>
              <p className="text-[#9babbb] text-sm">Fill in the details below to list a new auto part in your inventory.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                onClick={handlePublish}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/vendor/dashboard');
                }}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
                Cancel
              </button>
            </div>
          </div>

          {/* Error Messages */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">error</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Basic Information */}
              <section className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6 text-white border-b border-white/5 pb-2">
                  <span className="material-symbols-outlined text-primary">inventory_2</span>
                  <h3 className="text-lg font-bold">Basic Information</h3>
                </div>

                <div className="space-y-5">
                  <label className="block">
                    <p className="text-[#9babbb] text-sm font-medium mb-2">Part Name <span className="text-red-500">*</span></p>
                    <input
                      value={partName}
                      onChange={(e) => setPartName(e.target.value)}
                      className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      placeholder="e.g., Brembo Ceramic Brake Pad Set"
                      type="text"
                      required
                    />
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="block">
                      <p className="text-[#9babbb] text-sm font-medium mb-2">Part Number / SKU</p>
                      <input
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                        placeholder="e.g., BP-X09-22"
                        type="text"
                      />
                    </label>

                    <label className="block">
                      <p className="text-[#9babbb] text-sm font-medium mb-2">OEM Reference No.</p>
                      <input
                        value={oem}
                        onChange={(e) => setOem(e.target.value)}
                        className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                        placeholder="e.g., 45022-T2G-A00"
                        type="text"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="block">
                      <p className="text-[#9babbb] text-sm font-medium mb-2">Category <span className="text-red-500">*</span></p>
                      <div className="relative">
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full appearance-none rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="brake">Brake System</option>
                          <option value="engine">Engine Parts</option>
                          <option value="suspension">Suspension & Steering</option>
                          <option value="electrical">Electrical & Lighting</option>
                          <option value="body">Body Parts</option>
                          <option value="transmission">Transmission</option>
                          <option value="cooling">Cooling System</option>
                          <option value="exhaust">Exhaust System</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </label>

                    <label className="block">
                      <p className="text-[#9babbb] text-sm font-medium mb-2">Brand</p>
                      <input
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                        placeholder="e.g., Brembo, Bosch, etc."
                        type="text"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <p className="text-[#9babbb] text-sm font-medium mb-2">Description</p>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 min-h-[100px]"
                      placeholder="Detailed description of the part, its features, and specifications..."
                    />
                  </label>
                </div>
              </section>

              {/* Compatibility */}
              <section className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6 text-white border-b border-white/5 pb-2">
                  <span className="material-symbols-outlined text-primary">directions_car</span>
                  <h3 className="text-lg font-bold">Vehicle Compatibility</h3>
                </div>

                <div className="p-4 bg-[#111418]/50 rounded-lg border border-white/5 mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="relative">
                      <select 
                        value={selectedMake}
                        onChange={(e) => setSelectedMake(e.target.value)}
                        className="w-full appearance-none rounded bg-[#1b2127] border border-[#3a4755] text-white px-3 py-2 text-sm focus:border-primary focus:ring-0"
                      >
                        <option value="">Select Make</option>
                        <option value="Honda">Honda</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Ford">Ford</option>
                        <option value="Chevrolet">Chevrolet</option>
                        <option value="Nissan">Nissan</option>
                        <option value="BMW">BMW</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Audi">Audi</option>
                      </select>
                    </div>

                    <div className="relative">
                      <select 
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        disabled={!selectedMake}
                        className="w-full appearance-none rounded bg-[#1b2127] border border-[#3a4755] text-white px-3 py-2 text-sm focus:border-primary focus:ring-0 disabled:opacity-50"
                      >
                        <option value="">Select Model</option>
                        {selectedMake === "Honda" && (
                          <>
                            <option value="Civic">Civic</option>
                            <option value="Accord">Accord</option>
                            <option value="CR-V">CR-V</option>
                            <option value="Pilot">Pilot</option>
                          </>
                        )}
                        {selectedMake === "Toyota" && (
                          <>
                            <option value="Camry">Camry</option>
                            <option value="Corolla">Corolla</option>
                            <option value="RAV4">RAV4</option>
                            <option value="Highlander">Highlander</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="relative">
                      <select 
                        value={selectedVariant}
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        disabled={!selectedModel}
                        className="w-full appearance-none rounded bg-[#1b2127] border border-[#3a4755] text-white px-3 py-2 text-sm focus:border-primary focus:ring-0 disabled:opacity-50"
                      >
                        <option value="">Variant</option>
                        <option value="Base">Base</option>
                        <option value="LX">LX</option>
                        <option value="EX">EX</option>
                        <option value="Touring">Touring</option>
                      </select>
                    </div>

                    <div className="relative">
                      <select 
                        value={selectedYears}
                        onChange={(e) => setSelectedYears(e.target.value)}
                        className="w-full appearance-none rounded bg-[#1b2127] border border-[#3a4755] text-white px-3 py-2 text-sm focus:border-primary focus:ring-0"
                      >
                        <option value="">All Years</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2018-2022">2018-2022</option>
                        <option value="2015-2020">2015-2020</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleAddVehicle}
                    type="button"
                    className="mt-3 w-full sm:w-auto px-4 py-2 bg-[#27303a] hover:bg-[#323d4a] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> Add Vehicle
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {vehicles.map((v, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full pl-3 pr-2 py-1 text-xs text-primary font-medium">
                      <span className="truncate">{getVehicleDisplayText(v)}</span>
                      <button 
                        onClick={() => removeVehicle(idx)} 
                        type="button"
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pricing & Stock */}
              <section className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6 text-white border-b border-white/5 pb-2">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <h3 className="text-lg font-bold">Pricing &amp; Stock</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <label className="block">
                    <p className="text-[#9babbb] text-sm font-medium mb-2">MRP ($)</p>
                    <input 
                      value={mrp} 
                      onChange={(e) => setMrp(e.target.value)} 
                      className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                      placeholder="0.00" 
                      type="number" 
                      step="0.01"
                      min="0"
                    />
                  </label>

                  <label className="block relative">
                    <p className="text-[#9babbb] text-sm font-medium mb-2">Selling Price ($) <span className="text-red-500">*</span></p>
                    <input 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                      className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                      placeholder="0.00" 
                      type="number" 
                      step="0.01"
                      min="0"
                      required
                    />
                    {discountPercent > 0 && (
                      <div className="absolute top-0 right-0">
                        <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                          {discountPercent}% OFF
                        </span>
                      </div>
                    )}
                  </label>

                  <label className="block">
                    <p className="text-[#9babbb] text-sm font-medium mb-2">Quantity in Stock</p>
                    <input 
                      value={qty} 
                      onChange={(e) => setQty(e.target.value)} 
                      className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                      placeholder="0" 
                      type="number"
                      min="0"
                    />
                  </label>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Image Upload */}
              <section className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between gap-2 mb-6 text-white border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">imagesmode</span>
                    <h3 className="text-lg font-bold">Part Images</h3>
                  </div>
                  <span className="text-xs text-gray-400">Max 5MB</span>
                </div>

                <label className="relative w-full border-2 border-dashed border-[#3a4755] hover:border-primary/50 bg-[#111418]/50 hover:bg-[#111418] transition-all rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer group mb-6">
                  <div className="bg-primary/10 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-2xl">cloud_upload</span>
                  </div>
                  <p className="text-white text-sm font-medium">Click or drag images here</p>
                  <p className="text-gray-500 text-xs mt-1">PNG, JPG up to 5MB</p>
                  <input 
                    onChange={handleAddImage} 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </label>

                <div className="space-y-3">
                  {images.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">No images uploaded yet</p>
                  ) : (
                    images.map((im) => (
                      <div key={im.id} className="flex items-center gap-3 p-2 rounded-lg bg-[#1b2127] border border-[#3a4755]">
                        {im.url ? (
                          <div 
                            className="size-14 bg-gray-800 rounded bg-cover bg-center flex-shrink-0" 
                            style={{ backgroundImage: `url("${im.url}")` }} 
                          />
                        ) : (
                          <div className="size-14 bg-gray-800 rounded flex items-center justify-center text-gray-500 flex-shrink-0">
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{im.name}</p>
                          <p className={`text-xs ${im.status === 'Uploaded' ? 'text-green-400' : im.status === 'Error' ? 'text-red-400' : 'text-yellow-400'}`}>
                            {im.status}
                          </p>
                          {im.status === "Uploading" && (
                            <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full w-[60%]" />
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => removeImage(im.id)} 
                          type="button"
                          className="text-gray-500 hover:text-red-400 p-2 flex-shrink-0"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Specifics */}
              <section className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4 text-white border-b border-white/5 pb-2">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <h3 className="text-lg font-bold">Specifics</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[#9babbb] text-sm font-medium mb-3">Brand Type</p>
                    <div className="flex flex-col gap-2">
                      <label className={`flex items-center gap-3 p-3 rounded-lg border ${brandType === 'OEM' ? 'border-primary bg-primary/5' : 'border-[#3a4755] bg-[#111418]'} cursor-pointer hover:border-primary/50 transition-colors`}>
                        <input 
                          checked={brandType === "OEM"} 
                          onChange={() => setBrandType("OEM")} 
                          className="text-primary bg-gray-700 border-gray-600 focus:ring-primary focus:ring-offset-gray-900" 
                          name="brand_type" 
                          type="radio"
                        />
                        <span className="text-white text-sm">OEM (Original Equipment)</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-lg border ${brandType === 'Aftermarket' ? 'border-primary bg-primary/5' : 'border-[#3a4755] bg-[#111418]'} cursor-pointer hover:border-primary/50 transition-colors`}>
                        <input 
                          checked={brandType === "Aftermarket"} 
                          onChange={() => setBrandType("Aftermarket")} 
                          className="text-primary bg-gray-700 border-gray-600 focus:ring-primary focus:ring-offset-gray-900" 
                          name="brand_type" 
                          type="radio"
                        />
                        <span className="text-white text-sm">Aftermarket</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#9babbb] text-sm font-medium mb-3">Condition</p>
                    <div className="flex gap-2">
                      {["New", "Used", "Refurb"].map((c) => (
                        <label key={c} className="cursor-pointer flex-1">
                          <input 
                            checked={condition === c} 
                            onChange={() => setCondition(c)} 
                            className="peer sr-only" 
                            name="condition" 
                            type="radio"
                          />
                          <div className={`px-4 py-2 rounded-md border text-sm transition-all text-center ${
                            condition === c 
                              ? 'bg-primary/20 text-primary border-primary' 
                              : 'bg-[#111418] border-[#3a4755] text-gray-400 hover:border-primary/30'
                          }`}>
                            {c}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2e] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                Product Submitted Successfully!
              </h3>
              
              {/* Description */}
              <p className="text-gray-400 mb-6">
                Your product has been submitted for admin review. You will be notified once it is approved and visible to customers.
              </p>
              
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6">
                <span className="material-symbols-outlined text-yellow-500 text-sm">schedule</span>
                <span className="text-yellow-500 text-sm font-medium">Pending Admin Review</span>
              </div>
              
              {/* Redirect Message */}
              <p className="text-sm text-gray-500">
                Redirecting to inventory...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
