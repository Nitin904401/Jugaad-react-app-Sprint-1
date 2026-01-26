import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/admin-panel/dashboard');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white h-screen flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-6 lg:px-10 py-3 bg-slate-900/50 backdrop-blur-md z-50 flex-shrink-0">
        <div className="flex items-center gap-4 text-white">
          <div className="size-8 text-blue-500">
            <svg viewBox="0 0 48 48" fill="none">
              <path
                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight">Jugaad Admin</h2>
        </div>

        <button className="min-w-[100px] h-10 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition">
          Support
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

        {/* Login Card */}
        <div className="w-full max-w-sm backdrop-blur-xl rounded-2xl shadow-2xl p-6 relative z-10 border border-white/10 bg-white/5">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-2 rounded-full bg-blue-500/10 mb-4">
              <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight pb-1">
              Admin Portal
            </h1>
            <p className="text-slate-400 text-sm">
              Sign in to manage your ecosystem
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium px-1">
                Email or Username
              </label>
              <div className="flex items-center rounded-xl border border-white/10 bg-white/5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/50 overflow-hidden transition">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin credentials"
                  className="flex-1 h-11 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                  required
                />
                <span className="pr-3 text-slate-500 text-sm">👤</span>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between px-1">
                <label className="text-xs font-medium">Password</label>
                <a href="#" className="text-blue-500 text-xs hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="flex items-center rounded-xl border border-white/10 bg-white/5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/50 overflow-hidden transition">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 h-11 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pr-3 text-slate-500 cursor-pointer hover:text-white transition text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2 px-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3 h-3 rounded bg-white/5 border-white/10 accent-blue-500"
              />
              <label htmlFor="remember" className="text-slate-400 text-xs">
                Remember this device
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:opacity-50 font-bold text-sm transition active:scale-[0.98] shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              {isLoading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col items-center gap-3">
            <div className="flex items-center gap-1 text-xs uppercase tracking-widest text-slate-500">
              <span>🔒</span>
              Secure Server Environment
            </div>
            <div className="flex gap-3 text-xs text-slate-400">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <span className="text-white/10">•</span>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              <p>Demo: admin@test.com / 123456</p>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="py-6 px-10 text-center text-slate-500 text-sm border-t border-white/5 bg-slate-900 flex-shrink-0">
        © 2024 Jugaad Global Network. All rights reserved.
      </footer>
    </div>
  );
};
