import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Customers from './pages/admin/Customers';
import Logout from './pages/admin/Logout';
import Orders from './pages/admin/Orders';
import PublicLayout from './components/PublicLayout';
import Settings from './pages/admin/Settings';
import ChangePassword from './pages/admin/ChangePassword'; 
import CustomerHome from './pages/user/CustomerHome';
import MyOrders from './pages/user/MyOrders';
import Profile from './pages/user/Profile';
import LandingPage from './components/LandingPage';
import AdminLayout from './components/admin/adminLayout';
import UserLayout from './components/user/userLayout';
import { CartProvider } from './components/context/CartContext';
import CustomerProduct from './pages/user/CustomerProduct';
import Cart from './pages/user/Cart';
import CustomerDeals from './pages/user/CustomerDeals';
import About from './pages/user/About';
import Contacts from './pages/user/Contacts';
import Blog from './pages/user/Blog';
import Faq from './pages/user/Faq';
import Stores from './pages/user/Stores';
import WishList from './pages/user/WishList';

function App() {
  return (
    <CartProvider> 

      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="logout" element={<Logout />} />
            
          </Route>

          {/* User/customer routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<CustomerHome />} />
            <Route path="home" element={<CustomerHome />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="product" element={<CustomerProduct />} />
            <Route path="cart" element={<Cart/>} />
            <Route path="deals" element={<CustomerDeals />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contacts />} />
            <Route path="stores" element={<Stores />} />
            <Route path="faq" element={<Faq />} />
            <Route path="blog" element={<Blog />} />


          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
