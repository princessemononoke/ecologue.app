import { SITE_CONFIG } from '../config/siteConfig';
import { supabase } from './supabaseClient';

export type SubmissionMode = 'pro' | 'particuliers';

export type QuestionnaireSubmissionInput = {
  mode: SubmissionMode;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  organization?: string;
  role?: string;
  cityOrDepartment?: string;
  appointmentRequested?: boolean;
  contactConsent: boolean;
  privacyConsent: boolean;
  answers: Record<string, unknown>;
  score?: Record<string, unknown> | null;
  recommendations?: Array<Record<string, unknown>> | null;
  pagePath?: string;
};

function sanitizeOptional(value?: string): string | null {
  const cleaned = value?.trim();
  return cleaned ? cleaned : null;
}

export async function submitQuestionnaireResults(input: QuestionnaireSubmissionInput) {
  if (!supabase) {
    throw new Error('Supabase n’est pas configuré. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans les variables d’environnement.');
  }

  if (!input.privacyConsent) {
    throw new Error('Le consentement à la transmission des résultats est obligatoire.');
  }

  const email = input.email.trim().toLowerCase();
  if (!email || !email.includes('@')) {
    throw new Error('Veuillez renseigner une adresse email valide.');
  }

  const payload = {
    mode: input.mode,
    first_name: sanitizeOptional(input.firstName),
    last_name: sanitizeOptional(input.lastName),
    email,
    phone: sanitizeOptional(input.phone),
    organization: sanitizeOptional(input.organization),
    role: sanitizeOptional(input.role),
    city_or_department: sanitizeOptional(input.cityOrDepartment),
    appointment_requested: Boolean(input.appointmentRequested),
    contact_consent: Boolean(input.contactConsent),
    privacy_consent: Boolean(input.privacyConsent),
    answers_json: input.answers ?? {},
    score_json: input.score ?? null,
    recommendations_json: input.recommendations ?? null,
    source: SITE_CONFIG.appName,
    page_path: input.pagePath ?? window.location.pathname,
    user_agent: navigator.userAgent,
  };

  const { data, error } = await supabase
    .from('questionnaire_submissions')
    .insert(payload)
    .select('id, created_at')
    .single();

  if (error) throw new Error(error.message);
  return data;
}
