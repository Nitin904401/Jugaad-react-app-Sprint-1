// MainLayout - Customer layout wrapper
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full px-4 py-8">
        <Outlet />
      </main>
      {!isSearchPage && <Footer />}
    </div>
  );
};
