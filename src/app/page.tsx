import Image from "next/image";
import Link from "next/link";
import { getSubjectPrice } from "@/constants/products";

// Triggering HMR
// Dynamic student count calculation
function getDynamicStudentCount() {
  const baseCount = 5234;
  const startDate = new Date("2024-01-01T00:00:00Z");
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Deterministic daily increment: base + 3*days + (hash of days)
  const dailyJitter = (diffDays * 13) % 7; 
  const totalCount = baseCount + (diffDays * 3) + dailyJitter;
  
  return totalCount.toLocaleString("en-US"); // Using en-US for the comma separator as in original
}

export default function Home() {
  const studentCount = getDynamicStudentCount();

  return (
    <div className="relative flex h-auto w-full flex-col bg-surface group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-8 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">

            
            {/* Hero Section */}
            <main className="w-full max-w-[1200px] mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-12 px-4 md:px-10 py-16 lg:py-24">
                {/* Left Content */}
                <div className="flex flex-col gap-6 flex-1 w-full relative z-10">
                  <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-accent px-4 py-2 rounded-full w-fit animate-fade-in hover:shadow-sm transition-shadow">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-semibold tracking-wide">Peste {studentCount} de elevi mulțumiți</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-text-main leading-tight tracking-tight drop-shadow-sm mb-6 lg:mb-8 font-display">
                Materiale Oficiale <br/><span className="text-primary relative inline-block">BAC 2026<div className="absolute -bottom-2 left-0 w-full h-2 bg-yellow-400 opacity-40 rounded"></div></span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mb-8 lg:mb-12">
                Descarcă instant exmanele oficiale tip PDF, structurate. Învață exact ce se dă, de oriunde, de pe telefon sau laptop.
              </p>
                    <Link href="/catalog" className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-wide shadow-btn hover:shadow-soft-hover hover:-translate-y-0.5 transition-all duration-300">
                      <span className="truncate">Vezi Materialele</span>
                    </Link>
                </div>
                {/* Right Illustration */}
                <div className="flex-1 w-full flex justify-center lg:justify-end relative">
                  <div className="absolute inset-0 bg-blue-50 rounded-full blur-3xl opacity-60 w-3/4 h-3/4 m-auto"></div>
                  <Image
                    alt="Elevi liceeni zâmbind uitându-se la laptop împreună"
                    className="w-full max-w-[500px] aspect-square object-cover rounded-[3rem] shadow-2xl relative z-10 border-4 border-white"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAahFSk9I9BekgERaOXwPC4FOvkK54-BXUO0lh-6FLm3W2lULS2jrylW7q9gQvDJe2-5Z5Mlxg84kjtKO5N8ZyD5QKljPruBcTAT72OzD8A2aE7FK07LGY9V_sjJkojyVwe8d07l6xzZWUA9dMOpaDEkVbqzCwA-9UhEzPXVh25fAlWIkrB-tjUhTRnWhQOjFI02LIU_t7xv-4-867gXnHA49h-v-ov6YTuIUDEpeKAnjH0eTah8FByX4L1VIz88WCK9GUqylsqZllr"
                    width={500}
                    height={500}
                    priority
                  />
                </div>
              </div>

              {/* Feature Bar */}
              <div className="px-4 md:px-10 py-12">
                <h2 className="sr-only">Beneficii Bac pe 10</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-primary">
                      <span className="material-symbols-outlined text-2xl">description</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-text-main text-base font-bold">Materiale PDF</h3>
                      <p className="text-muted text-sm font-medium mt-1">Învață de pe orice dispozitiv</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-primary">
                      <span className="material-symbols-outlined text-2xl">check_circle</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-text-main text-base font-bold">Rezolvări Pas cu Pas</h3>
                      <p className="text-muted text-sm font-medium mt-1">Înțelegi logica, nu doar tocești</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-primary">
                      <span className="material-symbols-outlined text-2xl">calendar_month</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-text-main text-base font-bold">Actualizat 2026</h3>
                      <p className="text-muted text-sm font-medium mt-1">Conținut adaptat noii programe</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Grid Section */}
              <div className="px-4 md:px-10 py-16 bg-surface rounded-t-[3rem]">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h2 className="text-text-main text-3xl font-extrabold tracking-tight">Alege materia</h2>
                    <p className="text-muted text-lg mt-2 font-medium">Ghiduri complete pentru un 10 sigur.</p>
                  </div>
                  <Link href="/catalog" className="hidden sm:flex items-center gap-1 text-primary font-bold hover:underline">
                    Toate materiile <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <Link href="/materie/matematica-real" className="group flex flex-col bg-white rounded-[16px] shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden border-t-4 border-primary">
                    <div className="p-6 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">calculate</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-main mb-2">Matematică (Real)</h3>
                      <p className="text-muted text-sm font-medium mb-6 flex-grow">Teorie, formule și sute de exerciții rezolvate pas cu pas.</p>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        <span className="text-text-main font-bold">{getSubjectPrice('matematica-real', 'test-simplu')} MDL</span>
                        <span className="material-symbols-outlined text-primary">add_shopping_cart</span>
                      </div>
                    </div>
                  </Link>
                  {/* Card 2 */}
                  <Link href="/materie/romana-real" className="group flex flex-col bg-white rounded-[16px] shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden border-t-4 border-indigo-500">
                    <div className="p-6 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">menu_book</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-main mb-2">Limba Română</h3>
                      <p className="text-muted text-sm font-medium mb-6 flex-grow">Eseuri structurate, caracterizări și teorie literară completă.</p>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        <span className="text-text-main font-bold">{getSubjectPrice('romana-real', 'test-simplu')} MDL</span>
                        <span className="material-symbols-outlined text-primary">add_shopping_cart</span>
                      </div>
                    </div>
                  </Link>
                  {/* Card 3 */}
                  <Link href="/materie/istorie" className="group flex flex-col bg-white rounded-[16px] shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden border-t-4 border-amber-500">
                    <div className="p-6 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">history_edu</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-main mb-2">Istorie</h3>
                      <p className="text-muted text-sm font-medium mb-6 flex-grow">Sinteze cronologice, lecții simplificate și rezolvări de subiecte.</p>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        <span className="text-text-main font-bold">{getSubjectPrice('istorie', 'test-simplu')} MDL</span>
                        <span className="material-symbols-outlined text-primary">add_shopping_cart</span>
                      </div>
                    </div>
                  </Link>
                  {/* Card 4 */}
                  <Link href="/materie/biologie" className="group flex flex-col bg-white rounded-[16px] shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden border-t-4 border-emerald-500">
                    <div className="p-6 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">biotech</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-main mb-2">Biologie</h3>
                      <p className="text-muted text-sm font-medium mb-6 flex-grow">Desene anatomice explicite și sinteze ușor de memorat.</p>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        <span className="text-text-main font-bold">{getSubjectPrice('biologie', 'test-simplu')} MDL</span>
                        <span className="material-symbols-outlined text-primary">add_shopping_cart</span>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="mt-8 flex justify-center sm:hidden">
                  <Link href="/catalog" className="flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-bold rounded-full w-full max-w-xs transition-colors hover:bg-blue-50">
                    Vezi toate materiile
                  </Link>
                </div>
              </div>

              {/* Upsell Banner */}
              <div className="px-4 md:px-10 py-16 pb-24">
                <div className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-soft flex flex-col md:flex-row items-center justify-between gap-8 group">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-white opacity-10 rounded-full transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4"></div>
                  <div className="absolute right-20 -bottom-20 w-48 h-48 bg-white opacity-10 rounded-full transition-transform duration-700 group-hover:scale-110 group-hover:translate-x-4"></div>
                  
                  <div className="relative z-10 flex-1">
                    <div className="inline-block bg-warning text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-sm">Ofertă Specială</div>
                  <div className="flex flex-col gap-1 items-start">
                    <span className="text-lg font-black text-white font-display">Toate examenele BACALAUREAT 2026 (Varianta PDF)</span>
                    <p className="text-blue-100 text-lg font-medium max-w-xl">Cumpără cele 3 materii sub formă de PDF și primești acces 100% gratuit la materialul bonus pentru Limba Engleză.</p>
                  </div>
                  </div>
                  
                  <div className="relative z-10 bg-white p-6 rounded-2xl flex flex-col items-center min-w-[250px] shadow-xl hover:shadow-2xl transition-shadow duration-300 transform group-hover:-translate-y-1">
                    <span className="text-muted text-sm font-bold line-through mb-1">946 MDL</span>
                    <span className="text-text-main text-4xl font-black mb-4">399 MDL</span>
                    <Link href="/pachet" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 shadow-btn">
                      Adaugă în coș <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
