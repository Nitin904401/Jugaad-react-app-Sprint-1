import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, updateProfileWithPicture } from "../../api/auth";
import Modal from "../../Components/common/Modal";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("Profile Settings");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [deleteProfilePicture, setDeleteProfilePicture] = useState(false);
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
    if (user?.profile_picture) {
      setProfilePictureUrl(user.profile_picture);
    }
  }, [user]);

  const handleProfilePicClick = () => {
    // Trigger file input click
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        setProfilePicture(file);
        // Create preview URL
        const url = URL.createObjectURL(file);
        setProfilePictureUrl(url);
        setShowPhotoOptions(false);
        setDeleteProfilePicture(false); // Cancel any pending delete
      }
    };
    input.click();
  };

  const handlePhotoClick = () => {
    if (profilePictureUrl) {
      // Show options menu if photo exists
      setShowPhotoOptions(!showPhotoOptions);
    } else {
      // Upload new photo if none exists
      handleProfilePicClick();
    }
  };

  const handleDeletePhoto = () => {
    setProfilePictureUrl("");
    setProfilePicture(null);
    setDeleteProfilePicture(true); // Mark for deletion on save
    setShowPhotoOptions(false);
  };

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
      
      if (profilePicture) {
        // Use FormData if new profile picture is selected
        const formData = new FormData();
        formData.append("name", fullName);
        formData.append("phone_number", phoneNumber || "");
        formData.append("profile_picture", profilePicture);
        
        await updateProfileWithPicture(formData);
      } else if (deleteProfilePicture) {
        // If profile picture was marked for deletion
        const formData = new FormData();
        formData.append("name", fullName);
        formData.append("phone_number", phoneNumber || "");
        formData.append("delete_profile_picture", "true");
        
        await updateProfileWithPicture(formData);
        setDeleteProfilePicture(false); // Reset after successful delete
      } else {
        // Use JSON if no profile picture
        await updateProfile({
          name: fullName,
          phone_number: phoneNumber || undefined,
        });
      }

      // Refresh user data to get updated values
      await refreshUser();
      
      // Clear selected file after successful update
      setProfilePicture(null);

      setModal({
        isOpen: true,
        type: "success",
        title: "Profile Updated!",
        message: "Your profile has been saved successfully.",
      });
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
    setProfilePicture(null);
    setDeleteProfilePicture(false);
    if (user?.profile_picture) {
      setProfilePictureUrl(user.profile_picture);
    } else {
      setProfilePictureUrl("");
    }
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-[#0a0f1d] text-slate-900 dark:text-white overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0f1d] lg:flex z-20">
          <div className="flex h-16 items-center gap-3 px-6 border-b border-white/5">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 bg-blue-600 flex items-center justify-center text-white">
              <span className="text-xl">🚗</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-bold leading-tight tracking-tight">S J A U T O P A R T</h1>
              <p className="text-slate-400 text-xs font-medium">Customer Portal</p>
            </div>
          </div>
          <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
            {[
              { name: "Home", icon: "home", active: false },
              { name: "Profile Settings", icon: "person", active: true },
              { name: "My Garage", icon: "garage", active: false },
              { name: "Orders", icon: "shopping_bag", active: false },
              { name: "Addresses", icon: "location_on", active: false },
              { name: "Security", icon: "lock", active: false },
              { name: "Payment Methods", icon: "credit_card", active: false },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.name === "My Garage") {
                    navigate('/my-garage');
                  } else if (item.name === "Home") {
                    navigate('/');
                  } else {
                    setActiveSection(item.name);
                  }
                }}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  activeSection === item.name
                    ? "bg-blue-600/20 text-blue-500 hover:bg-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-white/5">
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 rounded-xl bg-white/5 p-3 hover:bg-white/10 cursor-pointer transition-colors border border-white/5"
            >
              <div className="size-9 rounded-full bg-gradient-to-br from-[#067ff9] to-[#0557d4] flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex flex-col overflow-hidden flex-1 text-left">
                <p className="text-white text-sm font-semibold truncate">{user?.name || "User"}</p>
                <p className="text-slate-400 text-xs truncate">{user?.email || ""}</p>
              </div>
              <span className="material-symbols-outlined text-slate-400 hover:text-white text-[20px]">logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">{/* Action Buttons */}
              <div className="lg:col-span-3 flex justify-end gap-3 mb-4">
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

              {/* Left Column - Personal Info & Address */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <section className="bg-white dark:bg-[#161d2f] rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                    <span className="text-blue-500">👤</span>
                    Personal Information
                  </h3>
                  
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 relative">
                      <div
                        className="w-20 h-20 rounded-full bg-cover bg-center border-2 border-slate-600 cursor-pointer"
                        style={{
                          backgroundImage: profilePictureUrl
                            ? `url("${profilePictureUrl.startsWith('http') ? profilePictureUrl : `http://localhost:5050/${profilePictureUrl}`}")`
                            : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbyQ_kRw-geeTNo0sQHWYuNKpLjvk3S5V60DT_wAMbs7Rs__q_NZ2-uF2dH2-m5oyAJY-33_6DP6QWiiXaY5pJtdr8UeTC_U2YIANPSrOTHxIGsdc9m-_F5ONy6ekZERTVZpBfxlODRolx1V-cnoAgCOEd9hQcZHJUSchewa4sci168ft46NvEkBCFp29b7LgTWyvdLz99HC2R0jdofVFXLLui3zyQegaMpo2r3cDeI9hz0_x4lwN-UiOGSOCN8n2Jr_ESUsWA9JDL")'
                        }}
                        onClick={handlePhotoClick}
                      />
                      <button
                        onClick={handleProfilePicClick}
                        className="mt-2 text-blue-500 text-sm hover:text-blue-400"
                      >
                        Change Photo
                      </button>
                      
                      {/* Photo options menu */}
                      {showPhotoOptions && (
                        <div className="absolute top-24 left-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-10 min-w-[150px]">
                          <button
                            onClick={handleProfilePicClick}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-base">upload</span>
                            Upload New
                          </button>
                          <button
                            onClick={handleDeletePhoto}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                            Remove Photo
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">FIRST NAME</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">LAST NAME</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">EMAIL ADDRESS</label>
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full px-12 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 opacity-60 cursor-not-allowed"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">✉️</span>
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 text-sm">✓ Verified</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">PHONE NUMBER</label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-12 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 placeholder-slate-400"
                          />
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">📞</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Address Book */}
                <section className="bg-white dark:bg-[#161d2f] rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                      <span className="text-blue-500">📍</span>
                      Address Book
                    </h3>
                    <button className="text-blue-500 text-sm hover:text-blue-400">
                      Manage All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-500">🏠</span>
                        <span className="text-blue-500 text-sm font-medium">PRIMARY HOME</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">John Doe</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        1234 Motorsports Blvd, Apt 48<br />
                        Los Angeles, CA 90012<br />
                        United States
                      </p>
                    </div>
                    
                    <div className="bg-slate-100 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400">🏢</span>
                        <span className="text-slate-400 text-sm font-medium">WORK</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">John Doe (Office)</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
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
                <section className="bg-white dark:bg-[#161d2f] rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">My Garage</h3>
                    <button 
                      onClick={() => navigate('/my-garage')}
                      className="text-blue-500 text-sm hover:text-blue-400"
                    >
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
                <section className="bg-white dark:bg-[#161d2f] rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">NOTIFICATIONS</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300">Order Updates</span>
                      <div className="relative">
                        <input type="checkbox" defaultChecked className="sr-only" />
                        <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                          <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300">Promotions</span>
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