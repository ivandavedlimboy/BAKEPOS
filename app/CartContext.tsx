import React, { createContext, useContext, useState, ReactNode } from "react";

//Declare cart item 
type CartItem = {
  id: string;
  name: string;
  flavour: string;
  toppings: string[];
  choice3: string;
  comments: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      
      // Find if an identical item (same name, flavour, toppings, choice3, comments) already exists
      const existingIndex = prev.findIndex(
        (i) =>
          i.name === item.name &&
          i.flavour === item.flavour &&
          i.choice3 === item.choice3 &&
          i.comments === item.comments &&
          // Compare toppings arrays (simple approach: stringify both)
          JSON.stringify(i.toppings.sort()) === JSON.stringify(item.toppings.sort())
      );

      if (existingIndex >= 0) {
        // If found, increase quantity of that existing item
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
        };
        return updated;
      }

      // Otherwise add new item
      return [...prev, item];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}
