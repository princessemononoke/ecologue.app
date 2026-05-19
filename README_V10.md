# ecologue.app — patch V10 (correction logos + navigation)

Ce patch corrige deux points signalés après le V9 :

1. l’onglet **« Qui sommes-nous ? »** est rétabli dans la navigation de la page d’accueil ;
2. l’affichage du logo `ecologue.app` est sécurisé grâce à une version PNG rognée et optimisée, en complément des SVG originaux.

## Corrections apportées

### Navigation

- Ajout d’un lien `Qui sommes-nous ?` dans le header de la home.
- Ajout d’une section `#qui-sommes-nous` sur la page d’accueil.
- Ajout d’un lien `Qui sommes-nous ?` dans le pied de page.

### Logos

Les SVG originaux sont conservés dans :

- `public/brand/`
- `assets/brand/ecologue/`

Une version PNG optimisée est ajoutée dans :

- `public/brand-png/ecologue-logo-full.png`
- `assets/brand/ecologue-png/ecologue-logo-full.png`

Cette version est utilisée dans l’en-tête, la section « Qui sommes-nous ? » et le footer pour éviter les problèmes d’aperçu liés aux SVG exportés depuis Canva.

## Fichiers modifiés

- `pages/HomeChoice.tsx`
- `components/SiteFooter.tsx`
- `config/siteConfig.ts`

## Remarque

Les logos SVG Canva peuvent contenir beaucoup de métadonnées et parfois de grandes zones transparentes. Ils restent utilisables, mais la version PNG rognée donne un rendu plus fiable en navigateur et dans les aperçus.
