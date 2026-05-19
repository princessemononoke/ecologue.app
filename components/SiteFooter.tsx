import { SITE_CONFIG } from '../config/siteConfig';

type SiteFooterProps = {
  variant?: 'pro' | 'public' | 'home';
};

function LinkedInIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.35 8.1h4.3V23H.35V8.1ZM8.1 8.1h4.12v2.04h.06c.57-1.08 1.98-2.23 4.08-2.23 4.36 0 5.17 2.87 5.17 6.6V23h-4.3v-7.54c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23H8.1V8.1Z" />
    </svg>
  );
}

function ExternalLinkIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteFooter({ variant = 'home' }: SiteFooterProps) {
  const isPro = variant === 'pro';
  const isPublic = variant === 'public';

  const shellClass = isPro
    ? 'border-[#84A59D]/30 bg-[#23312D] text-[#F7EDE2]'
    : isPublic
      ? 'border-[#F5CAC3] bg-[#F7EDE2] text-[#23312D]'
      : 'border-[#84A59D]/25 bg-white text-[#23312D]';

  const accentClass = isPro
    ? 'text-[#F6BD60] hover:text-[#F7EDE2]'
    : 'text-[#2F4F49] hover:text-[#F28482]';

  const ecologueLogo = SITE_CONFIG.assets.fullPng;

  return (
    <footer className={`mt-12 border-t ${shellClass}`}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-9 md:grid-cols-[1.35fr_1fr] md:px-8">
        <div className="flex flex-col gap-5">
          <a href="/" className="inline-flex w-fit items-center" aria-label="Retour à l’accueil ecologue.app">
            <img src={ecologueLogo} alt="ecologue.app" className="h-14 w-auto max-w-[250px] object-contain" loading="lazy" />
          </a>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={SITE_CONFIG.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-[#84A59D]/20 bg-white p-2 shadow-sm transition hover:scale-[1.02]"
              aria-label={`Découvrir le site de ${SITE_CONFIG.companyName}`}
            >
              <img
                src={SITE_CONFIG.nonokeLogoUrl}
                alt={`Logo ${SITE_CONFIG.companyName}`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </a>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-70">Conçu par {SITE_CONFIG.companyName}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed opacity-80">
                {SITE_CONFIG.companyBaseline}. Les résultats proposés par ecologue.app sont indicatifs et ne remplacent pas un diagnostic écologique ou réglementaire réalisé sur site.
              </p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-3 text-sm font-semibold md:items-end" aria-label="Liens de pied de page">
          <a href="/#qui-sommes-nous" className={`inline-flex items-center gap-2 ${accentClass}`}>
            Qui sommes-nous ?
          </a>
          <a href={SITE_CONFIG.privacyUrl} className={`inline-flex items-center gap-2 ${accentClass}`}>
            Confidentialité
          </a>
          <a href={SITE_CONFIG.legalUrl} className={`inline-flex items-center gap-2 ${accentClass}`}>
            Mentions légales
          </a>
          <a href={SITE_CONFIG.websiteUrl} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 ${accentClass}`}>
            Découvrir le site de {SITE_CONFIG.companyName}
            <ExternalLinkIcon />
          </a>
          <a href={SITE_CONFIG.appointmentUrl} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 ${accentClass}`}>
            Prendre rendez-vous
            <ExternalLinkIcon />
          </a>
          <a href={SITE_CONFIG.linkedinUrl} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 ${accentClass}`}>
            <LinkedInIcon />
            LinkedIn — {SITE_CONFIG.ownerName}
          </a>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <a href="/pro" className={accentClass}>Version Pro</a>
            <a href="/particuliers" className={accentClass}>Version particuliers</a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
