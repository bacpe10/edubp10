"use client";

import Link from "next/link";
import { useState } from "react";

import { BUNDLE_DETAILS, PRICES } from "@/constants/products";

const SUBJECTS = [
  {
    id: BUNDLE_DETAILS.id,
    name: `${BUNDLE_DETAILS.name} (Bestseller)`,
    desc: "Toate cele 3 variante oficiale + Rezolvările Premium pentru toate materiile tale.",
    price: PRICES.BUNDLE_PLUS,
    oldPrice: 946,
    profil: "Toate",
    materie: "Toate",
    isBundle: true,
    icon: "layers"
  },
  {
    id: "romana-real",
    name: "Limba Română (Real)",
    desc: "Eseuri structurate și teorie completă destinată cerințelor de la profilul Real.",
    price: 249,
    profil: "Real",
    materie: "Română",
    color: "red",
    icon: "menu_book",
    isBundle: false,
  },
  {
    id: "romana-uman",
    name: "Limba Română (Uman)",
    desc: "Viziuni despre lume și particularități complexe, aprofundate pentru Uman.",
    price: 249,
    profil: "Uman",
    materie: "Română",
    color: "red",
    icon: "menu_book",
    isBundle: false,
  },
  {
    id: "matematica-real",
    name: "Matematică (Real)",
    desc: "Exerciții și rezolvări detaliate pentru analiza și algebra de profil Real.",
    price: 249,
    profil: "Real",
    materie: "Matematică",
    color: "blue",
    icon: "calculate",
    isBundle: false,
  },
  {
    id: "matematica-uman",
    name: "Matematică (Uman)",
    desc: "Statistică, probabilități și ecuații simple adaptate profilului Uman.",
    price: 249,
    profil: "Uman",
    materie: "Matematică",
    color: "blue",
    icon: "calculate",
    isBundle: false,
  },
  {
    id: "istorie-real",
    name: "Istoria Românilor și Universală (Real)",
    desc: "Sinteze cronologice și subiecte rezolvate adaptate pentru profilul Real.",
    price: 249,
    profil: "Real",
    materie: "Istorie",
    color: "amber",
    icon: "account_balance",
    isBundle: false,
  },
  {
    id: "istorie-uman",
    name: "Istoria Românilor și Universală (Uman)",
    desc: "Sinteze cronologice și subiecte rezolvate aprofundate pentru profilul Uman.",
    price: 249,
    profil: "Uman",
    materie: "Istorie",
    color: "amber",
    icon: "account_balance",
    isBundle: false,
  },
  {
    id: "rusa-real",
    name: "Limba Rusă (Real)",
    desc: "Ghid complet pentru proba de limbă rusă, adaptat cerințelor de profil Real.",
    price: 249,
    profil: "Real",
    materie: "Rusă",
    color: "orange",
    icon: "language",
    isBundle: false,
  },
  {
    id: "rusa-uman",
    name: "Limba Rusă (Uman)",
    desc: "Analize literare și gramatică aprofundată pentru profilul Uman.",
    price: 249,
    profil: "Uman",
    materie: "Rusă",
    color: "orange",
    icon: "language",
    isBundle: false,
  },
  {
    id: "engleza",
    name: "Limba Engleză",
    desc: "Ghid de vocabular, gramatică și eseuri pentru examenul de limbă străină.",
    price: 249,
    profil: "Toate",
    materie: "Engleză",
    color: "purple",
    icon: "language",
    isBundle: false,
  },
  {
    id: "geografie",
    name: "Geografie",
    desc: "Hărți memorabile și explicații perfect structurate pentru nota 10.",
    price: 199,
    profil: "Toate",
    materie: "Geografie",
    color: "emerald",
    icon: "public",
    isBundle: false,
  },
  {
    id: "biologie",
    name: "Biologie",
    desc: "Anatomie umană și genetică reproducerii cu scheme logice.",
    price: 199,
    profil: "Real",
    materie: "Biologie",
    color: "emerald",
    icon: "biotech",
    isBundle: false,
  },
  {
    id: "chimie",
    name: "Chimie",
    desc: "Formule esențiale, reacții organice/anorganice rezolvate ușor.",
    price: 199,
    profil: "Real",
    materie: "Chimie",
    color: "cyan",
    icon: "science",
    isBundle: false,
  },
  {
    id: "fizica",
    name: "Fizică",
    desc: "Concepte fundamentale și probleme esențiale dezvoltate cap-coadă.",
    price: 199,
    profil: "Real",
    materie: "Fizică",
    color: "orange",
    icon: "bolt",
    isBundle: false,
  },
  {
    id: "informatica",
    name: "Informatică",
    desc: "Baze de date, algoritmi și programare C++ rezolvată vizual.",
    price: 199,
    profil: "Real",
    materie: "Informatică",
    color: "indigo",
    icon: "computer",
    isBundle: false,
  }
];

export default function Catalog() {
  const [filterProfil, setFilterProfil] = useState("Toate");
  const [filterMaterie, setFilterMaterie] = useState("Toate");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = SUBJECTS.filter((subject) => {
    // Profil match
    const matchProfil = filterProfil === "Toate" 
      || subject.profil === "Toate" 
      || subject.profil === filterProfil;
    
    // Materie match
    const matchMaterie = filterMaterie === "Toate" 
      || subject.materie === "Toate" 
      || subject.materie === filterMaterie;

    // Search match
    const matchSearch = searchQuery === "" 
      || subject.name.toLowerCase().includes(searchQuery.toLowerCase())
      || subject.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchProfil && matchMaterie && matchSearch;
  });

  const hasActiveFilters = filterProfil !== "Toate" || filterMaterie !== "Toate" || searchQuery !== "";

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">

            
            <div className="flex flex-col mb-10 mt-8 text-center px-4">
              <h1 className="text-text-main text-4xl font-black leading-tight tracking-tight mb-2">Pachete Bacalaureat 2026</h1>
              <p className="text-muted text-lg">Găsește ghidul perfect pentru profilul, și alege materia dorită.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 pb-20">
              {/* Sidebar Filters */}
              <aside className="lg:col-span-3 space-y-8">
                {/* Profil Filter */}
                <div className="bg-surface p-6 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-lg mb-4 text-text-main">Profil</h3>
                  <div className="space-y-3">
                    {["Toate", "Real", "Uman"].map(p => (
                      <label key={p} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          checked={filterProfil === p}
                          onChange={() => setFilterProfil(p)}
                          className="form-radio text-primary focus:ring-primary h-5 w-5 border-slate-300" 
                          name="profil" 
                          type="radio" 
                        />
                        <span className="text-muted group-hover:text-text-main font-medium transition-colors">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Materie Filter */}
                <div className="bg-surface p-6 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-lg mb-4 text-text-main">Materie</h3>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {["Toate", "Română", "Matematică", "Istorie", "Engleză", "Rusă", "Geografie", "Biologie", "Chimie", "Fizică", "Informatică"].map(m => (
                      <label key={m} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          checked={filterMaterie === m}
                          onChange={() => setFilterMaterie(m)}
                          className="form-radio text-primary focus:ring-primary h-5 w-5 border-slate-300" 
                          name="materie" 
                          type="radio" 
                        />
                        <span className="text-muted group-hover:text-text-main font-medium transition-colors">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-9 flex flex-col gap-6">
                {/* Search Bar */}
                <div className="w-full h-14 bg-surface rounded-xl flex items-center px-4 border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-slate-400 mr-3 text-2xl">search</span>
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none w-full text-text-main placeholder-slate-400 focus:ring-0 text-lg outline-none" 
                    placeholder="Caută materia dorită..." 
                    type="text" 
                  />
                </div>

                {/* Active Filters Tags */}
                {hasActiveFilters && (
                  <div className="flex gap-2 flex-wrap items-center text-sm">
                    <span className="text-muted">Filtre active:</span>
                    {filterProfil !== "Toate" && (
                      <span className="bg-blue-50 text-primary px-3 py-1 rounded-full font-medium flex items-center gap-1">
                        Profil: {filterProfil}
                      </span>
                    )}
                    {filterMaterie !== "Toate" && (
                      <span className="bg-blue-50 text-primary px-3 py-1 rounded-full font-medium flex items-center gap-1">
                        Materie: {filterMaterie}
                      </span>
                    )}
                    {searchQuery !== "" && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="bg-blue-50 text-primary hover:bg-blue-100 px-3 py-1 rounded-full font-medium flex items-center gap-1 transition-colors"
                      >
                        Caută: &quot;{searchQuery}&quot; <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setFilterProfil("Toate");
                        setFilterMaterie("Toate");
                        setSearchQuery("");
                      }}
                      className="ml-2 text-muted hover:text-primary underline text-xs"
                    >
                      Șterge Toate
                    </button>
                  </div>
                )}

                {/* Subject Cards Grid */}
                {filteredSubjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
                    {filteredSubjects.map(subject => {
                      if (subject.isBundle) {
                        return (
                          <Link key={subject.id} href="/pachet" className="group bg-primary text-white border border-primary rounded-xl p-6 flex flex-col shadow-soft hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                              <span className="bg-warning text-yellow-900 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">-58%</span>
                            </div>
                            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 text-white">
                              <span className="material-symbols-outlined text-3xl">{subject.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{subject.name}</h3>
                            <p className="text-blue-100 text-sm mb-4 flex-grow">{subject.desc}</p>
                            <div className="mt-auto pt-4 border-t border-blue-400 flex justify-between items-center">
                              <div className="flex flex-col">
                                <span className="text-xs text-blue-200 line-through">{subject.oldPrice} MDL</span>
                                <span className="font-bold text-lg">{subject.price} MDL</span>
                              </div>
                              <span className="material-symbols-outlined text-white transition-transform group-hover:translate-x-1">arrow_forward</span>
                            </div>
                          </Link>
                        );
                      }

                      // Dynamic color mapping for standard subjects
                      const colorMap: Record<string, { bar: string, box: string, text: string }> = {
                        "blue": { bar: "bg-blue-500", box: "bg-blue-50", text: "text-blue-600" },
                        "red": { bar: "bg-red-500", box: "bg-red-50", text: "text-red-600" },
                        "amber": { bar: "bg-amber-500", box: "bg-amber-50", text: "text-amber-600" },
                        "emerald": { bar: "bg-emerald-500", box: "bg-emerald-50", text: "text-emerald-600" },
                        "purple": { bar: "bg-purple-500", box: "bg-purple-50", text: "text-purple-600" },
                        "cyan": { bar: "bg-cyan-500", box: "bg-cyan-50", text: "text-cyan-600" },
                        "orange": { bar: "bg-orange-500", box: "bg-orange-50", text: "text-orange-600" },
                        "indigo": { bar: "bg-indigo-500", box: "bg-indigo-50", text: "text-indigo-600" },
                      };

                      const currentColors = colorMap[subject.color as string] || colorMap["blue"];

                      return (
                        <Link key={subject.id} href={`/materie/${subject.id}`} className="group bg-white border border-slate-100 rounded-xl p-6 flex flex-col shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                          <div className={`absolute top-0 left-0 w-full h-1 ${currentColors.bar}`}></div>
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${currentColors.box} ${currentColors.text}`}>
                            <span className="material-symbols-outlined text-3xl">{subject.icon}</span>
                          </div>
                          <h3 className="text-xl font-bold text-text-main mb-1">{subject.name}</h3>
                          <p className="text-muted text-sm mb-4 flex-grow">{subject.desc}</p>
                          <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-primary">{subject.price} MDL</span>
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_forward</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-20 text-center fade-in bg-surface rounded-xl border border-slate-200 border-dashed">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                    <h3 className="text-xl font-bold text-text-main mb-2">Nu am găsit materiale...</h3>
                    <p className="text-muted mb-6 max-w-md">Nu există niciun ghid care să corespundă filtrelor selectate în acest moment.</p>
                    <button 
                      onClick={() => {
                        setFilterProfil("Toate");
                        setFilterMaterie("Toate");
                        setSearchQuery("");
                      }}
                      className="bg-white text-primary border border-slate-200 hover:border-primary hover:bg-blue-50 font-bold py-2 px-6 rounded-full transition-colors shadow-sm"
                    >
                      Șterge filtrele
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}