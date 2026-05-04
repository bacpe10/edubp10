"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type CartItem = {
  id: string; // e.g. "romana-real", "bundle"
  name: string;
  price: number;
  icon: string;
  colorClass: string; // for UI badge
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalPrice: number;
  totalItems: number;
  showUpsell: boolean;
  setShowUpsell: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        console.error("Failed to parse cart storage.");
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (item: CartItem) => {
    // Prevent duplicates safely.
    if (items.find((i) => i.id === item.id)) {
      return;
    }
    
    // UPSELL LOGIC: If adding a single subject (not bundle) and cart is empty
    if (!item.id.includes('bundle') && items.length === 0) {
       setShowUpsell(true);
    } else {
       setIsCartOpen(true); // Auto open cart ONLY if not showing upsell
    }

    setItems((prev) => [...prev, item]);

    // Send Telegram Log
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'cart',
        message: `Item: *${item.name}*\nPrice: *${item.price} MDL*\nID: \`${item.id}\``
      })
    }).catch(err => console.error('Logging error:', err));
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.length;
  // Compute basic total (backend has final authority)
  const totalPrice = items.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      totalItems,
      totalPrice,
      showUpsell,
      setShowUpsell
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
