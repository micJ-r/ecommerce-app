import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.id === product.id || item._id === product._id
      );

      if (existingIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1
        };
        return newItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.id === productId || item._id === productId
      );

      if (existingIndex >= 0) {
        const item = prevItems[existingIndex];
        if (item.quantity > 1) {
          const newItems = [...prevItems];
          newItems[existingIndex] = {
            ...item,
            quantity: item.quantity - 1
          };
          return newItems;
        } else {
          return prevItems.filter(
            item => item.id !== productId && item._id !== productId
          );
        }
      }
      return prevItems;
    });
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartCount, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
