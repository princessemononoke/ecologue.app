# ecologue.app — patch V8 (logo, contact et LinkedIn)

Ce patch reprend le patch V7 de mise en ligne et ajoute les derniers éléments de marque fournis :

- logo Nonoké intégré dans `public/logo-nonoke.png` ;
- copie source du logo dans `assets/brand/logo-nonoke.png` ;
- lien de prise de rendez-vous mis à jour : `https://zcal.co/agathemaussion/contact` ;
- lien LinkedIn confirmé : `https://www.linkedin.com/in/agathe-maussion/` ;
- pied de page enrichi avec logo, lien vers Nonoké, lien rendez-vous et lien LinkedIn avec icône ;
- CTA Pro enrichi avec logo Nonoké, bouton rendez-vous Zcal et lien LinkedIn.

## Fichiers modifiés

- `config/siteConfig.ts`
- `components/SiteFooter.tsx`
- `components/ProResultsCTA.tsx`
- `docs/INTEGRATION_FINAL_V8.md`

## Fichiers ajoutés

- `public/logo-nonoke.png`
- `assets/brand/logo-nonoke.png`

## Intégration

Copier les fichiers du patch dans le dépôt en remplaçant les fichiers existants du patch V7.

Le logo est référencé par défaut via :

```ts
logoUrl: '/logo-nonoke.png'
```

Ce choix est adapté à Vite/React lorsque le fichier est placé dans le dossier `public/`.
