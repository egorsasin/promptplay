import React from 'react';
import Header from '@/components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-emerald-900/20"></div>
        <div className="relative mx-auto px-4 sm:px-6">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
