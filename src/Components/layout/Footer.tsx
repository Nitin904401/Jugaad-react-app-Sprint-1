// Footer component
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] border-t border-slate-800 pt-20 pb-10 px-4 md:px-10 lg:px-40 w-full">
      {/* Centered content like the design */}
      <div className="max-w-[1200px] mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <span className="material-symbols-outlined text-xl">
                  local_taxi
                </span>
              </div>
              <span className="font-bold text-xl text-white">
                S J A U T O P A R T
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The world's most trusted marketplace for auto parts. Connecting
              mechanics and car enthusiasts with top vendors worldwide.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-lg">
                  social_leaderboard
                </span>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-lg">
                  rocket
                </span>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-lg">
                  photo_camera
                </span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Shop</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  All Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Featured Deals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Popular Brands
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Support</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Returns &amp; Warranty
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">For Vendors</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Become a Seller
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Vendor Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Advertising
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 w-full flex flex-col">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 flex justify-start">
              <p className="text-sm text-slate-500">© 2026 S J A U T O P A R T. All rights reserved.</p>
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-base text-slate-400 font-medium text-center">Made with <span className="text-red-500">&#10084;&#65039;</span> in Bangalore</span>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="flex gap-8 text-sm text-slate-400 font-medium">
                <a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Privacy Policy</a>
                <a href="#" className="text-slate-400 hover:text-slate-200 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
