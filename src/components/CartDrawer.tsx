"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, totalPrice } = useCart();

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[220] transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[230] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-slide-in-right">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary mb-0.5">shopping_bag</span>
            <h2 className="text-xl font-bold text-text-main">Coșul Meu</h2>
            <span className="bg-blue-100 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full ml-1">
              {items.length} {items.length === 1 ? 'produs' : 'produse'}
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-500"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">shopping_cart_off</span>
              <p className="text-lg font-bold text-slate-500 mb-2">Coșul tău este gol</p>
              <p className="text-sm text-slate-400 mb-6 max-w-[200px]">Adaugă materiile necesare pentru a profita de reduceri.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-primary font-bold hover:underline"
              >
                Continuă cumpărăturile
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="group flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 bg-white shadow-sm hover:shadow-soft transition-all relative overflow-hidden">
                  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg ${item.colorClass}`}>
                    <span className="material-symbols-outlined text-2xl opacity-80">{item.icon}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="font-bold text-text-main leading-tight truncate">{item.name}</h4>
                    <p className="text-primary font-bold mt-1 text-sm">{item.price} MDL</p>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout Button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-surface">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted font-medium">Subtotal</span>
              <span className="text-2xl font-black text-text-main">{totalPrice} MDL</span>
            </div>
            
            {items.length >= 3 && !items.find(i => i.id === 'bundle') && (
              <div className="bg-green-50 text-green-700 text-xs font-bold p-3 rounded-lg flex items-center gap-2 mb-4 border border-green-200">
                <span className="material-symbols-outlined text-[16px]">info</span>
                Ai mai mult de 3 produse. Iti recomandam Pachetul Complet!
              </div>
            )}
            
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full min-h-14 py-3 px-6 bg-primary hover:bg-blue-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-btn transition-transform hover:-translate-y-0.5"
            >
              <span className="text-center leading-tight">Către Finalizare Plată</span>
              <span className="material-symbols-outlined text-[20px] flex-shrink-0">arrow_forward</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
