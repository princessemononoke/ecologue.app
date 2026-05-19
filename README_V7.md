# ecologue.app — patch V7 mise en ligne

Ce patch reprend le socle V5 et ajoute les dernières modifications demandées :

- pied de page commun avec lien vers Nonoké ;
- configuration centralisée des liens ;
- call to action de prise de rendez-vous pour la version Pro seulement ;
- documentation d’intégration finale.

## Fichiers clés

- `config/siteConfig.ts`
- `components/SiteFooter.tsx`
- `components/ProResultsCTA.tsx`
- `docs/INTEGRATION_FINAL_V7.md`

## Action à faire côté version Pro

Comme la version Pro existante n’est pas entièrement incluse dans ce patch, il faut ajouter manuellement, à la fin du composant de résultats Pro :

```tsx
<ProResultsCTA />
<SiteFooter variant="pro" />
```

Voir `docs/INTEGRATION_FINAL_V7.md`.
