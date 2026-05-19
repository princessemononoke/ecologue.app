import type { QuestionnaireField } from '../../types';

// Questions optionnelles si vous voulez mieux déclencher les recommandations Pro V4.
// Elles ne sont pas nécessaires au fonctionnement du patch : les recommandations restent utiles même sans ces champs.
export const PRO_V4_OPTIONAL_QUESTION_ADDITIONS: QuestionnaireField[] = [
  {
    key: 'acceptance_context',
    label: 'Le site est-il visible ou fréquenté par des usagers, riverains, locataires ou salariés ?',
    type: 'select',
    section: 'Exploitation et acceptabilité',
    helpText: 'Permet de prioriser la communication sur les zones de gestion écologique.',
    options: [
      { value: 'fort', label: 'Oui, fortement visible ou fréquenté' },
      { value: 'moyen', label: 'Oui, modérément' },
      { value: 'faible', label: 'Peu ou pas' },
      { value: 'nspp', label: 'Je ne sais pas' },
    ],
  },
  {
    key: 'fences_present',
    label: 'Le site comporte-t-il des clôtures ou limites physiques continues ?',
    type: 'select',
    section: 'Continuités écologiques',
    helpText: 'Permet d’évaluer les possibilités de passage pour la petite faune.',
    options: [
      { value: 'oui_jointives', label: 'Oui, clôtures plutôt jointives au sol' },
      { value: 'oui_permeables', label: 'Oui, mais déjà partiellement perméables' },
      { value: 'non', label: 'Non' },
      { value: 'nspp', label: 'Je ne sais pas' },
    ],
  },
  {
    key: 'soil_works_risk',
    label: 'Des travaux de sol, terrassements ou reprises de pleine terre sont-ils prévus ?',
    type: 'select',
    section: 'Sols',
    helpText: 'Permet de prioriser la protection du sol vivant et la préservation des horizons.',
    options: [
      { value: 'oui_lourds', label: 'Oui, travaux importants' },
      { value: 'oui_legers', label: 'Oui, travaux légers' },
      { value: 'non', label: 'Non' },
      { value: 'nspp', label: 'Je ne sais pas' },
    ],
  },
];
