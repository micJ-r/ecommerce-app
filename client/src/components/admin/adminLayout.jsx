import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex">
      <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-h-screen bg-gray-100 md:ml-64">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 md:ml-64">
          <Header toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content area with top padding equal to header height */}
        <main className="flex-1 pt-16 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
