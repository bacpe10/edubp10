"use client";


export default function PrivacyPage() {
  return (
    <div
      className="bg-white p-8 md:p-16 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden animate-fade-in max-w-7xl mx-auto"
    >
      {/* Subtle background element */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-slate-100 rounded-full blur-3xl" />

      <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">Confidențialitate</h1>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-10 pb-8 border-b border-slate-100">
        Angajamentul nostru față de siguranța datelor tale
      </p>

      <div className="space-y-10 text-slate-600 leading-relaxed font-medium">
        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-400">
              <span className="material-symbols-outlined text-[18px]">security</span>
            </span>
            Protecția Datelor
          </h2>
          <p>
            La BacPe10, securitatea și confidențialitatea utilizatorilor noștri sunt priorități fundamentale. Această politică explică modul în care gestionăm informațiile în contextul utilizării platformei noastre ca ajutor la învățare și resursă didactică.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-400">
              <span className="material-symbols-outlined text-[18px]">database</span>
            </span>
            Date Colectate
          </h2>
          <p className="mb-4">
            Colectăm un minim necesar de date pentru a asigura funcționarea platformei și asistența tehnică:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Date de interacțiune: Log-uri de acces pentru securitatea sistemului.</li>
            <li>Identificatori Telegram: În cazul utilizării serviciului de suport asistat, pentru a putea livra răspunsurile și materialele de studiu.</li>
            <li>Preferințe de studiu: Pachetele selectate pentru a personaliza experiența de învățare.</li>
          </ul>
        </section>

        <section className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm text-slate-400 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">privacy_tip</span>
            </span>
            Procesarea prin Terți
          </h2>
          <p className="text-sm">
            Utilizăm servicii externe securizate (precum Telegram API) pentru a facilita comunicarea rapidă și sigură. Nu stocăm date bancare direct pe serverele noastre, orice tranzacție fiind mediată de protocoale de securitate standard sau asistență manuală directă pe canale criptate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-400">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </span>
            Drepturile Utilizatorului
          </h2>
          <p>
            Aveți dreptul de a solicita ștergerea oricăror log-uri sau informații de contact asociate contului dumneavoastră. De asemenea, puteți solicita în orice moment clarificări privind utilizarea datelor dumneavoastră în scopul asistenței didactice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm text-slate-400">
              <span className="material-symbols-outlined text-[18px]">update</span>
            </span>
            Modificări
          </h2>
          <p>
            Ne rezervăm dreptul de a actualiza această politică pe măsură ce platforma evoluează. Continuarea utilizării site-ului constituie acceptul dumneavoastră față de aceste practici de confidențialitate.
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Securitate garantată de infrastructura BacPe10
        </p>
      </div>
    </div>
  );
}
