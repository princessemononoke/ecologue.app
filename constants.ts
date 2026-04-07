
import { QuestionnaireData, Recommendation } from './types';

export const QUESTIONNAIRE: QuestionnaireData = {
  "version": "pro_v1",
  "fields": [
    {
      "key": "persona",
      "label": "Quel est votre profil ?",
      "type": "select",
      "options": [
        { "label": "Directeur·trice RSE / Développement durable (MOA / Foncière / Promoteur)", "value": "rse_dd" },
        { "label": "Directeur·trice Développement / Foncier (Promoteur / Développeur)", "value": "dev_foncier" },
        { "label": "Directeur·trice Technique / Asset Management (Foncière / Bailleur)", "value": "tech_asset" },
        { "label": "Responsable Certification / Qualité environnementale (BREEAM / HQE)", "value": "certif_qe" }
      ],
      "optional": false
    },
    {
      "key": "has_project",
      "label": "Avez-vous un projet en cours (ou à l’étude) ?",
      "type": "select",
      "options": [
        { "label": "Oui, un projet identifié", "value": "oui" },
        { "label": "Pas encore, mais je prépare une stratégie / des standards", "value": "strategie" },
        { "label": "Non, je veux surtout m’informer", "value": "non" }
      ],
      "optional": false
    },
    {
      "key": "project_stage",
      "label": "À quel stade en est le projet ?",
      "type": "select",
      "when": { "field": "has_project", "op": "==", "value": "oui" },
      "options": [
        { "label": "Prospection / Foncier (avant acquisition)", "value": "prospection" },
        { "label": "Faisabilité / Esquisse", "value": "faisabilite" },
        { "label": "Conception (APS/APD)", "value": "conception" },
        { "label": "Dépôt / instruction permis", "value": "permis" },
        { "label": "PRO / DCE (consultations)", "value": "pro_dce" },
        { "label": "Chantier", "value": "chantier" },
        { "label": "Exploitation / rénovation", "value": "exploitation" }
      ],
      "optional": false
    },
    {
      "key": "asset_type",
      "label": "Quel type de site / actif est concerné ?",
      "type": "select",
      "options": [
        { "label": "Plateforme logistique", "value": "logistique" },
        { "label": "Site industriel", "value": "industriel" },
        { "label": "Bureaux / tertiaire", "value": "tertiaire" },
        { "label": "Mixte / autre", "value": "autre" }
      ],
      "optional": false
    },
    {
      "key": "geo_context",
      "label": "Où se situe le site (au choix) ?",
      "type": "select",
      "options": [
        { "label": "Zone urbaine dense / centre-ville", "value": "urbain_dense" },
        { "label": "Périurbain / zone d’activités", "value": "periurbain" },
        { "label": "Rural / agricole", "value": "rural" },
        { "label": "Je ne sais pas / plusieurs sites", "value": "nspp" }
      ],
      "optional": true
    },
    {
      "key": "certif_target",
      "label": "Visez-vous une certification / label ?",
      "type": "select",
      "options": [
        { "label": "BREEAM", "value": "breeam" },
        { "label": "HQE", "value": "hqe" },
        { "label": "BiodiverCity", "value": "biodivercity" },
        { "label": "Plusieurs / autre", "value": "multi" },
        { "label": "Non", "value": "non" }
      ],
      "optional": false
    },
    {
      "key": "ecology_study",
      "label": "Disposez-vous déjà d’un diagnostic / état initial écologique ?",
      "type": "select",
      "options": [
        { "label": "Oui, complet et récent", "value": "oui_recent" },
        { "label": "Oui, mais partiel / ancien", "value": "partiel" },
        { "label": "Non", "value": "non" },
        { "label": "Je ne sais pas", "value": "nspp" }
      ],
      "optional": false
    },
    {
      "key": "land_take",
      "label": "Le projet prévoit-il une artificialisation / emprise nouvelle significative ?",
      "type": "select",
      "options": [
        { "label": "Oui", "value": "oui" },
        { "label": "Non (rénovation / optimisation)", "value": "non" },
        { "label": "Je ne sais pas", "value": "nspp" }
      ],
      "optional": false
    },
    {
      "key": "soil_full_ground",
      "label": "Avez-vous des surfaces de pleine terre (ou la possibilité d’en créer) ?",
      "type": "select",
      "options": [
        { "label": "Oui, importantes", "value": "oui_importantes" },
        { "label": "Oui, mais limitées", "value": "oui_limitees" },
        { "label": "Non / quasi pas", "value": "non" },
        { "label": "Je ne sais pas", "value": "nspp" }
      ],
      "optional": false
    },
    {
      "key": "stormwater",
      "label": "Le site gère-t-il les eaux pluviales via bassins / noues / infiltration (ou c’est envisagé) ?",
      "type": "select",
      "options": [
        { "label": "Oui, déjà en place", "value": "oui_existant" },
        { "label": "Oui, prévu au projet", "value": "oui_prevu" },
        { "label": "Non / rejet réseau principalement", "value": "non" },
        { "label": "Je ne sais pas", "value": "nspp" }
      ],
      "optional": false
    },
    {
      "key": "roof_green",
      "label": "Des toitures végétalisées sont-elles envisagées ?",
      "type": "select",
      "options": [
        { "label": "Oui", "value": "oui" },
        { "label": "Non", "value": "non" },
        { "label": "Je ne sais pas", "value": "nspp" }
      ],
      "optional": false
    },
    {
      "key": "roof_solar",
      "label": "Des panneaux photovoltaïques en toiture sont-ils envisagés ?",
      "type": "select",
      "options": [
        { "label": "Oui", "value": "oui" },
        { "label": "Non", "value": "non" },
        { "label": "Je ne sais pas", "value": "nspp" }
      ],
      "optional": false
    },
    {
      "key": "lighting_night",
      "label": "Avez-vous des enjeux d’éclairage nocturne (sécurité, parkings, flux) ?",
      "type": "select",
      "options": [
        { "label": "Oui, éclairage important", "value": "oui_fort" },
        { "label": "Oui, mais modulable", "value": "oui_modulable" },
        { "label": "Peu / non", "value": "non" },
        { "label": "Je ne sais pas", "value": "nspp" }
      ],
      "optional": false
    },
    {
      "key": "maintenance_scope",
      "label": "Quel est votre levier principal sur l’exploitation/maintenance ?",
      "type": "select",
      "options": [
        { "label": "Fort (marchés, cahiers des charges, équipe dédiée)", "value": "fort" },
        { "label": "Moyen (prestataires + pilotage)", "value": "moyen" },
        { "label": "Faible (peu de marge)", "value": "faible" },
        { "label": "Je ne sais pas", "value": "nspp" }
      ],
      "optional": false
    },
    {
      "key": "stakeholder_constraints",
      "label": "Contraintes majeures (choisissez la plus limitante)",
      "type": "select",
      "options": [
        { "label": "Budget", "value": "budget" },
        { "label": "Délais", "value": "delais" },
        { "label": "Acceptabilité / usages (riverains, exploitant)", "value": "acceptabilite" },
        { "label": "Risque opérationnel (sécurité, sûreté, conformité)", "value": "risque_op" },
        { "label": "Aucune contrainte majeure", "value": "aucune" }
      ],
      "optional": false
    },
    { "key": "contact_name", "label": "Votre nom", "type": "text", "optional": false },
    { "key": "contact_email", "label": "Votre email professionnel", "type": "text", "optional": false },
    { "key": "contact_company", "label": "Votre entreprise", "type": "text", "optional": false },
    { "key": "site_notes", "label": "En une phrase : quel est l’objectif principal ?", "type": "text", "optional": true }
  ]
};

export const RECOMMENDATIONS: Recommendation[] = [
  {
    "id": "PRO-001",
    "titre": "Mettre en place une feuille de route Biodiversité (objectifs, KPIs, gouvernance)",
    "categorie": "Gouvernance",
    "description": "Formaliser 3–5 objectifs mesurables (ex : surfaces de pleine terre, diversité d’habitats, plan de gestion, réduction nuisances lumineuses) + un pilote interne + jalons par phase (faisabilité → exploitation).",
    "hard_filters": "{\"any\": [{\"field\": \"has_project\", \"op\": \"in\", \"value\": [\"oui\", \"strategie\"]}]}",
    "soft_scores": "{\"impact_biodiversite\": 5, \"pilotage\": 5, \"certification\": 3, \"risque\": 2}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "IUCN — Global Standard for Nature-based Solutions (2020) & Guidance (2020).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-002",
    "titre": "Désigner un écologue 'SQE' / référent biodiversité et intégrer ses recos au planning",
    "categorie": "Gouvernance",
    "description": "Prévoir l’intervention d’un écologue qualifié dès l’amont (état initial, recommandations, suivi). Assurer que ses mesures sont planifiées, financées et vérifiées en post-construction.",
    "hard_filters": "{\"any\": [{\"field\": \"certif_target\", \"op\": \"in\", \"value\": [\"breeam\", \"multi\"]}, {\"field\": \"has_project\", \"op\": \"==\", \"value\": \"oui\"}]}",
    "soft_scores": "{\"certification\": 5, \"pilotage\": 4, \"risque\": 4}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "BREEAM Knowledge Base — LE 03 (info à jour 17 nov. 2025) : rôle SQE, biodiversité long terme, sites externes (page web).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-003",
    "titre": "Réaliser un état initial écologique + cartographie des enjeux et contraintes",
    "categorie": "Diagnostic",
    "description": "Produire un état initial (habitats, continuités, espèces potentielles), identifier les zones à éviter/à préserver, et traduire en prescriptions de conception.",
    "hard_filters": "{\"any\": [{\"field\": \"ecology_study\", \"op\": \"in\", \"value\": [\"non\", \"partiel\", \"nspp\"]}, {\"field\": \"project_stage\", \"op\": \"in\", \"value\": [\"prospection\", \"faisabilite\", \"conception\", \"permis\", \"pro_dce\"]}]}",
    "soft_scores": "{\"risque\": 5, \"certification\": 4, \"pilotage\": 4, \"cout\": 2}",
    "niveau_risque": "moyen",
    "note_securite": null,
    "source": "BREEAM Knowledge Base — LE 03 (info à jour 17 nov. 2025) : rôle SQE, biodiversité long terme, sites externes (page web).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-004",
    "titre": "Conserver au moins une structure paysagère existante (arbre, haie, prairie)",
    "categorie": "Conception",
    "description": "Identifier et conserver une structure existante comme 'épine dorsale' écologique, puis connecter les nouveaux aménagements à celle-ci.",
    "hard_filters": "{\"all\": [{\"field\": \"has_project\", \"op\": \"==\", \"value\": \"oui\"}, {\"field\": \"land_take\", \"op\": \"in\", \"value\": [\"oui\", \"nspp\"]}]}",
    "soft_scores": "{\"impact_biodiversite\": 5, \"acceptabilite\": 3, \"cout\": 2}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Guide du paysage AFILOG : prérequis 'conservation d’au moins une structure existante' (PDF).",
    "active": true,
    "horizon": "ce_mois"
  },
  {
    "id": "PRO-005",
    "titre": "Prioriser la pleine terre et préserver l’équilibre pédologique",
    "categorie": "Sols",
    "description": "Maximiser les surfaces de pleine terre fonctionnelles (continuité sol–nappe) et éviter les ouvrages/compactages qui dégradent l’équilibre du sol.",
    "hard_filters": "{\"any\": [{\"field\": \"soil_full_ground\", \"op\": \"in\", \"value\": [\"oui_importantes\", \"oui_limitees\"]}, {\"field\": \"land_take\", \"op\": \"==\", \"value\": \"oui\"}]}",
    "soft_scores": "{\"impact_biodiversite\": 5, \"climat\": 3, \"eau\": 3, \"risque\": 3}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Guide du paysage AFILOG : définition 'pleine terre' et principes (PDF).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-006",
    "titre": "Interdire bâches plastiques et privilégier paillages / techniques alternatives",
    "categorie": "Exploitation",
    "description": "Inscrire dans les marchés espaces verts : zéro-phyto, zéro-engrais, paillage et gestion mécanique/biocontrôle ; proscrire les bâches plastiques.",
    "hard_filters": "{\"any\": [{\"field\": \"maintenance_scope\", \"op\": \"in\", \"value\": [\"fort\", \"moyen\"]}, {\"field\": \"has_project\", \"op\": \"in\", \"value\": [\"oui\", \"strategie\"]}]}",
    "soft_scores": "{\"risque\": 4, \"impact_biodiversite\": 4, \"pilotage\": 3, \"cout\": 2}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Charte de gestion des espaces végétalisés — Vaires-sur-Marne (nov. 2023) : zéro-phyto, zéro-engrais, compostage, refuges faune (DOC).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-007",
    "titre": "Réemploi des déchets verts : tas de bois mort, paillage, compost",
    "categorie": "Exploitation",
    "description": "Organiser sur site le réemploi : tas de bois, broyage pour paillage, compostage en tas ; limiter l’export des déchets verts.",
    "hard_filters": "{\"any\": [{\"field\": \"maintenance_scope\", \"op\": \"in\", \"value\": [\"fort\", \"moyen\"]}, {\"field\": \"asset_type\", \"op\": \"in\", \"value\": [\"logistique\", \"industriel\", \"tertiaire\", \"autre\"]}]}",
    "soft_scores": "{\"impact_biodiversite\": 4, \"cout\": 3, \"pilotage\": 2}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Charte de gestion des espaces végétalisés — Vaires-sur-Marne (nov. 2023) : zéro-phyto, zéro-engrais, compostage, refuges faune (DOC).",
    "active": true,
    "horizon": "ce_mois"
  },
  {
    "id": "PRO-008",
    "titre": "Haies champêtres multistrates à majorité indigène",
    "categorie": "Plantations",
    "description": "Planter des haies sur plusieurs rangs, avec diversité d’espèces et majorité de plants indigènes, en recul des clôtures/ouvrages.",
    "hard_filters": "{\"any\": [{\"field\": \"soil_full_ground\", \"op\": \"in\", \"value\": [\"oui_importantes\", \"oui_limitees\"]}, {\"field\": \"has_project\", \"op\": \"in\", \"value\": [\"oui\", \"strategie\"]}]}",
    "soft_scores": "{\"impact_biodiversite\": 5, \"climat\": 4, \"acceptabilite\": 3}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Guide du paysage AFILOG : haies (pré-requis/critères additionnels) (PDF).",
    "active": true,
    "horizon": "cette_saison"
  },
  {
    "id": "PRO-009",
    "titre": "Mettre en place une gestion différenciée : pelouses + prairies en fauche tardive",
    "categorie": "Gestion écologique",
    "description": "Conserver des zones 'pelouse d’usage' et des zones 'prairie' avec fauches à fréquences/périodes différentes, priorité à la fauche tardive.",
    "hard_filters": "{\"any\": [{\"field\": \"soil_full_ground\", \"op\": \"in\", \"value\": [\"oui_importantes\", \"oui_limitees\"]}, {\"field\": \"asset_type\", \"op\": \"in\", \"value\": [\"logistique\", \"tertiaire\", \"industriel\", \"autre\"]}]}",
    "soft_scores": "{\"impact_biodiversite\": 5, \"cout\": 3, \"acceptabilite\": 4}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Guide du paysage AFILOG : gestion différenciée + prairies en fauche tardive (PDF).",
    "active": true,
    "horizon": "ce_mois"
  },
  {
    "id": "PRO-010",
    "titre": "Mettre en œuvre une 'mosaïque de fauche' (zones non fauchées) pour pollinisateurs",
    "categorie": "Gestion écologique",
    "description": "Adopter une mosaïque : laisser des bandes/îlots non fauchés en rotation pour augmenter la ressource florale et l’accueil des pollinisateurs.",
    "hard_filters": "{\"any\": [{\"field\": \"soil_full_ground\", \"op\": \"in\", \"value\": [\"oui_importantes\", \"oui_limitees\"]}, {\"field\": \"maintenance_scope\", \"op\": \"in\", \"value\": [\"fort\", \"moyen\"]}]}",
    "soft_scores": "{\"impact_biodiversite\": 5, \"acceptabilite\": 3, \"cout\": 2}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Study: mosaic mowing regime in urban lawns improves pollinators (Urban Forestry & Urban Greening, 2024).",
    "active": true,
    "horizon": "ce_mois"
  },
  {
    "id": "PRO-011",
    "titre": "Concevoir les bassins/noues comme habitats : berges en pente douce + végétation spontanée",
    "categorie": "Eau",
    "description": "Prévoir pentes compatibles, méplats, plantations de berges, préparation du fond pour le développement spontané et une fauche raisonnée.",
    "hard_filters": "{\"any\": [{\"field\": \"stormwater\", \"op\": \"in\", \"value\": [\"oui_existant\", \"oui_prevu\"]}, {\"field\": \"asset_type\", \"op\": \"in\", \"value\": [\"logistique\", \"industriel\", \"tertiaire\", \"autre\"]}]}",
    "soft_scores": "{\"eau\": 5, \"impact_biodiversite\": 4, \"climat\": 2}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Guide du paysage AFILOG : bassins (pré-requis) (PDF).",
    "active": true,
    "horizon": "ce_mois"
  },
  {
    "id": "PRO-018",
    "titre": "Plan lumière : limiter l’éclairage nocturne et orienter les flux",
    "categorie": "Nuisances",
    "description": "Définir un plan lumière : extinction/abaissement en cœur de nuit, détection de présence, orientation stricte, limitation du halo lumineux, zones refuges non éclairées.",
    "hard_filters": "{\"any\": [{\"field\": \"lighting_night\", \"op\": \"in\", \"value\": [\"oui_fort\", \"oui_modulable\"]}, {\"field\": \"asset_type\", \"op\": \"in\", \"value\": [\"logistique\", \"industriel\", \"tertiaire\"]}]}",
    "soft_scores": "{\"impact_biodiversite\": 4, \"risque\": 4, \"acceptabilite\": 3}",
    "niveau_risque": "moyen",
    "note_securite": null,
    "source": "Biological Conservation: Light pollution is a driver of insect declines (2020).",
    "active": true,
    "horizon": "ce_mois"
  },
  {
    "id": "PRO-019",
    "titre": "Vigilance : éclairage nocturne = risque accru pour insectes et chaînes trophiques",
    "categorie": "Vigilance",
    "description": "Documenter le risque écologique de l’éclairage artificiel nocturne (ALAN) et prioriser les mesures de réduction / pilotage.",
    "hard_filters": "{\"all\": [{\"field\": \"lighting_night\", \"op\": \"in\", \"value\": [\"oui_fort\", \"oui_modulable\"]}]}",
    "soft_scores": "{\"risque\": 5}",
    "niveau_risque": "moyen",
    "note_securite": null,
    "source": "Biological Conservation: Light pollution is a driver of insect declines (2020).",
    "active": true,
    "horizon": "vigilance"
  },
  {
    "id": "PRO-020",
    "titre": "Si suspicion de chiroptères et travaux : diagnostic spécialisé obligatoire",
    "categorie": "Vigilance",
    "description": "En cas de cohabitation ou suspicion de chauves-souris dans le bâti, prévoir un spécialiste avant travaux : dérangement interdit.",
    "hard_filters": "{\"all\": [{\"field\": \"has_project\", \"op\": \"==\", \"value\": \"oui\"}, {\"field\": \"project_stage\", \"op\": \"in\", \"value\": [\"conception\", \"permis\", \"pro_dce\", \"chantier\", \"exploitation\"]}]}",
    "soft_scores": "{\"risque\": 5, \"conformite\": 5}",
    "niveau_risque": "élevé",
    "note_securite": "Ne pas intervenir sur les zones potentiellement occupées sans avis spécialisé.",
    "source": "Natagora — Guide de références 'Accueillir la biodiversité dans le bâti' (31 oct. 2024) : chiroptères, précautions travaux (PDF).",
    "active": true,
    "horizon": "vigilance"
  },
  {
    "id": "PRO-023",
    "titre": "Parking : 1 arbre de haute tige pour 3 places + pleine terre connectée",
    "categorie": "Îlot de chaleur",
    "description": "Sur parkings, viser un ratio d’arbres et une conception sans bordures fermées pour connecter les surfaces de circulation aux sols de pleine terre.",
    "hard_filters": "{\"any\": [{\"field\": \"asset_type\", \"op\": \"in\", \"value\": [\"logistique\", \"industriel\", \"tertiaire\"]}, {\"field\": \"has_project\", \"op\": \"in\", \"value\": [\"oui\", \"strategie\"]}]}",
    "soft_scores": "{\"climat\": 5, \"acceptabilite\": 4, \"impact_biodiversite\": 3}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Guide du paysage AFILOG : prérequis '1 arbre haute tige/3 places' et continuité pleine terre (PDF).",
    "active": true,
    "horizon": "conception"
  },
  {
    "id": "PRO-030",
    "titre": "Mettre en place un plan de gestion écologique pluriannuel (5 ans) avec ajustements",
    "categorie": "Exploitation",
    "description": "Formaliser un plan de gestion : objectifs, opérations (fauche, tailles, refuges), suivi, et boucle d’amélioration (réajustements).",
    "hard_filters": "{\"any\": [{\"field\": \"has_project\", \"op\": \"in\", \"value\": [\"oui\", \"strategie\"]}, {\"field\": \"maintenance_scope\", \"op\": \"in\", \"value\": [\"fort\", \"moyen\"]}]}",
    "soft_scores": "{\"pilotage\": 5, \"impact_biodiversite\": 4, \"certification\": 4}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Charte Vaires : 'réajustements de gestion' et collaboration référent biodiversité (DOC).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-033",
    "titre": "Choisir une palette végétale diversifiée et prioriser l’indigène",
    "categorie": "Plantations",
    "description": "Définir une palette par strates (herbacée/arbustive/arborée), diversifier les espèces et privilégier l’indigène pour reconstituer des habitats fonctionnels.",
    "hard_filters": "{\"any\": [{\"field\": \"soil_full_ground\", \"op\": \"in\", \"value\": [\"oui_importantes\", \"oui_limitees\"]}, {\"field\": \"has_project\", \"op\": \"in\", \"value\": [\"oui\", \"strategie\"]}]}",
    "soft_scores": "{\"impact_biodiversite\": 5, \"climat\": 3, \"risque\": 2}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Guide du paysage AFILOG : 'diversification des strates et espèces' + 'végétaux en priorité indigènes' (PDF).",
    "active": true,
    "horizon": "conception"
  },
  {
    "id": "PRO-038",
    "titre": "Vigilance : multiplier les ruches peut nuire aux pollinisateurs sauvages",
    "categorie": "Vigilance",
    "description": "Éviter de ‘suréquiper’ en ruches en contexte urbain dense : risque de compétition avec pollinisateurs sauvages ; privilégier les habitats et ressources florales.",
    "hard_filters": "{\"any\": [{\"field\": \"asset_type\", \"op\": \"==\", \"value\": \"tertiaire\"}, {\"field\": \"geo_context\", \"op\": \"==\", \"value\": \"urbain_dense\"}]}",
    "soft_scores": "{\"risque\": 4}",
    "niveau_risque": "moyen",
    "note_securite": null,
    "source": "ARB Île-de-France — Écologie des toitures végétalisées (GROOVES) : sols/toitures, pollinisateurs et ruches (PDF).",
    "active": true,
    "horizon": "vigilance"
  },
  {
    "id": "PRO-039",
    "titre": "Argumentaire RSE : biodiversité = levier d’adaptation, acceptabilité et création de valeur",
    "categorie": "Business case",
    "description": "Structurer un argumentaire interne : risques/impacts, dépendances, adaptation, valeur d’actif, attractivité, et trajectoire de réduction des pressions.",
    "hard_filters": "{\"field\": \"persona\", \"op\": \"==\", \"value\": \"rse_dd\"}",
    "soft_scores": "{\"pilotage\": 4, \"acceptabilite\": 4, \"risque\": 3}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "The Economics of Biodiversity: The Dasgupta Review (Interim Report, 2020) (PDF).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-040",
    "titre": "Criblage foncier ‘go/no-go’ biodiversité en 30 minutes (checklist)",
    "categorie": "Foncier",
    "description": "Mettre en place une checklist rapide : continuités, zones humides, haies/boisements, risques espèces protégées, potentiel EP, contraintes éclairage.",
    "hard_filters": "{\"any\": [{\"field\": \"persona\", \"op\": \"==\", \"value\": \"dev_foncier\"}, {\"field\": \"project_stage\", \"op\": \"in\", \"value\": [\"prospection\", \"faisabilite\"]}]}",
    "soft_scores": "{\"risque\": 5, \"delais\": 4, \"pilotage\": 3}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Guide du paysage AFILOG : approche par phases + diagnostic ; + bonnes pratiques d’état initial (PDF).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-041",
    "titre": "Asset/Technique : intégrer la biodiversité dans les marchés d’exploitation (clauses)",
    "categorie": "Asset management",
    "description": "Traduire les mesures en clauses contractuelles : fauche tardive, zéro-phyto, plan lumière, gestion EP, suivi, reporting annuel.",
    "hard_filters": "{\"any\": [{\"field\": \"persona\", \"op\": \"==\", \"value\": \"tech_asset\"}, {\"field\": \"maintenance_scope\", \"op\": \"in\", \"value\": [\"fort\", \"moyen\"]}]}",
    "soft_scores": "{\"pilotage\": 5, \"risque\": 4, \"impact_biodiversite\": 3}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Charte de gestion des espaces végétalisés — Vaires-sur-Marne (nov. 2023) : zéro-phyto, zéro-engrais, compostage, refuges faune (DOC).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-042",
    "titre": "Certification : matrice ‘preuves’ par phase (études → chantier → exploitation)",
    "categorie": "Certification",
    "description": "Créer une matrice : exigence → responsable → preuve attendue → moment de collecte (photos, rapports SQE, plan de gestion, PV).",
    "hard_filters": "{\"any\": [{\"field\": \"persona\", \"op\": \"==\", \"value\": \"certif_qe\"}, {\"field\": \"certif_target\", \"op\": \"in\", \"value\": [\"breeam\", \"hqe\", \"biodivercity\", \"multi\"]}]}",
    "soft_scores": "{\"certification\": 5, \"pilotage\": 4}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "BREEAM Knowledge Base — LE 03 (info à jour 17 nov. 2025) : rôle SQE, biodiversité long terme, sites externes (page web).",
    "active": true,
    "horizon": "aujourdhui"
  },
  {
    "id": "PRO-045",
    "titre": "Accepter la flore et la faune spontanées (tolérance zéro ‘propreté’)",
    "categorie": "Acceptabilité",
    "description": "Formaliser une ‘tolérance’ à la spontanéité (plantes adventices, insectes), avec seuils d’intervention et communication usagers.",
    "hard_filters": "{\"any\": [{\"field\": \"has_project\", \"op\": \"in\", \"value\": [\"oui\", \"strategie\"]}, {\"field\": \"stakeholder_constraints\", \"op\": \"in\", \"value\": [\"acceptabilite\", \"aucune\"]}]}",
    "soft_scores": "{\"acceptabilite\": 5, \"impact_biodiversite\": 3}",
    "niveau_risque": "faible",
    "note_securite": null,
    "source": "Charte Vaires : mesure 'acceptation flore et faune spontanée' (DOC).",
    "active": true,
    "horizon": "ce_mois"
  }
];
