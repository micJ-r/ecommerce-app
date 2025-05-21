import React, { useState, useEffect, useContext } from 'react';
import { FiShoppingCart, FiStar, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { CartContext } from './context/CartContext';

const API_BASE = 'http://localhost:5000';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, cartItems } = useContext(CartContext);

  // Function to properly construct image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300';
    
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `${API_BASE}${imagePath}`;
    
    return `${API_BASE}/uploads/${imagePath.replace(/^\/?uploads\//, '')}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const productsWithImages = data.products?.map(product => ({
          ...product,
          imageUrl: getImageUrl(product.image)
        })) || [];

        setProducts(productsWithImages);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const retryFetch = () => {
    setIsLoading(true);
    setError(null);
    setProducts([]);
    (async () => {
      try {
        const response = await fetch(`${API_BASE}/api/products`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const productsWithImages = data.products?.map(product => ({
          ...product,
          imageUrl: getImageUrl(product.image)
        })) || [];
        setProducts(productsWithImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Enhanced Hero Section with Image */}
      <section className="relative bg-gradient-to-r from-amber-400 to-amber-600 text-white py-12 md:py-24 px-4 overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Shop the latest trends and exclusive collections at unbeatable prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-amber-700 px-6 py-3 rounded-lg font-bold hover:bg-amber-100 transition-all duration-300 transform hover:scale-105">
                Shop Now <FiArrowRight className="ml-2 inline transition-transform group-hover:translate-x-1" />
              </button>
              <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-amber-700 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 relative z-10">
            <img 
              src="/assets/image1.png"
              alt="Happy shopper with bags"
              className="w-full h-auto rounded-lg shadow-xl object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-bounce"></div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-amber-800 mb-12 text-center">Featured Products</h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="animate-pulse">
                    <div className="bg-amber-200 h-48 w-full"></div>
                    <div className="p-4 space-y-4">
                      <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                      <div className="h-4 bg-amber-200 rounded"></div>
                      <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 text-lg mb-4">Error loading products: {error}</div>
              <button 
                onClick={retryFetch}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No products available</div>
              <button 
                onClick={retryFetch}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105"
              >
                Refresh
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <div 
                  key={product._id} 
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={product.imageUrl}
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300';
                      }}
                    />
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded transition-all duration-300 group-hover:scale-110">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-amber-800 group-hover:text-amber-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm group-hover:text-gray-800 transition-colors duration-200">
                      {product.description?.substring(0, 60)}...
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="transition-all duration-200 group-hover:scale-105">
                        <span className="text-amber-700 font-bold">
                          ${product.price?.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-400 text-sm line-through ml-2">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-all duration-300 transform hover:scale-110 hover:shadow-md"
                        aria-label="Add to cart"
                      >
                        <FiShoppingCart className="transition-transform duration-300 group-hover:rotate-12" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;