import React, { useState } from "react";

const LoginPage = () => {
  const [activeTabState, setActiveTabState] = useState<"login" | "signup">("login");
  return (
    <div className="bg-background-dark text-white font-display overflow-x-hidden antialiased selection:bg-primary selection:text-white min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col">
        {/* HEADER */}
      

        {/* MAIN */}
        <main className="flex flex-1 flex-col lg:flex-row min-h-[calc(100vh-64px)]">
          {/* LEFT SIDE / HERO */}
          <div className="relative hidden lg:flex w-full lg:w-1/2 flex-col justify-center bg-slate-900 p-10 xl:p-20 overflow-hidden">
            {/* blobs */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]" />
            </div>

            {/* dotted background */}
            <div
              className="absolute inset-0 z-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(#2563eb 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10 flex flex-col gap-10 max-w-lg animate-slide-up">
              {/* workshop card */}
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl border-[6px] border-slate-800 rotate-2 transition-all duration-500 hover:rotate-0 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                <div
                  className="w-full aspect-video bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  data-alt="Modern mechanic workshop with diagnostic tools"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_L_7xl5Oyqrqxp1IzJqp7NlP9rti8eONMjykLtsmCteM2YYBNMO8sam0NzYT0TDrqXHcDsi7bh-ZWK9XRKnoWusxhIw0iZNvS2bB7Fj7GhDJ7MVLKogtUeroa8jYjkRXlHGHLQnz7hNMbP-1kEqaMQ0mvccwelFQ5PS9VFe3ASKISyeVAApKPl3DoY1ECXXZLOD7zVDl-4KUp7EXJcN1yYHyywo4e5jdrghtVUhqvOxMeZY5i8fVidMBK0MC26uXC-512DSyPN_FO')",
                  }}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    Featured Workshop
                  </span>
                </div>
              </div>

              {/* text */}
              <div className="flex flex-col gap-5">
                <h1 className="text-5xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
                  Your Garage,
                  <br />
                  <span className="font-extrabold text-6xl text-blue-400 drop-shadow-lg">
                    Upgraded.
                  </span>
                </h1>
                <p className="text-lg text-slate-300 font-light leading-relaxed">
                  Join thousands of mechanics and enthusiasts finding the
                  perfect parts with guaranteed fitment. Experience the new
                  standard in auto parts.
                </p>
              </div>

              {/* avatars & rating */}
              <div className="flex gap-5 items-center backdrop-blur-sm bg-slate-800/30 p-4 rounded-2xl border border-white/10 w-fit">
                <div className="flex -space-x-4">
                  <img
                    alt="User"
                    className="w-12 h-12 rounded-full border-[3px] border-slate-800 object-cover shadow-lg"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnE6NJbhieC902nobp1UwPxPVc_JTNSlAySJlyn51msY7UgwgXHrSTWRP2HyWuj8jPjUdYtKspdHyLhpUVBO8GEI89OKKSRBVub-IMnvMOTtaHtnGssRGGDDmZ8ATI-tRrrFnkyP7Ub3_vR8YfPDrxfrny9QyX6JbYYdhd2I6L57iOJzkOoHJbUxjZrLE_53Hb2jcT490kgCPl6rkJPpGzUYj9mg7Bj5yVAHl6_872pKPywYWze_TL7_ouSUzVQfRAwImxQ6WR6yc8"
                  />
                  <img
                    alt="User"
                    className="w-12 h-12 rounded-full border-[3px] border-slate-800 object-cover shadow-lg"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrGiGfqokv-of_SURBVqcp67QSiRPEXf-89iZmleuw3O76_eXED_Pc1OBMo-azRgdg6CMweOwWd8SmyfJgvLhQ2YwNkBTQD0-KsuLppVLoZtS7CYfrAswF2ELN9iQa4_veNWOLHDGi8_AvTwB-coAw8RRm7ROBQolRxgodwIn6kUWUiKf2mw7UvyfFXXCo3F6nZiM3jRZBGBJ0LTDyIj-Y1eRvjLlylcNJPZm6wrAJxegxj-qtI66f6NNt1uv1fBGxvFyn1WPgqNRR"
                  />
                  <img
                    alt="User"
                    className="w-12 h-12 rounded-full border-[3px] border-slate-800 object-cover shadow-lg"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbAStfRTkkEi8aP376-wPGSogEEsOVO2u56CUsgFBIbWIpKpF_8gzMrM_lgmyOg2G4TXouBOlZsnG7IioxU1j6fTNzo0405LeMI3-yqhIIWYRY1UOoGUUf-biIAyheG04fw-QT0j0-DEFVd0izEBY4bYsZhtE0JzCR7tZGcD1L-SukE-DDMd0-iQ3pTwmMVL8k83zyeL18Zbw2myAJiobUPrCuKWc8HK_hGxVy-w9wnP6v8yfv9QjFnCwNQe5ali-mSiEy4N91W5TL"
                  />
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-[3px] border-slate-800 bg-slate-700 text-xs font-bold text-slate-300 shadow-lg relative z-10">
                    2k+
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex text-amber-400 text-sm drop-shadow-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px] fill-current"
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 mt-1">
                    Trusted by pros
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE / FORM */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-10 lg:p-20 bg-[#0b1120] relative overflow-hidden">
            <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[80px] pointer-events-none" />

            <div
              className="w-full max-w-[480px] flex flex-col gap-8 relative z-10 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-center sm:text-left space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {activeTabState === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="text-slate-400">
                  {activeTabState === 'signup'
                    ? 'Join our community to get started.'
                    : 'Enter your credentials to access your garage.'}
                </p>
              </div>

              {/* card */}
              <AuthCard activeTab={activeTabState} onTabChange={setActiveTabState} />

              {/* footer links */}
                <div className="flex justify-center gap-6 text-sm text-slate-400">
                  <a
                    href="#"
                    className="app-link transition-colors"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="#"
                    className="app-link transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="app-link transition-colors"
                  >
                    Help Center
                  </a>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
export { LoginPage };

// AuthCard component with controlled tab switching
const AuthCard: React.FC<{ activeTab: "login" | "signup"; onTabChange: (tab: "login" | "signup") => void; }> = ({ activeTab, onTabChange }) => {

  return (
    <div className="backdrop-blur-2xl bg-slate-800/60 border border-slate-700 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-primary/10">
      {/* tabs */}
      <div className="flex border-b border-slate-700/50">
        <button
          onClick={() => onTabChange("login")}
          className={`flex-1 relative flex items-center justify-center py-4 text-sm font-bold transition-all ${
            activeTab === "login"
              ? "text-blue-500 bg-slate-900/50"
              : "text-slate-400 hover:text-white hover:bg-slate-700/30"
          }`}
        >
          Log In
          {activeTab === "login" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
          )}
        </button>
        <button
          onClick={() => onTabChange("signup")}
          className={`flex-1 relative flex items-center justify-center py-4 text-sm font-bold transition-all ${
            activeTab === "signup"
              ? "text-blue-500 bg-slate-900/50"
              : "text-slate-400 hover:text-white hover:bg-slate-700/30"
          }`}
        >
          Sign Up
          {activeTab === "signup" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
          )}
        </button>
      </div>

      {/* form */}
      {activeTab === "login" ? (
        <LoginForm />
      ) : (
        <SignupForm />
      )}

      {/* secure note */}
      <div className="bg-slate-800/80 backdrop-blur-sm p-3 text-center border-t border-slate-700/50">
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
          <span className="material-symbols-outlined text-sm text-emerald-500">verified_user</span>
          <span>Secure SSL Encrypted Connection</span>
        </div>
      </div>
    </div>
  );
};

const LoginForm: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 flex flex-col gap-5">
      {/* email */}
      <label className="flex flex-col gap-2 group">
        <span className="text-sm font-semibold text-slate-300 transition-colors group-focus-within:text-primary">Email or Phone</span>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </div>
          <input
            type="text"
            placeholder="user@example.com"
            className="w-full h-12 rounded-xl bg-slate-900/50 border border-slate-700 focus:bg-slate-900/70 transition-all duration-300 pl-11 pr-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm"
          />
        </div>
      </label>

      {/* password */}
      <label className="flex flex-col gap-2 group">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-300 transition-colors group-focus-within:text-primary">Password</span>
          <a href="#" className="text-xs font-semibold app-link transition-colors">Forgot Password?</a>
        </div>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-12 rounded-xl bg-slate-900/50 border border-slate-700 focus:bg-slate-900/70 transition-all duration-300 pl-11 pr-10 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm"
          />
          <button type="button" className="absolute right-4 text-slate-400 hover:text-slate-200 transition-colors outline-none focus:text-primary">
            <span className="material-symbols-outlined text-[20px]">visibility_off</span>
          </button>
        </div>
      </label>

      {/* remember */}
      <div className="flex items-center gap-2 mt-1">
        <input id="remember" type="checkbox" className="w-4 h-4 rounded border-slate-600 text-primary focus:ring-primary bg-slate-800 cursor-pointer" />
        <label htmlFor="remember" className="text-sm text-slate-400 select-none cursor-pointer">Remember this device</label>
      </div>

      {/* buttons */}
      <div className="flex flex-col gap-3 mt-4">
        <button className="w-full h-[44px] rounded-xl font-bold text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-blue-500/40 focus:outline-none">
          Log In
        </button>
        <button className="flex w-full items-center justify-center h-12 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm hover:bg-slate-700 hover:border-slate-600 shadow-sm transform transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
          <span className="material-symbols-outlined mr-2 text-lg text-slate-400">sms</span>
          Log In with OTP
        </button>
      </div>

      {/* divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-700" />
        <span className="flex-shrink-0 mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Or continue with</span>
        <div className="flex-grow border-t border-slate-700" />
      </div>

      {/* social buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-700 bg-slate-800 text-sm font-semibold hover:bg-slate-700 text-white shadow-sm hover:shadow transition-all transform duration-300 hover:-translate-y-0.5 active:scale-95">
          {/* Google logo */}
          <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-700 bg-slate-800 text-sm font-semibold hover:bg-slate-700 text-white shadow-sm hover:shadow transition-all transform duration-300 hover:-translate-y-0.5 active:scale-95">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.3a4.57 4.57 0 0 0-.88 1.92 10.43 10.43 0 0 1-1.65 1.99zM14.25 5c-.15 2.15-1.78 3.82-3.82 3.82-.47-2.27 1.83-4.44 3.82-3.82z" /></svg>
          Apple
        </button>
      </div>
    </div>
  );
};

const SignupForm: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 flex flex-col gap-5">
      {/* Full Name */}
      <label className="flex flex-col gap-2 group">
        <span className="text-sm font-semibold text-slate-300 transition-colors group-focus-within:text-primary">Full Name</span>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined text-[20px]">badge</span>
          </div>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full h-12 rounded-xl bg-slate-900/50 border border-slate-700 focus:bg-slate-900/70 transition-all duration-300 pl-11 pr-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm"
          />
        </div>
      </label>

      {/* Email Address */}
      <label className="flex flex-col gap-2 group">
        <span className="text-sm font-semibold text-slate-300 transition-colors group-focus-within:text-primary">Email Address</span>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </div>
          <input
            type="email"
            placeholder="user@example.com"
            className="w-full h-12 rounded-xl bg-slate-900/50 border border-slate-700 focus:bg-slate-900/70 transition-all duration-300 pl-11 pr-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm"
          />
        </div>
      </label>

      {/* Password */}
      <label className="flex flex-col gap-2 group">
        <span className="text-sm font-semibold text-slate-300 transition-colors group-focus-within:text-primary">Password</span>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-12 rounded-xl bg-slate-900/50 border border-slate-700 focus:bg-slate-900/70 transition-all duration-300 pl-11 pr-10 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm"
          />
          <button type="button" className="absolute right-4 text-slate-400 hover:text-slate-200 transition-colors outline-none focus:text-primary">
            <span className="material-symbols-outlined text-[20px]">visibility_off</span>
          </button>
        </div>
      </label>

      {/* Terms */}
      <div className="flex items-center gap-2 mt-1">
        <input id="terms" type="checkbox" className="w-4 h-4 rounded border-slate-600 text-primary focus:ring-primary bg-slate-800 cursor-pointer" />
        <label htmlFor="terms" className="text-sm text-slate-400 select-none cursor-pointer">
          I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>.
        </label>
      </div>

      {/* Create Account Button */}
      <div className="flex flex-col gap-3 mt-4">
        <button className="w-full h-[44px] rounded-xl font-bold text-white text-sm bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-blue-500/40 focus:outline-none">
          Create Account
        </button>
      </div>

      {/* divider */}
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-700" />
        <span className="flex-shrink-0 mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">OR SIGN UP WITH</span>
        <div className="flex-grow border-t border-slate-700" />
      </div>

      {/* social buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-700 bg-slate-800 text-sm font-semibold hover:bg-slate-700 text-white shadow-sm hover:shadow transition-all transform duration-300 hover:-translate-y-0.5 active:scale-95">
          <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2 h-11 rounded-xl border border-slate-700 bg-slate-800 text-sm font-semibold hover:bg-slate-700 text-white shadow-sm hover:shadow transition-all transform duration-300 hover:-translate-y-0.5 active:scale-95">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.3a4.57 4.57 0 0 0-.88 1.92 10.43 10.43 0 0 1-1.65 1.99zM14.25 5c-.15 2.15-1.78 3.82-3.82 3.82-.47-2.27 1.83-4.44 3.82-3.82z" /></svg>
          Apple
        </button>
      </div>
    </div>
  );
};