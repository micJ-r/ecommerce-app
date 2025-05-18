import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add one quantity of product to cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id || item._id === product._id
      );

      if (existingItemIndex >= 0) {
        // If exists, create new array and increment quantity by 1
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
        return newItems;
      } else {
        // If new, add to cart with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove one quantity or remove completely if quantity is 1
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === productId || item._id === productId
      );

      if (existingItemIndex >= 0) {
        const existingItem = prevItems[existingItemIndex];
        if (existingItem.quantity > 1) {
          // Decrement quantity by 1
          const newItems = [...prevItems];
          newItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity - 1
          };
          return newItems;
        } else {
          // Remove item completely
          return prevItems.filter(
            item => item.id !== productId && item._id !== productId
          );
        }
      }
      return prevItems;
    });
  };

  // Get total count of items (sum of all quantities)
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get cart total price
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    ).toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartCount,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};