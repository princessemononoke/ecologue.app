
export type Persona = 'rse_dd' | 'dev_foncier' | 'tech_asset' | 'certif_qe';

export interface Recommendation {
  id: string;
  titre: string;
  categorie: string;
  description: string;
  hard_filters: string; // JSON string
  soft_scores: string; // JSON string
  niveau_risque: 'faible' | 'moyen' | 'élevé';
  note_securite: string | null;
  source: string;
  active: boolean;
  horizon: string;
}

export interface UserResponses {
  [key: string]: string;
}

export interface Question {
  key: string;
  label: string;
  type: 'select' | 'text';
  options?: { label: string; value: string }[];
  optional: boolean;
  when?: {
    field: string;
    op: '==' | '!=';
    value: string;
  };
}

export interface QuestionnaireData {
  version: string;
  fields: Question[];
}
