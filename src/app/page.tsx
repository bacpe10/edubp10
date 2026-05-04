import FAQ from "@/components/FAQ";
import { getSubjectPrice } from "@/constants/products";
import Link from "next/link";

export default function Home() {
  // Dynamic student count calculation
  const startCount = 7430;
  const daysSinceStart = Math.floor((new Date().getTime() - new Date('2024-09-01').getTime()) / (1000 * 60 * 60 * 24));
  const studentCount = startCount + (daysSinceStart * 12);

  const subjects = [
    { id: 'romana', name: 'Limba Română', icon: 'menu_book', color: 'bg-orange-50 text-orange-600' },
    { id: 'matematica', name: 'Matematica', icon: 'calculate', color: 'bg-blue-50 text-blue-600' },
    { id: 'istorie', name: 'Istoria', icon: 'history_edu', color: 'bg-purple-50 text-purple-600' },
    { id: 'geografie', name: 'Geografia', icon: 'public', color: 'bg-green-50 text-green-600' },
    { id: 'engleza', name: 'Limba Engleză', icon: 'language', color: 'bg-red-50 text-red-600' },
    { id: 'biologie', name: 'Biologia', icon: 'biotech', color: 'bg-emerald-50 text-emerald-600' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden site-content wp-block-group">
      {/* <!-- wp:heading {"level":1} --> */}
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden entry-header">
        {/* Abstract Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="layout-container px-4 md:px-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-12">
            {/* Centered Content */}
            <div className="flex flex-col items-center gap-8">
              <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`/images/avatars/avatar${i}.png`} alt="Student" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-black text-slate-700 tracking-tight">Peste {studentCount.toLocaleString()} de elevi reușiți</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-text-main leading-[0.95] tracking-tighter font-display drop-shadow-sm">
                Ia BAC-ul <br />
                <span className="text-primary relative inline-block">Din Prima<div className="absolute -bottom-4 left-0 w-full h-3 bg-yellow-400 opacity-40 rounded-full"></div></span>
              </h1>

              <p className="text-xl md:text-3xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                Variantele de la BAC 2026, rezolvate explicate. Tot ce ai nevoie ca să iei un <span className="text-text-main font-black">10 sigur</span>.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mt-4">
                <Link
                  href="/pachet"
                  className="group w-full sm:w-auto bg-primary hover:bg-blue-700 text-white font-black h-20 px-12 rounded-[24px] shadow-[0_20px_40px_-10px_rgba(36,99,235,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 text-xl"
                >
                  Vezi Pachetul Complet
                  <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">rocket_launch</span>
                </Link>
                <Link
                  href="/catalog"
                  className="w-full sm:w-auto px-10 h-20 rounded-[24px] border-2 border-slate-100 font-black text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center text-lg"
                >
                  Alege Materia
                </Link>
              </div>

              <div className="flex items-center gap-8 text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] mt-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-green-500">verified</span>
                  Acces Instant
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-green-500">history</span>
                  Actualizat 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- wp:group {"layout":{"type":"constrained"}} --> */}
      {/* 2. CORE BENEFITS */}
      <section className="py-24 bg-slate-50 relative entry-content">
        <div className="layout-container px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">lightbulb</span>
              </div>
              <h3 className="text-xl font-black text-text-main tracking-tight">Înveți mai inteligent</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Fără sute de pagini de teorie. Doar esența, explicată logic și pe înțelesul oricui.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h3 className="text-xl font-black text-text-main tracking-tight">Rezolvări pe Barem</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Te învățăm să scrii exact ce punctează profesorul, ca să obții nota maximă la fiecare exercițiu.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h3 className="text-xl font-black text-text-main tracking-tight">Acces 24/7 de oriunde</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Primești totul pe email în format PDF. Poți învăța de pe telefon, tabletă sau laptop, oricând ai timp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUBJECT CATALOG */}
      <section id="catalog" className="py-24 px-4 md:px-10">
        <div className="layout-container max-w-[1200px] mx-auto w-full flex flex-col items-center">
          <div className="text-center mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-text-main mb-6 tracking-tight">Catalogul de Materii</h2>
            <p className="text-lg text-slate-500 font-medium">Alege materia care îți dă cele mai mari bătăi de cap și descarcă variantele rezolvate chiar acum.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/materie/${subject.id}`}
                className="group bg-white border border-slate-100 p-6 rounded-3xl hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${subject.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <span className="material-symbols-outlined text-2xl">{subject.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-text-main leading-tight mb-1">{subject.name}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">De la {getSubjectPrice(subject.id, 'test-simplu')} MDL</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEGA OFFER BANNER */}
      <section className="py-24 px-4 md:px-10">
        <div className="layout-container max-w-[1200px] mx-auto w-full">
          <div className="bg-primary rounded-[40px] p-8 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 group">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>

            <div className="relative z-10 flex-1 text-center lg:text-left">
              <div className="inline-block bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6">Ofertă Limitată: 3 + 1 Gratis</div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">Pachetul VIP <br /> <span className="text-blue-200 underline decoration-white/30 underline-offset-8 decoration-4">Bac-ul la cheie</span></h2>
              <p className="text-blue-50 text-xl font-medium max-w-xl leading-relaxed mb-10 opacity-90">
                Iei cele 3 materii de bază și primești <span className="font-black text-white italic">Limba Engleză Gratuit</span>. Toată programa de Bac într-un singur loc.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-blue-300 text-sm font-bold line-through mb-1">946 MDL</span>
                  <span className="text-white text-5xl font-black tracking-tighter">399 MDL</span>
                </div>
                <Link href="/pachet" className="bg-white text-primary hover:bg-blue-50 font-black h-16 px-12 rounded-2xl flex items-center justify-center shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 text-lg">
                  Adaugă în Coș
                </Link>
              </div>
            </div>

            <div className="relative z-10 w-full max-w-xs lg:max-w-sm">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] shadow-2xl flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-400 text-white flex items-center justify-center shadow-lg shadow-green-400/30">
                    <span className="material-symbols-outlined text-sm font-black">check</span>
                  </div>
                  <span className="text-white font-bold tracking-tight">Variantele oficiale 2026</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-400 text-white flex items-center justify-center shadow-lg shadow-green-400/30">
                    <span className="material-symbols-outlined text-sm font-black">check</span>
                  </div>
                  <span className="text-white font-bold tracking-tight">Rezolvări Complete Incluse</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-400 text-white flex items-center justify-center shadow-lg shadow-green-400/30">
                    <span className="material-symbols-outlined text-sm font-black">check</span>
                  </div>
                  <span className="text-white font-bold tracking-tight">BAC Engleză (Cadou Gratuit)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <FAQ />

      {/* 6. FINAL CTA */}
      <section className="py-32 px-4 md:px-10 text-center">
        <div className="layout-container flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-5xl font-black text-text-main tracking-tight max-w-2xl leading-tight">
            Ești la un click distanță de a scăpa de stresul examenului.
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-lg mb-4">
            Materialele oficiale sunt gata. Tu ești pregătit să iei nota pe care o meriți?
          </p>
          <Link
            href="/pachet"
            className="bg-primary hover:bg-blue-700 text-white font-black h-20 px-16 rounded-3xl shadow-btn shadow-primary/40 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 text-xl"
          >
            Începe Pregătirea Acum
            <span className="material-symbols-outlined text-2xl">rocket_launch</span>
          </Link>
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Milioane de reușite încep cu un singur PDF.</p>
        </div>
      </section>
    </div>
  );
}
{/* <!-- wp:site-footer --> */}
