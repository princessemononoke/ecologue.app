# Patch V7 — dernières modifications avant mise en ligne

Ce patch ajoute deux éléments transversaux :

1. un pied de page renvoyant vers Nonoké ;
2. un call to action de prise de rendez-vous à afficher **uniquement à la fin des résultats de la version Pro**.

## Fichiers ajoutés

- `config/siteConfig.ts`
- `components/SiteFooter.tsx`
- `components/ProResultsCTA.tsx`

## Fichiers modifiés dans le patch

- `pages/HomeChoice.tsx` : ajout du pied de page.
- `pages/PublicApp.tsx` : ajout du pied de page sur le questionnaire, les résultats et la sortie « sans extérieur ».

## Configuration des liens

Les liens sont centralisés dans `config/siteConfig.ts` :

```ts
export const SITE_CONFIG = {
  websiteUrl: 'https://www.nonoke.fr',
  appointmentUrl: 'https://zcal.co/agathemaussion/contact',
}
```

Avant mise en ligne, vous pouvez remplacer `appointmentUrl` par un lien Calendly, TidyCal, Google Agenda, formulaire de contact ou page de réservation dédiée.

## Ajouter le CTA à la version Pro

Dans le composant qui affiche les résultats Pro, importer :

```tsx
import { ProResultsCTA } from './components/ProResultsCTA';
import { SiteFooter } from './components/SiteFooter';
```

Puis, tout en bas de la page de résultats Pro, après les recommandations et avant la fermeture du `<main>` :

```tsx
<ProResultsCTA />
<SiteFooter variant="pro" />
```

Le CTA ne doit pas être ajouté :

- à l’accueil ;
- à la version particuliers ;
- au questionnaire Pro avant affichage des résultats.

## Texte du CTA Pro

Le bloc invite à discuter des résultats avec Agathe Maussion et propose deux boutons :

- « Prendre rendez-vous avec Agathe Maussion » ;
- « Découvrir Nonoké ».

## Pied de page

Le pied de page rappelle que les résultats d’ecologue.app sont indicatifs et ne remplacent pas un diagnostic écologique ou réglementaire réalisé sur site.
