import TopBar from '../components/TopBar';
import { Plane, Car, QrCode, Building, MapPin, Ship } from 'lucide-react';

export const instant = false;

export default async function TravelBoard() {
  return (
    <>
      <TopBar />

      <div className="flex flex-1 overflow-hidden relative pointer-events-none">
        
        {/* LA TIMELINE - Avec ID pour le ciblage du scroll */}
        <main id="timeline-container" className="w-[33vw] min-w-[420px] max-w-[500px] h-full overflow-y-auto pb-64 no-scrollbar pointer-events-auto px-6 scroll-smooth">
          
          <div className="relative pl-16 pt-8"> 
            
            {/* LIGNE VERTICALE GLOBALE */}
            <div className="absolute left-[4.5rem] top-0 bottom-0 w-[2px] bg-abysse/10 rounded-full"></div>

            {/* ========================================================= */}
            {/* 1. TRAJET INTERNATIONAL (Paris -> Manille/Boracay)        */}
            {/* ========================================================= */}
            <div className="relative mb-10">
              <div className="absolute -left-16 top-4 bg-white/80 backdrop-blur-md rounded-2xl w-14 h-16 flex flex-col items-center justify-center z-20 shadow-sm border border-white">
                <span className="text-[9px] font-bold text-abysse/50 uppercase">Jeudi</span>
                <span className="text-xl font-black text-abysse leading-none">20</span>
                <span className="text-[9px] font-bold text-abysse/50 uppercase">Fév.</span>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-3xl ml-6 relative z-10 overflow-hidden">
                <div className="bg-white/50 p-4 border-b border-white flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Plane size={20} className="text-bronze" />
                    <h3 className="font-bold text-abysse text-lg">Voyage Paris ➔ Boracay</h3>
                  </div>
                </div>

                {/* Vol 1 */}
                <div className="p-5 border-b border-white/60 relative">
                  <p className="text-xs font-bold text-abysse/60 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-abysse/10 text-abysse flex items-center justify-center text-[10px]">1</span>
                    CDG (T1) ➔ Taipei (T1)
                  </p>
                  <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white shadow-sm">
                    <div>
                      <div className="text-2xl font-black text-abysse flex items-center gap-3">
                        CDG <Plane size={16} className="text-bronze/50" /> TPE
                      </div>
                      <p className="text-sm text-abysse/70 font-semibold mt-1">18:50 ➔ 07:30 <span className="text-[10px] text-bronze">(+1)</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. ÉTAPE 1 : BORACAY                                      */}
            {/* ========================================================= */}
            <div className="relative mb-10">
              <div className="absolute -left-16 top-4 bg-white/80 backdrop-blur-md rounded-2xl w-14 h-16 flex flex-col items-center justify-center z-20 shadow-sm border border-white">
                <span className="text-[9px] font-bold text-abysse/50 uppercase">Ven.</span>
                <span className="text-xl font-black text-abysse leading-none">21</span>
                <span className="text-[9px] font-bold text-abysse/50 uppercase">Fév.</span>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-3xl ml-6 relative z-10 overflow-hidden">
                <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-bronze border-2 border-white flex items-center justify-center text-[10px] font-bold text-white z-20 shadow-md">1</div>
                
                <div className="p-6">
                  <h3 className="font-bold text-abysse text-2xl mb-1">Boracay</h3>
                  <p className="text-xs font-medium text-abysse/50 mb-4">4 nuits • Station 2</p>

                  {/* Hébergement */}
                  <div className="bg-white/50 p-4 rounded-2xl border border-white shadow-sm mb-3">
                    <p className="text-[10px] font-bold text-bronze uppercase tracking-wider mb-2 flex items-center gap-1"><Building size={12}/> Hébergement Confirmé</p>
                    <p className="font-bold text-abysse text-sm">Hennan Palm Beach Resort</p>
                    <p className="text-xs text-abysse/60 mt-1">Chambre Double Deluxe vue mer</p>
                  </div>

                  {/* Activité */}
                  <div className="bg-white/50 p-4 rounded-2xl border border-white shadow-sm">
                    <p className="text-[10px] font-bold text-abysse/40 uppercase tracking-wider mb-2 flex items-center gap-1"><MapPin size={12}/> À ne pas rater</p>
                    <p className="font-bold text-abysse text-sm">Coucher de soleil sur White Beach</p>
                  </div>
                </div>

                {/* Image de Boracay (Optionnelle, mais donne du cachet) */}
                <div className="h-24 w-full bg-[url('https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1000')] bg-cover bg-center opacity-80"></div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3. TRAJET INTERNE (Boracay -> Bohol/Panglao)              */}
            {/* ========================================================= */}
            <div className="relative mb-10">
              <div className="absolute -left-16 top-4 bg-white/80 backdrop-blur-md rounded-2xl w-14 h-16 flex flex-col items-center justify-center z-20 shadow-sm border border-white">
                <span className="text-[9px] font-bold text-abysse/50 uppercase">Mar.</span>
                <span className="text-xl font-black text-abysse leading-none">25</span>
                <span className="text-[9px] font-bold text-abysse/50 uppercase">Fév.</span>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl border border-white shadow-md rounded-3xl ml-6 p-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-bronze shadow-sm">
                    <Ship size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-abysse text-sm">Ferry : Caticlan ➔ Tagbilaran</h3>
                    <p className="text-xs text-abysse/50">OceanJet • Durée : 5h30</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 4. ÉTAPE 2 : BOHOL (Panglao)                              */}
            {/* ========================================================= */}
            <div className="relative mb-10">
              <div className="absolute -left-16 top-4 bg-white/80 backdrop-blur-md rounded-2xl w-14 h-16 flex flex-col items-center justify-center z-20 shadow-sm border border-white opacity-60">
                <span className="text-[9px] font-bold text-abysse/50 uppercase">Mar.</span>
                <span className="text-xl font-black text-abysse leading-none">25</span>
                <span className="text-[9px] font-bold text-abysse/50 uppercase">Fév.</span>
              </div>
              
              <div className="bg-white/40 backdrop-blur-xl border border-white shadow-sm rounded-3xl ml-6 relative z-10 p-6 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                 <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-white border border-abysse/20 flex items-center justify-center text-[10px] font-bold text-abysse/50 z-20">2</div>
                 <h3 className="font-bold text-abysse text-2xl mb-1">Bohol (Panglao)</h3>
                 <p className="text-xs font-medium text-abysse/50">3 nuits • Alona Beach</p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}