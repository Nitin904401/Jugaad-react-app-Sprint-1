import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * AddNewPart.jsx
 * - Single-file React conversion of provided HTML page.
 * - Uses Tailwind utility classes from your original markup.
 * - Keeps hotlinked images.
 * - Minimal interactivity: form state, images list, publish/save handlers.
 *
 * Drop this file into your React app and render <AddNewPart />.
 */

export default function AddNewPart() {
  const navigate = useNavigate();
  // basic form state (expand as needed)
  const [partName, setPartName] = useState("");
  const [sku, setSku] = useState("");
  const [oem, setOem] = useState("");
  const [category, setCategory] = useState("");
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [brandType, setBrandType] = useState("OEM");
  const [condition, setCondition] = useState("New");
  const [images, setImages] = useState([
    {
      id: 1,
      name: "front_brake_01.jpg",
      status: "Uploaded",
      url:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAWdTs3Cxy3-kK4UTiwGvABXXBUoGWC25EfT9EetZnoDcM5EGud5Z0opQNabLLpn6rBqeDM2AMKKSv1l36eUhOQMch0_YSBF2GVigGmiLCI9kn8QgfX7mnn7azypBqxvsn5izrbdOFYP1cxcNm_8nh7KPMpqQCy1EusLUQhCmV8fF8xzvxA3jQcGL5tG37AFm5SxSPIKsZscg10pJv1gZNJeLh0JQ3Iq602cnn6136zuGpY5bASxh9l8k8KM8cGw_x0Dj9wnChS3M_R",
    },
    { id: 2, name: "side_angle.jpg", status: "Uploading", url: null },
  ]);

  // sample added vehicles (tags)
  const [vehicles, setVehicles] = useState([
    "Honda Civic (2018-2022)",
    "Honda CR-V (All Variants)",
  ]);

  // simple handlers
  function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const id = Date.now();
    const url = URL.createObjectURL(file);
    setImages((p) => [...p, { id, name: file.name, status: "Uploaded", url }]);
  }

  function removeImage(id: number) {
    setImages((p) => p.filter((im) => im.id !== id));
  }

  function handlePublish() {
    // Replace with real submit logic
    console.log("Publish", { partName, sku, oem, category, mrp, price, qty, brandType, condition, vehicles, images });
    alert("Published (fake) — check console for payload.");
  }

  function handleSaveDraft() {
    console.log("Save draft", { partName, sku, oem, category, mrp, price, qty, brandType, condition, vehicles, images });
    alert("Saved draft (fake).");
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased">
      

      <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 pb-2 border-b border-white/5">
            <div className="flex flex-col gap-1">
              <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.02em]">Add New Part</h1>
              <p className="text-[#9babbb] text-sm">Fill in the details below to list a new auto part in your inventory.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                className="px-5 py-2.5 rounded-lg border border-white/10 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-[18px]">publish</span>
                Publish
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate('/vendor/dashboard');
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 text-white text-sm font-medium transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
                Cancel
              </button>
            </div>
          </div>

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

                  <label className="block">
                    <p className="text-[#9babbb] text-sm font-medium mb-2">Category <span className="text-red-500">*</span></p>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full appearance-none rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      >
                        <option value="">Select a category</option>
                        <option value="brake">Brake System</option>
                        <option value="engine">Engine Parts</option>
                        <option value="suspension">Suspension & Steering</option>
                        <option value="electrical">Electrical & Lighting</option>
                        <option value="body">Body Parts</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                        <span className="material-symbols-outlined">expand_more</span>
                      </div>
                    </div>
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
                      <select className="w-full appearance-none rounded bg-[#1b2127] border border-[#3a4755] text-white px-3 py-2 text-sm focus:border-primary focus:ring-0">
                        <option>Select Make</option>
                        <option>Honda</option>
                        <option>Toyota</option>
                        <option>Ford</option>
                      </select>
                    </div>

                    <div className="relative">
                      <select disabled className="w-full appearance-none rounded bg-[#1b2127] border border-[#3a4755] text-white px-3 py-2 text-sm focus:border-primary focus:ring-0">
                        <option>Select Model</option>
                      </select>
                    </div>

                    <div className="relative">
                      <select disabled className="w-full appearance-none rounded bg-[#1b2127] border border-[#3a4755] text-white px-3 py-2 text-sm focus:border-primary focus:ring-0">
                        <option>Variant</option>
                      </select>
                    </div>

                    <div className="relative">
                      <select className="w-full appearance-none rounded bg-[#1b2127] border border-[#3a4755] text-white px-3 py-2 text-sm focus:border-primary focus:ring-0">
                        <option>All Years</option>
                        <option>2020-2024</option>
                      </select>
                    </div>
                  </div>

                  <button className="mt-3 w-full sm:w-auto px-4 py-2 bg-[#27303a] hover:bg-[#323d4a] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span> Add Vehicle
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {vehicles.map((v, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full pl-3 pr-2 py-1 text-xs text-primary font-medium">
                      <span className="truncate">{v}</span>
                      <button onClick={() => setVehicles((p) => p.filter((x) => x !== v))} className="hover:bg-primary/20 rounded-full p-0.5">
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
                    <input value={mrp} onChange={(e)=>setMrp(e.target.value)} className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="0.00" type="number" />
                  </label>

                  <label className="block relative">
                    <p className="text-[#9babbb] text-sm font-medium mb-2">Selling Price ($)</p>
                    <input value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="0.00" type="number" />
                    <div className="absolute top-0 right-0">
                      <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">15% OFF</span>
                    </div>
                  </label>

                  <label className="block">
                    <p className="text-[#9babbb] text-sm font-medium mb-2">Quantity in Stock</p>
                    <input value={qty} onChange={(e)=>setQty(e.target.value)} className="w-full rounded-lg bg-[#111418] border border-[#3a4755] text-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="0" type="number" />
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
                  <input onChange={handleAddImage} type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                </label>

                <div className="space-y-3">
                  {images.map((im) => (
                    <div key={im.id} className="flex items-center gap-3 p-2 rounded-lg bg-[#1b2127] border border-[#3a4755]">
                      {im.url ? (
                        <div className="size-14 bg-gray-800 rounded bg-cover bg-center" style={{ backgroundImage: `url("${im.url}")` }} />
                      ) : (
                        <div className="size-14 bg-gray-800 rounded flex items-center justify-center text-gray-500">
                          <span className="material-symbols-outlined">image</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{im.name}</p>
                        <p className="text-xs text-green-400">{im.status}</p>
                        {im.status !== "Uploaded" && (
                          <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full w-[60%]" />
                          </div>
                        )}
                      </div>
                      <button onClick={() => removeImage(im.id)} className="text-gray-500 hover:text-red-400 p-2">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  ))}
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
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-[#3a4755] bg-[#111418] cursor-pointer hover:border-primary/50 transition-colors">
                        <input checked={brandType==="OEM"} onChange={()=>setBrandType("OEM")} className="text-primary bg-gray-700 border-gray-600 focus:ring-primary focus:ring-offset-gray-900" name="brand_type" type="radio"/>
                        <span className="text-white text-sm">OEM (Original Equipment)</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-[#3a4755] bg-[#111418] cursor-pointer hover:border-primary/50 transition-colors">
                        <input checked={brandType==="Aftermarket"} onChange={()=>setBrandType("Aftermarket")} className="text-primary bg-gray-700 border-gray-600 focus:ring-primary focus:ring-offset-gray-900" name="brand_type" type="radio"/>
                        <span className="text-white text-sm">Aftermarket</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#9babbb] text-sm font-medium mb-3">Condition</p>
                    <div className="flex gap-2">
                      {["New", "Used", "Refurb"].map((c) => (
                        <label key={c} className="cursor-pointer">
                          <input checked={condition===c} onChange={()=>setCondition(c)} className="peer sr-only" name="condition" type="radio"/>
                          <div className={`px-4 py-2 rounded-md bg-[#111418] border border-[#3a4755] text-gray-400 text-sm ${condition===c ? "peer-checked:bg-primary/20 peer-checked:text-primary peer-checked:border-primary" : ""} transition-all text-center`}>
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
    </div>
  );
}
