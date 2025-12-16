"use client";
import { createContext, useContext, useEffect, useState } from "react";

//createContext ugugdul hadgalah sav uusgene
//useContext ter savnaas ugugdul avna

const CartContex = createContext();

export const CartProvider = ({ children }) => {
  //sagsiig local-s unshaad umnu ni sags bsn bl sergeene
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  //cart uurchlugdh burd local-d automataar hadgalna
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  //
  const addToCart = (book) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === book._id);
      if (exists) {
        return prev.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };
  //sags dtrh toog uurchluh
  const updateQuantity = (bookId, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item._id === bookId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (bookId) => {
    setCart((prev) => prev.filter((item) => item._id !== bookId));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContex.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContex.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContex);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
