import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/auth";
import Modal from "../../Components/common/Modal";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("Profile Settings");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });

  // Prefill form with user data
  useEffect(() => {
    if (user?.name) {
      const nameParts = user.name.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
    }
    setEmail(user?.email || "");
    setPhoneNumber(user?.phone_number || "");
  }, [user]);

  const handleSaveChanges = async () => {
    if (!firstName.trim()) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "First name is required",
      });
      return;
    }

    setIsSaving(true);
    try {
      const fullName = lastName.trim() ? `${firstName} ${lastName}` : firstName;
      const updatedUser = await updateProfile({
        name: fullName,
        phone_number: phoneNumber || undefined,
      });

      setModal({
        isOpen: true,
        type: "success",
        title: "Profile Updated!",
        message: "Your profile has been saved successfully.",
      });
      
      console.log("Profile updated successfully:", updatedUser);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setModal({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: err.message || "Failed to update your profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user?.name) {
      const nameParts = user.name.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
    }
    setEmail(user?.email || "");
    setPhoneNumber(user?.phone_number || "");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800/50 border-r border-slate-700">
          <div className="p-6">
            <nav className="space-y-1">
              {[
                { name: "Profile Settings", icon: "👤", active: true },
                { name: "My Garage", icon: "🚗", active: false },
                { name: "Orders", icon: "📦", active: false },
                { name: "Addresses", icon: "📍", active: false },
                { name: "Security", icon: "🔒", active: false },
                { name: "Payment Methods", icon: "💳", active: false },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveSection(item.name)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                    activeSection === item.name
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>
            
            <div className="mt-8 pt-8 border-t border-slate-700">
              <button
                onClick={() => logout()}
                className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                <span className="text-lg">🚪</span>
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="px-8 py-6 border-b border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
                <p className="text-slate-400">
                  Manage your personal information, address book, and garage preferences<br />
                  to streamline your checkout process.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:border-slate-500 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </header>

          <div className="p-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Personal Info & Address */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                    <span className="text-blue-500">👤</span>
                    Personal Information
                  </h3>
                  
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-full bg-cover bg-center border-2 border-slate-600"
                        style={{
                          backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbyQ_kRw-geeTNo0sQHWYuNKpLjvk3S5V60DT_wAMbs7Rs__q_NZ2-uF2dH2-m5oyAJY-33_6DP6QWiiXaY5pJtdr8UeTC_U2YIANPSrOTHxIGsdc9m-_F5ONy6ekZERTVZpBfxlODRolx1V-cnoAgCOEd9hQcZHJUSchewa4sci168ft46NvEkBCFp29b7LgTWyvdLz99HC2R0jdofVFXLLui3zyQegaMpo2r3cDeI9hz0_x4lwN-UiOGSOCN8n2Jr_ESUsWA9JDL")'
                        }}
                      />
                      <button className="mt-2 text-blue-500 text-sm hover:text-blue-400">
                        Change Photo
                      </button>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">FIRST NAME</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">LAST NAME</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-2">EMAIL ADDRESS</label>
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full px-12 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 opacity-60 cursor-not-allowed"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">✉️</span>
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 text-sm">✓ Verified</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-2">PHONE NUMBER</label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-12 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-slate-400"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">📞</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Address Book */}
                <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                      <span className="text-blue-500">📍</span>
                      Address Book
                    </h3>
                    <button className="text-blue-500 text-sm hover:text-blue-400">
                      Manage All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-500">🏠</span>
                        <span className="text-blue-500 text-sm font-medium">PRIMARY HOME</span>
                      </div>
                      <h4 className="font-semibold text-white mb-1">John Doe</h4>
                      <p className="text-slate-300 text-sm">
                        1234 Motorsports Blvd, Apt 48<br />
                        Los Angeles, CA 90012<br />
                        United States
                      </p>
                    </div>
                    
                    <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400">🏢</span>
                        <span className="text-slate-400 text-sm font-medium">WORK</span>
                      </div>
                      <h4 className="font-semibold text-white mb-1">John Doe (Office)</h4>
                      <p className="text-slate-300 text-sm">
                        800 Auto Park Way, Suite 200<br />
                        Irvine, CA 92618<br />
                        United States
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column - Garage & Stats */}
              <div className="space-y-6">
                {/* My Garage */}
                <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">My Garage</h3>
                    <button className="text-blue-500 text-sm hover:text-blue-400">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className="w-12 h-8 bg-slate-600 rounded flex items-center justify-center">
                        <span className="text-xs">🚗</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">2022 Tesla M...</p>
                        <p className="text-slate-400 text-xs">Plaid • Black</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-xs text-white">BMW</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">2018 BMW M4</p>
                        <p className="text-slate-400 text-xs">Competition • Blue</p>
                      </div>
                    </div>
                    
                    <button className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-slate-600 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                      <span>➕</span>
                      Add Vehicle
                    </button>
                  </div>
                </section>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                    <div className="text-green-500 text-lg mb-1">🛍️</div>
                    <p className="text-2xl font-bold text-white">24</p>
                    <p className="text-xs text-slate-400">TOTAL ORDERS</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                    <div className="text-yellow-500 text-lg mb-1">⭐</div>
                    <p className="text-2xl font-bold text-white">4.8</p>
                    <p className="text-xs text-slate-400">RATING</p>
                  </div>
                </div>

                {/* Notifications */}
                <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">NOTIFICATIONS</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Order Updates</span>
                      <div className="relative">
                        <input type="checkbox" defaultChecked className="sr-only" />
                        <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                          <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Promotions</span>
                      <div className="relative">
                        <input type="checkbox" className="sr-only" />
                        <div className="w-10 h-6 bg-slate-600 rounded-full relative">
                          <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>

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

export default UserProfile;
export { UserProfile };