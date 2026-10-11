'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Users, Briefcase, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function QDISTunnel() {
  // Le "Cerveau" du tunnel : on commence à l'étape 1 (Lieux)
  const [step, setStep] = useState(1);

  // Mécanique de transition fluide
  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden pointer-events-auto">
      
      {/* LA CARTE EN ARRIÈRE-PLAN (Identique au Dashboard pour la fluidité) */}
      <div className="absolute inset-0 z-0 bg-slate-200">
         <iframe 
          src="https://www.openstreetmap.org/export/embed.html?bbox=117.16918945312501%2C8.559132204899144%2C126.96899414062501%2C18.677063385458925&amp;layer=mapnik" 
          className="w-full h-full border-none opacity-50 grayscale"
         ></iframe>
         <div className="absolute inset-0 bg-abysse/10 backdrop-blur-sm pointer-events-none"></div>
      </div>

      {/* HEADER MINIMALISTE */}
      <header className="absolute top-0 left-0 w-full p-8 flex justify-center z-50">
        <div className="font-bold text-2xl text-abysse flex items-center gap-1 italic drop-shadow-md opacity-50">
          Ride<span className="text-bronze">Up</span>
        </div>
      </header>

      {/* LE HUD CENTRAL (Surcouche flottante en Glassmorphism selon le CDC) */}
      <main className="glass-container w-full max-w-2xl p-8 flex flex-col z-10 shadow-2xl relative transition-all duration-500">
        
        {/* BARRE DE PROGRESSION */}
        <div className="flex justify-between items-center mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/50 rounded-full z-0"></div>
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-bronze rounded-full z-0 transition-all duration-500`} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs relative z-10 transition-colors duration-300 ${step >= i ? 'bg-bronze text-white shadow-md' : 'bg-white/80 text-abysse/40'}`}>
              {i}
            </div>
          ))}
        </div>

        {/* ÉTAPE 1 : QDIS 2.1 (Inspi Lieux) */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="text-bronze" size={24} />
              <h2 className="text-3xl font-bold text-abysse">Affiner la destination</h2>
            </div>
            <p className="text-abysse/60 mb-6 font-medium">Votre recherche "Soleil en Asie" est vaste. Laquelle de ces ambiances vous correspond le plus ?</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-transparent hover:border-bronze transition-all relative h-40">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1000')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-abysse/80 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-white font-bold text-lg">Philippines<br/><span className="text-xs font-medium text-white/70">Plages & Plongée</span></p>
              </div>
              <div className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-transparent hover:border-bronze transition-all relative h-40 opacity-70 hover:opacity-100">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-abysse/80 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-white font-bold text-lg">Thaïlande<br/><span className="text-xs font-medium text-white/70">Culture & Street-food</span></p>
              </div>
            </div>
            
            <button onClick={nextStep} className="w-full bg-abysse text-white py-4 rounded-xl font-bold hover:bg-bronze transition-colors flex items-center justify-center gap-2">
              Sélectionner les Philippines <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ÉTAPE 2 : QDIS 2.2 (Dates) */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-bronze" size={24} />
              <h2 className="text-3xl font-bold text-abysse">Quand partez-vous ?</h2>
            </div>
            <p className="text-abysse/60 mb-6 font-medium">L'algorithme a besoin de dates pour calculer les vrais prix et la météo.</p>
            
            <div className="bg-white/50 rounded-2xl p-6 border border-white mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-abysse">Février 2025</h3>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold bg-bronze/10 text-bronze px-2 py-1 rounded">Météo idéale</span>
                </div>
              </div>
              {/* Simulation d'un calendrier Heatmap (CDC) */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-abysse/40 mb-2">
                <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(14)].map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
                {[...Array(14)].map((_, i) => {
                  const day = i + 15;
                  const isSelected = day >= 20 && day <= 26;
                  return (
                    <div key={day} className={`aspect-square rounded-lg flex items-center justify-center font-bold text-sm cursor-pointer transition-colors ${isSelected ? 'bg-bronze text-white shadow-md' : 'bg-white text-abysse hover:bg-bronze/10'}`}>
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={nextStep} className="w-full bg-abysse text-white py-4 rounded-xl font-bold hover:bg-bronze transition-colors flex items-center justify-center gap-2">
              Valider (20 au 26 Fév) <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ÉTAPE 3 : QDIS 2.3 (Voyageurs et bagages) */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-bronze" size={24} />
              <h2 className="text-3xl font-bold text-abysse">Logistique</h2>
            </div>
            <p className="text-abysse/60 mb-6 font-medium">Dernier détail pour ajuster la taille des hébergements et les transferts.</p>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="bg-white/50 p-4 rounded-2xl border border-white flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                  <Users className="text-abysse/50" size={20} />
                  <div>
                    <p className="font-bold text-abysse">Voyageurs</p>
                    <p className="text-xs text-abysse/50">Adultes (+12 ans)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white px-2 py-1 rounded-xl shadow-sm border border-abysse/5">
                  <button className="w-8 h-8 flex items-center justify-center text-abysse/50 font-bold hover:text-bronze">-</button>
                  <span className="font-black text-abysse">2</span>
                  <button className="w-8 h-8 flex items-center justify-center text-abysse/50 font-bold hover:text-bronze">+</button>
                </div>
              </div>

              <div className="bg-white/50 p-4 rounded-2xl border border-white flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                  <Briefcase className="text-abysse/50" size={20} />
                  <div>
                    <p className="font-bold text-abysse">Bagages en soute</p>
                    <p className="text-xs text-abysse/50">Influence le prix des vols</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white px-2 py-1 rounded-xl shadow-sm border border-abysse/5">
                  <button className="w-8 h-8 flex items-center justify-center text-abysse/50 font-bold hover:text-bronze">-</button>
                  <span className="font-black text-abysse">1</span>
                  <button className="w-8 h-8 flex items-center justify-center text-abysse/50 font-bold hover:text-bronze">+</button>
                </div>
              </div>
            </div>

            <button onClick={nextStep} className="w-full bg-abysse text-white py-4 rounded-xl font-bold hover:bg-bronze transition-colors flex items-center justify-center gap-2">
              Continuer <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ÉTAPE 4 : QDIS 2.5 (Synthèse) */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Sparkles className="text-bronze" size={28} />
              <h2 className="text-3xl font-bold text-abysse">Votre voyage est prêt</h2>
            </div>
            
            <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-md mb-6 relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bronze to-[#FF6B57]"></div>
              
              <h3 className="text-2xl font-black text-abysse mb-2">Philippines 2025</h3>
              <p className="text-sm font-bold text-abysse/60 mb-4">20 Fév - 26 Fév • 2 Adultes</p>
              
              <div className="inline-flex items-center gap-2 bg-[#3a781f]/10 text-[#3a781f] px-4 py-2 rounded-xl text-xs font-bold mb-4">
                <CheckCircle2 size={14} /> Météo optimale confirmée
              </div>

              <p className="text-sm text-abysse/80 leading-relaxed">
                Nous avons analysé 14 combinaisons de vols et trouvé l'itinéraire le plus fluide. Votre Travel Board est généré et prêt à être organisé.
              </p>
            </div>

            {/* LE LIEN FINAL VERS LE TRAVEL BOARD */}
            <Link href="/board" className="w-full bg-gradient-to-r from-abysse to-blue-900 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
              Ouvrir le Travel Board <ArrowRight size={18} />
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}