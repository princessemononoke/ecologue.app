# Intégration finale V8 — logo, contact et LinkedIn

## Objectif

Finaliser la mise en ligne avec l’identité Nonoké et les bons liens de contact.

## À copier dans le dépôt

- `config/siteConfig.ts`
- `components/SiteFooter.tsx`
- `components/ProResultsCTA.tsx`
- `public/logo-nonoke.png`
- `assets/brand/logo-nonoke.png` facultatif, mais utile comme copie source

## Liens configurés

Dans `config/siteConfig.ts` :

```ts
websiteUrl: 'https://www.nonoke.fr'
appointmentUrl: 'https://zcal.co/agathemaussion/contact'
linkedinUrl: 'https://www.linkedin.com/in/agathe-maussion/'
logoUrl: '/logo-nonoke.png'
```

## Où apparaissent les ajouts ?

### Pied de page commun

Le composant `SiteFooter` affiche désormais :

- le logo Nonoké ;
- un lien vers le site Nonoké ;
- un lien « Prendre rendez-vous » vers Zcal ;
- un lien LinkedIn avec icône ;
- les liens vers `/pro` et `/particuliers`.

### CTA Pro uniquement

Le composant `ProResultsCTA` affiche :

- le logo Nonoké ;
- un bouton principal « Prendre rendez-vous avec Agathe Maussion » ;
- un lien LinkedIn ;
- un lien secondaire vers le site Nonoké.

Ce composant doit rester placé uniquement sur la page de résultats de la version Pro.
