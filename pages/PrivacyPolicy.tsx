import type { ReactNode } from 'react';
import { SiteFooter } from '../components/SiteFooter';
import { SITE_CONFIG } from '../config/siteConfig';

function PrivacySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-[#84A59D]/20 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-black text-[#23312D]">{title}</h2>
      <div className="mt-3 leading-relaxed text-[#23312D]/75">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#F7EDE2] text-[#23312D]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 md:px-8">
        <a href="/" className="inline-flex items-center" aria-label="Retour à l’accueil ecologue.app">
          <img src={SITE_CONFIG.assets.fullPng} alt="ecologue.app" className="h-12 w-auto max-w-[240px] object-contain" />
        </a>
        <a href="/" className="rounded-full border border-[#84A59D]/40 px-4 py-2 text-sm font-bold text-[#2F4F49] hover:bg-white/70">
          Retour à l’accueil
        </a>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-16 md:px-8">
        <div className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F28482]">Confidentialité</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">Données personnelles et questionnaire</h1>
          <p className="mt-5 text-lg leading-relaxed text-[#23312D]/75">
            Cette politique explique comment les réponses et coordonnées transmises volontairement via {SITE_CONFIG.appName} sont utilisées.
          </p>
        </div>

        <div className="grid gap-6">
          <PrivacySection title="Responsable du traitement">
            <p>{SITE_CONFIG.ownerName}, {SITE_CONFIG.companyName}, {SITE_CONFIG.legalStatus}, SIRET {SITE_CONFIG.siret}.</p>
            <p>Contact : <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="font-bold underline">{SITE_CONFIG.contactEmail}</a>.</p>
          </PrivacySection>

          <PrivacySection title="Données collectées">
            <p>Lorsque vous envoyez volontairement vos résultats, les données suivantes peuvent être enregistrées :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>coordonnées renseignées : prénom, nom, email, téléphone, entreprise, fonction ou commune/département selon le parcours ;</li>
              <li>réponses au questionnaire ;</li>
              <li>scores calculés et recommandations affichées ;</li>
              <li>date d’envoi, page d’origine et informations techniques minimales liées au navigateur.</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="Finalités">
            <p>Ces données sont utilisées pour :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>conserver une trace des résultats transmis ;</li>
              <li>préparer un échange ou un rendez-vous demandé ;</li>
              <li>répondre aux demandes de contact ;</li>
              <li>améliorer la pertinence des questionnaires, scores et recommandations.</li>
            </ul>
          </PrivacySection>

          <PrivacySection title="Base légale">
            <p>
              La transmission des résultats repose sur votre consentement explicite via la case à cocher du formulaire d’envoi. Sans cette validation, les résultats ne sont pas transmis à {SITE_CONFIG.companyName}.
            </p>
          </PrivacySection>

          <PrivacySection title="Durée de conservation">
            <p>
              Les résultats transmis sont conservés pendant une durée maximale de 24 mois à compter de leur envoi, sauf demande de suppression anticipée ou relation commerciale nécessitant une conservation plus longue pour le suivi du dossier.
            </p>
          </PrivacySection>

          <PrivacySection title="Destinataires et sous-traitants">
            <p>
              Les données sont destinées à {SITE_CONFIG.ownerName} / {SITE_CONFIG.companyName}. Elles sont hébergées dans Supabase, utilisé comme base de données technique. Le site est hébergé chez {SITE_CONFIG.hostName}. Les prises de rendez-vous sont effectuées via le service externe configuré dans le bouton de réservation.
            </p>
          </PrivacySection>

          <PrivacySection title="Vos droits">
            <p>
              Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou l’opposition au traitement des données vous concernant en écrivant à <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="font-bold underline">{SITE_CONFIG.contactEmail}</a>. Vous pouvez également retirer votre consentement à tout moment pour les traitements qui reposent sur celui-ci.
            </p>
          </PrivacySection>

          <PrivacySection title="Cookies et mesure d’audience">
            <p>
              Le patch ne met pas en place de cookie publicitaire ni de suivi marketing. Si un outil d’analyse d’audience est ajouté ultérieurement, cette politique devra être mise à jour et, si nécessaire, une gestion du consentement aux cookies devra être ajoutée.
            </p>
          </PrivacySection>
        </div>
      </section>

      <SiteFooter variant="home" />
    </main>
  );
}
