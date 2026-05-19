import type { Recommendation, StructuredSource } from '../../types';

export const PRO_V4_SOURCES: Record<string, StructuredSource> = {
  natureparifGestionEcologique: {
    title: 'Guide de gestion écologique des espaces collectifs publics et privés',
    organisation: 'Natureparif / ANVL / Région Île-de-France',
    year: '2016',
    note: 'Gestion écologique, gestion différenciée, communication, zéro pesticide, milieux herbacés, éclairage, continuités écologiques.',
  },
  guideBiodiversitePaysage: {
    title: 'Guide Biodiversité à l’usage des entreprises du paysage et des gestionnaires de jardins et espaces verts privés',
    organisation: 'Unep, Noé, Arthropologia, Office français de la biodiversité',
    year: '2025',
    note: 'Conception, chantier, sol vivant, périodes d’intervention, éclairage, habitats, entretien et pédagogie client.',
  },
  arpeSansPesticides: {
    title: 'Jardiner sans pesticides : la pratique des méthodes naturelles au jardin',
    organisation: 'ARPE / Région Provence-Alpes-Côte d’Azur',
    year: '2016',
    note: 'Prévention, auxiliaires, sol vivant, compost, paillage, eau, impacts des pesticides sur la biodiversité et la santé.',
  },
  afilogPaysage: {
    title: 'Guide du paysage AFILOG : sites logistiques',
    organisation: 'AFILOG / PAYET',
    year: '2025',
    note: 'Diagnostic paysager, haies, prairies, bassins, palettes végétales, sols, plantations et gestion écologique des sites logistiques.',
  },
  natagoraJardinNaturel: {
    title: 'Aménager votre jardin naturel au fil des saisons',
    organisation: 'Natagora',
    year: '2021',
    note: 'Exemples concrets de zones refuges, mares, haies, herbes folles, lierre, orties et micro-habitats.',
  },
};

const soft = (values: Record<string, number>) => JSON.stringify(values);

export const PRO_V4_RECOMMENDATION_ADDITIONS: Recommendation[] = [
  {
    id: 'pro_v4_acceptabilite_signalisation_gestion_ecologique',
    titre: 'Accompagner la gestion écologique par une communication usagers',
    categorie: 'Acceptabilité / exploitation',
    description:
      'Prévoir une signalétique simple, une note d’information ou un court support pédagogique pour expliquer les zones en fauche tardive, les haies libres, les pieds d’arbres végétalisés, les zones refuges, les micro-habitats et l’arrêt des traitements chimiques. Cette recommandation réduit le risque que la gestion écologique soit perçue comme un défaut d’entretien.',
    hard_filters: JSON.stringify({ any: [
      { field: 'stakeholder_constraints', op: '==', value: 'acceptabilite' },
      { field: 'final_priority', op: '==', value: 'argumentaire' },
      { field: 'asset_type', op: 'in', value: ['residentiel', 'tertiaire'] },
      { field: 'maintenance_scope', op: 'in', value: ['fort', 'moyen'] },
    ] }),
    soft_scores: soft({ acceptabilite: 10, pilotage: 8, impact_biodiversite: 5, risque: 4, cout: 4 }),
    niveau_risque: 'moyen',
    note_securite:
      'À intégrer au plan de communication locataires, riverains, usagers ou exploitants, notamment sur les sites fréquentés ou visibles depuis l’espace public.',
    source: PRO_V4_SOURCES.natureparifGestionEcologique,
    active: true,
    horizon: 'court terme',
  },
  {
    id: 'pro_v4_plan_gestion_differenciee_zones_refuges',
    titre: 'Structurer un plan de gestion différenciée par zones d’usage',
    categorie: 'Gestion écologique / maintenance',
    description:
      'Distinguer les zones d’usage intensif, les zones d’usage ponctuel et les zones refuges. Définir pour chaque secteur une fréquence d’intervention, une hauteur de coupe, une période de fauche, les modalités d’export des résidus et les secteurs laissés non fauchés à chaque passage.',
    hard_filters: JSON.stringify({ any: [
      { field: 'maintenance_scope', op: 'in', value: ['fort', 'moyen'] },
      { field: 'site_surface_range', op: 'in', value: ['5000_10000', '1_5_ha', 'plus_5_ha'] },
      { field: 'soil_full_ground', op: 'in', value: ['oui_importantes', 'oui_limitees'] },
    ] }),
    soft_scores: soft({ impact_biodiversite: 10, pilotage: 9, cout: 7, climat: 5, eau: 5, risque: 4 }),
    niveau_risque: 'faible',
    note_securite:
      'La gestion différenciée doit rester compatible avec la sécurité, les usages et les contraintes incendie ou accessibilité. Les zones refuges doivent être clairement localisées.',
    source: PRO_V4_SOURCES.natureparifGestionEcologique,
    active: true,
    horizon: 'court terme',
  },
  {
    id: 'pro_v4_preserver_restaurer_sol_vivant',
    titre: 'Préserver et restaurer le sol vivant',
    categorie: 'Sols / pleine terre',
    description:
      'Limiter le compactage, éviter les sols nus, préserver les horizons lors des travaux, maintenir ou réintroduire de la matière organique, privilégier les paillages végétaux et adapter les plantations au sol existant. Le sol doit être traité comme un écosystème, pas seulement comme un support de plantation.',
    hard_filters: JSON.stringify({ any: [
      { field: 'land_take', op: '==', value: 'oui' },
      { field: 'soil_full_ground', op: 'in', value: ['oui_importantes', 'oui_limitees', 'nspp'] },
      { field: 'final_priority', op: 'in', value: ['actions', 'strategie'] },
    ] }),
    soft_scores: soft({ impact_biodiversite: 9, eau: 8, climat: 7, pilotage: 6, risque: 5, cout: 4 }),
    niveau_risque: 'moyen',
    note_securite:
      'À articuler avec les études de sol, les contraintes de pollution, de portance, de réseaux, de chantier et de gestion des eaux pluviales.',
    source: PRO_V4_SOURCES.guideBiodiversitePaysage,
    active: true,
    horizon: 'conception puis exploitation',
  },
  {
    id: 'pro_v4_zero_phyto_renforce',
    titre: 'Formaliser un engagement zéro pesticide et zéro traitement systématique',
    categorie: 'Santé / eau / biodiversité',
    description:
      'Écarter désherbants chimiques, insecticides, fongicides, anti-limaces, raticides non ciblés et traitements préventifs non justifiés. Préférer la prévention, l’observation, les auxiliaires, le paillage, le choix d’espèces adaptées, la tolérance à une flore spontanée maîtrisée et les méthodes alternatives.',
    hard_filters: JSON.stringify({ any: [
      { field: 'maintenance_scope', op: 'in', value: ['fort', 'moyen'] },
      { field: 'final_priority', op: 'in', value: ['risques', 'actions', 'certification'] },
    ] }),
    soft_scores: soft({ conformite: 8, impact_biodiversite: 10, risque: 8, eau: 9, acceptabilite: 5, certification: 5 }),
    niveau_risque: 'élevé',
    note_securite:
      'À inscrire dans les clauses d’entretien, les contrats prestataires, les consignes au gestionnaire et les preuves de certification le cas échéant.',
    source: PRO_V4_SOURCES.arpeSansPesticides,
    active: true,
    horizon: 'immédiat',
  },
  {
    id: 'pro_v4_micro_habitats_integrer_maintenance',
    titre: 'Intégrer des micro-habitats compatibles avec l’exploitation',
    categorie: 'Habitats / petite faune',
    description:
      'Conserver ou créer des micro-habitats : bois mort sécurisé, feuilles mortes en pied de haie, tas de pierres, fascines, zones de sol nu sableux, ourlets herbacés, souches, bûches percées, refuges discrets en lisière ou en toiture végétalisée. Les localiser hors des zones de circulation et prévoir leur entretien minimal.',
    hard_filters: JSON.stringify({ any: [
      { field: 'soil_full_ground', op: 'in', value: ['oui_importantes', 'oui_limitees'] },
      { field: 'roof_green', op: '==', value: 'oui' },
      { field: 'site_surface_range', op: 'in', value: ['5000_10000', '1_5_ha', 'plus_5_ha'] },
    ] }),
    soft_scores: soft({ impact_biodiversite: 10, pilotage: 6, cout: 8, acceptabilite: 4, climat: 3, certification: 5 }),
    niveau_risque: 'faible',
    note_securite:
      'À éviter dans les secteurs où ils créeraient un risque d’incendie, de chute, d’obstacle, de stockage sauvage ou de conflit avec les usages.',
    source: PRO_V4_SOURCES.afilogPaysage,
    active: true,
    horizon: 'court terme',
  },
  {
    id: 'pro_v4_strategie_eclairage_trame_noire',
    titre: 'Élaborer une stratégie d’éclairage favorable à la trame noire',
    categorie: 'Éclairage / trame noire',
    description:
      'Réduire les durées d’éclairage, éviter l’éclairage direct des haies, arbres, bassins, noues, façades et zones refuges, orienter les flux vers le bas, privilégier la détection ou l’extinction partielle et choisir des températures de couleur moins perturbantes pour la faune nocturne.',
    hard_filters: JSON.stringify({ any: [
      { field: 'lighting_night', op: 'in', value: ['oui_fort', 'oui_modulable', 'nspp'] },
      { field: 'asset_type', op: 'in', value: ['logistique', 'industriel', 'tertiaire'] },
    ] }),
    soft_scores: soft({ impact_biodiversite: 9, risque: 8, conformite: 6, climat: 6, cout: 5, certification: 5 }),
    niveau_risque: 'moyen',
    note_securite:
      'À arbitrer avec les besoins de sécurité, de sûreté, d’accessibilité, de vidéoprotection et d’exploitation nocturne.',
    source: PRO_V4_SOURCES.natureparifGestionEcologique,
    active: true,
    horizon: 'conception ou exploitation',
  },
  {
    id: 'pro_v4_clotures_permeables_petite_faune',
    titre: 'Rendre les clôtures perméables à la petite faune',
    categorie: 'Continuités écologiques',
    description:
      'Prévoir des passages réguliers en pied de clôture, éviter les clôtures totalement jointives au sol lorsque ce n’est pas indispensable, maintenir des continuités végétales et ne pas isoler les haies, noues, bassins, talus et zones refuges. Cette mesure limite la fragmentation à l’échelle de la parcelle.',
    hard_filters: JSON.stringify({ any: [
      { field: 'site_surface_range', op: 'in', value: ['5000_10000', '1_5_ha', 'plus_5_ha'] },
      { field: 'geo_context', op: 'in', value: ['periurbain', 'rural'] },
      { field: 'asset_type', op: 'in', value: ['logistique', 'industriel', 'residentiel'] },
    ] }),
    soft_scores: soft({ impact_biodiversite: 9, risque: 6, pilotage: 6, cout: 7, certification: 5, acceptabilite: 4 }),
    niveau_risque: 'moyen',
    note_securite:
      'À adapter aux contraintes de sûreté, ICPE, contrôle d’accès, prévention intrusion, animaux domestiques et sécurité des personnes.',
    source: PRO_V4_SOURCES.natureparifGestionEcologique,
    active: true,
    horizon: 'conception',
  },
  {
    id: 'pro_v4_calendrier_ecologique_interventions',
    titre: 'Créer un calendrier écologique des interventions',
    categorie: 'Chantier / exploitation',
    description:
      'Planifier tailles, abattages, débroussaillages, curages, fauches, interventions sur bassins et travaux lourds en tenant compte des périodes sensibles pour les oiseaux, amphibiens, reptiles, chiroptères, pollinisateurs et flore spontanée. Formaliser des points d’arrêt en cas de découverte d’enjeu écologique.',
    hard_filters: JSON.stringify({ any: [
      { field: 'has_project', op: '==', value: 'oui' },
      { field: 'ecology_study', op: 'in', value: ['non', 'partiel', 'nspp'] },
      { field: 'project_stage', op: 'in', value: ['permis', 'pro_dce', 'chantier', 'exploitation'] },
    ] }),
    soft_scores: soft({ risque: 10, conformite: 9, impact_biodiversite: 9, delais: 7, pilotage: 8, certification: 6 }),
    niveau_risque: 'élevé',
    note_securite:
      'Ne remplace pas un diagnostic écologique quand celui-ci est nécessaire. À articuler avec les obligations espèces protégées et les prescriptions locales.',
    source: PRO_V4_SOURCES.guideBiodiversitePaysage,
    active: true,
    horizon: 'immédiat puis annuel',
  },
  {
    id: 'pro_v4_sciences_participatives_suivi_leger',
    titre: 'Proposer un suivi léger et mobilisateur de la biodiversité',
    categorie: 'Suivi / engagement',
    description:
      'Pour les sites fréquentés, proposer un suivi simple : observations opportunistes, photos d’espèces, suivi de floraison, comptage d’oiseaux ou de pollinisateurs, mobilisation d’outils de sciences participatives. L’objectif est de renforcer l’appropriation du site sans promettre un inventaire réglementaire.',
    hard_filters: JSON.stringify({ any: [
      { field: 'asset_type', op: 'in', value: ['residentiel', 'tertiaire'] },
      { field: 'final_priority', op: 'in', value: ['argumentaire', 'strategie', 'certification'] },
    ] }),
    soft_scores: soft({ acceptabilite: 9, pilotage: 8, impact_biodiversite: 5, certification: 5, cout: 6 }),
    niveau_risque: 'faible',
    note_securite:
      'Bien distinguer animation, sensibilisation et sciences participatives d’un diagnostic faune-flore-habitats réalisé par un écologue.',
    source: PRO_V4_SOURCES.guideBiodiversitePaysage,
    active: true,
    horizon: 'exploitation',
  },
];
