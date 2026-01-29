import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomerSidebar from "../../Components/layout/CustomerSidebar";
import { getUserAddresses, createAddress, updateUserAddress, deleteAddress, Address } from "../../api/address";
import Modal from "../../Components/common/Modal";

const Addresses: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [fullName, setFullName] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [isPrimary, setIsPrimary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });

  useEffect(() => {
    fetchAddresses();
    // Check if we should show the add form
    if (searchParams.get('add') === 'true') {
      setShowForm(true);
    }
  }, [searchParams]);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const data = await getUserAddresses();
      setAddresses(data || []);
    } catch (error: any) {
      console.error("Failed to fetch addresses:", error);
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFullName("");
    setAddressType("Home");
    setStreetAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setCountry("United States");
    setIsPrimary(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (address: Address) => {
    setFullName(address.full_name);
    setAddressType(address.address_type);
    setStreetAddress(address.street_address);
    setCity(address.city);
    setState(address.state);
    setZipCode(address.zip_code);
    setCountry(address.country);
    setIsPrimary(address.is_primary || false);
    setEditingId(address.id!);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    
    try {
      await deleteAddress(id);
      setModal({
        isOpen: true,
        type: "success",
        title: "Address Deleted!",
        message: "The address has been removed successfully.",
      });
      await fetchAddresses();
    } catch (error: any) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Delete Failed",
        message: error.message || "Failed to delete address.",
      });
    }
  };

  const handleSaveAddress = async () => {
    if (!fullName.trim() || !streetAddress.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Please fill in all required fields",
      });
      return;
    }

    try {
      setIsSaving(true);
      const addressData: Address = {
        full_name: fullName,
        address_type: addressType,
        street_address: streetAddress,
        city,
        state,
        zip_code: zipCode,
        country,
        is_primary: isPrimary,
      };

      if (editingId) {
        await updateUserAddress(editingId, addressData);
        setModal({
          isOpen: true,
          type: "success",
          title: "Address Updated!",
          message: "Your address has been updated successfully.",
        });
      } else {
        await createAddress(addressData);
        setModal({
          isOpen: true,
          type: "success",
          title: "Address Added!",
          message: "Your new address has been saved successfully.",
        });
      }

      await fetchAddresses();
      resetForm();
    } catch (error: any) {
      console.error("Failed to save address:", error);
      setModal({
        isOpen: true,
        type: "error",
        title: "Save Failed",
        message: error.message || "Failed to save your address. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
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
          <button
            onClick={handleAddNew}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Add New Address
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12 text-slate-400">Loading addresses...</div>
          ) : (
            <>
              {/* Address List */}
              {!showForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.length === 0 ? (
                    <div className="col-span-2 text-center py-12 border-2 border-dashed border-slate-600 rounded-lg">
                      <span className="material-symbols-outlined text-6xl text-slate-500 mb-4">home_pin</span>
                      <p className="text-slate-400 mb-4">No addresses added yet</p>
                      <button
                        onClick={handleAddNew}
                        className="text-blue-500 hover:text-blue-400"
                      >
                        + Add your first address
                      </button>
                    </div>
                  ) : (
                    addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`bg-white dark:bg-[#161d2f] p-6 rounded-xl border-2 ${
                          address.is_primary
                            ? 'border-blue-500/50 bg-blue-500/5'
                            : 'border-slate-200 dark:border-slate-700'
                        } transition-all`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {address.address_type === 'Home' ? '🏠' : address.address_type === 'Work' ? '🏢' : '📍'}
                            </span>
                            <div>
                              <p className="font-semibold text-lg text-slate-900 dark:text-white">
                                {address.address_type}
                              </p>
                              {address.is_primary && (
                                <span className="text-xs text-blue-500 font-medium">PRIMARY ADDRESS</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(address)}
                              className="text-slate-400 hover:text-blue-500 transition-colors"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-xl">edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(address.id!)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-xl">delete</span>
                            </button>
                          </div>
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 text-sm space-y-1">
                          <p className="font-semibold text-slate-900 dark:text-white">{address.full_name}</p>
                          <p>{address.street_address}</p>
                          <p>{address.city}, {address.state} {address.zip_code}</p>
                          <p>{address.country}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Address Form */}
              {showForm && (
                <div className="bg-white dark:bg-[#161d2f] p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-white/5 pb-4">
                    <div className="flex items-center space-x-3">
                      <span className="material-symbols-outlined text-blue-600">pin_drop</span>
                      <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add New'} Address</h3>
                    </div>
                    <button
                      onClick={resetForm}
                      className="text-slate-400 hover:text-slate-300"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
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

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSaving}
                    className="flex-1 px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAddress}
                    disabled={isSaving}
                    className="flex-1 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : editingId ? "Update Address" : "Save Address"}
                  </button>
                </div>
              </form>
            </div>
              )}
            </>
          )}
        </div>
      </main>

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

export default Addresses;
