import React from 'react';

export default function StepBubble({
  numero, ville, jourSemaine, jourMois, mois, nbNuits,
  infoLieu, bgImageUrl, statutHebergement, hotelNom, lieuxAVisiter
}: any) {
  
  // 1. DÉTECTION DES HÉBERGEMENTS MULTIPLES (Sépare "Coco Hotel & Glamping" en deux bulles)
  const hotels = hotelNom ? hotelNom.split(/ [&/] /).map((h: string) => h.trim()) : [];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 w-full overflow-hidden transition-all hover:shadow-xl">
      
      {/* 1. HEADER DE L'ÉTAPE (Avec l'image validée) */}
      <div className="relative h-28 w-full bg-gray-200 overflow-hidden">
        {bgImageUrl ? (
          <img src={bgImageUrl} alt={ville} className="absolute inset-0 w-full h-full object-cover opacity-80" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 opacity-80"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-3 left-4 text-white flex items-baseline gap-2">
          <span className="text-4xl font-black drop-shadow-md text-white/40">{numero}</span>
          <h3 className="text-2xl font-bold drop-shadow-md">{ville}</h3>
        </div>
        
        <div className="absolute top-3 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border border-white/20">
          {nbNuits} {nbNuits > 1 ? 'Nuits' : 'Nuit'}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        
        {/* DATES & STATUT GLOBAL */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">Arrivée</span>
            <span className="text-sm font-bold text-gray-900">{jourSemaine} {jourMois} {mois}</span>
          </div>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${
            statutHebergement === 'apres_resa' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {statutHebergement === 'apres_resa' ? 'Hébergement Réservé' : 'À Réserver'}
          </span>
        </div>

        {/* 2. BLOC RÉSERVATION HÉBERGEMENTS (Les fameuses sous-bulles empilées) */}
        {hotels.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hébergements confirmés</span>
            {hotels.map((hotel: string, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">🏨</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800">{hotel}</span>
                    <span className="text-[10px] text-gray-500 font-medium group-hover:text-accent transition-colors">Voir la réservation ›</span>
                  </div>
                </div>
                {/* L'avatar de ton groupe (ex: toi et ton ami) */}
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[8px] font-bold">Y</div>
                  <div className="w-6 h-6 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-[8px] font-bold">A</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. BLOC MICRO-ORGANISATION & SÉQUENÇAGE (Conforme au CDC) */}
        <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Programme de l'étape</span>
          
          {/* 3.A. La Ligne de Séquençage (Points d'Ancrage) */}
          <div className="relative pl-4 py-2">
            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200 rounded-full"></div>
            
            {/* Point d'ancrage : Check-in Hôtel */}
            <div className="relative mb-3">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-accent rounded-full border-2 border-white shadow-sm"></div>
              <div className="text-xs font-bold text-gray-800 mb-1">Jour 1 • 14:00</div>
              <div className="bg-blue-50/50 border border-blue-100 p-2 rounded-lg text-xs text-blue-800 font-medium shadow-sm flex items-center gap-2">
                <span>⚓</span> Check-in à l'hébergement
              </div>
            </div>

            {/* Zone de drop pour glisser les activités */}
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white shadow-sm"></div>
              <div className="text-xs font-bold text-gray-500 mb-1">Jours suivants</div>
              <div className="text-[11px] text-gray-400 italic bg-gray-50 p-2 rounded-lg border border-dashed border-gray-200 text-center">
                Glissez-déposez vos activités ici
              </div>
            </div>
          </div>

          {/* 3.B. La Réserve "Lieux à visiter" (Éléments non planifiés) */}
          <div className="mt-2 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs font-bold text-gray-700">Lieux à visiter (Réserve)</span>
              <span className="text-accent text-sm ml-auto cursor-help" title="Activités enregistrées prêtes à être glissées dans le planning">ℹ️</span>
            </div>
            
            {lieuxAVisiter && lieuxAVisiter.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {lieuxAVisiter.map((lieu: string, index: number) => (
                  // Bouton avec indicateur visuel de Drag & Drop (les 6 petits points)
                  <div key={index} className="cursor-grab active:cursor-grabbing text-[11px] font-bold text-gray-700 bg-white px-2 py-1.5 rounded-lg border border-gray-200 shadow-sm hover:border-accent hover:text-accent hover:shadow-md transition-all flex items-center gap-1.5">
                    <span className="text-gray-300 tracking-[-2px]">⋮⋮</span> {lieu}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[11px] text-gray-400">Aucun lieu de votre Bucket List sur cette étape.</div>
            )}
            
            {/* Petit CTA d'ajout rapide issu du CDC */}
            <div className="mt-3 text-center">
               <span className="text-[10px] text-accent font-bold cursor-pointer hover:underline">+ Ajouter une activité</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}