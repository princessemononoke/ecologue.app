export type PublicOutdoorType =
  | 'jardin'
  | 'terrasse'
  | 'balcon'
  | 'rebord_cour_pied_immeuble'
  | 'aucun';

export type PublicAnswers = Record<string, string | string[] | undefined>;

export type PublicQuestionOption = {
  label: string;
  value: string;
  helper?: string;
};

export type PublicQuestion = {
  id: string;
  label: string;
  helper?: string;
  type: 'single' | 'multiple';
  options: PublicQuestionOption[];
  when?: {
    field: string;
    operator: '==' | '!=' | 'in' | 'not_in';
    value: string | string[];
  };
};

export type PublicEvidenceSource = {
  id: string;
  title: string;
  author?: string;
  year?: string;
  url?: string;
  rawFile?: string;
  pages?: string;
  note?: string;
};

export type PublicScoreBreakdown = {
  total: number;
  seNourrir: number;
  seRefugier: number;
  seReproduire: number;
  circulerSurvivre: number;
  level: 'a_commencer' | 'en_transition' | 'refuge_en_devenir' | 'tres_favorable';
  label: string;
  summary: string;
};

export type PublicRecommendation = {
  id: string;
  title: string;
  shortTitle?: string;
  category:
    | 'demarrage'
    | 'balcon'
    | 'prairie_tonte'
    | 'flore_pollinisateurs'
    | 'sol_dechets_verts'
    | 'eau_mare'
    | 'haies_arbres'
    | 'micro_habitats'
    | 'oiseaux'
    | 'nuit'
    | 'potager'
    | 'engagement';
  appliesTo: Array<PublicOutdoorType | 'tous'>;
  priority: 1 | 2 | 3;
  effort: 'facile' | 'moyen' | 'avance';
  season: 'printemps' | 'ete' | 'automne' | 'hiver' | 'toute_annee';
  timeToImpact: 'immediat' | 'quelques_semaines' | 'saison_suivante' | 'long_terme';
  why: string;
  how: string[];
  avoid?: string[];
  ifAnswers?: Array<{
    field: string;
    operator: '==' | '!=' | 'includes' | 'includes_any' | 'not_includes' | 'in' | 'not_in';
    value: string | string[];
  }>;
  scoreWeights: Partial<Record<keyof Omit<PublicScoreBreakdown, 'total' | 'level' | 'label' | 'summary'>, number>>;
  sourceIds: string[];
};
