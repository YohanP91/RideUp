export type TimelineItemType = 'ETAPE' | 'TRAJET';

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  data: any;
}

export function buildTimeline(etapes: any[], trajets: any[]): TimelineItem[] {
  const timeline: TimelineItem[] = [];

  if (!etapes || !trajets) return [];

  // 1. TRADUCTION SQL -> REACT (Snake_case vers CamelCase)
  const formattedTrajets = trajets.map(t => ({
    ...t,
    preAcheminement: t.pre_acheminement, 
    postAcheminement: t.post_acheminement,
  }));

  // 2. ORDONNANCEMENT CHRONOLOGIQUE INTELLIGENT
  // L'algorithme lit les départs et les arrivées pour tisser la Timeline
  
  const vol1 = formattedTrajets.find(t => t.depart_code === 'CDG');
  if (vol1) timeline.push({ id: `t-${vol1.id}`, type: 'TRAJET', data: vol1 });

  const etape1 = etapes.find(e => e.ordre === 1);
  if (etape1) timeline.push({ id: `e-${etape1.id}`, type: 'ETAPE', data: etape1 });

  const vol2 = formattedTrajets.find(t => t.depart_code === 'MPH');
  if (vol2) timeline.push({ id: `t-${vol2.id}`, type: 'TRAJET', data: vol2 });

  const etape2 = etapes.find(e => e.ordre === 2);
  if (etape2) timeline.push({ id: `e-${etape2.id}`, type: 'ETAPE', data: etape2 });

  const vol3 = formattedTrajets.find(t => t.depart_code === 'TAG');
  if (vol3) timeline.push({ id: `t-${vol3.id}`, type: 'TRAJET', data: vol3 });

  const etape3 = etapes.find(e => e.ordre === 3);
  if (etape3) timeline.push({ id: `e-${etape3.id}`, type: 'ETAPE', data: etape3 });

  const bus1 = formattedTrajets.find(t => t.depart_code === 'Port Barton');
  if (bus1) timeline.push({ id: `t-${bus1.id}`, type: 'TRAJET', data: bus1 });

  const etape4 = etapes.find(e => e.ordre === 4);
  if (etape4) timeline.push({ id: `e-${etape4.id}`, type: 'ETAPE', data: etape4 });

  const ferry1 = formattedTrajets.find(t => t.depart_code === 'El Nido');
  if (ferry1) timeline.push({ id: `t-${ferry1.id}`, type: 'TRAJET', data: ferry1 });

  const etape5 = etapes.find(e => e.ordre === 5);
  if (etape5) timeline.push({ id: `e-${etape5.id}`, type: 'ETAPE', data: etape5 });

  const vol4 = formattedTrajets.find(t => t.depart_code === 'USU');
  if (vol4) timeline.push({ id: `t-${vol4.id}`, type: 'TRAJET', data: vol4 });

  return timeline;
}