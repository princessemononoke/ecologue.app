# Patch V14 — vérification finale avant mise en ligne

Cette version reprend le patch V13 et corrige un point RGPD/accessibilité de consentement :

- la case « J’accepte d’être recontacté·e » n’est plus précochée ;
- la case obligatoire reste uniquement celle relative à la lecture de la politique de confidentialité et à la transmission volontaire des résultats.

## Points à vérifier dans le dépôt réel

1. Installer `@supabase/supabase-js`.
2. Copier les fichiers du patch dans le dépôt.
3. Adapter le routeur réel : `/`, `/pro`, `/particuliers`, `/confidentialite`, `/mentions-legales`.
4. Ajouter les variables d’environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
5. Exécuter `supabase/questionnaire_submissions.sql` dans Supabase.
6. Brancher `ProResultsCTA` sur les vrais résultats du questionnaire Pro.

## Collecte

Les réponses ne sont envoyées à Supabase qu’après validation du formulaire de transmission des résultats. Aucune transmission silencieuse n’est prévue.
