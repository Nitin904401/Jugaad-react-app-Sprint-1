import React, { useState, useEffect } from 'react';
import { getAdminProfile, adminUpdateProfile, adminUpdateProfileWithPicture, adminUpdatePassword } from '../../api/admin';
import Modal from '../../Components/common/Modal';

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
  profile_picture?: string;
}

export const AdminSettingsPage: React.FC = () => {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [deleteProfilePicture, setDeleteProfilePicture] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'success', title: '', message: '' });
  
  const [notifications, setNotifications] = useState({
    newOrders: true,
    vendorRegistration: true,
    stockAlerts: false,
  });
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    // Calculate password strength
    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[!@#$%^&*]/.test(value)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-slate-600';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  const handleProfilePicClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        setProfilePicture(file);
        // Don't update profilePictureUrl here - keep the old one until save
        setDeleteProfilePicture(false);
      }
    };
    input.click();
  };

  const handleDeletePhoto = () => {
    setProfilePicture(null);
    setProfilePictureUrl('');
    setDeleteProfilePicture(true);
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      let updatedAdmin;

      if (profilePicture) {
        const formData = new FormData();
        formData.append('name', adminName);
        formData.append('email', adminEmail);
        formData.append('profile_picture', profilePicture);
        updatedAdmin = await adminUpdateProfileWithPicture(formData);
      } else if (deleteProfilePicture) {
        const formData = new FormData();
        formData.append('name', adminName);
        formData.append('email', adminEmail);
        formData.append('delete_profile_picture', 'true');
        updatedAdmin = await adminUpdateProfileWithPicture(formData);
        setDeleteProfilePicture(false);
      } else {
        updatedAdmin = await adminUpdateProfile({
          name: adminName,
          email: adminEmail,
        });
      }

      setAdmin(updatedAdmin);
      setAdminName(updatedAdmin.name);
      setAdminEmail(updatedAdmin.email);
      setProfilePictureUrl(updatedAdmin.profile_picture || '');
      setProfilePicture(null);

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'Profile updated successfully!',
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to update profile',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (admin) {
      setAdminName(admin.name);
      setAdminEmail(admin.email);
      setProfilePictureUrl(admin.profile_picture || '');
      setProfilePicture(null);
      setDeleteProfilePicture(false);
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordStrength(0);
    }
  };

  const handleSavePassword = async () => {
    // Validation
    if (!currentPassword) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter your current password',
      });
      return;
    }

    if (!newPassword || !confirmPassword) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter and confirm your new password',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'New passwords do not match',
      });
      return;
    }

    if (newPassword.length < 8) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'New password must be at least 8 characters long',
      });
      return;
    }

    setSaving(true);
    try {
      await adminUpdatePassword({
        currentPassword,
        newPassword,
      });

      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordStrength(0);

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'Password updated successfully!',
      });
    } catch (err: any) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to update password',
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getAdminProfile();
        setAdmin(data);
        setAdminName(data.name || '');
        setAdminEmail(data.email || '');
        if (data.profile_picture) {
          setProfilePictureUrl(data.profile_picture);
        }
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
        <h1 className="text-3xl font-bold text-white">Admin Profile Settings</h1>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleDiscard}
            disabled={saving}
            className="text-slate-400 hover:text-white text-sm font-medium transition disabled:opacity-50"
          >
            Discard
          </button>
          <button 
            onClick={handleSaveChanges}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm text-white font-bold transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* System Update Status */}
      <p className="text-center text-slate-500 text-sm mb-8">
        Last system update: Today at 10:45 AM
      </p>

      {/* Settings Content */}
      <div className="space-y-8">
        {/* General Settings & Security - 2 Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* General Settings */}
          <Section title="General Settings" icon="ℹ️">
            <div className="space-y-6">
              <label className="block space-y-2">
                <span className="text-slate-400 text-sm font-medium">Admin Name</span>
                <input
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-slate-400 text-sm font-medium">Admin Email</span>
                <input
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-slate-400 text-sm font-medium">Profile Picture</span>
                <div className="flex items-start gap-4">
                  {profilePictureUrl && !profilePicture && !deleteProfilePicture ? (
                    <div className="w-20 h-20 rounded-xl border border-slate-700 flex-shrink-0 overflow-hidden">
                      <img src={profilePictureUrl} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-blue-600 border border-slate-700 flex items-center justify-center text-2xl flex-shrink-0 text-white font-bold">
                      {adminName ? adminName.charAt(0).toUpperCase() : 'A'}
                    </div>
                  )}
                  <div className="flex flex-col justify-start gap-3 pt-3">
                    <button
                      type="button"
                      onClick={handleProfilePicClick}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition w-fit"
                    >
                      {profilePicture ? 'Change Selected' : 'Change Picture'}
                    </button>
                    {profilePictureUrl && (
                      <button
                        type="button"
                        onClick={handleDeletePhoto}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition w-fit"
                      >
                        Delete Picture
                      </button>
                    )}
                    <p className="text-xs text-slate-500">
                      {profilePicture ? `Selected: ${profilePicture.name}` : '512×512px (PNG, JPG)'}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </Section>

          {/* Security */}
          <Section title="Security" icon="🔒">
            <div className="space-y-4">
              <div className="bg-blue-600/20 border border-blue-500/30 p-5 rounded-xl">
                <h4 className="font-bold text-base text-white mb-2">Two-factor Authentication</h4>
                <p className="text-sm text-slate-400 mb-4">Add extra security to your admin account</p>
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm text-white font-bold transition w-full">
                  Enable 2FA
                </button>
              </div>
              <PasswordInput 
                label="Current Password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                showPassword={showCurrentPassword}
                onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
              />
              <div className="space-y-2">
                <PasswordInput 
                  label="New Password" 
                  value={newPassword}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  showPassword={showNewPassword}
                  onToggle={() => setShowNewPassword(!showNewPassword)}
                />
                {newPassword && (
                  <div className="space-y-2">
                    <div className="flex gap-1 h-1.5">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-colors ${
                            i < passwordStrength ? getPasswordStrengthColor() : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">
                      Password strength: <span className="font-semibold text-white">{getPasswordStrengthText()}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <PasswordInput 
                  label="Confirm New Password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                />
                {newPassword && confirmPassword && (
                  <p className={`text-xs font-medium ${
                    newPassword === confirmPassword ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </p>
                )}
              </div>
              <button
                onClick={handleSavePassword}
                disabled={saving || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm text-white font-bold transition disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                {saving ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </Section>
        </div>

        {/* Payment Gateway & Notifications - 2 Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Gateway Integration */}
          <Section title="Payment Gateway" icon="💳">
            <div className="space-y-4">
              {/* Razorpay */}
              <div className="flex justify-between items-start bg-slate-800/50 border border-white/10 p-4 rounded-xl">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                    💙
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">Razorpay</p>
                    <p className="text-xs text-slate-400 mt-0.5">Accept payments via Razorpay</p>
                  </div>
                </div>
                <Toggle checked={true} />
              </div>

              <div className="space-y-3 pl-2">
                <Input label="Key ID" defaultValue="•••••••••••••••" />
                <Input label="Key Secret" defaultValue="•••••••••••••••" />
              </div>
            </div>
          </Section>

          {/* Notifications */}
          <Section title="Notifications" icon="🔔">
            <div className="space-y-3">
              <NotificationToggle
                title="New Order Alerts"
                desc="Email on new orders"
                checked={notifications.newOrders}
                onChange={() =>
                  setNotifications({ ...notifications, newOrders: !notifications.newOrders })
                }
              />
              <NotificationToggle
                title="Vendor Registration"
                desc="New vendor requests"
                checked={notifications.vendorRegistration}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    vendorRegistration: !notifications.vendorRegistration,
                  })
                }
              />
              <NotificationToggle
                title="Stock Alerts"
                desc="Low stock notifications"
                checked={notifications.stockAlerts}
                onChange={() =>
                  setNotifications({ ...notifications, stockAlerts: !notifications.stockAlerts })
                }
              />
            </div>
          </Section>
        </div>
      </div>

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

interface SectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
  <section className="backdrop-blur-xl rounded-2xl p-8 border border-white/10 bg-white/5 space-y-6">
    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
      <span className="text-xl">{icon}</span>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    {children}
  </section>
);

interface InputProps {
  label: string;
  defaultValue: string;
}

const Input: React.FC<InputProps> = ({ label, defaultValue }) => (
  <label className="block space-y-2">
    <span className="text-slate-400 text-sm font-medium">{label}</span>
    <input
      defaultValue={defaultValue}
      className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
    />
  </label>
);

interface ToggleItemProps {
  title: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}

const NotificationToggle: React.FC<ToggleItemProps> = ({ title, desc, checked, onChange }) => (
  <div className="flex justify-between items-center bg-slate-800/50 border border-white/10 p-4 rounded-xl hover:border-white/20 transition">
    <div>
      <p className="font-medium text-white text-sm">{title}</p>
      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onToggle: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange, showPassword, onToggle }) => (
  <label className="block space-y-2">
    <span className="text-slate-400 text-sm font-medium">{label}</span>
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 pr-12 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
      >
        <span className="material-symbols-outlined text-xl">
          {showPassword ? 'visibility_off' : 'visibility'}
        </span>
      </button>
    </div>
  </label>
);

interface ToggleProps {
  checked: boolean;
  onChange?: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all flex-shrink-0 ${
      checked ? 'bg-gradient-to-r from-blue-700 to-blue-500' : 'bg-slate-600'
    }`}
  >
    <span
      className={`absolute h-7 w-7 rounded-full transition-all transform flex items-center justify-center ${
        checked
          ? 'translate-x-8 bg-blue-500'
          : 'translate-x-0.5 bg-slate-400'
      }`}
    >
      {checked && <span className="text-white font-bold text-lg">✓</span>}
    </span>
  </button>
);
