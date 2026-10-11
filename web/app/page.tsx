'use client';

import { useState, useEffect } from 'react';
import { Wand2, FileImage, SlidersHorizontal, MapPin, Search, ChevronDown, User } from 'lucide-react';
import Link from 'next/link';

export default function HomeDashboard() {
  const [activeTab, setActiveTab] = useState<'prompt' | 'upload' | 'classic'>('prompt');
  const [placeholderText, setPlaceholderText] = useState('');
  
  // Animation du placeholder pour suggérer des prompts à l'utilisateur (CDC 2.1.1.1)
  useEffect(() => {
    const suggestions = [
      "Voyage aux Philippines, 21 jours, 5 îles...",
      "Un week-end à Europa-Park...",
      "Train pour Rome demain matin...",
      "Deux semaines au soleil en décembre..."
    ];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      setPlaceholderText(suggestions[currentIndex]);
      currentIndex = (currentIndex + 1) % suggestions.length;
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative pointer-events-auto">
      
      {/* HEADER INVISIBLE (Logo + Profil) */}
      <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
        <div className="w-12 h-12"></div> {/* Espace pour équilibrer */}
        <div className="font-bold text-4xl text-abysse flex items-center gap-1 italic drop-shadow-md">
          Ride<span className="text-bronze">Up</span>
        </div>
        <button className="w-12 h-12 rounded-full glass-container flex items-center justify-center text-abysse font-bold relative hover:bg-white/80 transition-all shadow-md">
          Y <span className="absolute -top-2 -right-2 text-xl drop-shadow-sm">👑</span>
        </button>
      </header>

      {/* SIMULATION DES GLOWING NODES SUR LA CARTE EN ARRIÈRE-PLAN (CDC Tech.7) */}
      <div className="absolute top-[30%] left-[20%] w-4 h-4 rounded-full bg-bronze shadow-[0_0_20px_rgba(198,123,47,0.8)] animate-pulse"></div>
      <div className="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-bronze shadow-[0_0_20px_rgba(198,123,47,0.8)] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[20%] left-[40%] w-5 h-5 rounded-full bg-bronze shadow-[0_0_20px_rgba(198,123,47,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>

      {/* LE MODULE DE RECHERCHE CENTRAL (Glassmorphism) */}
      <main className="glass-container w-full max-w-3xl p-2 flex flex-col z-10 shadow-2xl">
        
        {/* Les 3 Portes d'entrée (Tabs) */}
        <div className="flex p-2 gap-2 mb-2">
          <button 
            onClick={() => setActiveTab('prompt')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'prompt' ? 'bg-white text-abysse shadow-sm' : 'text-abysse/50 hover:bg-white/40'}`}
          >
            <Wand2 size={18} className={activeTab === 'prompt' ? 'text-bronze' : ''} />
            Prompt IA
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'upload' ? 'bg-white text-abysse shadow-sm' : 'text-abysse/50 hover:bg-white/40'}`}
          >
            <FileImage size={18} className={activeTab === 'upload' ? 'text-bronze' : ''} />
            Importer document
          </button>
          <button 
            onClick={() => setActiveTab('classic')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'classic' ? 'bg-white text-abysse shadow-sm' : 'text-abysse/50 hover:bg-white/40'}`}
          >
            <SlidersHorizontal size={18} className={activeTab === 'classic' ? 'text-bronze' : ''} />
            Recherche classique
          </button>
        </div>

        {/* CONTENU : PROMPT IA */}
        {activeTab === 'prompt' && (
          <div className="bg-white/60 rounded-2xl p-4 flex items-center gap-4 border border-white/80">
            <div className="w-12 h-12 rounded-full bg-bronze/10 flex items-center justify-center shrink-0">
              <Wand2 size={24} className="text-bronze" />
            </div>
            <input 
              type="text" 
              className="flex-1 bg-transparent border-none outline-none text-xl text-abysse placeholder:text-abysse/30 font-medium"
              placeholder={placeholderText || "Décrivez votre voyage idéal..."}
            />
            {/* Redirection vers le tunnel QDIS (CDC 2.1) */}
            <Link href="/qdis" className="bg-abysse text-white px-8 py-4 rounded-xl font-bold hover:bg-bronze transition-colors shadow-md flex items-center gap-2">
              <Search size={18} /> Lancer
            </Link>
          </div>
        )}

        {/* CONTENU : IMPORTER DOCUMENT (Dropzone) */}
        {activeTab === 'upload' && (
          <div className="bg-white/60 rounded-2xl p-10 flex flex-col items-center justify-center border-2 border-dashed border-bronze/30 gap-4 cursor-pointer hover:bg-white/80 transition-colors">
            <div className="w-16 h-16 rounded-full bg-bronze/10 flex items-center justify-center">
              <FileImage size={32} className="text-bronze" />
            </div>
            <div className="text-center">
              <p className="font-bold text-abysse text-lg">Glissez un PDF ou une capture d'écran</p>
              <p className="text-sm text-abysse/50 mt-1">L'IA extraira automatiquement votre réservation pour créer le Travel Board.</p>
            </div>
            <Link href="/qdis" className="mt-4 bg-abysse text-white px-6 py-3 rounded-xl font-bold hover:bg-bronze transition-colors shadow-sm text-sm">
              Parcourir les fichiers
            </Link>
          </div>
        )}

        {/* CONTENU : RECHERCHE CLASSIQUE */}
        {activeTab === 'classic' && (
          <div className="bg-white/60 rounded-2xl p-4 flex items-center gap-4 border border-white/80">
            <div className="flex-1 flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-abysse/5 cursor-text">
              <MapPin size={20} className="text-bronze" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-abysse/40 uppercase">Destination</span>
                <span className="text-sm font-bold text-abysse">Où allez-vous ?</span>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-abysse/10"></div>
            <div className="flex-1 flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-abysse/5 cursor-pointer">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-abysse/40 uppercase">Dates</span>
                <span className="text-sm font-bold text-abysse">Ajouter des dates</span>
              </div>
              <ChevronDown size={16} className="text-abysse/40" />
            </div>
            <div className="w-[1px] h-10 bg-abysse/10"></div>
            <div className="flex-1 flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-abysse/5 cursor-pointer">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-abysse/40 uppercase">Voyageurs</span>
                <span className="text-sm font-bold text-abysse">2 Adultes</span>
              </div>
              <User size={16} className="text-abysse/40" />
            </div>
            <Link href="/qdis" className="bg-abysse text-white p-4 rounded-xl font-bold hover:bg-bronze transition-colors shadow-md">
              <Search size={20} />
            </Link>
          </div>
        )}

      </main>

      {/* L'espace Inspiration (scroll vers le bas) - Prévu CDC 1.3 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-xs font-bold text-abysse/70 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">Inspiration & Offres</span>
        <ChevronDown size={20} className="text-abysse animate-bounce" />
      </div>

    </div>
  );
}