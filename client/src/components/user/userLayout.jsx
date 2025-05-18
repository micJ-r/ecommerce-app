// src/components/user/UserLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-100 p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default UserLayout;
