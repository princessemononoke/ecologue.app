# ecologue.app — patch V12 collecte Supabase + mentions légales

Ce patch complète le V11 avec :

- collecte volontaire des résultats via Supabase ;
- formulaire de transmission avec consentement explicite ;
- table SQL Supabase + RLS ;
- politique de confidentialité mise à jour ;
- page de mentions légales ;
- configuration légale Nonoké / Agathe Maussion ;
- documentation d’intégration.

## Fichiers ajoutés ou modifiés

- `services/supabaseClient.ts`
- `services/submissionService.ts`
- `components/ResultsSubmissionForm.tsx`
- `components/ProResultsCTA.tsx`
- `components/PrivacyMiniNotice.tsx`
- `pages/PublicApp.tsx`
- `pages/PrivacyPolicy.tsx`
- `pages/LegalNotice.tsx`
- `components/SiteFooter.tsx`
- `config/siteConfig.ts`
- `App.router-example.tsx`
- `supabase/questionnaire_submissions.sql`
- `.env.example`
- `package.supabase-snippet.json`
- `docs/INTEGRATION_SUPABASE_V12.md`

## Important

Le site est hébergé chez OVH. Comme le patch utilise Supabase directement depuis le front-end, il ne nécessite pas de serveur Node côté OVH. La sécurité repose sur Supabase RLS : insertion publique autorisée, lecture publique interdite.

Ne jamais exposer la clé `service_role` dans le code ou dans les variables `VITE_`.
