"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CheckoutPage() {
  const { items } = useCart();
  const [showCrypto, setShowCrypto] = useState(false);
  const [cryptoType, setCryptoType] = useState("usdt");
  const [rates, setRates] = useState<any>(null);
  const [loadingRates, setLoadingRates] = useState(false);

  const hasBundle = items.some(i => i.id.toString().includes("bundle"));
  
  // If bundle is present, we often just charge the bundle price (399 or 499)
  // For simplicity and matching the UI summary, let's calculate actual total if not bundle, 
  // or use the specialized logic if it's there.
  const finalPrice = items.reduce((acc, curr) => acc + curr.price, 0);

  // Generate dynamic message for Telegram
  const orderMessage = `Salut! 👋 Vreau să finalizez comanda pe BacPe10.md:\n\n${items.map(item => `• ${item.name} - ${item.price} MDL`).join('\n')}\n\n💰 Total de plată: ${finalPrice} MDL`;
  const encodedMessage = typeof window !== 'undefined' ? encodeURIComponent(orderMessage) : '';
  const telegramLink = `https://t.me/bacpe10?text=${encodedMessage}`;

  // Fetch live rates from Coinbase (1 MDL = X Crypto)
  const fetchRates = async () => {
    if (rates || loadingRates) return;
    setLoadingRates(true);
    try {
      const res = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=MDL");
      const data = await res.json();
      if (data?.data?.rates) {
        setRates(data.data.rates);
      }
    } catch (err) {
      console.error("Failed to fetch rates:", err);
    } finally {
      setLoadingRates(false);
    }
  };

  // Trigger fetch when crypto is enabled
  useEffect(() => {
    if (showCrypto && !rates && !loadingRates) {
      fetchRates();
    }
  }, [showCrypto, rates, loadingRates]);

  const logSent = useRef(false);

  // Log checkout access
  useEffect(() => {
    if (items.length > 0 && !logSent.current) {
      logSent.current = true;
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'checkout',
          message: `Cart Items:\n${items.map(i => `• ${i.name} (${i.price} MDL)`).join('\n')}\n\nTotal: *${finalPrice} MDL*`
        })
      }).catch(err => console.error('Logging error:', err));
    }
  }, [items.length]); // Track items.length in case cart updates while on page

  const getCryptoAmount = (mdl: number, type: string) => {
    if (!rates) {
      // Fallback static rates if API is down
      const usd = mdl / 18.2;
      switch (type) {
        case "usdt": return usd.toFixed(2);
        case "btc": return (usd / 64000).toFixed(6);
        case "eth": return (usd / 3400).toFixed(5);
        case "sol": return (usd / 140).toFixed(4);
        default: return "0";
      }
    }

    const rate = parseFloat(rates[type.toUpperCase()]);
    if (!rate) return "0";
    
    // MDL * (Crypto/MDL) = Crypto amount
    const amount = mdl * rate;

    switch (type) {
      case "usdt": return amount.toFixed(2);
      case "btc": return amount.toFixed(7);
      case "eth": return amount.toFixed(6);
      case "sol": return amount.toFixed(5);
      default: return amount.toString();
    }
  };

  const cryptoAmount = getCryptoAmount(finalPrice, cryptoType);

  if (items.length === 0) {
    return (
      <div className="bg-surface min-h-screen flex flex-col text-text-main overflow-x-hidden">
        <div className="layout-container px-4 md:px-10 lg:px-40 py-5 mx-auto w-full max-w-[1200px] flex-1 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center text-center mt-20">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">remove_shopping_cart</span>
                <h1 className="text-3xl font-black mb-4">Coșul tău este gol</h1>
                <Link href="/catalog" className="text-primary font-bold bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100 transition-colors">
                  Înapoi la Pachete
                </Link>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen flex flex-col text-text-main">
      <div className="layout-container px-4 md:px-6 lg:px-28 py-5 mx-auto w-full max-w-[1200px] flex-1 flex flex-col">
        
        <main className="flex-1 mt-4 mb-20 animate-fade-in">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">Securizează Pachetul</h1>
            <p className="text-muted text-sm md:text-base mt-2">Alege metoda de plată pentru a primi instant accesul la materiale.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Form / Payment Selection Section */}
            <div className="flex-1 flex flex-col gap-6 order-2 lg:order-1">
                
                {/* Sistem de Alerta Pierdere Reducere (Social Proof & Scarcity) */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 bg-red-500 h-full"></div>
                   <div className="bg-red-100 text-red-600 rounded-full p-2 mt-0.5 animate-pulse flex-shrink-0">
                     <span className="material-symbols-outlined text-[20px]">timer</span>
                   </div>
                   <div>
                     <h3 className="font-black text-red-800 text-lg leading-tight mb-1">Atenție: Volum Masiv de Comenzi!</h3>
                     <p className="text-red-700/90 text-sm font-medium leading-relaxed">
                       Peste <span className="font-bold underline">340+ de elevi</span> au achiziționat pachete în ultimele ore. Din motive de securitate împotriva fraudelor automate, <strong className="text-red-900">procesatorul automat de carduri a fost temporar restricționat</strong>. 
                     </p>
                     <p className="text-red-700/90 text-sm font-medium leading-relaxed mt-2">
                       Pentru a nu pierde reducerea ta, folosește <strong className="text-red-900 shadow-sm bg-red-100 px-1 rounded">Plata Manuală Asistată</strong> sau Crypto de mai jos.
                     </p>
                   </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6">
                  <h2 className="text-xl font-black text-text-main flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                    Metode de Plată Disponibile
                  </h2>

                  {/* Card💳 (Indisponibil) - anchors that card is currently down specifically, validating the scarcity */}
                  <div className="relative overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50 p-5 opacity-60 grayscale cursor-not-allowed">
                    <div className="flex justify-between items-center mb-1">
                       <div className="flex items-center gap-4">
                         <span className="material-symbols-outlined text-4xl text-slate-500">credit_card</span>
                         <div>
                            <h3 className="font-bold text-slate-700">Card Bancar Automat</h3>
                            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide">Visa / Mastercard / Apple Pay</p>
                         </div>
                       </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100 w-fit">
                        <span className="material-symbols-outlined text-[14px]">block</span>
                        SISTEM SUPRASOLICITAT - BLOCAT TEMPORAR
                    </div>
                  </div>

                  <div className="flex items-center gap-4 my-2">
                     <div className="h-px bg-slate-200 flex-1"></div>
                     <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Alternative Securizate</span>
                     <div className="h-px bg-slate-200 flex-1"></div>
                  </div>

                  {/* Priority Support - Telegram / Tiktok */}
                  <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-blue-50/40 p-6 shadow-btn shadow-blue-500/10 transform transition-all hover:border-blue-500 hover:bg-blue-50/80">
                     <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-2xl shadow-sm">Super Rapid</div>
                     <h3 className="font-black text-xl text-primary mb-2 flex items-center gap-2">
                       <span className="material-symbols-outlined text-2xl">support_agent</span>
                       Plată Manuală Asistată 
                     </h3>
                     <p className="text-sm text-slate-700 font-medium mb-6 leading-relaxed">
                       Ocolește blocajul sistemului. Scrie-ne direct și îți confirmăm plata în sub <span className="font-bold text-text-main bg-white px-1.5 py-0.5 rounded shadow-sm border border-slate-200">3 minute</span>. Acceptăm <strong className="text-text-main">Visa</strong>, <strong className="text-text-main">Mastercard</strong> prin link de plată asistat.
                     </p>

                     <div className="grid gap-3">
                       <a 
                         href={telegramLink} 
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-center gap-3 bg-[#229ED9] hover:bg-[#1c88ba] text-white font-black text-sm uppercase tracking-wide py-4.5 rounded-xl shadow-[0_8px_16px_-6px_rgba(34,158,217,0.5)] transition-transform hover:-translate-y-1 active:scale-95"
                       >
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                         Confirmă pe Telegram
                       </a>
                       <a 
                         href="https://tiktok.com/@bacpe10" 
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white font-black text-sm uppercase tracking-wide py-4.5 rounded-xl shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1 active:scale-95"
                       >
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.18-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.41-5.46.02-2.33 1.15-4.46 3.06-5.69 1.18-.75 2.58-1.08 3.98-1.05v4.06c-.63-.04-1.27.14-1.81.48-.95.59-1.53 1.67-1.46 2.78.05 1.12.63 2.15 1.58 2.72.76.47 1.69.6 2.55.37.94-.25 1.75-.95 2.05-1.9.15-.43.2-.88.19-1.33.01-4.52-.02-9.05.02-13.57.01-.13-.01-.26-.02-.39z"/></svg>
                         Confirmă pe TikTok
                       </a>
                     </div>
                  </div>

                  {/* Crypto 🔗 */}
                  <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${showCrypto ? "border-slate-800 bg-slate-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <div 
                      className="p-5 cursor-pointer flex items-center justify-between"
                      onClick={() => setShowCrypto(!showCrypto)}
                    >
                       <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${showCrypto ? "bg-slate-800" : "bg-slate-300"}`}>
                           <span className="material-symbols-outlined text-2xl">currency_bitcoin</span>
                         </div>
                         <div>
                            <h3 className={`font-black tracking-tight ${showCrypto ? "text-slate-900" : "text-slate-600"}`}>Plată Crypto</h3>
                            <p className="text-[11px] font-bold uppercase text-slate-400 mt-0.5">USDT, BTC, ETH, SOL & Altele</p>
                         </div>
                       </div>
                       <span className={`material-symbols-outlined transition-transform duration-300 ${showCrypto ? "rotate-180 text-slate-800" : "text-slate-400"}`}>
                          keyboard_arrow_down
                       </span>
                    </div>
                    
                    {showCrypto && (
                      <div className="px-5 pb-5 animate-fade-in">
                         {/* Crypto Selector Chips */}
                         <div className="flex flex-wrap gap-2 mb-5">
                            {[
                              { id: "usdt", name: "USDT", sub: "TRC20", color: "text-emerald-600 bg-emerald-50" },
                              { id: "btc", name: "BTC", sub: "Bitcoin", color: "text-orange-600 bg-orange-50" },
                              { id: "eth", name: "ETH", sub: "Ethereum", color: "text-indigo-600 bg-indigo-50" },
                              { id: "sol", name: "SOL", sub: "Solana", color: "text-purple-600 bg-purple-50" },
                              { id: "other", name: "Altele", sub: "Contact", color: "text-slate-600 bg-slate-100" }
                            ].map((coin) => (
                              <button
                                key={coin.id}
                                onClick={() => setCryptoType(coin.id)}
                                className={`flex-1 min-w-[80px] p-2 rounded-xl border-2 transition-all text-center ${
                                  cryptoType === coin.id 
                                  ? "border-slate-800 bg-white shadow-sm scale-105" 
                                  : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                              >
                                <div className={`text-[10px] font-black uppercase mb-0.5 ${coin.color} px-1.5 py-0.5 rounded-md inline-block`}>{coin.name}</div>
                                <div className="text-[9px] font-bold text-slate-500 whitespace-nowrap">{coin.sub}</div>
                              </button>
                            ))}
                         </div>

                         {cryptoType !== "other" ? (() => {
                           const address = 
                             cryptoType === "usdt" ? "TThFVUu9QLszG8XWaCiUeVFNqzPKn4n17Q" :
                             cryptoType === "btc" ? "bc1q2w0vd54s4esvhkflefwx3agj58822vv6ltsul9" :
                             cryptoType === "eth" ? "0x38579CACc176bA4E31e09dceDa96D3C3672058ca" :
                             "BU39pFtCUPSpNJCT9DddcYA23XMdCTpeXrZGXaWGoPNF";

                           return (
                             <>
                               {/* QR Code Section */}
                               <div className="flex flex-col items-center mb-5 animate-fade-in" key={cryptoType}>
                                  <div className="bg-white p-3 rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <img 
                                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${address}`} 
                                      alt={`QR code for ${cryptoType}`} 
                                      className="w-36 h-36 md:w-44 md:h-44"
                                    />
                                  </div>
                                  <div className="mt-3 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
                                    Scanează pentru plată
                                  </div>
                               </div>

                               <div className="bg-white p-4 rounded-xl border border-slate-200 mb-3 text-center shadow-sm">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                                    Adresă {cryptoType.toUpperCase()} ({
                                      cryptoType === "usdt" ? "Rețeaua TRC20" : 
                                      cryptoType === "btc" ? "Rețeaua Bitcoin" : 
                                      cryptoType === "eth" ? "Rețeaua Ethereum" : "Rețeaua Solana"
                                    })
                                  </p>
                                  <code className="text-sm md:text-base font-black text-slate-800 flex items-center justify-center gap-2 select-all relative group break-words text-center">
                                    {address}
                                    <span 
                                      className="material-symbols-outlined text-sm text-slate-400 cursor-pointer hover:text-primary active:scale-90 transition-transform"
                                      onClick={() => {
                                        navigator.clipboard.writeText(address);
                                      }}
                                    >
                                      content_copy
                                    </span>
                                  </code>
                               </div>
                               
                               <div className="flex items-start gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg border border-yellow-200 text-xs font-medium">
                                  <span className="material-symbols-outlined text-[16px] text-yellow-600">info</span>
                                  <div>
                                    <p>
                                      Trimite fix {loadingRates ? (
                                        <span className="animate-pulse inline-block w-16 h-3 bg-yellow-200 rounded mx-1"></span>
                                      ) : (
                                        <strong className="font-black text-yellow-900">{cryptoAmount} {cryptoType.toUpperCase()}</strong>
                                      )} la adresa de mai sus.
                                    </p>
                                    <p className="mt-1 opacity-80 italic text-[10px]">Prețul cuprinde conversia exactă în timp real.</p>
                                    <p className="mt-2 opacity-80 italic">După confirmare, contactează-ne pe Telegram sau TikTok pentru livrarea instantă.</p>
                                  </div>
                               </div>
                             </>
                           );
                         })() : (
                           <div className="bg-slate-800 p-6 rounded-xl text-center">
                              <h4 className="text-white font-black mb-2">Plată cu alt Crypto?</h4>
                              <p className="text-slate-300 text-xs mb-4">Acceptăm LTC, XMR, BNB și multe altele. Scrie-ne pe Telegram sau TikTok pentru a primi o adresă de plată personalizată.</p>
                              <a 
                                href={telegramLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-[#229ED9] hover:bg-[#1c88ba] text-white font-black text-sm uppercase tracking-wide py-4.5 rounded-xl shadow-[0_8px_16px_-6px_rgba(34,158,217,0.5)] transition-transform hover:-translate-y-1 active:scale-95"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                                Contactează pe Telegram
                              </a>
                           </div>
                         )}
                      </div>
                    )}
                  </div>

                </div>
                
                {/* Trust Footer at bottom of options */}
                <div className="flex items-center justify-center gap-6 mt-2 opacity-60">
                   <div className="flex items-center gap-1 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                     <span className="material-symbols-outlined text-[14px]">lock</span> Complet Securizat
                   </div>
                   <div className="flex items-center gap-1 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                     <span className="material-symbols-outlined text-[14px]">verified</span> Garanție 14 Zile
                   </div>
                   <div className="flex items-center gap-1 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                     <span className="material-symbols-outlined text-[14px]">bolt</span> Livrare Instantă
                   </div>
                </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:w-[380px] order-1 lg:order-2">
              <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 sticky top-20 shadow-2xl shadow-slate-900/20">
                <h3 className="font-black text-2xl mb-6 flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm flex-shrink-0 aspect-square">
                    <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
                  </div>
                  Rezumat Pachet
                </h3>
                
                <div className="space-y-5 mb-8">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.colorClass} shadow-inner flex-shrink-0 aspect-square`}>
                          <span className="material-symbols-outlined text-[24px] text-current">{item.icon}</span>
                        </div>
                        <span className="font-bold text-sm leading-tight text-slate-200 max-w-[190px]">{item.name}</span>
                      </div>
                      <span className="font-black text-lg">{item.price} MDL</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-700 pt-6 mb-6 space-y-3">
                  <div className="flex justify-between text-slate-400 text-sm font-medium">
                    <span>Valoare Nominală Totală</span>
                    <span className="line-through">946 MDL</span>
                  </div>
                  <div className="flex justify-between text-green-400 text-sm font-black">
                    <span>Reducere Scarcity (-{Math.round((1 - finalPrice / 946) * 100)}%)</span>
                    <span>-{946 - finalPrice} MDL</span>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total de plată</span>
                    <span className="font-black text-4xl leading-none text-white">{finalPrice} <span className="text-xl text-primary">MDL</span></span>
                  </div>
                </div>
                
                {/* Additional trust signal in summary */}
                 <div className="mt-8 bg-slate-800 rounded-xl p-4 flex gap-3 border border-slate-700">
                    <span className="material-symbols-outlined text-green-400">check_circle</span>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      Ești acoperit de garanția noastră de retur 100% în caz de nereușită. Ne asumăm tot riscul în locul tău.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* STEALTH LEGAL LAYER - "The Loophole" */}
          <div className="mt-20 pt-10 border-t border-slate-50 select-none">
            <div className="flex flex-col gap-1 opacity-[0.03] hover:opacity-100 transition-opacity duration-1000 cursor-default">
              <span className="text-[8px] font-mono text-slate-400">TX_COMPLIANCE_ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}</span>
              <p className="text-[7px] leading-[1.4] text-slate-500 text-justify max-w-3xl font-medium uppercase tracking-tight">
                PROCESARE_DATE: UTILIZATORUL CONFIRMĂ CĂ TOATE MATERIALELE ȘI PRODUSELE AFIȘATE SUNT EXCLUSIV EXEMPLE DIDACTICE DESTINATE AJUTĂRII PROCESULUI DE ÎNVĂȚARE ȘI NU CONSTITUIE DOCUMENTE OFICIALE SAU CERTIFICĂRI. ACCESAREA SITE-ULUI REPREZINTĂ ACORDUL PRIVIND NATURA SIMULATĂ ȘI EDUCAȚIONALĂ A SERVICIULUI. TRANZACȚIA ESTE O DONAȚIE PENTRU SUSȚINEREA INFRASTRUCTURII ȘI ASISTENȚĂ DIDACTICĂ, MATERIALELE FIIND OFERITE &quot;CA ATARE&quot; PENTRU STUDIU INDIVIDUAL.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
