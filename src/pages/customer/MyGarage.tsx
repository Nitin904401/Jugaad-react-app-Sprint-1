import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getVehicles, deleteVehicle } from "../../api/vehicles";
import Modal from "../../Components/common/Modal";

interface Vehicle {
  id: number;
  year: string;
  make: string;
  model: string;
  variant?: string;
  license_plate?: string;
  fuel_type?: string;
  transmission?: string;
  engine_size?: string;
  vehicle_nickname?: string;
  vehicle_image?: string;
  created_at: string;
  updated_at: string;
}

const MyGarage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("My Garage");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    vehicleId: number | null;
    vehicleName: string;
  }>({ isOpen: false, vehicleId: null, vehicleName: "" });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await getVehicles();
      setVehicles(data);
    } catch (err: any) {
      console.error("Failed to fetch vehicles:", err);
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to load your vehicles",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number, name: string) => {
    setConfirmDelete({
      isOpen: true,
      vehicleId: id,
      vehicleName: name,
    });
  };

  const executeDelete = async () => {
    if (!confirmDelete.vehicleId) return;

    try {
      await deleteVehicle(confirmDelete.vehicleId.toString());
      setConfirmDelete({ isOpen: false, vehicleId: null, vehicleName: "" });
      setModal({
        isOpen: true,
        type: "success",
        title: "Vehicle Deleted",
        message: "Your vehicle has been removed successfully.",
      });
      fetchVehicles(); // Refresh the list
    } catch (err: any) {
      setConfirmDelete({ isOpen: false, vehicleId: null, vehicleName: "" });
      setModal({
        isOpen: true,
        type: "error",
        title: "Error",
        message: err.message || "Failed to delete vehicle",
      });
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchLower = searchQuery.toLowerCase();
    const fullName = `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant || ""}`.toLowerCase();
    return fullName.includes(searchLower) || vehicle.vehicle_nickname?.toLowerCase().includes(searchLower);
  });

  const getVehicleName = (vehicle: Vehicle) => {
    return `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  };

  const getVehicleVariant = (vehicle: Vehicle) => {
    const parts = [];
    if (vehicle.variant) parts.push(vehicle.variant);
    if (vehicle.transmission) parts.push(vehicle.transmission);
    if (vehicle.fuel_type) parts.push(vehicle.fuel_type);
    return parts.join(" • ") || "Standard";
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays < 30) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  };

  const getMakeLogo = (make: string) => {
    const logos: Record<string, string> = {
      "Tesla": "https://lh3.googleusercontent.com/aida-public/AB6AXuDSRHtoGPyLXiflu6bVwkPQVhzfaITCXyKBgjXxktoaUK8YRpDi7eySWw9M2kKbaOc17Lfp4x0jCW7J9I-CkGAx0en_HbK9uu3vH0DEWqXi_Qn0Xz8CjSw1_rOOEUC2Px0LyQwfR5xuWWY1iZyafypNyyO_DmsyX8v6SCFz0fki-nkU-NWGP7Xauak2vbClbHaUx9azlbuGyRbtU57lntem4i6VanqEX2jwwBPnmMuYhaC9yiSQeBDrpUlPis1z_bdm_EGFws0Nx8h6",
      "BMW": "https://lh3.googleusercontent.com/aida-public/AB6AXuApnXoMgWDfPxmSZhY8lSa8NwXdgu6Thzp3dDk-4X7RAOsbompa8mcZUOaSiJ4I5PH6332IuxtCwnVBP6EAVGnFAGMhB0VV4hsoGcmjq7kN-3ObAzZoM2F9cCCuTo7BtXLkF6T7F78TgYjudEHTDncsJjpZ9z_bGKzthdZlZr603hCEa8QvCaZZ27xKcU6oH77Ko6BR9M_u8CxPpgWVOd49mvdIjyyTLLv7nzEWpaktW-0GhUU14Co4TNko0gEDcDq5RbP8zWG_qRvS",
      "Porsche": "https://lh3.googleusercontent.com/aida-public/AB6AXuD0YxyKxgyO_iPemSMdcVULABkpyd1Jbacu-0r2MN4QaZKlmxIu8Mry9XeY3a8KsTy9MjZJKo_TnOZY3t8XthDqIHpCK3s-rxRRNbaemlghhsYn9oUCl4gctn6eG_VEbF3HDMds7-5BNEklwIKi9rwzq-svGlUvF56VQUFM4oXQzsNf28ZQ_6dLUTiSduPKsfMet3a2YbYEQGwLG2MPGQllLDTbi8bCroHexnb_vHTszyDm1vW6ajYZBCeWVF7KMjQSbDdH0MkB418w",
      "Audi": "https://lh3.googleusercontent.com/aida-public/AB6AXuC5htidV1vB1NlJMHhZ2EEz73A-9xuJa-yHzCX9rddMa95xaPdxzoMudM2baoVh7lWRGi2-Uk7lawu6TtqGDR4Zd-hdHTFb7h0cPcPCZHIMsIQ162HOtGZF3oGUUSM8w36FnR0qGylVj8aCp48X7AhvoA8kAFDCqBuKJnAyzpExX0OEOUKvTRdHAbJsPKsJHferaRjUSCeChbn2p0x-S1L8X-u1DHDBpiMASEktHPMevvYR8FF8psoqVXycwl2e5dm72S6hoe63ZrKk",
      "Toyota": "https://lh3.googleusercontent.com/aida-public/AB6AXuAw52Jwj-yYYzMLv5BqAo4hU4JtaKC8Swvot2_mUh4-1rwKH-jw7mwul_OcIpuiS-kEKFzq2DOl_x5D9IJbIHj3uw4cKcU1-KqAwCVNC1zwhAiZRH43DmuX7y8XgIqav2fOitkCxTBYfPoyJ-izQy6hnyDxihijSSYMc9X89wwtRdbcO1dpo80bFCR9gmLsWnRXoA8nxciL4vvOxNGFlnj7RzdhwsQ0d5y-FpJvRUYmvMtpics7nkhimff9xF2ESh54S6osY3hqxF88",
    };
    return logos[make] || "https://placehold.co/100x100?text=🚗";
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === "Profile Settings") {
      navigate("/profile");
    }
    // Add other navigation logic as needed
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-[#0a0f1d] text-slate-900 dark:text-slate-100 overflow-hidden flex">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0f1d] lg:flex z-20">
        <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-200 dark:border-white/5">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 bg-blue-600 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">directions_car</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-base font-bold leading-tight tracking-tight">S J A U T O P A R T</h1>
            <p className="text-slate-400 text-xs font-medium">Customer Portal</p>
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
                  ? "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-white/5">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 rounded-xl bg-slate-100/50 dark:bg-white/5 p-3 hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer transition-colors border border-slate-200 dark:border-white/5"
          >
            <div className="size-9 rounded-full bg-gradient-to-br from-[#067ff9] to-[#0557d4] flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex flex-col overflow-hidden flex-1 text-left">
              <p className="text-slate-900 dark:text-white text-sm font-semibold truncate">{user?.name || "User"}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs truncate">{user?.email || ""}</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 hover:text-red-500 text-[20px]">logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-slate-50 dark:bg-[#0a0f1d] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              
              <h2 className="text-2xl font-bold">My Garage</h2>
            </div>
            <div className="flex space-x-3">
             
            </div>
          </header>

          {/* Search and Add Vehicle */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input
                className="w-full bg-white dark:bg-[#161d2f] border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-blue-600 focus:border-blue-600 text-slate-900 dark:text-white"
                placeholder="Search your vehicles..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => navigate('/add-vehicle')}
              className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all"
            >
              <span className="material-symbols-outlined mr-2">add_circle</span>
              Add Vehicle
            </button>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-[#161d2f] rounded-2xl p-5 border border-slate-200 dark:border-slate-700 animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
              ))
            ) : filteredVehicles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">garage</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {searchQuery ? "No vehicles found" : "No vehicles yet"}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {searchQuery ? "Try adjusting your search" : "Add your first vehicle to get started"}
                </p>
                {!searchQuery && (
                  <button 
                    onClick={() => navigate('/add-vehicle')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all"
                  >
                    <span className="material-symbols-outlined mr-2">add_circle</span>
                    Add Your First Vehicle
                  </button>
                )}
              </div>
            ) : (
              <>
                {filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-white dark:bg-[#161d2f] rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:border-blue-600/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 overflow-hidden">
                        {vehicle.vehicle_image ? (
                          <img
                            alt={getVehicleName(vehicle)}
                            className="w-full h-full object-cover"
                            src={vehicle.vehicle_image}
                            onError={(e) => {
                              e.currentTarget.src = getMakeLogo(vehicle.make);
                            }}
                          />
                        ) : (
                          <img
                            alt={`${vehicle.make} Logo`}
                            className="w-8 h-8 object-contain"
                            src={getMakeLogo(vehicle.make)}
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/100x100?text=🚗";
                            }}
                          />
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)}
                          className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit vehicle"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(vehicle.id, getVehicleName(vehicle))}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete vehicle"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        {vehicle.vehicle_nickname || getVehicleName(vehicle)}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {vehicle.vehicle_nickname ? getVehicleName(vehicle) : getVehicleVariant(vehicle)}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-col space-y-3">
                      <button className="w-full py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600/20 rounded-xl text-sm font-semibold transition-all">
                        View Compatible Parts
                      </button>
                      <div className="flex items-center text-[11px] text-slate-400 dark:text-slate-500 justify-center">
                        <span className="material-symbols-outlined text-[14px] mr-1">history</span>
                        Last updated {getTimeAgo(vehicle.updated_at)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Vehicle Card */}
                <button 
                  onClick={() => navigate('/add-vehicle')}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-all min-h-[220px] group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-3">
                    <span className="material-symbols-outlined text-2xl">add</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Add another vehicle</span>
                  <p className="text-[10px] text-slate-400 mt-1">Easily find parts for your cars</p>
                </button>
              </>
            )}
          </div>

          {/* Pagination */}
          {!loading && filteredVehicles.length > 0 && (
            <div className="mt-12 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing {filteredVehicles.length} of {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
        <span className="material-symbols-outlined">help</span>
      </button>

      {/* Success/Error Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />

      {/* Confirm Delete Modal */}
      {confirmDelete.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden bg-white dark:bg-[#161d2f] border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400">warning</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Vehicle</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to delete "<strong>{confirmDelete.vehicleName}</strong>"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete({ isOpen: false, vehicleId: null, vehicleName: "" })}
                className="flex-1 px-4 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGarage;
export { MyGarage };
