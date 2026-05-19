# Patch V3 - Version grand public ecologue.app

Objectif : ajouter une version particuliers sur le même site, avec une bascule simple par URL :

- `/` : accueil de choix entre les deux parcours ;
- `/pro` : parcours professionnel existant ;
- `/particuliers` : nouveau parcours jardin / balcon / terrasse.

## Fichiers à ajouter

Copier dans le dépôt :

```txt
data/publicTypes.ts
data/publicQuestions.ts
data/publicSources.ts
data/publicRecommendations.ts
services/publicScoringService.ts
components/ModeSwitcher.tsx
components/PublicExitNoOutdoor.tsx
pages/PublicApp.tsx
pages/HomeChoice.tsx
tests/publicScoringService.test.ts
```

## Modification à faire dans App.tsx

Le fichier `App.router-example.tsx` montre le routage simple attendu. Pour éviter d’écraser votre version Pro :

1. renommer l’actuel `App.tsx` en `ProApp.tsx`, ou extraire son contenu dans un composant `ProApp` ;
2. créer un nouveau `App.tsx` basé sur `App.router-example.tsx` ;
3. vérifier que les imports correspondent à votre arborescence réelle.

## Comportement de la version particuliers

La première question est éliminatoire :

> Avez-vous accès à un espace extérieur, même très petit ?

Si la réponse est `Non`, le test s’arrête et renvoie vers des ressources pour agir autrement : consommation, engagement local, sciences participatives, soutien associatif.

La question de fréquence d’entretien utilise les formulations demandées :

- Plus fréquemment qu’une fois tous les 2 mois ;
- Environ tous les 2 mois ;
- 1 à 2 fois par an ;
- Jamais / pas concerné.

## Logique de scoring

Le score public n’est pas un score de risque. Il s’agit d’un `Score d’accueil du vivant` avec 4 sous-scores :

- Se nourrir ;
- Se réfugier ;
- Se reproduire ;
- Circuler / survivre.

Le moteur reste déterministe et local, comme la version Pro.

## Base de recommandations

La base V3 contient 24 recommandations grand public : zéro pesticide, zone libre, tonte douce, fleurs utiles, jardinière biodiversité, point d’eau, mare naturelle, coin refuge, compost, paillage, haie vivante, taille hors printemps, lierre, gîtes à insectes, éclairage, chat, nichoir, nourrissage hivernal prudent, aromatiques, orties, potager vivant, eau sobre, passage hérisson, observation.

Les recommandations sont sourcées par des documents bruts ou pages officielles : Natagora, Natureparif, ARPE PACA, Unep/Noé/Arthropologia/OFB, OFB, LPO, Jardins de Noé, Pollinis’Actions.

## Points de vigilance

- Le guide `Jardiner sans pesticides - ARPE 2016` comporte certaines données anciennes ; il reste utile pour les principes pratiques mais les liens réglementaires doivent être vérifiés si vous ajoutez une page juridique.
- Le guide biodiversité Unep/Noé/OFB est récent et très utile pour le vocabulaire professionnel, mais la version particuliers doit rester plus simple.
- Les recommandations ne remplacent pas un diagnostic écologique sur site ni un conseil réglementaire.
