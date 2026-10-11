const fs = require('fs');

const dirs = [
  "app/inspi", "app/board/poi/[id]", "app/board/voyageurs", "app/board/conseils", 
  "app/board/todo", "app/board/meteo", "app/board/budget", "app/auth", 
  "app/profile/preferences", "app/history/current", "app/history/past", 
  "app/settings", "app/contribute", "app/legal/faq", "app/legal/mentions", 
  "app/legal/cgu", "app/legal/privacy", "app/legal/about", 
  "components/modals", "components/popovers", "components/sidepanels",
  "components/comparators"
];

const files = {
  "app/inspi/page.tsx": "/**\n * @CDC_ID 1.3\n */\nexport default function InspiPage() { return <div className=\"p-8\">1.3 - Inspi et offres</div>; }",
  "app/board/poi/[id]/page.tsx": "/**\n * @CDC_ID 3.TB.I.D\n */\nexport default function DetailPOIPage() { return <div className=\"p-8\">3.TB.I.D - Détail POI</div>; }",
  "app/board/voyageurs/page.tsx": "/**\n * @CDC_ID 3.2\n */\nexport default function VoyageursPage() { return <div className=\"p-8\">3.2 - Voyageurs et Documents</div>; }",
  "app/board/conseils/page.tsx": "/**\n * @CDC_ID 3.3\n */\nexport default function ConseilsPage() { return <div className=\"p-8\">3.3 - Conseils</div>; }",
  "app/board/todo/page.tsx": "/**\n * @CDC_ID 3.4\n */\nexport default function TodoPage() { return <div className=\"p-8\">3.4 - To-do list</div>; }",
  "app/board/meteo/page.tsx": "/**\n * @CDC_ID 3.5\n */\nexport default function MeteoPage() { return <div className=\"p-8\">3.5 - Météo</div>; }",
  "app/board/budget/page.tsx": "/**\n * @CDC_ID 3.8\n */\nexport default function BudgetPage() { return <div className=\"p-8\">3.8 - Budget</div>; }",
  "app/auth/page.tsx": "/**\n * @CDC_ID C.L\n */\nexport default function AuthPage() { return <div className=\"p-8\">C.L - Connexion / Inscription</div>; }",
  "app/profile/page.tsx": "/**\n * @CDC_ID C.1\n */\nexport default function ProfilePage() { return <div className=\"p-8\">C.1 - Compte</div>; }",
  "app/profile/preferences/page.tsx": "/**\n * @CDC_ID C.2\n */\nexport default function PreferencesPage() { return <div className=\"p-8\">C.2 - Préférences</div>; }",
  "app/history/current/page.tsx": "/**\n * @CDC_ID C.3\n */\nexport default function CurrentTripsPage() { return <div className=\"p-8\">C.3 - Réservations en cours</div>; }",
  "app/history/past/page.tsx": "/**\n * @CDC_ID C.4\n */\nexport default function PastTripsPage() { return <div className=\"p-8\">C.4 - Voyages Passés</div>; }",
  "app/settings/page.tsx": "/**\n * @CDC_ID C.8\n */\nexport default function SettingsPage() { return <div className=\"p-8\">C.8 - Paramètres</div>; }",
  "app/contribute/page.tsx": "/**\n * @CDC_ID C.C\n */\nexport default function ContributePage() { return <div className=\"p-8\">C.C - Contribuer</div>; }",
  "app/legal/faq/page.tsx": "/**\n * @CDC_ID Z.Q\n */\nexport default function FAQPage() { return <div className=\"p-8\">Z.Q - FAQ</div>; }",
  "app/legal/mentions/page.tsx": "/**\n * @CDC_ID Z.L\n */\nexport default function MentionsPage() { return <div className=\"p-8\">Z.L - Mentions Légales</div>; }",
  "app/legal/cgu/page.tsx": "/**\n * @CDC_ID Z.C\n */\nexport default function CGUPage() { return <div className=\"p-8\">Z.C - CGU/CGV</div>; }",
  "app/legal/about/page.tsx": "/**\n * @CDC_ID Z.W\n */\nexport default function AboutPage() { return <div className=\"p-8\">Z.W - Qui sommes-nous ?</div>; }",
  "app/legal/privacy/page.tsx": "/**\n * @CDC_ID Z.P\n */\nexport default function PrivacyPage() { return <div className=\"p-8\">Z.P - Confidentialité</div>; }",

  "components/modals/DetailsVoyageModal.tsx": "/**\n * @CDC_ID 3.TB.D\n */\nexport default function DetailsVoyageModal() { return null; }",
  "components/modals/DetailsReservationModal.tsx": "/**\n * @CDC_ID 3.TB.DR\n */\nexport default function DetailsReservationModal() { return null; }",
  "components/modals/InfoPaysModal.tsx": "/**\n * @CDC_ID 3.TB.PAYS\n */\nexport default function InfoPaysModal() { return null; }",
  "components/modals/ParametresNotificationsModal.tsx": "/**\n * @CDC_ID 3.TB.N\n */\nexport default function ParametresNotificationsModal() { return null; }",
  "components/modals/AjouterElementModal.tsx": "/**\n * @CDC_ID 3.TB.A\n */\nexport default function AjouterElementModal() { return null; }",
  "components/modals/LivePanelModal.tsx": "/**\n * @CDC_ID 3.L\n */\nexport default function LivePanelModal() { return null; }",
  "components/modals/ComparateurIntegreModal.tsx": "/**\n * @CDC_ID 4.\n */\nexport default function ComparateurIntegreModal() { return null; }",
  
  "components/comparators/HebergementsComparator.tsx": "/**\n * @CDC_ID 4.1\n */\nexport default function HebergementsComparator() { return null; }",
  "components/comparators/VolsComparator.tsx": "/**\n * @CDC_ID 4.2.1\n */\nexport default function VolsComparator() { return null; }",
  "components/comparators/TrainsComparator.tsx": "/**\n * @CDC_ID 4.2.2\n */\nexport default function TrainsComparator() { return null; }",
  "components/comparators/FerriesComparator.tsx": "/**\n * @CDC_ID 4.2.3\n */\nexport default function FerriesComparator() { return null; }",
  "components/comparators/BusComparator.tsx": "/**\n * @CDC_ID 4.2.5\n */\nexport default function BusComparator() { return null; }",
  "components/comparators/ActivitesComparator.tsx": "/**\n * @CDC_ID 4.4.1\n */\nexport default function ActivitesComparator() { return null; }",
  "components/comparators/PacksPassComparator.tsx": "/**\n * @CDC_ID 4.4.2\n */\nexport default function PacksPassComparator() { return null; }",
  "components/modals/DetailsOffreModal.tsx": "/**\n * @CDC_ID 4.D\n */\nexport default function DetailsOffreModal() { return null; }",

  "components/popovers/BilletQRPopover.tsx": "/**\n * @CDC_ID 3.TB.QR\n */\nexport default function BilletQRPopover() { return null; }",
  "components/popovers/OnlineCheckInPopover.tsx": "/**\n * @CDC_ID 3.TB.OC\n */\nexport default function OnlineCheckInPopover() { return null; }",
  "components/popovers/BriefInfoPOIPopover.tsx": "/**\n * @CDC_ID 3.TB.I.B\n */\nexport default function BriefInfoPOIPopover() { return null; }",
  "components/popovers/ConseilsContextuelsPopover.tsx": "/**\n * @CDC_ID 3.TB.C\n */\nexport default function ConseilsContextuelsPopover() { return null; }",
  "components/popovers/ConfirmationVisitePopover.tsx": "/**\n * @CDC_ID 3.TB.CV\n */\nexport default function ConfirmationVisitePopover() { return null; }",
  "components/popovers/LivePanelBienvenuePopover.tsx": "/**\n * @CDC_ID 3.L.B\n */\nexport default function LivePanelBienvenuePopover() { return null; }",
  "components/popovers/LivePanelConseilsPopover.tsx": "/**\n * @CDC_ID 3.L.C\n */\nexport default function LivePanelConseilsPopover() { return null; }",
  "components/popovers/LivePanelTransitPopover.tsx": "/**\n * @CDC_ID 3.L.T\n */\nexport default function LivePanelTransitPopover() { return null; }",
  "components/popovers/LivePanelDocumentsPopover.tsx": "/**\n * @CDC_ID 3.L.D\n */\nexport default function LivePanelDocumentsPopover() { return null; }",
  "components/popovers/ConfirmationReservationPopover.tsx": "/**\n * @CDC_ID 4.D.C\n */\nexport default function ConfirmationReservationPopover() { return null; }",
  "components/popovers/MenuProfilPopover.tsx": "/**\n * @CDC_ID M.P\n */\nexport default function MenuProfilPopover() { return null; }",
  "components/popovers/MenuTableauBordPopover.tsx": "/**\n * @CDC_ID M.TB\n */\nexport default function MenuTableauBordPopover() { return null; }",
  "components/popovers/MenuBasPagePopover.tsx": "/**\n * @CDC_ID M.BP\n */\nexport default function MenuBasPagePopover() { return null; }",
  "components/sidepanels/MenuProjetsSidepanel.tsx": "/**\n * @CDC_ID M.V\n */\nexport default function MenuProjetsSidepanel() { return null; }"
};

console.log("Création des dossiers...");
dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

console.log("Création des fichiers...");
for (const [p, c] of Object.entries(files)) {
  fs.writeFileSync(p, c);
}

console.log("SUCCÈS TOTAL : Ossature MVP générée !");