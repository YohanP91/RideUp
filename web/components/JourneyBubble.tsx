import React from 'react';

// Icônes temporaires (à remplacer par tes SVG ou Lucide/Heroicons)
const PlaneIcon = () => <span className="text-blue-600 text-lg">✈️</span>;
const ShipIcon = () => <span className="text-cyan-600 text-lg">⛴️</span>;
const BusIcon = () => <span className="text-amber-600 text-lg">🚐</span>;
const TaxiIcon = () => <span className="text-yellow-500 text-[10px]">🚕</span>;
const InfoIcon = () => <span className="text-accent text-sm">💡</span>;
const AlertIcon = () => <span className="text-red-500 text-sm">🚨</span>;

export default function JourneyBubble({
  statutReservation, // 'avant_resa' | 'apres_resa'
  titre, typeReserve, departCode, arriveCode, heureDepart, heureArrivee,
  dureeEstimee, compagnie, preAcheminement, postAcheminement, alerteRisque, reference, prixEstime
}: any) {
  
  // Lecture stricte du statut issu de la BDD
  const isBooked = statutReservation === 'apres_resa';

  const getIcon = () => {
    if (typeReserve === 'avion') return <PlaneIcon />;
    if (typeReserve === 'ferry') return <ShipIcon />;
    if (typeReserve === 'bus') return <BusIcon />;
    return <PlaneIcon />;
  };

  // FONCTION DE RENDU DES MICRO-SEGMENTS (Pré/Post Acheminement)
  const renderAcheminement = (acheminement: any, isPre: boolean) => {
    if (!acheminement || !acheminement.options || acheminement.options.length === 0) return null;
    const option = acheminement.options[0]; // L'option sélectionnée par l'utilisateur

    return (
      <div className={`relative px-4 py-3 ${isPre ? 'border-b border-gray-100 bg-gray-50/50' : 'border-t border-gray-100 bg-gray-50/50'}`}>
        {/* La ligne de connexion pointillée */}
        <div className="absolute left-[24px] top-0 bottom-0 w-[2px] border-l-2 border-dashed border-gray-300"></div>
        
        {/* En-tête du segment */}
        <div className="flex items-center gap-2 mb-1 relative z-10">
          <div className="bg-white p-1.5 rounded-full border border-gray-200 shadow-sm"><TaxiIcon /></div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {isPre ? 'Pré-acheminement' : 'Post-acheminement'}
          </p>
        </div>
        
        {/* Détails du segment */}
        <div className="pl-9 flex flex-col gap-1.5 mt-2">
          <p className="text-xs font-bold text-gray-800">
            {acheminement.pointDepart} <span className="text-gray-300 font-normal mx-1">➔</span> {acheminement.pointArrivee}
          </p>
          
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
            <span className="bg-gray-200/50 px-2 py-1 rounded-md text-gray-700">{option.mode}</span>
            {option.duree && <span>⏱️ {option.duree}</span>}
            {option.heure && <span className="font-bold text-accent">🕒 {option.heure}</span>}
          </div>
          
          {/* INFOBULLE 3.TB.C (Conseils locaux spécifiques) */}
          {option.conseil && (
            <div className="mt-2 bg-blue-50/80 border border-blue-100 p-2.5 rounded-xl flex gap-2.5 items-start shadow-sm">
              <div className="mt-0.5"><InfoIcon /></div>
              <p className="leading-relaxed font-medium text-[11px] text-blue-900">{option.conseil}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 w-full overflow-hidden transition-all hover:shadow-xl group">
      
      {/* 1. HEADER DU TRAJET */}
      <div className="px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
            {getIcon()}
          </div>
          <h3 className="font-bold text-gray-800 text-sm">{titre}</h3>
        </div>
        
        {/* BADGE DYNAMIQUE SELON LE STATUT */}
        {isBooked ? (
          <span className="bg-green-100 text-green-700 border border-green-200 text-[9px] uppercase font-black tracking-widest px-2 py-1 rounded-md shadow-sm">
            Confirmé
          </span>
        ) : (
          <span className="bg-orange-100 text-orange-700 border border-orange-200 text-[9px] uppercase font-black tracking-widest px-2 py-1 rounded-md shadow-sm animate-pulse">
            À Réserver
          </span>
        )}
      </div>

      {/* 2. PRÉ-ACHEMINEMENT */}
      {renderAcheminement(preAcheminement, true)}

      {/* 3. TRAJET PRINCIPAL */}
      <div className="relative px-4 py-5">
        {/* La grande ligne pleine du transport lourd */}
        <div className="absolute left-[24px] top-0 bottom-0 w-[2px] bg-blue-500 rounded-full shadow-sm"></div>
        
        <div className="pl-9">
          
          {/* Ligne Meta : Compagnie & PNR vs Estimation Budget */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {compagnie || 'Transporteur non défini'}
              </span>
              {reference && isBooked && (
                <span className="text-[10px] text-gray-500 font-mono mt-0.5 bg-gray-100 px-2 py-0.5 rounded inline-block w-fit">
                  Réf: {reference}
                </span>
              )}
            </div>
            
            {/* Si non réservé, on pousse l'utilisateur à comparer les prix */}
            {!isBooked && prixEstime && (
              <div className="text-right flex flex-col bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                 <span className="text-[9px] font-bold text-gray-400 uppercase">Budget estimé</span>
                 <span className="text-sm font-black text-gray-800">{prixEstime}</span>
              </div>
            )}
          </div>

          {/* Séquençage Horaire du Trajet (Le Billet Visuel) */}
          <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100 shadow-inner">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Départ</span>
              <span className="text-2xl font-black text-gray-900 tracking-tight">{departCode}</span>
              <span className="text-sm font-bold text-accent mt-1">{isBooked ? (heureDepart || '08:00') : '--:--'}</span>
            </div>

            <div className="flex flex-col items-center px-2 flex-1">
              <span className="text-[9px] text-gray-400 font-bold mb-2 uppercase tracking-widest bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-sm">
                {dureeEstimee || 'Durée var.'}
              </span>
              <div className="w-full h-[2px] bg-gray-200 relative flex items-center justify-center">
                <div className="absolute w-2 h-2 bg-gray-300 rounded-full left-0"></div>
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full right-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              </div>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Arrivée</span>
              <span className="text-2xl font-black text-gray-900 tracking-tight">{arriveCode}</span>
              <span className="text-sm font-bold text-accent mt-1">{isBooked ? (heureArrivee || '14:30') : '--:--'}</span>
            </div>
          </div>
          
          {/* Alertes éventuelles (ex: Trajet risqué) */}
          {alerteRisque && !isBooked && (
             <div className="mt-3 text-[10px] text-red-600 bg-red-50 p-2 rounded-lg flex items-center gap-2 font-medium border border-red-100">
                <AlertIcon /> {alerteRisque}
             </div>
          )}
          
          {/* CTAs Dynamiques selon le CDC */}
          {isBooked ? (
            <div className="mt-4 flex gap-2">
               <button className="flex-1 bg-white border border-gray-200 text-gray-700 text-[10px] uppercase tracking-wider font-bold py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
                 Ouvrir le billet
               </button>
               <button className="flex-1 bg-accent text-white text-[10px] uppercase tracking-wider font-bold py-2 rounded-xl shadow-md hover:bg-accent/90 transition-colors">
                 S'enregistrer
               </button>
            </div>
          ) : (
            <div className="mt-4">
               <button className="w-full bg-slate-900 text-white text-[10px] font-bold py-2.5 rounded-xl shadow-md hover:bg-slate-800 transition-colors uppercase tracking-widest">
                 Comparer les offres
               </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. POST-ACHEMINEMENT */}
      {renderAcheminement(postAcheminement, false)}

    </div>
  );
}