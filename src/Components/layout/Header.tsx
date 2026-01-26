// Header component - Shared navbar
import React from 'react';
// Use material symbols instead of importing SVG assets to avoid module type issues
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login', { state: { from: { pathname: '/profile' } } });
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
    }
  };

  return (
  <header className="w-full flex items-center justify-between whitespace-nowrap border-b border-white/5 bg-[#0f172a]/70 backdrop-blur-xl px-6 sm:px-10 py-4 sticky top-0 z-50 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight">S J A U T O P A R T</h2>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-1 bg-slate-900/50 p-1 rounded-full border border-white/5 backdrop-blur-sm">
            <Link className="px-5 py-2 rounded-full text-sm font-medium text-white bg-slate-800 shadow-sm border border-white/5 transition-all" to="/">Home</Link>
            <Link className="px-5 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all" to="/search">Shop</Link>
            <Link className="px-5 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all" to="/vendor/login">Sell</Link>
            <a className="px-5 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all" href="#">Garage</a>
          </nav>
          <div className="flex gap-3">
            <button 
              onClick={handleCartClick}
              className="relative group flex items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-slate-800 border border-white/5 text-slate-300 hover:border-primary hover:text-primary hover:shadow-glow-sm transition-all duration-300"
            >
              <span className="group-hover:scale-110 transition-transform material-symbols-outlined" style={{fontSize:24}}>shopping_cart</span>
              <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-[#0f172a]"></span>
            </button>
            <button 
              onClick={handleProfileClick}
              className="group flex items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-slate-800 border border-white/5 text-slate-300 hover:border-primary hover:text-primary hover:shadow-glow-sm transition-all duration-300"
            >
              <span className="group-hover:scale-110 transition-transform material-symbols-outlined" style={{fontSize:24}}>account_circle</span>
            </button>
          </div>
        </div>
        <button className="lg:hidden flex items-center justify-center text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>
  );
};
