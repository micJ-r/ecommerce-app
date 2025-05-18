import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md w-full h-16 flex items-center justify-between px-4 md:px-6 relative">
      <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
        <FaBars size={20} />
      </button>

      <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
        Admin Dashboard
      </h1>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <FaUserCircle size={22} className="text-gray-600" />
          <span className="text-sm text-gray-700 hidden sm:block">Admin</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
            <Link
              to="/admin/change-password"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Change Password
            </Link>
            <Link
              to="/admin/logout"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
