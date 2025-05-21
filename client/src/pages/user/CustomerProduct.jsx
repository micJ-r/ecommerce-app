import React, { useState, useEffect, useContext } from 'react';
import { FiShoppingCart, FiStar, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { CartContext } from '../../components/context/CartContext';

const API_BASE = 'http://localhost:5000';

function CustomerProduct() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

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
    <div className="min-h-screen bg-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-800">Our Products</h1>
          <p className="text-amber-600 mt-2">Browse our wide selection of quality products</p>
        </div>

        {/* Product Display */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="animate-pulse">
                  <div className="bg-amber-200 h-48 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                    <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                    <div className="h-4 bg-amber-200 rounded w-1/4"></div>
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
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No products available</div>
            <button 
              onClick={retryFetch}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div 
                key={product._id} 
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-amber-50 overflow-hidden">
                  <img 
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
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

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-amber-900 group-hover:text-amber-700 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2 group-hover:text-gray-800 transition-colors duration-200">
                    {product.description}
                  </p>

                  {/* Price and Rating */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="transition-all duration-200 group-hover:scale-105">
                      <span className="font-bold text-amber-800">
                        ${product.price?.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 text-sm line-through ml-2">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-amber-500 transition-all duration-200 group-hover:scale-110">
                      <FiStar className="fill-current" />
                      <span className="text-sm ml-1">{product.rating || '4.5'}</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center transform group-hover:scale-105 hover:shadow-lg"
                  >
                    <FiShoppingCart className="mr-2 transition-transform duration-300 group-hover:scale-125" />
                    <span className="transition-all duration-300 group-hover:font-medium">
                      Add to Cart
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerProduct;