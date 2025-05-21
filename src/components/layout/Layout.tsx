import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export const Layout = () => {
  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}; 