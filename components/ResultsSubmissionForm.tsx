import { useState, type FormEvent } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { submitQuestionnaireResults, type QuestionnaireSubmissionInput } from '../services/submissionService';

type ResultsSubmissionFormProps = {
  mode: 'pro' | 'particuliers';
  answers: Record<string, unknown>;
  score?: Record<string, unknown> | null;
  recommendations?: Array<Record<string, unknown>> | null;
  compact?: boolean;
};

export function ResultsSubmissionForm({ mode, answers, score = null, recommendations = null, compact = false }: ResultsSubmissionFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [cityOrDepartment, setCityOrDepartment] = useState('');
  const [contactConsent, setContactConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isPro = mode === 'pro';
  const idPrefix = `submission-${mode}`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const payload: QuestionnaireSubmissionInput = {
      mode,
      firstName,
      lastName,
      email,
      phone,
      organization: isPro ? organization : undefined,
      role: isPro ? role : undefined,
      cityOrDepartment: isPro ? undefined : cityOrDepartment,
      appointmentRequested: isPro,
      contactConsent,
      privacyConsent,
      answers,
      score,
      recommendations,
      pagePath: window.location.pathname,
    };

    try {
      await submitQuestionnaireResults(payload);
      setStatus('success');
      setMessage('Vos résultats ont bien été transmis. Merci !');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Une erreur est survenue pendant l’envoi.');
    }
  };

  return (
    <section className={`mt-8 rounded-3xl border p-6 shadow-sm ${isPro ? 'border-[#84A59D]/40 bg-[#23312D] text-[#F7EDE2]' : 'border-[#84A59D]/30 bg-white text-[#23312D]'} ${compact ? 'md:p-6' : 'md:p-8'}`}>
      <p className={`text-sm font-black uppercase tracking-[0.2em] ${isPro ? 'text-[#F6BD60]' : 'text-[#F28482]'}`}>Transmission volontaire</p>
      <h2 className="mt-3 text-2xl font-black md:text-3xl">
        {isPro ? 'Transmettre mes résultats pour préparer un échange' : 'Recevoir et transmettre mes résultats'}
      </h2>
      <p className={`mt-3 leading-relaxed ${isPro ? 'text-[#F7EDE2]/85' : 'text-[#23312D]/75'}`}>
        Vos réponses seront enregistrées dans l’espace Supabase sécurisé de {SITE_CONFIG.companyName} afin de conserver votre diagnostic indicatif, préparer un éventuel rendez-vous et améliorer les recommandations. Aucun envoi n’est fait sans validation de ce formulaire.
      </p>

      {!isSupabaseConfigured && (
        <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
          Supabase n’est pas encore configuré dans les variables d’environnement. Le formulaire apparaîtra, mais l’envoi échouera tant que `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` ne seront pas renseignées.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold" htmlFor={`${idPrefix}-first-name`}>
            Prénom
            <input id={`${idPrefix}-first-name`} value={firstName} onChange={(event) => setFirstName(event.target.value)} className="rounded-2xl border border-[#84A59D]/35 bg-white px-4 py-3 text-[#23312D] outline-none ring-[#F6BD60] focus:ring-2" autoComplete="given-name" />
          </label>
          <label className="grid gap-2 text-sm font-bold" htmlFor={`${idPrefix}-last-name`}>
            Nom
            <input id={`${idPrefix}-last-name`} value={lastName} onChange={(event) => setLastName(event.target.value)} className="rounded-2xl border border-[#84A59D]/35 bg-white px-4 py-3 text-[#23312D] outline-none ring-[#F6BD60] focus:ring-2" autoComplete="family-name" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold" htmlFor={`${idPrefix}-email`}>
            Email obligatoire
            <input id={`${idPrefix}-email`} type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-2xl border border-[#84A59D]/35 bg-white px-4 py-3 text-[#23312D] outline-none ring-[#F6BD60] focus:ring-2" autoComplete="email" />
          </label>
          <label className="grid gap-2 text-sm font-bold" htmlFor={`${idPrefix}-phone`}>
            Téléphone facultatif
            <input id={`${idPrefix}-phone`} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="rounded-2xl border border-[#84A59D]/35 bg-white px-4 py-3 text-[#23312D] outline-none ring-[#F6BD60] focus:ring-2" autoComplete="tel" />
          </label>
        </div>

        {isPro ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold" htmlFor={`${idPrefix}-organization`}>
              Entreprise / organisation
              <input id={`${idPrefix}-organization`} value={organization} onChange={(event) => setOrganization(event.target.value)} className="rounded-2xl border border-[#84A59D]/35 bg-white px-4 py-3 text-[#23312D] outline-none ring-[#F6BD60] focus:ring-2" autoComplete="organization" />
            </label>
            <label className="grid gap-2 text-sm font-bold" htmlFor={`${idPrefix}-role`}>
              Fonction
              <input id={`${idPrefix}-role`} value={role} onChange={(event) => setRole(event.target.value)} className="rounded-2xl border border-[#84A59D]/35 bg-white px-4 py-3 text-[#23312D] outline-none ring-[#F6BD60] focus:ring-2" autoComplete="organization-title" />
            </label>
          </div>
        ) : (
          <label className="grid gap-2 text-sm font-bold" htmlFor={`${idPrefix}-city`}>
            Commune ou département, facultatif
            <input id={`${idPrefix}-city`} value={cityOrDepartment} onChange={(event) => setCityOrDepartment(event.target.value)} className="rounded-2xl border border-[#84A59D]/35 bg-white px-4 py-3 text-[#23312D] outline-none ring-[#F6BD60] focus:ring-2" autoComplete="address-level2" />
          </label>
        )}

        <label className={`flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${isPro ? 'border-white/15 bg-white/5' : 'border-[#84A59D]/25 bg-[#F7EDE2]/50'}`}>
          <input type="checkbox" checked={contactConsent} onChange={(event) => setContactConsent(event.target.checked)} className="mt-1 h-4 w-4" />
          <span>J’accepte d’être recontacté·e par {SITE_CONFIG.ownerName} / {SITE_CONFIG.companyName} au sujet de mes résultats.</span>
        </label>

        <label className={`flex gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${isPro ? 'border-white/15 bg-white/5' : 'border-[#84A59D]/25 bg-[#F7EDE2]/50'}`}>
          <input type="checkbox" required checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} className="mt-1 h-4 w-4" />
          <span>
            J’ai lu la <a href={SITE_CONFIG.privacyUrl} target="_blank" rel="noreferrer" className="font-black underline">politique de confidentialité</a> et j’accepte la transmission de mes réponses à {SITE_CONFIG.companyName}.
          </span>
        </label>

        <button disabled={status === 'submitting'} className={`rounded-full px-6 py-4 text-center font-black transition disabled:opacity-50 ${isPro ? 'bg-[#F6BD60] text-[#23312D] hover:bg-[#ffd07f]' : 'bg-[#F28482] text-white hover:bg-[#e2716f]'}`}>
          {status === 'submitting' ? 'Envoi en cours…' : 'Envoyer mes résultats'}
        </button>

        {message && (
          <p role="status" className={`rounded-2xl p-4 text-sm font-bold ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
