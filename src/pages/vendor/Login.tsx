// VendorLogin.jsx
import React, { useState } from "react";
import { Header } from "../../Components/layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/*
  Notes:
  1) Ensure Tailwind CSS is set up in your project.
  2) Include these in your index.html (or equivalent) so Material Symbols & Inter font work:
     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
     <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  3) This component is self-contained and uses the same image URLs & Material Symbols names from your HTML.
*/

const VendorLogin = () => {
  const [email, setEmail] = useState('vendor@test.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/vendor/dashboard');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="bg-[#0f1923] text-white min-h-screen flex flex-col font-sans relative overflow-hidden">
      <Header />
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
                local_shipping
              </span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-white tracking-tight text-3xl font-bold leading-tight">Vendor Portal</h2>
              <p className="text-slate-400 text-sm font-medium pt-2">Access your dashboard to manage inventory and orders.</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg p-3 border border-red-500/50 bg-red-500/10">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

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
                  placeholder="vendor@gmail.com"
                  type="text"
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="pr-4 pl-2 text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
                  type="button"
                  aria-label="toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[20px] flex items-center">visibility_off</span>
                </button>
              </div>
            </div>

            {/* Demo Credentials Box */}
            <div className="rounded-lg p-4 border border-blue-500/30 bg-blue-500/10">
              <p className="text-xs font-semibold text-blue-400 mb-2">🔑 Demo Credentials</p>
              <div className="space-y-1">
                <p className="text-xs text-slate-300"><span className="font-medium">Email:</span> vendor@test.com</p>
                <p className="text-xs text-slate-300"><span className="font-medium">Password:</span> 123456</p>
              </div>
            </div>

            {/* Actions row */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800/50 text-[#067ff9] focus:ring-offset-0 focus:ring-[#067ff9]/50 transition duration-150 ease-in-out cursor-pointer"
                  type="checkbox"
                />
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Keep me logged in</span>
              </label>
              <a className="text-sm font-medium text-[#067ff9] hover:text-[#067ff9]/80 transition-colors" href="#">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full text-white font-semibold h-12 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(90deg,#067ff9,#3b82f6)",
                boxShadow: "0 4px 14px 0 rgba(6,127,249,0.39)"
              }}
            >
              <span>{isLoading ? 'Logging In...' : 'Log In'}</span>
              <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </button>
          </form>

          {/* Footer inside card */}
          <div className="text-center border-t border-white/10 pt-6 mt-2">
            <p className="text-slate-400 text-sm">
              New to the platform?
              <Link to="/vendor/register" className="text-white font-medium hover:text-[#067ff9] transition-colors ml-1 inline-flex items-center gap-0.5">
                Apply to be a vendor
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom links */}
        <div className="mt-8 text-center">
          <a className="text-xs text-slate-500 hover:text-slate-400 transition-colors" href="#">Privacy Policy</a>
          <span className="text-slate-600 mx-2">•</span>
          <a className="text-xs text-slate-500 hover:text-slate-400 transition-colors" href="#">Terms of Service</a>
        </div>
        </div>
      </main>
    </div>
  );
};

export default VendorLogin;
export { VendorLogin as VendorLoginPage };
