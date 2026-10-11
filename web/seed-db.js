import { supabase } from './lib/supabase.ts';

async function seedRideUpDatabase() {
  console.log("🌱 Début de l'injection des données de test (Seed)...");

  // 1. Création d'un voyage fictif
  const { data: voyageData, error: voyageError } = await supabase
    .from('voyages')
    .insert([
      {
        titre: "Exploration des Philippines",
        statut: "en_cours",
        nb_voyageurs: 2,
        nb_bagages_soute: 1,
        budget_total_estime: 1450.00
      }
    ])
    .select()
    .single();

  if (voyageError) {
    console.error("❌ Erreur lors de la création du voyage :", voyageError.message);
    return;
  }

  const voyageId = voyageData.id;
  console.log(`✅ Voyage créé avec succès (ID: ${voyageId})`);

  // 2. Création des étapes (Destinations)
  const { data: etapeData, error: etapeError } = await supabase
    .from('etapes')
    .insert([
      {
        voyage_id: voyageId,
        ordre: 1,
        titre_lieu: "Boracay",
        date_arrivee: "2025-02-22",
        nb_nuits: 4,
        statut_hebergement: "apres_resa",
        hotel_nom: "Hennan Palm Beach Resort",
        prix_hebergement: 480.00
      }
    ])
    .select()
    .single();

  if (etapeError) {
    console.error("❌ Erreur lors de la création des étapes :", etapeError.message);
    return;
  }

  console.log("✅ Étape de destination créée (Boracay)");

  // 3. Création des trajets multimodaux (Le Grand Départ & Transferts)
  const { error: trajetError } = await supabase
    .from('trajets')
    .insert([
      {
        voyage_id: voyageId,
        type_transport: "avion",
        depart_code: "CDG",
        arrivee_code: "MNL",
        compagnie: "EVA Air",
        statut_reservation: "apres_resa",
        prix_transport: 850.00
      },
      {
        voyage_id: voyageId,
        type_transport: "ferry",
        depart_code: "Caticlan",
        arrivee_code: "Boracay",
        statut_reservation: "avant_resa",
        prix_transport: 25.00,
        alerte_risque: "Dernière navette à 21h00. Attention aux correspondances."
      }
    ]);

  if (trajetError) {
    console.error("❌ Erreur lors de la création des trajets :", trajetError.message);
    return;
  }

  console.log("✅ Trajets multimodaux injectés avec succès !");
  console.log("🚀 Base de données Supabase alimentée et prête à l'emploi.");
}

seedRideUpDatabase();