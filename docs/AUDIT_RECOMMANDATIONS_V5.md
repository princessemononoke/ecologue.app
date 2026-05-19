# Audit V5 — équilibre des recommandations

Objectif : vérifier que les recommandations varient réellement selon les profils et que les cas extrêmes ne reçoivent pas des conseils hors-sol.

## Corrections apportées

1. **Tri adaptatif** : le moteur ne trie plus seulement par priorité fixe. Il combine maintenant : priorité éditoriale, déficits des sous-scores, objectif principal déclaré, urgences explicites et effort de mise en œuvre.
2. **Diversité des résultats** : le moteur limite à deux recommandations par catégorie avant de compléter la liste, pour éviter qu’un même thème monopolise la restitution.
3. **Cas sans extérieur** : le test ne renvoie plus qu’une seule recommandation de redirection, conformément au parcours de sortie.
4. **Pertinence par support** : certaines recommandations ont été resserrées. Par exemple, la tonte douce exige désormais la présence d’une pelouse ou zone enherbée ; la mare naturelle n’est plus proposée aux petits espaces ; le lierre et les petits gîtes sont mieux conditionnés.
5. **Cas Pro** : les ajouts V4 ne sont plus universels. Chaque recommandation Pro dispose maintenant de filtres selon le type de site, le stade, l’éclairage, la capacité de maintenance, la surface, les objectifs ou les contraintes déclarées.

## Cas testés

### 1. Sans extérieur
Résultat attendu : sortie du test + ressources externes.

- Recommandation : `no_outdoor_resources` uniquement.

### 2. Balcon minimal
Résultat attendu : actions simples, immédiates, adaptées aux contenants.

- Fleurs utiles aux pollinisateurs.
- Jardinière biodiversité.
- Petit point d’eau sécurisé.
- Petits gîtes dispersés.
- Aromatiques fleuries.

### 3. Balcon avec chat, éclairage nocturne et traitements
Résultat attendu : priorisation des pressions fortes avant les gestes décoratifs.

- Zéro pesticide.
- Réduction de l’éclairage nocturne.
- Précautions liées au chat.
- Fleurs utiles.
- Point d’eau sécurisé.

### 4. Petit jardin très intensif
Résultat attendu : actions de correction simples, pas de recommandation avancée disproportionnée.

- Zéro pesticide.
- Zone libre / fauche différenciée.
- Pas de taille au printemps.
- Tonte plus haute et moins fréquente.
- Coin refuge.
- Réduction de l’éclairage.

### 5. Grand jardin déjà favorable
Résultat attendu : recommandations de consolidation, pas de conseils basiques inutiles.

- Passage petite faune.
- Potager vivant.
- Observation / sciences participatives.
- Coin d’orties.
- Lierre utile si présent.

### 6. Jardin sec / objectif chaleur-sécheresse
Résultat attendu : priorité au sol, à l’eau, à l’ombre et à la réduction d’entretien.

- Haie ou strate arbustive.
- Zone libre.
- Paillage.
- Tonte douce.
- Coin refuge.
- Fleurs utiles.

## Points restant à surveiller

- Le choix `rebord de fenêtre / cour / pied d’immeuble` regroupe des situations très différentes. Une future V6 pourrait séparer ces trois cas si les retours utilisateurs montrent des recommandations encore trop larges.
- Le score public reste volontairement pédagogique. Il ne doit pas être présenté comme un diagnostic écologique réglementaire.
- Pour le parcours Pro, le bon équilibre dépendra aussi de la base historique de recommandations déjà présente dans `constants.ts`.
