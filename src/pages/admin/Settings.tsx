import React, { useState } from 'react';

export const AdminSettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    vendorRegistration: true,
    stockAlerts: false,
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
        <h1 className="text-3xl font-bold text-white">System Settings</h1>

        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-white text-sm font-medium transition">
            Discard
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm text-white font-bold transition">
            Save Changes
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="space-y-8 max-w-6xl">
        {/* General Settings */}
        <Section title="General Settings" icon="ℹ️">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Input label="Platform Name" defaultValue="AutoParts Marketplace" />
              <Input label="Support Contact Email" defaultValue="support@autoparts.com" />
            </div>
            <div>
              <label className="block space-y-2">
                <span className="text-slate-400 text-sm font-medium">Platform Logo</span>
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-3xl flex-shrink-0">
                    🚗
                  </div>
                  <div className="flex flex-col justify-start gap-4 pt-5">
                    <button
                      type="button"
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition w-fit"
                    >
                      Change Logo
                    </button>
                    <p className="text-xs text-slate-500">
                      Recommended size: 512×512px (PNG, SVG)
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </Section>

        {/* System Config */}
        <Section title="System Configuration" icon="🌐">
          <div className="grid md:grid-cols-2 gap-8">
            <Select
              label="Default Currency"
              options={['USD ($)', 'EUR (€)', 'INR (₹)']}
              defaultValue="USD ($)"
            />
            <Select
              label="System Timezone"
              options={['(GMT-08:00) Pacific Time', '(GMT+00:00) UTC', '(GMT+05:30) IST']}
              defaultValue="(GMT+00:00) UTC"
            />
          </div>
        </Section>

        {/* Payment Gateway Integration */}
        <Section title="Payment Gateway Integration" icon="💳">
          <div className="space-y-6">
            {/* Razorpay */}
            <div className="flex justify-between items-start bg-slate-800/50 border border-white/10 p-6 rounded-xl">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  💙
                </div>
                <div>
                  <p className="font-medium text-white">Razorpay</p>
                  <p className="text-xs text-slate-400 mt-1">Accept payments via Razorpay</p>
                </div>
              </div>
              <Toggle checked={true} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 ml-14">
              <Input label="Key ID" defaultValue="•••••••••••••••" />
              <Input label="Key Secret" defaultValue="•••••••••••••••" />
            </div>

            {/* PayU */}
            <div className="flex justify-between items-start bg-slate-800/50 border border-white/10 p-6 rounded-xl mt-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  💚
                </div>
                <div>
                  <p className="font-medium text-white">PayU</p>
                  <p className="text-xs text-slate-400 mt-1">Accept payments via PayU</p>
                </div>
              </div>
              <Toggle checked={false} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 ml-14">
              <Input label="Merchant Key" defaultValue="Enter PayU Key" />
              <Input label="Salt" defaultValue="Enter Salt" />
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notification Settings" icon="🔔">
          <div className="space-y-4">
            <NotificationToggle
              title="New Order Alerts"
              desc="Send email when a new order is placed"
              checked={notifications.newOrders}
              onChange={() =>
                setNotifications({ ...notifications, newOrders: !notifications.newOrders })
              }
            />
            <NotificationToggle
              title="Vendor Registration"
              desc="Notify on new vendor requests"
              checked={notifications.vendorRegistration}
              onChange={() =>
                setNotifications({
                  ...notifications,
                  vendorRegistration: !notifications.vendorRegistration,
                })
              }
            />
            <NotificationToggle
              title="Stock Threshold Alerts"
              desc="Notify when stock goes low"
              checked={notifications.stockAlerts}
              onChange={() =>
                setNotifications({ ...notifications, stockAlerts: !notifications.stockAlerts })
              }
            />
          </div>
        </Section>

        {/* Security */}
        <Section title="Security" icon="🔒">
          <div className="flex justify-between items-center bg-blue-600/20 border border-blue-500/30 p-6 rounded-xl">
            <div>
              <h4 className="font-bold text-lg text-white">Two-factor Authentication</h4>
              <p className="text-sm text-slate-400">Add extra security to your admin account</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm text-white font-bold transition">
              Enable 2FA
            </button>
          </div>
        </Section>

        <p className="text-center text-slate-500 text-sm pt-6">
          Last system update: Today at 10:45 AM
        </p>
      </div>
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

interface SelectProps {
  label: string;
  options: string[];
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({ label, options, defaultValue }) => (
  <label className="block space-y-2">
    <span className="text-slate-400 text-sm font-medium">{label}</span>
    <select
      defaultValue={defaultValue || options[0]}
      className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-slate-900">
          {opt}
        </option>
      ))}
    </select>
  </label>
);

interface ToggleItemProps {
  title: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}

const NotificationToggle: React.FC<ToggleItemProps> = ({ title, desc, checked, onChange }) => (
  <div className="flex justify-between items-center bg-slate-800/50 border border-white/10 p-6 rounded-xl hover:border-white/20 transition">
    <div>
      <p className="font-medium text-white">{title}</p>
      <p className="text-xs text-slate-400 mt-1">{desc}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
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
