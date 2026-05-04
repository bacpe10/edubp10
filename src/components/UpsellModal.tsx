"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { PRICES, BUNDLE_DETAILS } from "@/constants/products";

export default function UpsellModal() {
  const { showUpsell, setShowUpsell, addToCart, removeFromCart, items, setIsCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showUpsell) {
      // Small delay for entrance animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [showUpsell]);

  if (!showUpsell) return null;

  const handleUpgrade = () => {
    // Remove individual items to prevent double charging if they take the bundle
    items.forEach(item => {
      if (!item.id.includes('bundle')) {
        removeFromCart(item.id);
      }
    });

    // Add the bundle
    addToCart({
      id: `${BUNDLE_DETAILS.id}-test-rezolvat`,
      name: BUNDLE_DETAILS.plusName,
      price: PRICES.BUNDLE_PLUS,
      icon: BUNDLE_DETAILS.icon,
      colorClass: BUNDLE_DETAILS.colorClassPlus
    });

    setShowUpsell(false);
  };

  const handleClose = () => {
    setShowUpsell(false);
    setIsCartOpen(true);
  };

  const triggerItem = items.find(i => !i.id.includes('bundle'));
  const diffPrice = triggerItem ? PRICES.BUNDLE_PLUS - triggerItem.price : 200;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden transform transition-all duration-500 ${isVisible ? "translate-y-0 scale-100" : "translate-y-12 scale-95"}`}
      >
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-blue-400 to-primary"></div>
        
        <div className="p-8 md:p-10 flex flex-col items-center text-center">
          {/* Discount Badge */}
          <div className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-red-100 animate-pulse">
            Ofertă Limitată: Economisești 45%
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
            Așteaptă! Vrei să iei <span className="text-primary underline decoration-blue-200 decoration-4 underline-offset-4">totul</span>?
          </h2>
          
          <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8">
            Ai adăugat o singură materie. Pentru doar <span className="text-slate-900 font-bold px-1.5 py-0.5 bg-slate-100 rounded">{diffPrice} MDL în plus</span>, poți lua Pachetul Complet care conține <strong className="text-slate-900">TOATE cele 3 materii de examen</strong> + Rezolvările Premium.
          </p>

          {/* Comparison Cards (Visual Psychology) */}
          <div className="grid grid-cols-2 gap-4 w-full mb-10">
             <div className="p-5 rounded-3xl border-2 border-slate-100 bg-slate-50 opacity-60">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Un Subiect</p>
                <p className="text-xl font-black text-slate-500">{triggerItem?.price || 249} MDL</p>
             </div>
             <div className="p-5 rounded-3xl border-2 border-primary bg-blue-50 relative shadow-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Recomandat</div>
                <p className="text-[10px] font-bold uppercase text-primary mb-1">Pachet Complet</p>
                <p className="text-xl font-black text-primary">{PRICES.BUNDLE_PLUS} MDL</p>
             </div>
          </div>

          <div className="flex flex-col w-full gap-4">
             <button 
               onClick={handleUpgrade}
               className="w-full bg-primary hover:bg-blue-700 text-white h-[70px] rounded-3xl font-black text-lg shadow-[0_12px_24px_-8px_rgba(36,99,235,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
             >
                DA, VREAU PACHETUL COMPLET
                <span className="material-symbols-outlined font-normal text-2xl">auto_awesome</span>
             </button>
             
             <button 
               onClick={handleClose}
               className="text-slate-400 hover:text-slate-600 font-bold text-sm tracking-wide py-2 transition-colors uppercase"
             >
                Nu, mersi. Rămân la un subiect.
             </button>
          </div>
        </div>
        
        {/* Secure Checkout Trust Signal */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center justify-center gap-6">
           <div className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Plată Securizată</span>
           </div>
           <div className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Acces Instant</span>
           </div>
        </div>
      </div>
    </div>
  );
}
