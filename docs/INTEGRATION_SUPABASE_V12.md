# Patch V12 — collecte volontaire des résultats via Supabase

## Ce que ce patch ajoute

- Une collecte volontaire des résultats en fin de parcours.
- Un formulaire d’envoi avec consentement explicite.
- Un client Supabase côté front avec clé publique `anon`.
- Une table Supabase sécurisée par RLS : insertion publique autorisée, lecture publique interdite.
- Une page `/mentions-legales`.
- Une politique de confidentialité mise à jour.

## 1. Installer la dépendance Supabase

Dans le projet :

```bash
npm install @supabase/supabase-js
```

## 2. Créer la table Supabase

Dans Supabase :

1. ouvrir le projet ;
2. aller dans `SQL Editor` ;
3. copier-coller le contenu de `supabase/questionnaire_submissions.sql` ;
4. exécuter.

La policy RLS autorise uniquement l’insertion publique par les visiteurs anonymes. La lecture n’est pas ouverte publiquement.

## 3. Ajouter les variables d’environnement

Dans OVH ou dans votre pipeline de build, ajoutez :

```txt
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Ces valeurs se trouvent dans Supabase : `Project Settings > API`.

Ne jamais mettre la `service_role key` dans le front-end.

## 4. Intégrer le formulaire public

Le parcours particuliers est déjà câblé dans `pages/PublicApp.tsx`.

Les résultats transmis contiennent :

- coordonnées renseignées ;
- réponses ;
- score ;
- recommandations ;
- date d’envoi.

## 5. Intégrer le formulaire Pro

Dans la version Pro, utiliser le composant :

```tsx
import { ProResultsCTA } from './components/ProResultsCTA';

<ProResultsCTA
  answers={answers as Record<string, unknown>}
  score={score as Record<string, unknown>}
  recommendations={recommendations as Array<Record<string, unknown>>}
/>
```

Si `answers` n’est pas fourni, le CTA s’affiche mais le formulaire de transmission n’apparaît pas.

## 6. Récupérer les données

Dans Supabase :

1. aller dans `Table Editor` ;
2. ouvrir `questionnaire_submissions` ;
3. filtrer par `mode`, date ou email ;
4. exporter en CSV si nécessaire.

## 7. Point à compléter

Dans `config/siteConfig.ts`, l’adresse professionnelle est maintenant complète :

```ts
professionalAddress: '540 chemin du Boullidou, 13510 Éguilles'
```

## 8. Vérifications avant mise en ligne

- Remplir un test particuliers.
- Envoyer les résultats avec un email test.
- Vérifier l’apparition de la ligne dans Supabase.
- Tester la version Pro après avoir branché `ProResultsCTA` avec les vraies variables de résultats.
- Vérifier `/confidentialite` et `/mentions-legales`.
