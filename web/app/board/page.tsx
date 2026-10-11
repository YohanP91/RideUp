import { supabase } from '@/lib/supabase';
import BoardClient from './BoardClient';

export default async function TravelBoard() {
  // 1. Appel dynamique à la Base de Données
  const { data: voyages, error: errorVoyage } = await supabase.from('voyages').select('*').limit(1);
  const voyageId = voyages && voyages.length > 0 ? voyages[0].id : null;

  // SÉCURITÉ : Si la requête échoue ou que la DB est vide
  if (!voyageId) {
    return (
      <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center p-10 z-50 relative pointer-events-auto">
        <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-xl max-w-lg mb-4">
          <h2 className="text-xl font-bold mb-2">⚠️ Base de données inaccessible</h2>
          <p>Next.js n'arrive pas à lire la table <b>voyages</b>.</p>
          <p className="mt-2 text-sm opacity-80">Erreur technique : {errorVoyage?.message || "Aucune ligne trouvée."}</p>
        </div>
      </div>
    );
  }

  // 2. On charge les données associées au voyage
  const { data: etapes } = await supabase.from('etapes').select('*').eq('voyage_id', voyageId).order('ordre', { ascending: true });
  const { data: trajets } = await supabase.from('trajets').select('*').eq('voyage_id', voyageId);
  
  // 3. On charge les activités (Points d'Intérêt)
  const { data: pointsInteret } = await supabase.from('points_interet').select('*');

  // 4. On passe le tout au client
  return <BoardClient etapes={etapes || []} trajets={trajets || []} pointsInteret={pointsInteret || []} />;
}