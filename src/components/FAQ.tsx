"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Cât de repede primesc materialele?",
    answer: "Instantaneu! După confirmarea plății, materialele sunt livrate automat în format PDF. Le poți descărca și începe să înveți în mai puțin de 2 minute."
  },
  {
    question: "Sunt materialele actualizate pentru Bac 2026?",
    answer: "Da, toate materialele noastre sunt revizuite anual de foști profesori specializați pentru a respecta 100% programa oficială și noile modele de subiecte publicate de minister."
  },
  {
    question: "Ce fac dacă nu mă descurc cu plata?",
    answer: "Nicio problemă! Avem asistență live pe Telegram și TikTok. Dacă întâmpini dificultăți cu procesatorul automat, colegii noștri te vor asista pas cu pas prin plata manuală."
  },
  {
    question: "Sunt rezolvările explicate pas cu pas?",
    answer: "Exact. Nu oferim doar rezultatul final. Pachetele 'Plus' includ baremuri explicate logic, astfel încât să înțelegi cum s-a ajuns la soluție și cum să punctezi maxim la examen."
  },
  {
    question: "Pot învăța de pe telefon sau tabletă?",
    answer: "Sigur că da. Toate materialele sunt în format PDF de înaltă rezoluție, optimizate pentru citire ușoară pe ecrane mici. Poți învăța oriunde: în autobuz, la școală sau acasă."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 md:px-10 max-w-[1200px] mx-auto w-full" id="faq">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-text-main mb-4 tracking-tight">Întrebări Frecvente</h2>
        <p className="text-slate-500 font-medium text-lg">Tot ce trebuie să știi despre materialele BacPe10</p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`group rounded-2xl border-2 transition-all duration-300 ${openIndex === index ? "border-primary bg-blue-50/30" : "border-slate-100 bg-white hover:border-slate-200"}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className={`text-lg font-black tracking-tight transition-colors ${openIndex === index ? "text-primary" : "text-text-main group-hover:text-primary"}`}>
                {faq.question}
              </span>
              <span className={`material-symbols-outlined transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : "text-slate-400"}`}>
                keyboard_arrow_down
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed border-t border-blue-100/50">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-slate-50 rounded-3xl p-8 border border-slate-100">
        <h3 className="font-black text-xl text-text-main mb-2">Mai ai și alte întrebări?</h3>
        <p className="text-slate-500 mb-6 font-medium">Suntem online 24/7 pe Telegram pentru a te ajuta.</p>
        <a
          href="https://t.me/bacpe10"
          target="_blank"
          className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1c88ba] text-white font-black px-8 py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-1"
        >
          <span className="material-symbols-outlined">send</span>
          Discută pe Telegram
        </a>
      </div>
    </section>
  );
}
