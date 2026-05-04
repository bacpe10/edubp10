"use client";

import { getSubjectPrice, PRICES } from "@/constants/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { use, useMemo, useState } from "react";

export default function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const [showUpsell, setShowUpsell] = useState(false);

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
    if (selectedTier === "test-simplu") {
      setShowUpsell(true);
    } else {
      performAddToCart("test-rezolvat");
    }
  };

  const performAddToCart = (tier: "test-simplu" | "test-rezolvat") => {
    const price = getSubjectPrice(resolvedParams.id, tier);
    addToCart({
      id: `${resolvedParams.id}-${tier}`,
      name: `Document PDF: ${subjectName} ${tier === "test-rezolvat" ? "(+ Rezolvări)" : "(Test Simplu)"}`,
      price: price,
      icon: "picture_as_pdf",
      colorClass: tier === "test-rezolvat" ? "bg-warning text-yellow-900" : "bg-blue-50 text-primary"
    });
    setShowUpsell(false);
  };

  return (
    <div className="bg-background-light text-background-dark font-sans antialiased selection:bg-primary selection:text-white">
      <div className="w-full bg-[#f8f9fc] border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <Link className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors" href="/">Acasă</Link>
            <span className="text-slate-300 text-[10px]">/</span>
            <Link className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors" href="/catalog">Catalog</Link>
            <span className="text-slate-300 text-[10px]">/</span>
            <span className="text-slate-900 text-[10px] font-black uppercase tracking-widest">{subjectName}</span>
          </div>
        </div>
      </div>

      {/* Main Single Subject Page Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 pb-24 mt-4 md:mt-8 relative z-10">
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
                <div className="w-full bg-slate-100 relative aspect-[2/3] sm:aspect-[3/4] overflow-hidden rounded-b-xl border-t border-slate-100">
                  {hasOfficialPreview ? (
                    <div className="w-full h-full bg-white relative">
                      {/* Scrolling Content Layer */}
                      <div className="w-full h-full overflow-y-auto scrollbar-hide">
                        <iframe
                          src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=100`}
                          className="w-full h-[150%] border-none select-none"
                          title="PDF Preview"
                        />
                        {/* Buffer space so content isn't hidden forever behind the bar */}
                        <div className="h-64 w-full"></div>
                      </div>

                      {/* Fixed Bottom Overlay */}
                      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center">
                        <div className="w-full h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
                        <div className="w-full bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                              <span className="material-symbols-outlined text-[20px]">lock</span>
                            </div>
                            <div className="text-left">
                              <h3 className="text-slate-900 text-sm font-black uppercase tracking-tight leading-none">Previzualizare Limitată</h3>
                              <p className="text-slate-500 text-[11px] font-bold mt-1">Deblochează materialele complete cu rezolvările oficiale.</p>
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
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`/images/avatars/avatar${i}.png`} alt="Student" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-black text-slate-700 tracking-tight"><span className="text-green-600 animate-pulse">● 14 elevi</span> se uită acum</p>
                </div>
                <div className="bg-blue-50 text-primary text-[10px] font-black tracking-widest uppercase px-3 py-1 inline-block rounded-full mb-3 border border-blue-100">
                  Format PDF • Acces Instant
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-black text-slate-900 font-display mb-3 tracking-tighter">Variante Examen: {subjectName}</h1>

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
                      <p className="text-slate-500 text-sm mt-1 ml-7">Primești subiectele oficiale în format PDF, pregătite pentru print.</p>
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
                        <strong>Metoda Sigură!</strong> Primești subiectele oficiale plus rezolvările complete explicate pe barem. Știi exact ce să scrii pentru nota 10.
                      </p>
                    </div>
                    <span className="font-black text-xl text-primary">{getSubjectPrice(resolvedParams.id, 'test-rezolvat')} MDL</span>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col gap-6 mt-auto border-t border-slate-100 pt-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full h-[70px] bg-primary text-white text-xl font-black rounded-2xl shadow-lg shadow-primary/25 hover:bg-blue-700 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
                >
                  <span className="material-symbols-outlined font-normal text-2xl group-hover:rotate-12 transition-transform">shopping_bag</span>
                  Vreau Materialele — {currentPrice} MDL
                </button>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-xl">verified_user</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plată Securizată</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-xl">bolt</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Acces Instant</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-xl">support_agent</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Suport 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total</span>
          <span className="text-xl font-black text-slate-900">{currentPrice} MDL</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 h-14 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          Cumpără Acum <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>

      {/* High Conversion Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={() => setShowUpsell(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl animate-float-in">
            <div className="bg-primary p-8 text-center text-white relative overflow-hidden">
              <div className="bg-white/20 backdrop-blur-md inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Ofertă Specială</div>
              <h3 className="text-2xl font-black leading-tight tracking-tight mb-2 italic">Așteaptă puțin! 👋</h3>
              <p className="text-blue-100 font-medium opacity-90">84% dintre colegii tăi aleg varianta cu Rezolvări incluse.</p>
            </div>

            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </div>
                  <div>
                    <p className="font-black text-slate-800 leading-none mb-1">Nota 10 garantată pe barem</p>
                    <p className="text-slate-500 text-xs font-medium">Vezi exact pașii pe care îi punctează profesorii.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                  </div>
                  <div>
                    <p className="font-black text-slate-800 leading-none mb-1">Economisești zeci de ore</p>
                    <p className="text-slate-500 text-xs font-medium">Nu mai căuta răspunsurile. Le ai gata scrise.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <button
                  onClick={() => performAddToCart("test-rezolvat")}
                  className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 text-lg"
                >
                  DA, VREAU REZOLVĂRILE (+50 MDL)
                  <span className="material-symbols-outlined">bolt</span>
                </button>
                <button
                  onClick={() => performAddToCart("test-simplu")}
                  className="w-full h-14 bg-slate-50 text-slate-400 font-bold rounded-2xl hover:bg-slate-100 transition-colors text-sm"
                >
                  Nu mulțumesc, rămân la Testul Simplu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
