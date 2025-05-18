import React, { useContext, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);

  // Check if product is in cart
  const cartItem = cartItems.find(item => 
    item.id === product.id || item._id === product._id
  );
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={product.image || 'https://via.placeholder.com/300'} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-amber-800">{product.name}</h3>
        <p className="text-gray-600 mt-2 text-sm">
          {product.description?.substring(0, 60)}...
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
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
            className={`${
              quantityInCart > 0 ? 'bg-green-500' : 'bg-amber-600'
            } text-white p-2 rounded-full hover:opacity-90 transition-opacity ${
              isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100'
            }`}
            aria-label="Add to cart"
          >
            {quantityInCart > 0 ? quantityInCart : <FiShoppingCart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;