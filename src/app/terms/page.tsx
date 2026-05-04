"use client";


export default function TermsPage() {
  return (
    <div
      className="bg-white p-8 md:p-16 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden animate-fade-in max-w-7xl mx-auto"
    >
      {/* Subtle background element */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">Termeni și Condiții</h1>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-10 pb-8 border-b border-slate-100">
        Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
      </p>

      <div className="space-y-10 text-slate-600 leading-relaxed font-medium">
        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">01</span>
            Acceptarea Termenilor
          </h2>
          <p>
            Prin accesarea acestui portal educațional, utilizatorul confirmă că a citit, înțeles și acceptat prezentele condiții. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați platforma.
          </p>
        </section>

        <section className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
          <h2 className="text-xl font-black text-primary mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm">02</span>
            Natura Serviciilor (Notificare Importantă)
          </h2>
          <p className="font-bold text-slate-900 mb-4">
            Acesta este un proiect demonstrativ cu scop pur educațional și de testare a interfețelor software.
          </p>
          <p className="text-sm italic">
            Utilizatorul ia la cunoștință faptul că toate materialele, produsele și descrierile afișate pe acest site sunt furnizate exclusiv ca **exemple didactice și resurse de studiu** pentru a ajuta la procesul de învățare și înțelegere a structurii examenelor. Acestea nu constituie documente oficiale, certificări guvernamentale sau garanții de reușită. Platforma este un instrument de asistență didactică ce simulează un mediu de studiu pentru a demonstra metode de structurare a informației educaționale.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">03</span>
            Contribuții și Donații
          </h2>
          <p>
            Având în vedere natura educațională a platformei, orice transfer financiar efectuat de utilizator este procesat sub formă de **donație voluntară** pentru susținerea infrastructurii și a dezvoltării acestui proiect de ajutor la învățare. În schimbul acestei donații, utilizatorul primește acces la exemplele de materiale menționate, furnizate &quot;ca atare&quot; pentru scopuri de studiu individual și asistență didactică, fără nicio obligație contractuală de livrare a unor documente cu regim oficial.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">04</span>
            Proprietate Intelectuală
          </h2>
          <p>
            Structura, designul și algoritmii de prezentare ai platformei BacPe10 aparțin exclusiv operatorului. Materialele oferite ca exemplu sunt destinate uzului personal, în scop de învățare, fiind interzisă redistribuirea lor în scopuri comerciale sau prezentarea lor ca documente oficiale emise de instituții de stat.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">05</span>
            Exonerarea de Răspundere
          </h2>
          <p>
            Operatorul nu poate fi tras la răspundere pentru modul în care utilizatorul alege să interpreteze sau să folosească exemplele oferite. Utilizarea acestor materiale nu înlocuiește studiul individual sau programa oficială. Operatorul este exonerat de orice responsabilitate juridică derivată din utilizarea neconformă a acestor resurse în raport cu legislația națională sau reglementările educaționale în vigoare.
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Contact Juridic: contact@bacpe10.md
        </p>
      </div>
    </div>
  );
}
