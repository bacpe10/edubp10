import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-12 px-4 border-t border-slate-100 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">auto_stories</span>
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900">BacPe10<span className="text-primary">.md</span></span>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Cea mai avansată platformă de pregătire pentru Bacalaureat din Moldova. Succes garantat prin materiale sintetizate.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-20">
            <div>
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-4">Platformă</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-500">
                <li><Link href="/catalog" className="hover:text-primary transition-colors">Pachete</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Suport</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">Întrebări</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-4">Social</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-500">
                <li><a href="https://tiktok.com/@bacpe10" target="_blank" className="hover:text-primary transition-colors">TikTok</a></li>
                <li><a href="https://t.me/bacpe10" target="_blank" className="hover:text-primary transition-colors">Telegram</a></li>
                <li><a href="https://instagram.com" target="_blank" className="hover:text-primary transition-colors">Instagram</a></li>
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
