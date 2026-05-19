-- À exécuter dans Supabase SQL Editor.
-- Cette table reçoit les résultats transmis volontairement depuis ecologue.app.

create extension if not exists pgcrypto;

create table if not exists public.questionnaire_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  mode text not null check (mode in ('pro', 'particuliers')),
  first_name text,
  last_name text,
  email text not null,
  phone text,
  organization text,
  role text,
  city_or_department text,
  appointment_requested boolean not null default false,
  contact_consent boolean not null default false,
  privacy_consent boolean not null default false,
  answers_json jsonb not null default '{}'::jsonb,
  score_json jsonb,
  recommendations_json jsonb,
  source text not null default 'ecologue.app',
  page_path text,
  user_agent text,
  ip_address inet
);

alter table public.questionnaire_submissions enable row level security;

-- Autorise les visiteurs anonymes à insérer leurs propres résultats.
-- La lecture publique reste interdite : seules les personnes connectées à Supabase avec les droits du projet peuvent consulter/exporter la table.
create policy "allow anonymous voluntary inserts"
  on public.questionnaire_submissions
  for insert
  to anon
  with check (
    privacy_consent is true
    and email is not null
    and length(email) <= 320
  );

-- Optionnel : index utiles pour filtrer/exporter.
create index if not exists questionnaire_submissions_created_at_idx
  on public.questionnaire_submissions (created_at desc);

create index if not exists questionnaire_submissions_mode_idx
  on public.questionnaire_submissions (mode);

create index if not exists questionnaire_submissions_email_idx
  on public.questionnaire_submissions (email);
