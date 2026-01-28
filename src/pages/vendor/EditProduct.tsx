import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchVendorProducts, updateProduct, deleteProduct } from "../../api/products";
import VendorSidebar from "./VendorSidebar";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Form state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Product data
  const [partName, setPartName] = useState("");
  const [category, setCategory] = useState("");
  const [sku, setSku] = useState("");
  const [oem, setOem] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [position, setPosition] = useState("Front");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [qty, setQty] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("10");
  const [imageUrl, setImageUrl] = useState("");
  const [brandType, setBrandType] = useState("OEM");
  const [condition, setCondition] = useState("New");

  // Vehicle compatibility
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedYears, setSelectedYears] = useState("");
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const products = await fetchVendorProducts();
      const product = products.find((p: any) => p.id === parseInt(id || "0"));
      
      if (!product) {
        setError("Product not found");
        return;
      }

      // Pre-fill form
      setPartName(product.name || "");
      setCategory(product.category || "");
      setSku(product.sku || "");
      setOem(product.oem_reference || "");
      setBrand(product.brand || "");
      setDescription(product.description || "");
      setMaterial(product.material || "");
      setWeight(product.weight ? String(product.weight) : "");
      setPosition(product.position || "Front");
      setBrandType(product.brand_type || "OEM");
      setCondition(product.condition || "New");
      
      // Parse vehicles array from compatible_vehicles
      if (product.compatible_vehicles) {
        try {
          let vehicleData = product.compatible_vehicles;
          
          // If it's a string, parse it
          if (typeof vehicleData === 'string') {
            vehicleData = JSON.parse(vehicleData);
          }
          
          // If it's an array, use it directly
          if (Array.isArray(vehicleData)) {
            setVehicles(vehicleData);
          } 
          // If it's an object with models property (legacy format)
          else if (vehicleData && typeof vehicleData === 'object' && vehicleData.models) {
            setVehicles(Array.isArray(vehicleData.models) ? vehicleData.models : []);
          }
        } catch (e) {
          console.error('Error parsing vehicle compatibility:', e);
          setVehicles([]);
        }
      } else {
        setVehicles([]);
      }
      
      setPrice(product.price ? String(product.price) : "");
      setMrp(product.mrp ? String(product.mrp) : "");
      setQty(product.quantity_in_stock ? String(product.quantity_in_stock) : "");
      setLowStockThreshold(product.low_stock_threshold ? String(product.low_stock_threshold) : "10");
      
      if (product.images && product.images.length > 0) {
        setImageUrl(product.images[0]);
      }
      
    } catch (err: any) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }
    
    // Convert to base64 for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddVehicle = () => {
    if (!selectedMake) {
      setError("Please select a make");
      return;
    }
    
    const newVehicle = {
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
  };

  const removeVehicle = (index: number) => {
    setVehicles((p) => p.filter((_, i) => i !== index));
  };

  const getVehicleDisplayText = (vehicle: any): string => {
    const parts = [vehicle.make];
    if (vehicle.model !== "All Models") parts.push(vehicle.model);
    if (vehicle.variant !== "All Variants") parts.push(vehicle.variant);
    if (vehicle.years !== "All Years") parts.push(`(${vehicle.years})`);
    return parts.join(" ");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      
      if (!partName || !category || !price) {
        setError("Please fill in all required fields");
        return;
      }

      const updateData = {
        name: partName,
        category,
        sku: sku || undefined,
        oem_reference: oem || undefined,
        brand: brand || undefined,
        description: description || undefined,
        material: material || undefined,
        weight: weight ? parseFloat(weight) : undefined,
        position: position || undefined,
        compatible_vehicles: vehicles.length > 0 ? vehicles : undefined,
        price: parseFloat(price),
        mrp: mrp ? parseFloat(mrp) : undefined,
        quantity_in_stock: qty ? parseInt(qty) : 0,
        low_stock_threshold: lowStockThreshold ? parseInt(lowStockThreshold) : 10,
        images: imageUrl ? [imageUrl] : undefined,
        brand_type: brandType,
        condition: condition,
      };

      console.log('🔄 Updating product with data:', updateData);
      console.log('🚗 Vehicles being sent:', vehicles);

      await updateProduct(parseInt(id || "0"), updateData);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/vendor/inventory");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setShowDeleteModal(false);
      await deleteProduct(parseInt(id || "0"));
      navigate("/vendor/inventory");
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full overflow-hidden">
        <VendorSidebar />
        <main className="flex-1 flex items-center justify-center bg-background-dark">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#9babbb]">Loading product...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <VendorSidebar />
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-dark">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-[#27303a] bg-[#111418] z-10 shrink-0">
          <div className="flex items-center gap-4 text-white">
            <button
              onClick={() => navigate("/vendor/inventory")}
              className="p-1.5 hover:bg-white/5 rounded-lg text-[#9babbb] transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <h2 className="text-white text-lg font-bold leading-tight">Edit Product</h2>
              <p className="text-xs text-[#9babbb]">{sku ? `SKU: ${sku}` : 'Edit product details'}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            {error && (
              <div className="glass-panel p-4 rounded-xl bg-red-500/10 border-red-500/20 mb-6">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {showSuccessModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="glass-panel p-8 rounded-2xl max-w-md w-full mx-4 border-green-500/20 bg-green-500/5">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-400 text-[40px]">check_circle</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
                      <p className="text-[#9babbb] text-sm">Product updated successfully. Redirecting to inventory...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showDeleteModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="glass-panel p-8 rounded-2xl max-w-md w-full mx-4 border-red-500/20 bg-red-500/5">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-red-400 text-[40px]">delete</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Delete Product?</h3>
                      <p className="text-[#9babbb] text-sm">Are you sure you want to delete this product? This action cannot be undone.</p>
                    </div>
                    <div className="flex gap-3 w-full mt-2">
                      <button
                        onClick={() => setShowDeleteModal(false)}
                        className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
                      >
                        No, Cancel
                      </button>
                      <button
                        onClick={confirmDelete}
                        className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="glass-panel rounded-2xl overflow-hidden mb-8">
              {/* Product Header */}
              <div className="p-8 border-b border-white/5 bg-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="relative group">
                  {imageUrl && !imageUrl.includes('blob:') ? (
                    <img
                      src={imageUrl}
                      alt={partName}
                      className="h-32 w-32 rounded-xl object-cover border border-white/10"
                    />
                  ) : (
                    <div className="h-32 w-32 rounded-xl bg-[#27303a] border border-white/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#9babbb] text-[48px]">inventory_2</span>
                    </div>
                  )}
                  <label className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">Premium Listing</span>
                    <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">In Stock</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{partName || "Untitled Product"}</h3>
                  <p className="text-[#9babbb] text-sm max-w-lg">
                    {description || "No description available"}
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(6,127,249,0.3)] disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    <span>{saving ? "Saving..." : "Save Changes"}</span>
                  </button>
                  <button
                    onClick={() => navigate("/vendor/inventory")}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-[#9babbb] hover:text-white text-sm font-bold rounded-lg transition-all border border-white/5"
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-8">
                <div className="space-y-12">
                  {/* General Information */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined text-primary">info</span>
                      <h4 className="text-lg font-bold text-white">General Information</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">
                          Part Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={partName}
                          onChange={(e) => setPartName(e.target.value)}
                          className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all cursor-pointer"
                        >
                          <option value="">Select Category</option>
                          <option value="Brakes">Brakes</option>
                          <option value="Engine">Engine</option>
                          <option value="Suspension">Suspension</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Lighting">Lighting</option>
                          <option value="Transmission">Transmission</option>
                          <option value="Exhaust">Exhaust</option>
                          <option value="Cooling">Cooling</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">Part Number / SKU</label>
                        <input
                          type="text"
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                          placeholder="e.g., BP-990-FR"
                          className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">OEM Reference No.</label>
                        <input
                          type="text"
                          value={oem}
                          onChange={(e) => setOem(e.target.value)}
                          placeholder="e.g., 45022-T2G-A00"
                          className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">Brand</label>
                        <input
                          type="text"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          placeholder="e.g., Brembo, Bosch, SKF"
                          className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all resize-none"
                        />
                      </div>
                    </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* Specifications - 2 Grid Layout */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined text-primary">settings_suggest</span>
                      <h4 className="text-lg font-bold text-white">Specifications</h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Specifics */}
                      <div className="glass-panel rounded-xl p-6">
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
                      </div>

                      {/* Technical Specifications */}
                      <div className="glass-panel rounded-xl p-6">
                        <div className="space-y-4">
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">Material</label>
                            <input
                              type="text"
                              value={material}
                              onChange={(e) => setMaterial(e.target.value)}
                              placeholder="e.g., Advanced Ceramic Compound"
                              className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">Weight (kg)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              placeholder="0.00"
                              className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">Position</label>
                            <select
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                              className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all cursor-pointer"
                            >
                              <option value="Front">Front</option>
                              <option value="Rear">Rear</option>
                              <option value="Both">Both</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* Pricing & Stock */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined text-primary">inventory_2</span>
                      <h4 className="text-lg font-bold text-white">Pricing & Stock</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">MRP (₹)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9babbb]">₹</span>
                          <input
                            type="number"
                            step="0.01"
                            value={mrp}
                            onChange={(e) => setMrp(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 pl-8 pr-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">
                          Selling Price (₹) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9babbb]">₹</span>
                          <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 pl-8 pr-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">Stock Quantity</label>
                        <input
                          type="number"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#9babbb] uppercase tracking-wide">Low Stock Alert Threshold</label>
                        <input
                          type="number"
                          value={lowStockThreshold}
                          onChange={(e) => setLowStockThreshold(e.target.value)}
                          className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary input-glow transition-all"
                        />
                      </div>
                    </div>
                  </section>

                  <hr className="border-white/5" />

                  {/* Vehicle Compatibility */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined text-primary">directions_car</span>
                      <h4 className="text-lg font-bold text-white">Vehicle Compatibility</h4>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="p-4 bg-[#111418]/50 rounded-lg border border-white/5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            <select
                              value={selectedMake}
                              onChange={(e) => setSelectedMake(e.target.value)}
                              className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary cursor-pointer"
                            >
                              <option value="">Select Make</option>
                              <option value="Honda">Honda</option>
                              <option value="Toyota">Toyota</option>
                              <option value="Ford">Ford</option>
                              <option value="Chevrolet">Chevrolet</option>
                              <option value="Nissan">Nissan</option>
                            </select>

                            <select
                              value={selectedModel}
                              onChange={(e) => setSelectedModel(e.target.value)}
                              className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary cursor-pointer"
                              disabled={!selectedMake}
                            >
                              <option value="">Select Model</option>
                              <option value="Civic">Civic</option>
                              <option value="Accord">Accord</option>
                              <option value="CR-V">CR-V</option>
                              <option value="Camry">Camry</option>
                              <option value="RAV4">RAV4</option>
                            </select>

                            <select
                              value={selectedVariant}
                              onChange={(e) => setSelectedVariant(e.target.value)}
                              className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary cursor-pointer"
                              disabled={!selectedModel}
                            >
                              <option value="">Variant</option>
                              <option value="LX">LX</option>
                              <option value="EX">EX</option>
                              <option value="Touring">Touring</option>
                            </select>

                            <select
                              value={selectedYears}
                              onChange={(e) => setSelectedYears(e.target.value)}
                              className="bg-[#27303a]/50 border-white/10 rounded-xl text-sm py-3 px-4 text-white focus:ring-primary focus:border-primary cursor-pointer"
                            >
                              <option value="">All Years</option>
                              <option value="2018-2023">2018-2023</option>
                              <option value="2019-2024">2019-2024</option>
                              <option value="2020-2025">2020-2025</option>
                            </select>
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
                        {Array.isArray(vehicles) && vehicles.length > 0 ? (
                          vehicles.map((v, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full pl-3 pr-2 py-1 text-xs text-primary font-medium">
                              <span>{getVehicleDisplayText(v)}</span>
                              <button
                                onClick={() => removeVehicle(idx)}
                                type="button"
                                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                              >
                                <span className="material-symbols-outlined text-[14px]">close</span>
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-[#9babbb] text-xs">No vehicles added yet</p>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Footer Actions */}
                  <div className="pt-8 border-t border-white/5 flex justify-end">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleDelete}
                        type="button"
                        className="text-[#9babbb] hover:text-red-400 px-6 py-2.5 transition-colors font-medium text-sm"
                      >
                        Delete Product
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        type="button"
                        className="bg-primary hover:bg-blue-600 px-8 py-3 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(6,127,249,0.3)] transition-all disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
