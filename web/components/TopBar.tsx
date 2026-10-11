'use client';

import { useState, useEffect } from 'react';
import { Sun, Calendar, Users, Wallet, PlaneTakeoff, Info, Map as MapIcon, ChevronRight } from 'lucide-react';

export default function TopBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // RADAR 1 : Scroll très léger (5 pixels) sur la timeline
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target?.id === 'timeline-container') {
        setIsScrolled(target.scrollTop > 5);
      }
    };

    // RADAR 2 : Le moindre coup de molette n'importe où sur l'écran
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) setIsScrolled(true); // Molette vers le bas = on ferme
      
      // Si on remonte la molette ET qu'on est tout en haut de la timeline = on ouvre
      const timeline = document.getElementById('timeline-container');
      if (e.deltaY < 0 && timeline && timeline.scrollTop <= 5) setIsScrolled(false);
    };

    // RADAR 3 : Clic détecté à l'intérieur de la carte (Iframe)
    const handleIframeClick = () => {
      if (document.activeElement?.tagName === 'IFRAME') {
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('wheel', handleWheel, true);
    window.addEventListener('blur', handleIframeClick); // Le blur détecte le clic dans la carte

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('wheel', handleWheel, true);
      window.removeEventListener('blur', handleIframeClick);
    };
  }, []);

  return (
    <div className={`w-full bg-porcelaine/95 backdrop-blur-xl border-b border-white shadow-sm flex flex-col z-50 pointer-events-auto shrink-0 transition-all duration-500 ease-in-out origin-top ${isScrolled ? 'h-16' : ''}`}>
      
      {/* ------------------------------------------------------------------ */}
      {/* VUE RÉDUITE (Hyper compacte) */}
      {/* ------------------------------------------------------------------ */}
      <div className={`flex items-center justify-between px-8 h-16 w-full absolute top-0 transition-opacity duration-300 ${isScrolled ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
        
        <div className="flex items-center gap-6">
          <div className="font-bold text-xl text-abysse flex items-center gap-1 italic">
            Ride<span className="text-bronze">Up</span>
          </div>
          <div className="h-6 w-[1px] bg-abysse/10"></div>
          <h1 className="font-bold text-xl text-abysse">Philippines 2025</h1>
          <ChevronRight size={16} className="text-abysse/40" />
          <span className="text-sm font-bold text-abysse/70">20 Fév - 11 Mar</span>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-4 border-r border-abysse/10 pr-6">
              <button className="text-bronze hover:scale-110 transition-transform"><PlaneTakeoff size={18}/></button>
              <button className="text-abysse/50 hover:text-bronze hover:scale-110 transition-transform"><Users size={18}/></button>
              <button className="text-abysse/50 hover:text-bronze hover:scale-110 transition-transform"><Info size={18}/></button>
              <button className="text-abysse/50 hover:text-bronze hover:scale-110 transition-transform"><Sun size={18}/></button>
              <button className="text-abysse/50 hover:text-bronze hover:scale-110 transition-transform"><Wallet size={18}/></button>
           </div>
           
           <div className="flex flex-col items-end mr-4">
              <p className="text-lg font-black text-abysse leading-none">444€</p>
              <p className="text-[9px] font-bold text-bronze uppercase tracking-wider">222€ / p.</p>
           </div>

           <button className="w-8 h-8 rounded-full bg-abysse flex items-center justify-center text-white font-bold text-xs shadow-sm">
            Y
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* VUE COMPLÈTE (Déployée) */}
      {/* ------------------------------------------------------------------ */}
      <div className={`flex flex-col transition-all duration-300 ${isScrolled ? 'opacity-0 translate-y-[-10px] pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
        
        <div className="flex justify-between items-center px-8 py-2 border-b border-abysse/5">
          <button className="text-abysse/60 hover:text-bronze transition-colors"><MapIcon size={20} /></button>
          <div className="font-bold text-2xl text-abysse flex items-center gap-1 italic">
            Ride<span className="text-bronze">Up</span>
          </div>
          <button className="w-9 h-9 rounded-full bg-abysse flex items-center justify-center text-white font-bold text-sm relative shadow-sm">
            Y <span className="absolute -top-1 -right-1 text-xs">👑</span>
          </button>
        </div>

        <div className="flex justify-between items-end px-8 pt-3 pb-2">
          <div>
            <h1 className="font-bold text-3xl text-abysse tracking-tight mb-1">Philippines 2025</h1>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-white px-2 py-0.5 rounded-full border border-abysse/10 font-medium">El Nido</span>
              <span className="bg-white px-2 py-0.5 rounded-full border border-abysse/10 font-medium">Coron</span>
              <span className="bg-white px-2 py-0.5 rounded-full border border-abysse/10 font-medium">Boracay</span>
              <span className="text-abysse/30 mx-1">•</span>
              <span className="font-bold text-abysse/70">20 Fév - 11 Mar</span>
              <span className="text-abysse/30 mx-1">•</span>
              <span className="font-bold text-abysse/70">2 adultes</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-black text-abysse leading-none">444€</p>
            <p className="text-[10px] font-bold text-bronze uppercase tracking-wider mt-0.5">222€ / pers.</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 px-8 py-3 border-t border-abysse/5 w-full bg-white/30">
          <button className="flex items-center gap-2 text-bronze hover:opacity-80 transition-opacity"><PlaneTakeoff size={16}/><span className="text-xs font-bold">Mon Voyage</span></button>
          <button className="flex items-center gap-2 text-abysse/60 hover:text-bronze transition-colors"><Users size={16}/><span className="text-xs font-bold">Voyageurs</span></button>
          <button className="flex items-center gap-2 text-abysse/60 hover:text-bronze transition-colors"><Info size={16}/><span className="text-xs font-bold">À savoir</span></button>
          <button className="flex items-center gap-2 text-abysse/60 hover:text-bronze transition-colors"><Sun size={16}/><span className="text-xs font-bold">Météo</span></button>
          <button className="flex items-center gap-2 text-abysse/60 hover:text-bronze transition-colors"><Calendar size={16}/><span className="text-xs font-bold">Autres dates</span></button>
          <button className="flex items-center gap-2 text-abysse/60 hover:text-bronze transition-colors"><Wallet size={16}/><span className="text-xs font-bold">Budget</span></button>
        </div>
      </div>

    </div>
  );
}