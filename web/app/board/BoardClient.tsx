'use client';

import { useEffect, useState } from 'react';
import TopBar from '@/components/TopBar';
import StepBubble from '@/components/StepBubble';
import JourneyBubble from '@/components/JourneyBubble';
import { buildTimeline } from '@/lib/timelineEngine';

export default function BoardClient({ etapes, trajets, pointsInteret }: { etapes: any[], trajets: any[], pointsInteret: any[] }) {
  const [activeLocation, setActiveLocation] = useState('Philippines');
  const timeline = buildTimeline(etapes, trajets);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const loc = entry.target.getAttribute('data-location');
            if (loc) setActiveLocation(loc);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [timeline]);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-slate-900">
      
      {/* 1. CARTE SATELLITE GOOGLE */}
      <div className="absolute inset-0 z-0">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(activeLocation)}&t=k&z=11&output=embed`}
          className="w-full h-full border-none pointer-events-auto scale-[1.05]"
          title="Satellite Map RideUp"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>

      {/* 2. TOP BAR (Détachée et fixée au tout premier plan) */}
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-auto">
        <TopBar />
      </div>

      {/* 3. TIMELINE (Prend 100% de la hauteur, les bulles glissent derrière la TopBar) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <main id="timeline-container" className="w-[480px] h-full overflow-y-auto pb-64 no-scrollbar px-6 scroll-smooth pointer-events-auto">
          
          {/* CALE INVISIBLE : Pousse le contenu au démarrage pour ne pas être caché par la TopBar */}
          <div className="h-[140px] w-full flex-shrink-0"></div>

          <div className="relative pl-12 w-full"> 
            
            <div className="absolute left-[3.25rem] top-0 bottom-0 w-[3px] bg-white/30 rounded-full shadow-md"></div>

            {timeline.map((item) => {
              if (item.type === 'TRAJET') {
                const trajet = item.data;
                const isVol = trajet.type_transport === 'avion';
                
                return (
                  <div key={item.id} className="mb-6 timeline-item" data-location={isVol ? `Aéroport ${trajet.arrivee_code}, Philippines` : `Port de ${trajet.arrivee_code}, Philippines`}>
                    <JourneyBubble 
                      statutReservation={trajet.statut_reservation || "apres_resa"}
                      titre={isVol ? `Vol ${trajet.depart_code} ➔ ${trajet.arrivee_code}` : `Trajet ${trajet.depart_code} ➔ ${trajet.arrivee_code}`} 
                      jourSemaine={isVol ? "Jeu." : "Sam."} 
                      jourMois={isVol ? "20" : "22"} 
                      mois="Fév."
                      dureeEstimee={isVol ? "12h 30m" : "Variable"}
                      typeReserve={trajet.type_transport} 
                      departCode={trajet.depart_code} 
                      arriveCode={trajet.arrivee_code} 
                      heureDepart={isVol ? "08:00" : undefined} 
                      heureArrivee={isVol ? "14:30" : undefined} 
                      compagnie={trajet.compagnie} 
                      preAcheminement={trajet.preAcheminement}
                      postAcheminement={trajet.postAcheminement}
                      alerteRisque={trajet.alerte_risque}
                    />
                  </div>
                );
              } 

            if (item.type === 'ETAPE') {
                const etape = item.data;
                
                // On filtre les activités qui appartiennent à cette étape précise
                const activites = pointsInteret
                  ?.filter(poi => poi.etape_id === etape.id)
                  .map(poi => poi.titre) || [];

                return (
                  <div key={item.id} className="mb-6 timeline-item" data-location={`${etape.titre_lieu}, Philippines`}>
                    <StepBubble 
                      numero={etape.ordre} 
                      ville={etape.titre_lieu} 
                      jourSemaine="Sam." jourMois="22" mois="Fév." 
                      nbNuits={etape.nb_nuits} 
                      infoLieu="Philippines"
                      bgImageUrl="https://images.unsplash.com/photo-1520113412646-fa19641d4511?q=80&w=1000"
                      statutHebergement={etape.statut_hebergement} 
                      hotelNom={etape.hotel_nom}
                      // ON INJECTE LES VRAIES ACTIVITÉS :
                      lieuxAVisiter={activites.length > 0 ? activites : ["Programme libre"]}
                    />
                  </div>
                );
              }
              return null;
            })}

          </div>
        </main>
      </div>
    </div>
  );
}