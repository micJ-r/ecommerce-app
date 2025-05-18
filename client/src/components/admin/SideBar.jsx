import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaCog, // ✅ Import the correct settings icon
} from 'react-icons/fa';

function SideBar({ isOpen, toggleSidebar }) {
  const linkBase = 'flex items-center p-3 rounded-md transition hover:bg-gray-700';
  const activeClass = 'bg-gray-700';

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`bg-gray-900 text-white fixed inset-y-0 left-0 z-50 w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:translate-x-0 md:block`}
      >
        <div className="p-6 text-2xl font-bold text-center border-b border-gray-700">
          Admin Panel
        </div>

        <ul className="p-4 space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : ''}`
              }
              onClick={toggleSidebar}
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : ''}`
              }
              onClick={toggleSidebar}
            >
              <FaBoxOpen className="mr-3" />
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : ''}`
              }
              onClick={toggleSidebar}
            >
              <FaClipboardList className="mr-3" />
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/customers"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : ''}`
              }
              onClick={toggleSidebar}
            >
              <FaUsers className="mr-3" />
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : ''}`
              }
              onClick={toggleSidebar}
            >
              <FaCog className="mr-3" /> {/* ✅ Use FaCog here */}
              Settings
            </NavLink>
          </li>
        </ul>

        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-white"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>
    </>
  );
}

export default SideBar;
