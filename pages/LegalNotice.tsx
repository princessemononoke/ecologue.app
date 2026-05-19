import type { ReactNode } from 'react';
import { SiteFooter } from '../components/SiteFooter';
import { SITE_CONFIG } from '../config/siteConfig';

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-[#84A59D]/20 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-black text-[#23312D]">{title}</h2>
      <div className="mt-3 leading-relaxed text-[#23312D]/75">{children}</div>
    </section>
  );
}

export default function LegalNotice() {
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
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F28482]">Informations légales</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">Mentions légales</h1>
          <p className="mt-5 text-lg leading-relaxed text-[#23312D]/75">
            Cette page rassemble les informations relatives à l’édition, l’hébergement et l’utilisation du site {SITE_CONFIG.appName}.
          </p>
        </div>

        <div className="grid gap-6">
          <InfoBlock title="Éditrice du site">
            <p><strong>Nom :</strong> {SITE_CONFIG.legalName}</p>
            <p><strong>Nom commercial :</strong> {SITE_CONFIG.companyName}</p>
            <p><strong>Statut :</strong> {SITE_CONFIG.legalStatus}</p>
            <p><strong>SIRET :</strong> {SITE_CONFIG.siret}</p>
            <p><strong>Adresse professionnelle :</strong> {SITE_CONFIG.professionalAddress}</p>
            <p><strong>Email :</strong> <a className="font-bold underline" href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</a></p>
            <p><strong>Téléphone :</strong> <a className="font-bold underline" href={`tel:${SITE_CONFIG.contactPhone.replace(/\s/g, '')}`}>{SITE_CONFIG.contactPhone}</a></p>
            <p><strong>Directrice de la publication :</strong> {SITE_CONFIG.ownerName}</p>
          </InfoBlock>

          <InfoBlock title="Hébergement">
            <p><strong>Hébergeur :</strong> {SITE_CONFIG.hostName}</p>
            <p><strong>Raison sociale :</strong> {SITE_CONFIG.hostLegalName}</p>
            <p><strong>Adresse :</strong> {SITE_CONFIG.hostAddress}</p>
            <p>À vérifier dans l’espace client OVH si un autre contrat ou une autre entité d’hébergement est utilisée.</p>
          </InfoBlock>

          <InfoBlock title="Propriété intellectuelle">
            <p>
              Les textes, recommandations, interfaces, éléments graphiques, logos et contenus du site {SITE_CONFIG.appName} sont la propriété de {SITE_CONFIG.ownerName} / {SITE_CONFIG.companyName}, sauf mention contraire. Toute reproduction, adaptation ou réutilisation substantielle sans autorisation préalable est interdite.
            </p>
          </InfoBlock>

          <InfoBlock title="Responsabilité">
            <p>
              Les résultats produits par {SITE_CONFIG.appName} sont des recommandations indicatives d’aide à la réflexion. Ils ne remplacent pas un diagnostic écologique, une étude réglementaire, un conseil juridique ou une expertise réalisée sur site.
            </p>
          </InfoBlock>

          <InfoBlock title="Données personnelles">
            <p>
              Les modalités de collecte et de traitement des données personnelles sont détaillées dans la <a href={SITE_CONFIG.privacyUrl} className="font-bold underline">politique de confidentialité</a>.
            </p>
          </InfoBlock>
        </div>
      </section>

      <SiteFooter variant="home" />
    </main>
  );
}
