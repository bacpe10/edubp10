"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

import { BUNDLE_DETAILS, PRICES } from "@/constants/products";
import FAQ from "@/components/FAQ";

export default function Pachet() {
  const { addToCart } = useCart();
  const [selectedTier, setSelectedTier] = useState<"test-simplu" | "test-rezolvat">("test-rezolvat");

  const currentPrice = selectedTier === "test-simplu" ? PRICES.BUNDLE_STANDARD : PRICES.BUNDLE_PLUS;

  const handleAddToCart = () => {
    addToCart({
      id: `bundle-${selectedTier}`,
      name: selectedTier === "test-rezolvat" ? BUNDLE_DETAILS.plusName : BUNDLE_DETAILS.standardName,
      price: currentPrice,
      icon: BUNDLE_DETAILS.icon,
      colorClass: selectedTier === "test-rezolvat" ? BUNDLE_DETAILS.colorClassPlus : BUNDLE_DETAILS.colorClassStandard
    });
  };

  return (
    <div className="relative flex h-auto w-full flex-col bg-surface group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">

            <main className="flex-1 flex flex-col items-center py-12">
              <div className="max-w-3xl w-full flex flex-col gap-10">

                {/* Hero Section with Scarcity */}
                <div className="text-center flex flex-col items-center gap-4">
                  <div className="flex gap-2 items-center">
                    <span className="bg-red-600 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full animate-pulse">
                      Exclusiv Bac 2026
                    </span>
                    <span className="inline-block bg-warning text-yellow-900 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
                      Pregătire Eficientă
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight text-text-main font-display">
                    BAC-ul 2026, <br />
                    <span className="text-primary">Gata Rezolvat</span>
                  </h1>
                  <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                    Nu te mai chinui cu învățatul. Ai toate cele 3 materii de bază <span className="text-primary font-black">rezolvate integral</span> + Limba Engleză GRATUIT.
                  </p>

                  {/* Social Proof */}
                  <div className="flex items-center gap-2 mt-2 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                          <img src={`/images/avatars/avatar${i}.png`} alt="Student" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-600 tracking-tight">Peste 1,200 de elevi au reușit cu noi anul trecut!</span>
                  </div>
                </div>

                {/* High Conversion Pricing Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* Anchor Price (Separately) */}
                  <div className="bg-white/60 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center gap-2 grayscale opacity-60">
                    <h3 className="text-xs uppercase tracking-widest font-black text-slate-400">Preț Standard</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-slate-400 line-through decoration-red-400 decoration-2">946 MDL</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Cumpărate individual</p>
                  </div>

                  {/* Main Offer (Bundle) */}
                  <div className="bg-white rounded-2xl border-2 border-primary shadow-2xl p-8 flex flex-col items-center justify-center gap-3 relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-blue-400"></div>
                    <div className="bg-primary text-white text-[10px] font-black uppercase px-4 py-1 absolute top-4 right-[-30px] rotate-45 w-[150px] text-center shadow-sm">
                      Economie 58%
                    </div>

                    <h3 className="text-lg font-black text-primary uppercase tracking-tighter">
                      Preț Pachet Standard
                    </h3>
                    <div className="flex flex-col items-center gap-0">
                      <span className="text-5xl font-black text-text-main tracking-tighter">{PRICES.BUNDLE_STANDARD} MDL</span>
                      <span className="text-accent font-black text-sm uppercase mt-1">Economisești {946 - PRICES.BUNDLE_STANDARD} MDL</span>
                    </div>
                  </div>
                </div>

                {/* What's Included - Value Stack */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                    <span className="material-symbols-outlined text-[120px]">school</span>
                  </div>
                  <h3 className="text-xl font-black text-text-main mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">inventory_2</span>
                    </span>
                    Ce primești în acest pachet:
                  </h3>
                  <ul className="grid grid-cols-1 gap-6">
                    <li className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 aspect-square shadow-sm shadow-blue-200">
                        <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-text-main text-lg leading-none mb-1">Toate Variantele Matematica Rezolvate</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">Fiecare problemă este complet rezolvată după barem. Doar urmezi pașii pe care i-am scris noi deja.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 aspect-square shadow-sm shadow-blue-200">
                        <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-text-main text-lg leading-none mb-1">Română: Eseuri Structurate</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">Primești modele de eseuri care respectă 100% baremul oficial pentru Subiectul III.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 aspect-square shadow-sm shadow-blue-200">
                        <span className="material-symbols-outlined text-sm font-black" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-text-main text-lg leading-none mb-1">Materia la Alegere: Rezolvări Subiecte</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">Biologie, Istorie sau Geografie — subiectele ultimilor ani rezolvate integral de profesori.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200 border-dashed relative overflow-hidden">
                      <div className="absolute top-2 right-2 bg-primary text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full">Cadou</div>
                      <div className="mt-1 w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center flex-shrink-0 aspect-square shadow-sm">
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
                      </div>
                      <div>
                        <h4 className="font-black text-primary text-lg leading-none mb-1">
                          BONUS: Limba Engleză
                        </h4>
                        <p className="text-slate-500 text-xs">Toate variantele de Engleză incluse gratuit în acest pachet.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200 border-dashed text-warning">
                      <div className="mt-1 w-10 h-10 rounded-full bg-warning text-white flex items-center justify-center flex-shrink-0 aspect-square">
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                      </div>
                      <div>
                        <h4 className="font-black text-yellow-800 text-lg flex items-center gap-2 leading-none mb-1">
                          Pregătire Fără Stres
                        </h4>
                        <p className="text-yellow-700/80 text-xs">Cumperi azi pachetul și ai siguranța că ești gata pentru orice subiect de examen.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Decision Making Section */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-center font-black text-slate-400 uppercase tracking-widest text-xs">Alege Versiunea Ta</h3>
                    <div className="flex flex-col gap-4">
                      <div
                        onClick={() => setSelectedTier("test-simplu")}
                        className={`w-full relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 ${selectedTier === "test-simplu" ? "border-slate-800 bg-white shadow-xl translate-x-1" : "border-slate-200 bg-white/50 opacity-60 hover:opacity-100 grayscale hover:grayscale-0"}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTier === "test-simplu" ? "border-primary" : "border-slate-300"}`}>
                              {selectedTier === "test-simplu" && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                            </div>
                            <div>
                              <h3 className="font-bold text-text-main">Material Teoretic</h3>
                              <p className="text-slate-500 text-xs mt-0.5">Doar subiectele și suportul de bază fără rezolvări.</p>
                            </div>
                          </div>
                          <span className="font-black text-xl text-text-main">{PRICES.BUNDLE_STANDARD} MDL</span>
                        </div>
                      </div>

                      <div
                        onClick={() => setSelectedTier("test-rezolvat")}
                        className={`w-full relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 overflow-hidden ${selectedTier === "test-rezolvat" ? "border-primary bg-blue-50 shadow-btn shadow-primary/20 scale-[1.02]" : "border-slate-200 bg-white/50 opacity-60 hover:opacity-100 grayscale hover:grayscale-0"}`}
                      >
                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black uppercase px-6 py-1 rotate-0 shadow-sm rounded-bl-2xl">
                          Recomandat
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTier === "test-rezolvat" ? "border-primary" : "border-slate-300"}`}>
                              {selectedTier === "test-rezolvat" && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                            </div>
                            <div>
                              <h3 className="font-black text-lg text-primary leading-tight">Pachet Premium <span className="text-text-main">(Gata Rezolvat)</span></h3>
                              <p className="text-slate-600 text-xs mt-1 font-medium leading-relaxed italic">
                                Scapi de efort: Include testele rezolvate integral + Baremuri.
                              </p>
                            </div>
                          </div>
                          <span className="font-black text-2xl text-primary">{PRICES.BUNDLE_PLUS} MDL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final Mega CTA */}
                  <div className="flex flex-col gap-4 mt-4">
                    <button
                      onClick={handleAddToCart}
                      className="group w-full bg-primary hover:bg-blue-700 text-white font-black h-[72px] rounded-2xl shadow-[0_20px_40px_-10px_rgba(36,99,235,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 mb-2 text-xl flex items-center justify-center gap-4"
                    >
                      <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">shopping_cart</span>
                      ADĂUGA ÎN COȘ — {currentPrice} MDL
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-xs">lock</span>
                      Plată securizată prin Asistență Prioritară sau Crypto
                    </p>
                  </div>

                  {/* Trust Footer */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 flex-1">
                      <div className="text-primary flex-shrink-0 bg-white size-10 rounded-full flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-text-main text-sm">Garanția Calității</h4>
                        <p className="text-slate-500 text-[11px]">Dacă materialele nu corespund așteptărilor, contactează-ne pentru suport sau retur.</p>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-4 flex-1">
                      <div className="text-green-600 flex-shrink-0 bg-white size-10 rounded-full flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-text-main text-sm">Primire Instantă</h4>
                        <p className="text-slate-500 text-[11px]">Materialele ajung în format PDF pe email-ul tău în secunda următoare plății.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <FAQ />
              </div>
            </main>

          </div>
        </div>
      </div>
    </div>
  );
}