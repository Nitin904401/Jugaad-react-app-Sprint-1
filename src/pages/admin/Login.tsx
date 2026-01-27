import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api/admin';
import Modal from '../../Components/common/Modal';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({ isOpen: false, type: "success", title: "", message: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await adminLogin({ email, password });
      
      // Show success modal
      setModal({
        isOpen: true,
        type: "success",
        title: "Login Successful",
        message: "Welcome back! Redirecting to admin dashboard...",
      });

      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/admin-panel/dashboard');
      }, 1500);
    } catch (err) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Login Failed",
        message: (err as Error).message || "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0f1923] text-white min-h-screen flex flex-col font-sans relative overflow-hidden">
      {/* Background & overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1923]/95 via-[#0f1923]/90 to-[#067ff9]/20 mix-blend-multiply z-10" />
        <img
          alt="Automotive Background"
          className="w-full h-full object-cover opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEU_HTNMHMsTt5P6BKeZDpWRYwt8sZnrXqKxmkfYkBmvOg75-cLGQ2mZLKmWuWdhPRNS-SsFMSJlB2vxDkEiQkTcY6vVjxN0ml5kX-bOR_Easr8F3jmo2rsUiglLLFTlppbBNud-nu8HMWrbM7EUNCcrAn8UkeoJFCb86qcdrsb4-rN6fDrfo_Tmlo8ZdYqM4M7mwWwDmM2si9n8fBe_ayZ5lE8OTbuX1J03C3U27JI8CA_DJZi60YmX5iGkNujxo6oFuECCDnkZC4"
        />
      </div>

      {/* Main card container */}
      <main className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-[480px] p-4 flex flex-col items-center justify-center min-h-[inherit]">
        {/* Glass login card */}
        <div className="w-full rounded-2xl p-8 sm:p-10 flex flex-col gap-6"
             style={{
               background: "rgba(27,33,39,0.75)",
               backdropFilter: "blur(16px)",
               WebkitBackdropFilter: "blur(16px)",
               border: "1px solid rgba(255,255,255,0.08)",
               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
             }}>
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 bg-[#067ff9]/20 rounded-xl flex items-center justify-center mb-2 border border-[#067ff9]/30 shadow-[0_0_15px_rgba(6,127,249,0.3)]">
              <span className="material-symbols-outlined text-[#067ff9] text-3xl">
                shield
              </span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-white tracking-tight text-3xl font-bold leading-tight">Admin Portal</h2>
              <p className="text-slate-400 text-sm font-medium pt-2">Sign in to manage your ecosystem</p>
            </div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5 w-full mt-2" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 ml-1">Email or Username</label>
              <div className="rounded-xl flex items-center overflow-hidden h-12"
                   style={{
                     background: "rgba(15,25,35,0.6)",
                     border: "1px solid rgba(58,71,85,0.5)",
                     transition: "all 0.2s"
                   }}>
                <span className="pl-4 pr-2 text-slate-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </span>
                <input
                  className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 text-base h-full py-0 pl-1"
                  placeholder="admin@test.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
              </div>
              <div className="rounded-xl flex items-center overflow-hidden h-12 group"
                   style={{
                     background: "rgba(15,25,35,0.6)",
                     border: "1px solid rgba(58,71,85,0.5)",
                     transition: "all 0.2s"
                   }}>
                <span className="pl-4 pr-2 text-slate-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </span>
                <input
                  className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 text-base h-full py-0 pl-1"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="pr-4 pl-2 text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[20px] flex items-center">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl font-semibold text-base transition-all active:scale-[0.98] mt-2"
              style={{
                background: "linear-gradient(135deg, #067ff9 0%, #0563cc 100%)",
                boxShadow: "0 4px 15px rgba(6,127,249,0.4)",
                color: "white"
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  Signing in...
                </span>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 pt-6 border-t border-white/10 flex flex-col items-center gap-3">
            <div className="flex items-center gap-1 text-xs uppercase tracking-widest text-slate-500">
              <span>🔒</span>
              Secure Server Environment
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Success/Error Modal */}
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
