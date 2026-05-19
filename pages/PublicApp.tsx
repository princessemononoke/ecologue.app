import { useMemo, useState } from 'react';
import { ModeSwitcher } from '../components/ModeSwitcher';
import { PublicExitNoOutdoor } from '../components/PublicExitNoOutdoor';
import { PrivacyMiniNotice } from '../components/PrivacyMiniNotice';
import { ResultsSubmissionForm } from '../components/ResultsSubmissionForm';
import { SiteFooter } from '../components/SiteFooter';
import { PUBLIC_QUESTIONS } from '../data/publicQuestions';
import { PUBLIC_SOURCES } from '../data/publicSources';
import type { PublicAnswers, PublicQuestion } from '../data/publicTypes';
import { calculatePublicScore, getPublicRecommendations, hasOutdoorSpace } from '../services/publicScoringService';

function shouldShowQuestion(question: PublicQuestion, answers: PublicAnswers): boolean {
  if (!question.when) return true;
  const actual = answers[question.when.field];
  const expected = question.when.value;
  const expectedValues = Array.isArray(expected) ? expected : [expected];

  switch (question.when.operator) {
    case '==': return actual === expected;
    case '!=': return actual !== expected;
    case 'in': return typeof actual === 'string' && expectedValues.includes(actual);
    case 'not_in': return typeof actual === 'string' && !expectedValues.includes(actual);
    default: return true;
  }
}

function PublicScoreCard({ answers }: { answers: PublicAnswers }) {
  const score = calculatePublicScore(answers);
  const rows = [
    ['Se nourrir', score.seNourrir],
    ['Se réfugier', score.seRefugier],
    ['Se reproduire', score.seReproduire],
    ['Circuler / survivre', score.circulerSurvivre],
  ] as const;

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm border border-lime-100">
      <p className="text-sm font-semibold uppercase tracking-wide text-lime-700">Score d’accueil du vivant</p>
      <div className="mt-3 flex items-end gap-3">
        <span className="text-5xl font-black text-lime-700">{score.total}</span>
        <span className="pb-2 text-slate-500">/ 100</span>
      </div>
      <h2 className="mt-3 text-2xl font-bold text-slate-900">{score.label}</h2>
      <p className="mt-2 text-slate-700">{score.summary}</p>
      <div className="mt-6 grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label}>
            <div className="flex justify-between text-sm text-slate-700"><span>{label}</span><span>{value}/100</span></div>
            <div className="mt-1 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-lime-500" style={{ width: `${value}%` }} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SourceList({ sourceIds }: { sourceIds: string[] }) {
  const sources = PUBLIC_SOURCES.filter((source) => sourceIds.includes(source.id));
  return (
    <details className="mt-4 rounded-2xl bg-slate-50 p-3">
      <summary className="cursor-pointer text-sm font-semibold text-slate-700">Sources utilisées</summary>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {sources.map((source) => (
          <li key={source.id}>
            {source.url ? (
              <a href={source.url} target="_blank" rel="noreferrer" className="font-medium text-lime-700 underline">{source.title}</a>
            ) : (
              <span className="font-medium text-slate-800">{source.title}</span>
            )}
            {source.rawFile && <span> - {source.rawFile}</span>}
            {source.pages && <span> - p. {source.pages}</span>}
          </li>
        ))}
      </ul>
    </details>
  );
}

function PublicResults({ answers, onReset }: { answers: PublicAnswers; onReset: () => void }) {
  const score = useMemo(() => calculatePublicScore(answers), [answers]);
  const recommendations = useMemo(() => getPublicRecommendations(answers, 8), [answers]);

  if (!hasOutdoorSpace(answers)) {
    return (
      <main className="min-h-screen bg-lime-50/50 px-4 py-8">
        <ModeSwitcher mode="public" />
        <div className="mx-auto max-w-3xl"><PublicExitNoOutdoor /></div>
        <SiteFooter variant="public" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white px-4 py-8">
      <ModeSwitcher mode="public" />
      <div className="mx-auto max-w-5xl">
        <button onClick={onReset} className="mb-4 text-sm font-semibold text-lime-700 hover:underline">Recommencer le test</button>
        <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
          <PublicScoreCard answers={answers} />
          <section className="rounded-3xl bg-white p-6 shadow-sm border border-lime-100">
            <p className="text-sm font-semibold uppercase tracking-wide text-lime-700">Vos actions prioritaires</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Les gestes les plus utiles pour votre espace</h1>
            <div className="mt-6 grid gap-4">
              {recommendations.map((rec, index) => (
                <article key={rec.id} className="rounded-3xl border border-slate-100 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-lime-700">Action {index + 1} - {rec.effort}</p>
                      <h2 className="mt-1 text-xl font-bold text-slate-900">{rec.title}</h2>
                    </div>
                    <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-800">{rec.season.replace('_', ' ')}</span>
                  </div>
                  <p className="mt-3 text-slate-700"><strong>Pourquoi ?</strong> {rec.why}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
                    {rec.how.map((step) => <li key={step}>{step}</li>)}
                  </ul>
                  {rec.avoid && rec.avoid.length > 0 && (
                    <div className="mt-3 rounded-2xl bg-amber-50 p-3 text-sm text-amber-900">
                      <strong>À éviter : </strong>{rec.avoid.join(' ')}
                    </div>
                  )}
                  <SourceList sourceIds={rec.sourceIds} />
                </article>
              ))}
            </div>
          </section>
        </div>
        <ResultsSubmissionForm
          mode="particuliers"
          answers={answers as Record<string, unknown>}
          score={score as unknown as Record<string, unknown>}
          recommendations={recommendations as unknown as Array<Record<string, unknown>>}
        />
      </div>
      <SiteFooter variant="public" />
    </main>
  );
}

export default function PublicApp() {
  const [answers, setAnswers] = useState<PublicAnswers>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const visibleQuestions = PUBLIC_QUESTIONS.filter((question) => shouldShowQuestion(question, answers));
  const question = visibleQuestions[step];

  const updateAnswer = (id: string, value: string, type: 'single' | 'multiple') => {
    setAnswers((previous) => {
      if (type === 'single') return { ...previous, [id]: value };
      const current = Array.isArray(previous[id]) ? [...(previous[id] as string[])] : [];
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      return { ...previous, [id]: next };
    });
  };

  if (submitted || !question) {
    return <PublicResults answers={answers} onReset={() => { setAnswers({}); setStep(0); setSubmitted(false); }} />;
  }

  const currentValue = answers[question.id];
  const canContinue = question.type === 'multiple'
    ? Array.isArray(currentValue) && currentValue.length > 0
    : typeof currentValue === 'string';

  const goNext = () => {
    if (question.id === 'outdoor_type' && answers.outdoor_type === 'aucun') {
      setSubmitted(true);
      return;
    }
    if (step >= visibleQuestions.length - 1) setSubmitted(true);
    else setStep(step + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-lime-50 to-white px-4 py-8">
      <ModeSwitcher mode="public" />
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm border border-lime-100 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-lime-700">Version particuliers - 3 à 5 minutes</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Votre extérieur peut-il accueillir plus de vivant ?</h1>
        <p className="mt-3 text-slate-700">Répondez à quelques questions simples pour obtenir un score d’accueil du vivant et des actions adaptées à votre jardin, balcon, terrasse ou rebord de fenêtre.</p>
        <PrivacyMiniNotice variant="public" />
        <div className="mt-8">
          <div className="text-sm font-semibold text-slate-500">Question {step + 1} / {visibleQuestions.length}</div>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{question.label}</h2>
          {question.helper && <p className="mt-2 text-slate-600">{question.helper}</p>}
          <div className="mt-6 grid gap-3">
            {question.options.map((option) => {
              const selected = question.type === 'multiple'
                ? Array.isArray(currentValue) && currentValue.includes(option.value)
                : currentValue === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => updateAnswer(question.id, option.value, question.type)}
                  className={`rounded-2xl border p-4 text-left transition ${selected ? 'border-lime-500 bg-lime-50 ring-2 ring-lime-200' : 'border-slate-200 bg-white hover:border-lime-300'}`}
                >
                  <span className="font-semibold text-slate-900">{option.label}</span>
                  {option.helper && <span className="block text-sm text-slate-600">{option.helper}</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex justify-between">
            <button disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))} className="rounded-full px-5 py-2 text-sm font-semibold text-slate-600 disabled:opacity-40">Retour</button>
            <button disabled={!canContinue} onClick={goNext} className="rounded-full bg-lime-600 px-6 py-3 font-bold text-white disabled:opacity-40">Continuer</button>
          </div>
        </div>
      </section>
      <SiteFooter variant="public" />
    </main>
  );
}
