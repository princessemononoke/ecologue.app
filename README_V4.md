# ecologue.app - patch V4

Ce dossier contient :

1. le patch V3 pour créer la version `/particuliers` ;
2. les ajouts V4 pour enrichir la version `/pro` sans mélanger les deux bases de recommandations.

À appliquer après le patch V2, ou à fusionner manuellement avec le dépôt actuel.

Le point d’entrée d’intégration Pro est :

```ts
import { withProV4Additions } from './data/pro/proRecommendationPatch';
```

Puis :

```ts
const recommendations = withProV4Additions(RECOMMENDATIONS);
```

Voir `docs/INTEGRATION_PRO_V4.md` pour les détails.
