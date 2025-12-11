// Register page

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Lock, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Calculate password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
      if (/\d/.test(value)) strength++;
      if (/[!@#$%^&*]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name, 'customer');
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    }
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
        return 'bg-gray-300';
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

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#295bac]/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1e4a8a]/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#295bac]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Brand Story */}
            <div className="hidden lg:block animate-slideInLeft">
              <div className="space-y-8">
                <div>
                  <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
                    Join <span className="text-2xl">S J A U T O P A R T</span>
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Create your account to access genuine auto parts, manage your orders, and connect with trusted vendors - all in one place.
                  </p>
                </div>
                {/* Features List */}
                <div className="space-y-4 pt-8 border-t border-slate-200">
                  {[
                    { title: 'Lightning Fast', desc: 'Instant sync across all devices' },
                    { title: 'Security First', desc: 'Enterprise-grade encryption' },
                    { title: 'Always Available', desc: '24/7 dedicated support' },
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4 animate-slideUp" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                      <CheckCircle2 className="w-6 h-6 text-[#295bac] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-slate-900">{feature.title}</p>
                        <p className="text-slate-600 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Brand Logo */}
                <div className="pt-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#295bac]/10 to-[#1e4a8a]/10 rounded-full border border-[#295bac]/20">
                    <div className="w-2 h-2 bg-[#295bac] rounded-full" />
                    <span className="text-sm font-semibold text-[#295bac]">Trusted by 10,000+ teams</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Side - Register Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0 animate-slideInRight">
              <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100/50 backdrop-blur-sm">
                {/* Header */}
                <div className="mb-8 text-center animate-slideUp" style={{ animationDelay: '0.1s' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#295bac] via-[#3a6db8] to-[#1e4a8a] shadow-lg shadow-[#295bac]/30 mb-6 group animate-pulse-glow">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#295bac] to-[#1e4a8a] bg-clip-text text-transparent mb-2">
                    Create Account
                  </h1>
                  <p className="text-slate-600 text-sm">Sign up to get started</p>
                </div>
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
                    <span>⚠️</span>
                    {error}
                  </div>
                )}
                {/* Register Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                    <label className="block text-sm font-semibold text-slate-900">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#295bac] focus:ring-3 focus:ring-[#295bac]/10 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                  {/* Email Field */}
                  <div className="space-y-2 animate-slideUp" style={{ animationDelay: '0.25s' }}>
                    <label className="block text-sm font-semibold text-slate-900">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#295bac] focus:ring-3 focus:ring-[#295bac]/10 focus:bg-white transition-all duration-300"
                      required
                    />
                  </div>
                  {/* Password Field */}
                  <div className="space-y-2 animate-slideUp" style={{ animationDelay: '0.3s' }}>
                    <label className="block text-sm font-semibold text-slate-900">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-12 py-3.5 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#295bac] focus:ring-3 focus:ring-[#295bac]/10 focus:bg-white transition-all duration-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#295bac] transition-colors duration-200"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex gap-1 h-2">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-full transition-colors ${
                                i < passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600">
                          Password strength: <span className="font-semibold">{getPasswordStrengthText()}</span>
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Confirm Password Field */}
                  <div className="space-y-2 animate-slideUp" style={{ animationDelay: '0.35s' }}>
                    <label className="block text-sm font-semibold text-slate-900">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#295bac] focus:ring-3 focus:ring-[#295bac]/10 focus:bg-white transition-all duration-300"
                      required
                    />
                    {formData.password && formData.confirmPassword && (
                      <p className={`text-xs mt-2 font-medium ${
                        formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formData.password === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </p>
                    )}
                  </div>
                  {/* Terms & Conditions */}
                  <label className="flex items-center gap-2 cursor-pointer animate-slideUp" style={{ animationDelay: '0.4s' }}>
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" required />
                    <span className="text-xs text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-[#295bac] font-semibold hover:text-[#1e4a8a] hover:underline transition-colors duration-200">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-[#295bac] font-semibold hover:text-[#1e4a8a] hover:underline transition-colors duration-200">Privacy Policy</a>
                    </span>
                  </label>
                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-3.5 mt-6 bg-gradient-to-r from-[#295bac] to-[#1e4a8a] text-white rounded-lg font-semibold shadow-lg shadow-[#295bac]/30 hover:shadow-xl hover:shadow-[#295bac]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group animate-slideUp transform hover:scale-[1.02] active:scale-95"
                    style={{ animationDelay: '0.5s' }}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Create Account</span>
                        {/* Optionally add an icon here for consistency */}
                      </>
                    )}
                  </button>
                </form>
                {/* Sign In Link */}
                <div className="text-center mt-8 animate-slideUp" style={{ animationDelay: '0.8s' }}>
                  <p className="text-slate-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#295bac] font-bold hover:text-[#1e4a8a] transition-colors duration-200">
                      Sign in here
                    </Link>
                  </p>
                </div>
                {/* Footer Links */}
                <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 animate-slideUp" style={{ animationDelay: '0.9s' }}>
                  <Link to="#" className="text-[#295bac] hover:text-[#1e4a8a] transition-colors duration-200">Privacy</Link>
                  <span className="text-slate-300">•</span>
                  <Link to="#" className="text-[#295bac] hover:text-[#1e4a8a] transition-colors duration-200">Terms</Link>
                  <span className="text-slate-300">•</span>
                  <Link to="#" className="text-[#295bac] hover:text-[#1e4a8a] transition-colors duration-200">Support</Link>
                </div>
              </div>
              {/* Mobile-only brand info */}
              <div className="lg:hidden mt-8 text-center">
                <p className="text-sm text-slate-600">
                  Trusted by <span className="font-semibold text-slate-900">10,000+</span> teams
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
