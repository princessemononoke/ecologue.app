import { SITE_CONFIG } from '../config/siteConfig';
import { ResultsSubmissionForm } from './ResultsSubmissionForm';

function CalendarIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

type ProResultsCTAProps = {
  answers?: Record<string, unknown>;
  score?: Record<string, unknown> | null;
  recommendations?: Array<Record<string, unknown>> | null;
};

export function ProResultsCTA({ answers, score = null, recommendations = null }: ProResultsCTAProps) {
  return (
    <div className="mt-8">
      <section className="overflow-hidden rounded-3xl border border-[#84A59D]/40 bg-[#23312D] p-6 text-[#F7EDE2] shadow-sm md:p-8">
      <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr] md:items-center">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <a
            href={SITE_CONFIG.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-white p-3 shadow-sm transition hover:scale-[1.02]"
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
            <img src={SITE_CONFIG.assets.textDarkBg} alt="ecologue.app" className="mb-4 h-10 w-auto max-w-[230px] object-contain" loading="lazy" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F6BD60]">Suite professionnelle</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Vous souhaitez discuter de ces résultats ?</h2>
            <p className="mt-4 max-w-2xl text-[#F7EDE2]/85">
              Je peux vous aider à interpréter les recommandations, identifier les priorités réalistes pour votre site et définir les prochaines étapes : audit, note de cadrage, accompagnement projet ou atelier avec vos équipes.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <a
            href={SITE_CONFIG.appointmentUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F6BD60] px-6 py-4 text-center font-black text-[#23312D] transition hover:bg-[#ffd07f] md:w-auto"
          >
            <CalendarIcon />
            Prendre rendez-vous avec {SITE_CONFIG.ownerName}
          </a>
          <a
            href={SITE_CONFIG.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#84A59D]/60 px-6 py-3 text-center font-bold text-[#F7EDE2] transition hover:bg-white/10 md:w-auto"
          >
            <LinkedInIcon />
            Me retrouver sur LinkedIn
          </a>
          <a
            href={SITE_CONFIG.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-center font-bold text-[#F7EDE2]/90 transition hover:bg-white/10 md:w-auto"
          >
            Découvrir {SITE_CONFIG.companyName}
          </a>
        </div>
      </div>
      </section>
      {answers && (
        <ResultsSubmissionForm
          mode="pro"
          answers={answers}
          score={score}
          recommendations={recommendations}
        />
      )}
    </div>
  );
}
