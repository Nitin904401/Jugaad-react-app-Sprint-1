// MainLayout - Customer layout wrapper
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
