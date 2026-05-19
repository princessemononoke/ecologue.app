# ecologue.app — patch V11 audit final, confidentialité et accessibilité

Ce patch reprend V10 et ajoute :

- une page `/confidentialite` ;
- un lien « Confidentialité » dans le footer ;
- un encart d’information sur le traitement local des réponses ;
- une documentation d’audit final : `docs/AUDIT_FINAL_V11.md`.

## Données du questionnaire

Par défaut, le site ne collecte pas les réponses : elles restent dans le navigateur de l’utilisateur. Cela signifie qu’Agathe ne peut pas les récupérer automatiquement.

Pour récupérer les réponses, il faudra ajouter explicitement un mécanisme de transmission : formulaire Zcal enrichi, formulaire externe, API route Vercel, Supabase, Airtable ou Google Sheets. Cette évolution devra être accompagnée d’une information RGPD plus détaillée.
