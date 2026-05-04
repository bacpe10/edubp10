"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Acasă", href: "/" },
    { name: "Catalog", href: "/catalog" },
    { name: "Pachete", href: "/pachet" },
  ];

  const isCheckout = pathname === "/checkout";
  if (pathname === "/succes") return null;

  return (
    <header 
      className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out px-4 md:px-10 flex items-center justify-between border-b ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-slate-200/60 py-3 shadow-lg shadow-slate-200/20" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-text-main group group-hover:scale-[1.02] transition-transform duration-300">
          <img 
            src="/images/logo.svg" 
            alt="Bac pe 10 Logo" 
            className="h-10 w-auto group-hover:scale-110 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-black tracking-tighter text-text-main leading-none">Bac pe 10</h2>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-0.5">Bac 2026</span>
          </div>
        </Link>
        
        {!isCheckout ? (
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    className={`relative text-sm font-bold transition-all duration-300 hover:text-primary ${
                      isActive ? "text-primary" : "text-slate-600"
                    }`} 
                    href={link.href}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in"></span>
                    )}
                  </Link>
                );
              })}
            </nav>
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center justify-center gap-2 rounded-full h-12 px-6 bg-white border border-slate-200 text-text-main text-sm font-bold shadow-sm hover:shadow-md hover:border-primary/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <div className="relative">
                <span className="material-symbols-outlined text-[22px] text-slate-600 group-hover:text-primary transition-colors">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span>Coșul tău</span>
            </button>
          </div>
        ) : (
          <Link 
            href="/catalog" 
            className="hidden md:flex items-center gap-2 text-slate-500 hover:text-primary text-sm font-bold transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            Înapoi la Catalog
          </Link>
        )}
        
        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-3 relative z-[110]">
          {!isCheckout ? (
            <>
              <button 
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-700 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <button 
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
            </>
          ) : (
            <Link 
              href="/catalog" 
              className="text-slate-500 font-bold text-xs flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Înapoi
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] transition-all duration-300 md:hidden">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" 
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out animate-slide-in-right">
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-10">
              <span className="text-xl font-black tracking-tighter text-text-main leading-none">Meniu</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`p-4 rounded-2xl text-base font-bold transition-all ${
                      isActive ? "bg-blue-50 text-primary" : "text-slate-600 hover:bg-slate-50"
                    }`} 
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-10 border-t border-slate-100">
               <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-4 rounded-2xl bg-primary text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
               >
                 <span className="material-symbols-outlined">shopping_cart</span>
                 Vezi Coșul ({totalItems})
               </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </header>
  );
}
