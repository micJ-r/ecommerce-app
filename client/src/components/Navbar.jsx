import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiChevronDown, FiSearch, FiMenu, FiGlobe, FiMoreHorizontal } from 'react-icons/fi';
import { FaHome, FaBoxOpen, FaInfoCircle, FaEnvelope, FaFire } from 'react-icons/fa';
import { CartContext } from './context/CartContext';

const Navbar = () => {
  const { cartItems, getCartCount } = useContext(CartContext);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isPrefsOpen, setIsPrefsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    country: 'United States',
    language: 'English',
    currency: 'USD'
  });

  // Refs for dropdown containers
  const accountRef = useRef(null);
  const prefsRef = useRef(null);
  const moreRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAccountOpen && accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
      if (isPrefsOpen && prefsRef.current && !prefsRef.current.contains(event.target)) {
        setIsPrefsOpen(false);
      }
      if (isMoreOpen && moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener when any dropdown is open
    if (isAccountOpen || isPrefsOpen || isMoreOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountOpen, isPrefsOpen, isMoreOpen, isMobileMenuOpen]);

  const countries = [
    // North America
    'United States', 'Canada', 'Mexico',
    // Europe
    'United Kingdom', 'Germany', 'France', 'Italy',
    'Spain', 'Netherlands', 'Sweden',
    // Asia
    'Japan', 'China', 'India', 'South Korea', 'Singapore',
    // Africa
    'South Africa', 'Nigeria', 'Kenya', 'Tanzania', 'Uganda',
    'Rwanda', 'Ethiopia', 'Egypt',
    // Middle East
    'United Arab Emirates', 'Saudi Arabia',
    // Oceania
    'Australia', 'New Zealand'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
    'Swahili', 'Amharic', 'Afrikaans'
  ];

  const currencies = [
    // Major currencies
    'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 
    // African currencies
    'KES', 'TZS', 'UGX', 'ZAR', 'NGN', 
    // Asian currencies
    'CNY', 'INR', 'SGD', 
    // Middle East
    'AED', 'SAR', 
  ];

  // Load preferences from localStorage
  useEffect(() => {
    const savedPrefs = localStorage.getItem('preferences');
    if (savedPrefs) setPreferences(JSON.parse(savedPrefs));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const savePreferences = () => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
    setIsPrefsOpen(false);
  };

  const cartCount = getCartCount();

  return (
    <nav className="bg-amber-50 p-4 shadow-md sticky top-0 z-50 border-b border-amber-100">
      {/* Preferences Popup */}
      {isPrefsOpen && (
        <div ref={prefsRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-amber-800 mb-4">Your Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-amber-700 mb-1">Ship To</label>
                <select
                  name="country"
                  value={preferences.country}
                  onChange={handlePreferenceChange}
                  className="w-full p-2 border border-amber-200 rounded focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-amber-700 mb-1">Language</label>
                <select
                  name="language"
                  value={preferences.language}
                  onChange={handlePreferenceChange}
                  className="w-full p-2 border border-amber-200 rounded focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-amber-700 mb-1">Currency</label>
                <select
                  name="currency"
                  value={preferences.currency}
                  onChange={handlePreferenceChange}
                  className="w-full p-2 border border-amber-200 rounded focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsPrefsOpen(false)}
                className="px-4 py-2 border border-amber-300 text-amber-700 rounded hover:bg-amber-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePreferences}
                className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar Container */}
      <div className="container mx-auto">
        {/* Top Row - Logo, Search, and Mobile Menu */}
        <div className="flex items-center justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-amber-800 p-2 hover:bg-amber-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FiMenu className="text-2xl" />
            </button>
            
            <NavLink 
              to="/" 
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <span className="text-3xl text-amber-600">🛍️</span>
              <span className="text-2xl font-bold text-amber-800">
                @micJExpress
              </span>
            </NavLink>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <form 
              onSubmit={handleSearch} 
              className="w-full flex bg-white rounded-full shadow-sm border border-amber-200"
            >
              <div className="flex items-center pl-5 text-amber-400">
                <FiSearch className="text-xl" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-3 px-4 text-amber-900 focus:outline-none rounded-l-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 rounded-r-full font-medium hover:bg-amber-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right-side Icons */}
          <div className="flex items-center space-x-6">
            {/* Mobile Search Button */}
            <button className="md:hidden text-amber-800 p-2 hover:bg-amber-100 rounded-full transition-colors">
              <FiSearch className="text-2xl" />
            </button>

            {/* Preferences Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsPrefsOpen(!isPrefsOpen)}
                className="flex items-center p-2 rounded-full hover:bg-amber-100 transition-colors group"
              >
                <span className="font-medium text-amber-800 group-hover:text-amber-900">
                  {preferences.currency} | {preferences.language}
                </span>
                <FiChevronDown className={`ml-1 transition-transform ${isPrefsOpen ? 'transform rotate-180' : ''} text-amber-800 group-hover:text-amber-900`} />
              </button>
            </div>

            {/* Cart Icon */}
            <div className="relative">
              <NavLink 
                to="/cart" 
                className="flex items-center p-2 rounded-full hover:bg-amber-100 transition-colors group"
              >
                <div className="relative">
                  <FiShoppingCart className="text-2xl text-amber-800 group-hover:text-amber-900" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center group-hover:bg-amber-700">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="ml-1 hidden lg:inline text-amber-800 group-hover:text-amber-900">Cart</span>
              </NavLink>
            </div>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center p-2 rounded-full hover:bg-amber-100 transition-colors group"
              >
                <FiUser className="text-xl text-amber-800 group-hover:text-amber-900" />
                <FiChevronDown className={`ml-1 transition-transform ${isAccountOpen ? 'transform rotate-180' : ''} text-amber-800 group-hover:text-amber-900`} />
                <span className="ml-1 hidden lg:inline text-amber-800 group-hover:text-amber-900">Account</span>
              </button>

              {isAccountOpen && (
                <div ref={accountRef} className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-amber-100">
                  <NavLink
                    to="/login"
                    className="block px-4 py-3 text-amber-900 hover:bg-amber-50 hover:text-amber-700 font-medium transition-colors"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block px-4 py-3 text-amber-900 hover:bg-amber-50 hover:text-amber-700 font-medium transition-colors"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Create Account
                  </NavLink>
                  <div className="border-t border-amber-100 my-1"></div>
                  <NavLink
                    to="/user/profile"
                    className="block px-4 py-3 text-amber-900 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/user/orders"
                    className="block px-4 py-3 text-amber-900 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    My Orders
                  </NavLink>
                  <NavLink
                    to="/user/wishlist"
                    className="block px-4 py-3 text-amber-900 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    Wishlist
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Navigation - Desktop */}
        <div className="hidden md:flex justify-center mt-4 space-x-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-full hover:bg-amber-100 transition-colors ${isActive ? 'bg-amber-100 text-amber-800 font-medium' : 'text-amber-700 hover:text-amber-900'}`
            }
          >
            <FaHome className="mr-2" /> Home
          </NavLink>
          <NavLink
            to="/user/product"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-full hover:bg-amber-100 transition-colors ${isActive ? 'bg-amber-100 text-amber-800 font-medium' : 'text-amber-700 hover:text-amber-900'}`
            }
          >
            <FaBoxOpen className="mr-2" /> Products
          </NavLink>
          <NavLink
            to="/user/deals"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-full hover:bg-amber-100 transition-colors ${isActive ? 'bg-amber-100 text-amber-800 font-medium' : 'text-amber-700 hover:text-amber-900'}`
            }
          >
            <FaFire className="mr-2 text-amber-500" /> Hot Deals
          </NavLink>
          <NavLink
            to="/user/about"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-full hover:bg-amber-100 transition-colors ${isActive ? 'bg-amber-100 text-amber-800 font-medium' : 'text-amber-700 hover:text-amber-900'}`
            }
          >
            <FaInfoCircle className="mr-2" /> About
          </NavLink>
          <NavLink
            to="/user/contact"
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-full hover:bg-amber-100 transition-colors ${isActive ? 'bg-amber-100 text-amber-800 font-medium' : 'text-amber-700 hover:text-amber-900'}`
            }
          >
            <FaEnvelope className="mr-2" /> Contact
          </NavLink>
          
          {/* More Options Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center py-2 px-4 rounded-full hover:bg-amber-100 text-amber-700 hover:text-amber-900 transition-colors"
            >
              <FiMoreHorizontal className="mr-2" /> More
            </button>
            
            {isMoreOpen && (
              <div ref={moreRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-amber-100">
                <NavLink
                  to="/user/blog"
                  className="block px-4 py-3 text-amber-900 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  onClick={() => setIsMoreOpen(false)}
                >
                  Blog
                </NavLink>
                <NavLink
                  to="/user/faq"
                  className="block px-4 py-3 text-amber-900 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  onClick={() => setIsMoreOpen(false)}
                >
                  FAQ
                </NavLink>
                <NavLink
                  to="/user/stores"
                  className="block px-4 py-3 text-amber-900 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  onClick={() => setIsMoreOpen(false)}
                >
                  Our Stores
                </NavLink>
                <div className="border-t border-amber-100 my-1"></div>
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    setIsPrefsOpen(true);
                  }}
                  className="w-full text-left px-4 py-3 text-amber-900 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  Shipping Preferences
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden mt-4 bg-white rounded-lg p-4 shadow-lg border border-amber-100">
            <div className="space-y-2">
              <NavLink
                to="/"
                className="block py-3 px-4 rounded-lg hover:bg-amber-50 text-amber-800 hover:text-amber-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/user/product"
                className="block py-3 px-4 rounded-lg hover:bg-amber-50 text-amber-800 hover:text-amber-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </NavLink>
              <NavLink
                to="/user/deals"
                className="block py-3 px-4 rounded-lg hover:bg-amber-50 text-amber-800 hover:text-amber-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hot Deals
              </NavLink>
              <NavLink
                to="/user/about"
                className="block py-3 px-4 rounded-lg hover:bg-amber-50 text-amber-800 hover:text-amber-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </NavLink>
              <NavLink
                to="/user/contact"
                className="block py-3 px-4 rounded-lg hover:bg-amber-50 text-amber-800 hover:text-amber-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPrefsOpen(true);
                }}
                className="w-full block py-3 px-4 rounded-lg hover:bg-amber-50 text-amber-800 hover:text-amber-900 transition-colors text-left"
              >
                Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;