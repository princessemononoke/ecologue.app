import type { ReactNode } from 'react';
import { SiteFooter } from '../components/SiteFooter';
import { SITE_CONFIG } from '../config/siteConfig';

function ArrowRight({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.35 8.1h4.3V23H.35V8.1ZM8.1 8.1h4.12v2.04h.06c.57-1.08 1.98-2.23 4.08-2.23 4.36 0 5.17 2.87 5.17 6.6V23h-4.3v-7.54c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V23H8.1V8.1Z" />
    </svg>
  );
}

function ProIllustration() {
  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" aria-hidden="true">
      <rect width="360" height="240" rx="28" fill="#F7EDE2" />
      <path d="M0 190c50-38 104-45 162-22s123 17 198-18v90H0Z" fill="#84A59D" opacity="0.55" />
      <path d="M0 205c66-24 125-26 177-6 64 25 120 16 183-18v59H0Z" fill="#84A59D" />
      <rect x="62" y="88" width="58" height="92" rx="8" fill="#FFFFFF" stroke="#2F4F49" strokeWidth="2" />
      <rect x="126" y="55" width="76" height="125" rx="8" fill="#FFFFFF" stroke="#2F4F49" strokeWidth="2" />
      <rect x="208" y="78" width="70" height="102" rx="8" fill="#FFFFFF" stroke="#2F4F49" strokeWidth="2" />
      <g fill="#84A59D">
        <rect x="76" y="104" width="12" height="10" rx="2" />
        <rect x="96" y="104" width="12" height="10" rx="2" />
        <rect x="76" y="126" width="12" height="10" rx="2" />
        <rect x="96" y="126" width="12" height="10" rx="2" />
        <rect x="144" y="76" width="12" height="10" rx="2" />
        <rect x="166" y="76" width="12" height="10" rx="2" />
        <rect x="144" y="100" width="12" height="10" rx="2" />
        <rect x="166" y="100" width="12" height="10" rx="2" />
        <rect x="224" y="100" width="12" height="10" rx="2" />
        <rect x="246" y="100" width="12" height="10" rx="2" />
        <circle cx="70" cy="188" r="18" />
        <circle cx="116" cy="190" r="18" />
        <circle cx="206" cy="192" r="20" />
        <circle cx="270" cy="188" r="18" />
      </g>
      <path d="M300 54c-17 10-28 22-33 37 16-3 29-13 39-29 7 16 18 26 35 29-5-15-16-27-33-37" fill="#F6BD60" opacity="0.9" />
    </svg>
  );
}

function PublicIllustration() {
  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" aria-hidden="true">
      <rect width="360" height="240" rx="28" fill="#F7EDE2" />
      <rect x="46" y="156" width="268" height="34" rx="8" fill="#84A59D" />
      <rect x="72" y="104" width="42" height="52" rx="8" fill="#F28482" />
      <path d="M93 79c22 0 34 12 36 35H57c2-23 14-35 36-35Z" fill="#84A59D" />
      <rect x="142" y="88" width="42" height="68" rx="8" fill="#F6BD60" />
      <path d="M163 62c25 0 40 14 42 40h-84c2-26 17-40 42-40Z" fill="#84A59D" />
      <rect x="214" y="116" width="42" height="40" rx="8" fill="#F5CAC3" stroke="#F28482" strokeWidth="2" />
      <path d="M235 89c24 0 39 14 42 38h-84c3-24 18-38 42-38Z" fill="#84A59D" />
      <g fill="#F28482">
        <circle cx="77" cy="171" r="6" />
        <circle cx="105" cy="174" r="6" />
        <circle cx="140" cy="170" r="6" />
        <circle cx="202" cy="174" r="6" />
      </g>
      <g fill="#F6BD60">
        <circle cx="126" cy="174" r="6" />
        <circle cx="230" cy="170" r="6" />
        <circle cx="267" cy="174" r="6" />
      </g>
      <path d="M282 84c-11-8-20-8-27 0 7 3 15 3 24 0-2 12 1 21 10 28 4-12 2-21-7-28Z" fill="#F28482" />
      <path d="M64 194c30 12 66 13 108 4s81-7 117 6" stroke="#84A59D" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

function PathCard({
  variant,
  title,
  subtitle,
  description,
  href,
  points,
  children,
}: {
  variant: 'pro' | 'public';
  title: string;
  subtitle: string;
  description: string;
  href: string;
  points: string[];
  children: ReactNode;
}) {
  const isPro = variant === 'pro';
  return (
    <article
      className={[
        'group overflow-hidden rounded-[2rem] border p-6 shadow-[0_24px_70px_rgba(35,49,45,0.12)] transition hover:-translate-y-1 md:p-8',
        isPro ? 'border-[#84A59D]/30 bg-[#23312D] text-white' : 'border-[#F5CAC3] bg-white text-[#23312D]',
      ].join(' ')}
    >
      <div className="aspect-[3/2] overflow-hidden rounded-[1.5rem]">{children}</div>
      <div className="mt-7">
        <p className={['text-sm font-black uppercase tracking-[0.22em]', isPro ? 'text-[#F6BD60]' : 'text-[#F28482]'].join(' ')}>{subtitle}</p>
        <h2 className="mt-2 text-4xl font-black leading-tight">{title}</h2>
        <p className={['mt-4 text-lg leading-relaxed', isPro ? 'text-white/82' : 'text-[#23312D]/75'].join(' ')}>{description}</p>
        <ul className="mt-6 grid gap-3">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-base font-semibold">
              <span className={['flex h-7 w-7 shrink-0 items-center justify-center rounded-full', isPro ? 'bg-[#84A59D]/20 text-[#F6BD60]' : 'bg-[#F7EDE2] text-[#F28482]'].join(' ')}>
                <CheckIcon className="h-4 w-4" />
              </span>
              {point}
            </li>
          ))}
        </ul>
        <a
          href={href}
          className={[
            'mt-7 inline-flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-center text-lg font-black transition',
            isPro ? 'bg-[#84A59D] text-white hover:bg-[#73948d]' : 'bg-[#F28482] text-white hover:bg-[#e67270]',
          ].join(' ')}
        >
          Accéder à la {isPro ? 'version Pro' : 'version particuliers'}
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </article>
  );
}

export default function HomeChoice() {
  return (
    <main className="min-h-screen bg-[#F7EDE2] text-[#23312D]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-8">
        <a href="/" className="inline-flex items-center gap-3" aria-label="Accueil ecologue.app">
          <picture>
            <source srcSet={SITE_CONFIG.assets.fullPng} type="image/png" />
            <img src={SITE_CONFIG.assets.full} alt="ecologue.app" className="h-12 w-auto max-w-[220px] object-contain md:h-14 md:max-w-[260px]" />
          </picture>
        </a>
        <nav className="hidden items-center gap-4 text-sm font-bold md:flex" aria-label="Navigation principale">
          <a href="#qui-sommes-nous" className="rounded-full border border-[#84A59D]/50 px-4 py-2 text-[#2F4F49] transition hover:bg-white/70">Qui sommes-nous ?</a>
          <a href="/pro" className="rounded-full border border-[#84A59D]/50 px-4 py-2 text-[#2F4F49] transition hover:bg-white/70">Version Pro</a>
          <a href="/particuliers" className="rounded-full bg-[#F28482] px-4 py-2 text-white transition hover:bg-[#e67270]">Version particuliers</a>
          <a href={SITE_CONFIG.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[#84A59D]/50 p-2 text-[#2F4F49] transition hover:bg-white/70" aria-label="LinkedIn Agathe Maussion">
            <LinkedInIcon />
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-8 md:pt-14">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-[#84A59D]/30 bg-white/70 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-[#2F4F49] shadow-sm">
            <img src={SITE_CONFIG.assets.icon} alt="" className="h-7 w-7" aria-hidden="true" />
            Un seul site, deux parcours
          </div>
          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            Agir pour la biodiversité,
            <span className="block text-[#84A59D]">selon votre réalité</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-[#23312D]/75 md:text-2xl">
            Professionnel de l’immobilier ou particulier avec un jardin, un balcon ou une terrasse : choisissez le parcours qui vous correspond.
          </p>
          <div className="mx-auto mt-8 inline-grid overflow-hidden rounded-2xl border border-[#84A59D]/30 bg-white p-1 shadow-[0_16px_50px_rgba(35,49,45,0.12)] sm:grid-cols-2">
            <a href="/pro" className="rounded-xl bg-[#23312D] px-7 py-4 text-center font-black text-white transition hover:bg-[#2F4F49]">Version Pro <span className="font-semibold opacity-75">/pro</span></a>
            <a href="/particuliers" className="rounded-xl px-7 py-4 text-center font-black text-[#2F4F49] transition hover:bg-[#F7EDE2]">Version particuliers <span className="font-semibold opacity-70">/particuliers</span></a>
          </div>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          <PathCard
            variant="pro"
            href="/pro"
            subtitle="Version Pro"
            title="J’évalue un site, un projet ou un actif immobilier"
            description="Pour les professionnels de l’immobilier, de l’aménagement et de la gestion de site. Identifiez les risques, les priorités d’action et les suites possibles."
            points={['Questionnaire structuré', 'Recommandations priorisées', 'Lecture des risques biodiversité']}
          >
            <ProIllustration />
          </PathCard>

          <PathCard
            variant="public"
            href="/particuliers"
            subtitle="Version particuliers"
            title="J’évalue mon jardin, balcon ou rebord de fenêtre"
            description="Pour obtenir des gestes simples, adaptés à votre espace et à votre niveau d’envie, afin d’accueillir plus de vivant chez vous."
            points={['Test en 4 à 6 minutes', 'Conseils simples et concrets', 'Score d’accueil du vivant']}
          >
            <PublicIllustration />
          </PathCard>
        </div>

        <section className="mt-10 rounded-[2rem] border border-[#F5CAC3] bg-white/75 p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F28482]">01</p>
              <h3 className="mt-2 text-2xl font-black">Répondez aux questions</h3>
              <p className="mt-2 leading-relaxed text-[#23312D]/70">Un parcours court, adapté à votre situation et à votre niveau d’action possible.</p>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#F6BD60]">02</p>
              <h3 className="mt-2 text-2xl font-black">Découvrez votre profil</h3>
              <p className="mt-2 leading-relaxed text-[#23312D]/70">Un résultat lisible, avec des priorités différentes selon les caractéristiques du site ou de l’espace extérieur.</p>
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#84A59D]">03</p>
              <h3 className="mt-2 text-2xl font-black">Passez à l’action</h3>
              <p className="mt-2 leading-relaxed text-[#23312D]/70">Des recommandations concrètes pour redonner de la place au vivant, sans culpabilisation.</p>
            </div>
          </div>
        </section>

        <section id="qui-sommes-nous" className="mt-10 overflow-hidden rounded-[2rem] border border-[#84A59D]/25 bg-[#23312D] p-6 text-white shadow-[0_24px_70px_rgba(35,49,45,0.14)] md:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_1.25fr] md:items-center">
            <div className="rounded-[1.5rem] bg-[#F7EDE2] p-5">
              <img src={SITE_CONFIG.assets.fullPng} alt="ecologue.app" className="mx-auto h-auto w-full max-w-[320px] object-contain" loading="lazy" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F6BD60]">Qui sommes-nous ?</p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">Un outil conçu par une écologue de terrain</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/82">
                ecologue.app est développé par Agathe Maussion, fondatrice de Nonoké, pour aider les professionnels et les particuliers à mieux comprendre le potentiel biodiversité de leurs espaces et à prioriser des actions réalistes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={SITE_CONFIG.websiteUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#F6BD60] px-5 py-3 font-black text-[#23312D] transition hover:bg-[#f2ad3d]">Découvrir Nonoké</a>
                <a href={SITE_CONFIG.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-5 py-3 font-black text-white transition hover:bg-white/10">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </section>

      <SiteFooter variant="home" />
    </main>
  );
}
