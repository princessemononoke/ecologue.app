# Patch V4 - consolidation Pro + particuliers

Ce patch conserve la version particuliers du patch V3 et ajoute une consolidation de la base Pro.

## Objectif

Ajouter des recommandations Pro issues des nouveaux guides sans mélanger les parcours :

- la version Pro reste orientée site, actif immobilier, projet, exploitation, risque, preuves et décision ;
- la version particuliers reste orientée jardin, balcon, gestes simples et passage à l’action.

## Fichiers ajoutés pour la version Pro

```txt
data/pro/proRecommendationAdditions.ts
data/pro/proRecommendationPatch.ts
data/pro/proQuestionAdditions.optional.ts
tests/proRecommendationAdditions.test.ts
```

## Intégration minimale recommandée

Dans le fichier où vous appelez le moteur de recommandation Pro, importez :

```ts
import { withProV4Additions } from './data/pro/proRecommendationPatch';
```

Puis, avant le calcul des recommandations, remplacez :

```ts
const recommendations = RECOMMENDATIONS;
```

par :

```ts
const recommendations = withProV4Additions(RECOMMENDATIONS);
```

L’avantage : vous ne modifiez pas directement votre fichier `constants.ts` et vous pouvez revenir en arrière facilement.

## Recommandations ajoutées

1. Accompagner la gestion écologique par une communication usagers.
2. Structurer un plan de gestion différenciée par zones d’usage.
3. Préserver et restaurer le sol vivant.
4. Formaliser un engagement zéro pesticide et zéro traitement systématique.
5. Intégrer des micro-habitats compatibles avec l’exploitation.
6. Élaborer une stratégie d’éclairage favorable à la trame noire.
7. Rendre les clôtures perméables à la petite faune.
8. Créer un calendrier écologique des interventions.
9. Proposer un suivi léger et mobilisateur de la biodiversité.

## Questions optionnelles

Le fichier `proQuestionAdditions.optional.ts` contient trois questions supplémentaires possibles :

- visibilité / fréquentation du site ;
- clôtures et perméabilité à la petite faune ;
- travaux de sol ou terrassements.

Elles ne sont pas obligatoires. Pour éviter d’alourdir la version Pro, je conseille de ne les intégrer que si vous souhaitez affiner le scoring plus tard.

## Sources utilisées

Les recommandations s’appuient sur :

- Natureparif, *Guide de gestion écologique des espaces collectifs publics et privés*, 2016 ;
- Unep / Noé / Arthropologia / OFB, *Guide Biodiversité*, 2025 ;
- ARPE PACA, *Jardiner sans pesticides*, 2016 ;
- AFILOG, *Guide du paysage*, 2025 ;
- Natagora, *Aménager votre jardin naturel au fil des saisons*, 2021.

## Tests

Si Vitest est déjà installé :

```bash
npm test
```

Sinon :

```bash
npm install -D vitest
npx vitest run
```
