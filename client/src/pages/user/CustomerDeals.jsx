import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiClock, FiChevronRight } from 'react-icons/fi';
import { FaFire, FaRegHeart, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HotDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  // Mock data - replace with API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeals([
        {
          id: 1,
          name: 'Summer Collection Bundle',
          originalPrice: 120.99,
          price: 79.99,
          discount: '34%',
          endTime: '2023-12-31T23:59:59',
          image: '👕👖',
          sold: 142,
          rating: 4.8
        },
        {
          id: 2,
          name: 'Wireless Noise-Canceling Headphones',
          originalPrice: 199.99,
          price: 149.99,
          discount: '25%',
          endTime: '2023-11-30T23:59:59',
          image: '🎧',
          sold: 89,
          rating: 4.9
        },
        {
          id: 3,
          name: 'Organic Skincare Set',
          originalPrice: 65.50,
          price: 45.99,
          discount: '30%',
          endTime: '2023-12-15T23:59:59',
          image: '🧴',
          sold: 56,
          rating: 4.7
        },
        {
          id: 4,
          name: 'Smart Fitness Watch',
          originalPrice: 89.99,
          price: 59.99,
          discount: '33%',
          endTime: '2023-12-20T23:59:59',
          image: '⌚',
          sold: 112,
          rating: 4.6
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const calculateTimeLeft = (endTime) => {
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    return `${days}d ${hours}h`;
  };

  const getProgress = (sold) => {
    return Math.min((sold / 200) * 100, 100); // Adjust 200 based on your needs
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-600 rounded-full p-4 mb-6 shadow-lg">
            <FaFire className="text-3xl text-white animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-amber-800 mb-3">HOT DEALS</h1>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            Limited-time offers with exclusive discounts. Grab them before they're gone!
          </p>
        </motion.div>

        {/* Deals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="animate-pulse">
                  <div className="bg-amber-200 h-48 w-full"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-5 bg-amber-200 rounded w-3/4"></div>
                    <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                    <div className="h-10 bg-amber-200 rounded mt-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((deal) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-100 hover:shadow-xl transition-all"
              >
                {/* Deal Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center">
                  <FaFire className="mr-1" /> {deal.discount} OFF
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(deal.id)}
                  className="absolute top-4 right-4 bg-white/80 rounded-full p-2 z-10 hover:bg-white transition-all"
                >
                  {wishlist.includes(deal.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400 hover:text-red-500" />
                  )}
                </button>

                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-7xl">
                  {deal.image}
                </div>

                {/* Deal Info */}
                <div className="p-6">
                  <div className="flex justify-between mb-3">
                    <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      {deal.rating} ★
                    </span>
                    <div className="flex items-center text-sm text-amber-600">
                      <FiClock className="mr-1" />
                      {calculateTimeLeft(deal.endTime)}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{deal.name}</h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-xl font-bold text-amber-700">${deal.price.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</span>
                    <span className="block text-xs text-green-600 mt-1">
                      You save ${(deal.originalPrice - deal.price).toFixed(2)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Sold: {deal.sold}</span>
                      <span>Almost gone!</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full" 
                        style={{ width: `${getProgress(deal.sold)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg flex items-center justify-center transition-all">
                    <FiShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-6 py-3 bg-white border border-amber-300 text-amber-700 rounded-full font-medium hover:bg-amber-50 hover:shadow-md transition-all">
            View All Deals <FiChevronRight className="ml-2" />
          </button>
        </div>

        {/* Special Offer Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-2">EXTRA 10% OFF</h2>
          <p className="mb-6 max-w-2xl mx-auto">Use code <span className="font-mono font-bold">HOTDEAL10</span> at checkout</p>
          <button className="px-6 py-2 bg-white text-amber-700 rounded-full font-medium hover:bg-amber-100 transition-colors">
            Shop Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HotDeals;