"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { use, useMemo, useState } from "react";
import { getSubjectPrice, PRICES } from "@/constants/products";

export default function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();

  // Marketing: Standard vs Premium Tier Selection
  const [selectedTier, setSelectedTier] = useState<"test-simplu" | "test-rezolvat">("test-rezolvat");

  const subjectName = useMemo(() => {
    return resolvedParams.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }, [resolvedParams.id]);

  const PREVIEWS: Record<string, string> = {
    "romana-real": "/previews/12_llro_test_r_sb26.pdf",
    "romana-uman": "/previews/12_llro_test_u_sb26.pdf",
    "matematica-real": "/previews/12_mat_test_r_ro_sb26.pdf",
    "matematica-uman": "/previews/12_mat_test_u_ro_sb26.pdf",
    "istorie-real": "/previews/12_ist_test_r_ro_sb26.pdf",
    "istorie-uman": "/previews/12_ist_test_u_ro_sb26.pdf",
    "geografie": "/previews/12_geo_test_ro_sb26.pdf",
    "engleza": "/previews/12_len_test_sb26.pdf",
    "rusa-real": "/previews/12_llru_test_r_sb26.pdf",
    "rusa-uman": "/previews/12_llru_test_u_sb26.pdf",
  };

  const previewUrl = PREVIEWS[resolvedParams.id] || null;
  const hasOfficialPreview = !!previewUrl;

  const currentPrice = getSubjectPrice(resolvedParams.id, selectedTier);

  const handleAddToCart = () => {
    addToCart({
      id: `${resolvedParams.id}-${selectedTier}`,
      name: `Document PDF: ${subjectName} ${selectedTier === "test-rezolvat" ? "(+ Rezolvări)" : "(Test Simplu)"}`,
      price: currentPrice,
      icon: "picture_as_pdf", // Explicit PDF icon
      colorClass: selectedTier === "test-rezolvat" ? "bg-warning text-yellow-900" : "bg-blue-50 text-primary"
    });
  };

  return (
    <div className="bg-background-light text-background-dark font-sans antialiased selection:bg-primary selection:text-white">
      {/* Shared Component: TopNavBar */}
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#f8f9fc] group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">


              <div className="flex flex-wrap gap-2 p-4 mt-4">
                <Link className="text-[#4d6599] text-base font-medium leading-normal hover:underline" href="/">Acasă</Link>
                <span className="text-[#4d6599] text-base font-medium leading-normal">/</span>
                <Link className="text-[#4d6599] text-base font-medium leading-normal hover:underline" href="/catalog">Documente PDF</Link>
                <span className="text-[#4d6599] text-base font-medium leading-normal">/</span>
                <span className="text-[#0e121b] text-base font-medium leading-normal">{subjectName}</span>
              </div>

              <div className="flex w-full grow bg-[#f8f9fc] p-4">
                <div className="w-full gap-1 overflow-hidden bg-[#f8f9fc] aspect-[2/3] md:aspect-[3/1] rounded-xl flex">
                  <div
                    className="w-full bg-center bg-no-repeat bg-cover rounded-xl flex-1 bg-blue-100"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjSTY7k5R9rQKlYwRHcZeHaNJ0rv8rNEOuLMB_p-Ji1sFnnWDOTzq0uDs7QZi-375iP96cznv5fK1_BQ_p7SiqlD2M9cvUs0bYulkxna3gcbnbzVxeGEbuw27I44AMkclMjU16E0SevutCmfcvQvRdJTH6PgPkct2VZB6ap8f2vXeSLJjTkQbR-OE1ruA5FNr0dyLZIB_HZxyWXblllySHGcD0zSW_7SFM6AE6jOgPRId6LY5vRAbCWGxUS9pz77gJpeLctpTNiUox")' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Single Subject Page Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 pb-24 -mt-[300px] md:-mt-[400px] lg:-mt-[600px] relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left Column: Product Visuals & Mockup */}
          <div className="w-full lg:w-5/12">
            <div className="sticky top-8 flex flex-col gap-6">
              <div className="w-full rounded-2xl bg-white shadow-soft border border-gray-100 overflow-hidden relative group p-1 flex flex-col">
                {/* Visual PDF Frame */}
                <div className="w-full bg-slate-900 px-4 py-3 flex items-center justify-between rounded-t-xl">
                  <div className="flex gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-inner"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-inner"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-inner"></div>
                  </div>
                  <span className="text-white text-xs font-bold tracking-tight flex items-center gap-2 opacity-80">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    {previewUrl ? previewUrl.split('/').pop() : "Previzualizare_Document.pdf"}
                  </span>
                </div>

                {/* The Document Content */}
                <div className="w-full bg-slate-100 relative aspect-[3/4] overflow-hidden rounded-b-xl border-t border-slate-100">
                  {hasOfficialPreview ? (
                    <div className="w-full h-full bg-white relative">
                      {/* Scrolling Content Layer */}
                      <div className="w-full h-full overflow-y-auto scrollbar-hide">
                        <iframe
                          src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=100`}
                          className="w-full h-[120%] border-none select-none"
                          title="PDF Preview"
                        />
                        {/* Buffer space so content isn't hidden forever behind the bar */}
                        <div className="h-64 w-full"></div>
                      </div>

                      {/* Fixed Bottom Overlay */}
                      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center">
                        <div className="w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
                        <div className="w-full bg-white/95 backdrop-blur-md border-t border-slate-100 p-6 flex flex-col items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                                 <span className="material-symbols-outlined text-[20px]">lock</span>
                              </div>
                              <div className="text-left">
                                 <h3 className="text-slate-900 text-sm font-black uppercase tracking-tight leading-none">Previzualizare Limitată</h3>
                                 <p className="text-slate-500 text-[11px] font-bold mt-1">Deblochează toate cele 3 variante complete cu rezolvări.</p>
                              </div>
                           </div>

                           <button 
                             onClick={() => {
                               addToCart({
                                 id: `${resolvedParams.id}-test-rezolvat`, 
                                 name: `Document PDF: ${subjectName} (+ Rezolvări)`,
                                 price: getSubjectPrice(resolvedParams.id, 'test-rezolvat'),
                                 icon: "picture_as_pdf",
                                 colorClass: "bg-warning text-yellow-900"
                               });
                             }}
                             className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                           >
                              Deblochează Pachetul Complet
                              <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
                           </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-white p-8 flex flex-col">
                      <h2 className="text-[10px] font-bold text-center border-b-2 border-black pb-1 mb-4 uppercase tracking-tighter">Varianta Oficială de Examen • {subjectName.toUpperCase()}</h2>
                      <p className="text-xl font-black text-primary">{PRICES.BUNDLE_PLUS} MDL</p>
                      <h3 className="text-md font-bold mb-4 text-center">SUBIECTUL I (30 de puncte)</h3>

                      <div className="text-sm font-medium mb-2 leading-relaxed">
                        1. Găsiți valoarea parametrului real pentru care funcția atinge maximul.
                      </div>

                      <div className="flex-1 mt-2 space-y-3 blur-[4px] select-none opacity-60">
                        <div className="w-full h-4 bg-slate-400 rounded"></div>
                        <div className="w-5/6 h-4 bg-slate-400 rounded"></div>
                        <div className="w-full h-4 bg-slate-400 rounded"></div>
                        <div className="w-4/6 h-4 bg-slate-400 rounded"></div>
                        <br />
                        <div className="w-full h-4 bg-slate-400 rounded"></div>
                        <div className="w-1/2 h-4 bg-slate-400 rounded"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 transform -rotate-6">
                          <span className="material-symbols-outlined">lock</span> Previzualizare Restricționată
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Product Details & Psychological Upsell */}
          <div className="w-full lg:w-7/12 flex flex-col pt-2 lg:pt-8 bg-background-light lg:bg-transparent rounded-xl p-6 lg:p-0">
            <div className="mb-6 mt-10 lg:mt-0">
              <div className="bg-blue-50 text-primary text-xs font-black tracking-widest uppercase px-3 py-1 inline-block rounded-full mb-3 ml-1 border border-blue-100">
                Format PDF • Descărcare Instantă
              </div>
              <h1 className="text-[32px] sm:text-[38px] leading-tight font-black text-background-dark font-display mb-3">Variante Examen: {subjectName}</h1>
              <p className="mt-2 text-gray-600 text-lg leading-relaxed font-medium italic border-l-4 border-primary pl-4">
                Primești cele 3 variante oficiale de examen pregătite pentru BAC 2026. Înveți direct pe ce se va extrage, eliminând riscul și guesswork-ul.
              </p>
            </div>

            {/* Upsell Cards Selection */}
            <div id="pricing-section" className="flex flex-col gap-4 mb-8">
              {/* Basic Tier */}
              <div
                onClick={() => setSelectedTier("test-simplu")}
                className={`w-full relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200 ${selectedTier === "test-simplu" ? "border-slate-500 bg-slate-50 shadow-md" : "border-slate-100 bg-white hover:border-slate-300"}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedTier === "test-simplu" ? "border-slate-600" : "border-slate-300"}`}>
                        {selectedTier === "test-simplu" && <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>}
                      </div>
                      Pachet Standard (Doar Subiectele)
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 ml-7">Primești subiectele oficiale (cele 3 variante) fără rezolvări.</p>
                  </div>
                  <span className="font-black text-xl text-slate-700">{getSubjectPrice(resolvedParams.id, 'test-simplu')} MDL</span>
                </div>
              </div>

              {/* Premium Tier (Rezolvat) */}
              <div
                onClick={() => setSelectedTier("test-rezolvat")}
                className={`w-full relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200 overflow-hidden ${selectedTier === "test-rezolvat" ? "border-primary bg-blue-50/50 shadow-btn shadow-blue-500/20" : "border-slate-100 bg-white hover:border-blue-200"}`}
              >
                {/* Bestseller indicator */}
                <div className="absolute top-0 right-0 bg-warning text-yellow-900 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm">
                  Alegerea Nr. #1
                </div>

                <div className="flex items-start justify-between mt-1">
                  <div>
                    <h3 className="font-black text-lg text-primary flex items-center gap-2 uppercase">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedTier === "test-rezolvat" ? "border-primary" : "border-slate-300"}`}>
                        {selectedTier === "test-rezolvat" && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                      </div>
                      Pachet Plus (Subiecte + Rezolvări)
                    </h3>
                    <p className="text-slate-600 text-sm mt-1 ml-7 italic leading-relaxed">
                      <strong>Metoda Sigură!</strong> Primești cele 3 variante oficiale plus rezolvările complete explicate pe barem. Știi exact ce să scrii pentru nota 10.
                    </p>
                  </div>
                  <span className="font-black text-xl text-primary">{getSubjectPrice(resolvedParams.id, 'test-rezolvat')} MDL</span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col gap-4 mt-auto border-t border-slate-100 pt-6">
              <button
                onClick={handleAddToCart}
                className="w-full h-[60px] bg-primary text-white text-xl font-bold rounded-2xl shadow-[0_8px_20px_-6px_rgba(36,99,235,0.4)] hover:bg-blue-700 hover:shadow-[0_10px_25px_-5px_rgba(36,99,235,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined font-normal text-2xl">shopping_bag</span>
                Adaugă în coș — {currentPrice} MDL
              </button>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-green-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Livrare Auto pe Email
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-gray-400 text-[18px]">picture_as_pdf</span>
                  Compatibil Telefon/Laptop
                </div>
              </div>
            </div>

            {/* Syllabus Accordion / Information kept simple below */}
          </div>
        </div>
      </main >
    </div >
  );
}
