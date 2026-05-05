import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-12 px-4 border-t border-slate-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <img 
                src="/images/logo.svg" 
                alt="Bac pe 10 Logo" 
                className="h-9 w-auto"
              />
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tighter text-slate-900 leading-none">Bac pe 10</span>
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest mt-0.5">Bac 2026</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Cea mai avansată platformă de pregătire pentru Bacalaureat din Moldova. Succes garantat prin materiale sintetizate.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-20">
            <div>
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-4">Platformă</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-500">
                <li><Link href="/pachet" className="hover:text-primary transition-colors">Pachete</Link></li>
                <li><a href="https://t.me/bacpe10" target="_blank" className="hover:text-primary transition-colors">Suport</a></li>
                <li><Link href="/#faq" className="hover:text-primary transition-colors">Întrebări</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-4">Social</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-500">
                <li><a href="https://tiktok.com/@bacpe10" target="_blank" className="hover:text-primary transition-colors">TikTok</a></li>
                <li><a href="https://t.me/bacpe10" target="_blank" className="hover:text-primary transition-colors">Telegram</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} BacPe10 Moldova</span>
          <Link href="/terms" className="hover:text-slate-600 transition-colors underline decoration-slate-200 underline-offset-4">Termeni și Condiții</Link>
          <Link href="/privacy" className="hover:text-slate-600 transition-colors underline decoration-slate-200 underline-offset-4">Confidențialitate</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
