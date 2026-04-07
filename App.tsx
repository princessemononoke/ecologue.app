import React, { useState, useMemo } from "react";
import { QUESTIONNAIRE, RECOMMENDATIONS } from "./constants";
import { UserResponses, Recommendation } from "./types";
import {
  getPrioritizedRecommendations,
  ScoredRecommendation,
} from "./services/recommendationService";

// UI Components
const Header = () => (
  <header className="bg-emerald-800 text-white py-6 px-4 shadow-lg sticky top-0 z-50">
    <div className="max-w-4xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <i className="fa-solid fa-leaf text-2xl text-emerald-300"></i>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Ecologue</h1>
          <p className="text-xs text-emerald-100 opacity-80 uppercase tracking-widest font-semibold">
            Expertise Biodiversité & Sites
          </p>
        </div>
      </div>
      <div className="text-xs border border-emerald-400/30 bg-emerald-700/50 px-3 py-1 rounded-full text-emerald-100">
        v1.2
      </div>
    </div>
  </header>
);

const Questionnaire = ({
  onComplete,
}: {
  onComplete: (data: UserResponses) => void;
}) => {
  const [responses, setResponses] = useState<UserResponses>({});
  const [currentStep, setCurrentStep] = useState(0);

  const visibleFields = useMemo(() => {
    return QUESTIONNAIRE.fields.filter((f) => {
      if (!f.when) return true;
      const { field, op, value } = f.when;
      return op === "=="
        ? responses[field] === value
        : responses[field] !== value;
    });
  }, [responses]);

  const currentField = visibleFields[currentStep];

  const handleNext = () => {
    if (currentStep < visibleFields.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      onComplete(responses);
    }
  };

  const handleValueChange = (val: string) => {
    setResponses((prev) => ({ ...prev, [currentField.key]: val }));
  };

  const progress = ((currentStep + 1) / visibleFields.length) * 100;

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Étape {currentStep + 1} sur {visibleFields.length}
          </span>
          <span className="text-xs text-slate-400">
            {Math.round(progress)}% complété
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="min-h-[250px] flex flex-col justify-center">
        <label className="text-xl font-semibold text-slate-800 mb-6 block leading-tight">
          {currentField.label}
        </label>

        {currentField.type === "select" ? (
          <div className="grid gap-3">
            {currentField.options?.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  handleValueChange(opt.value);
                  handleNext();
                }}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  responses[currentField.key] === opt.value
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm"
                    : "border-slate-100 hover:border-emerald-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <input
              autoFocus
              type="text"
              value={responses[currentField.key] || ""}
              onChange={(e) => handleValueChange(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && responses[currentField.key] && handleNext()
              }
              className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-emerald-500 outline-none transition-all"
              placeholder="Saisissez votre réponse..."
            />
            <button
              disabled={!responses[currentField.key]}
              onClick={handleNext}
              className="bg-emerald-600 text-white py-4 px-8 rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              Suivant <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between text-slate-400">
        <button
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          className={`text-sm hover:text-slate-600 flex items-center gap-2 ${currentStep === 0 ? "invisible" : ""}`}
        >
          <i className="fa-solid fa-chevron-left"></i> Précédent
        </button>
        <div className="text-[10px] uppercase font-medium">
          Référentiel AFILOG / BREEAM / HQE
        </div>
      </div>
    </div>
  );
};

const RiskGauge = ({ score }: { score: number }) => {
  const getRiskColor = (s: number) => {
    if (s < 30) return "text-emerald-500";
    if (s < 60) return "text-orange-500";
    return "text-red-600";
  };

  const getRiskLabel = (s: number) => {
    if (s < 30) return "Maîtrisé";
    if (s < 60) return "Modéré";
    return "Critique";
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
        Indice de Risque Projet
      </h3>
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="stroke-slate-100"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={`transition-all duration-1000 ${score < 30 ? "stroke-emerald-500" : score < 60 ? "stroke-orange-500" : "stroke-red-500"}`}
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center font-bold text-xl ${getRiskColor(score)}`}
        >
          {score}%
        </div>
      </div>
      <span className={`text-sm font-black uppercase ${getRiskColor(score)}`}>
        {getRiskLabel(score)}
      </span>
    </div>
  );
};

const Results = ({ responses }: { responses: UserResponses }) => {
  const buildLocalSynthesis = (responses: UserResponses, riskScore: number) => {
    const personaLabel =
      QUESTIONNAIRE.fields[0].options?.find(
        (o) => o.value === responses.persona,
      )?.label || responses.persona;

    const assetLabel =
      QUESTIONNAIRE.fields[3].options?.find(
        (o) => o.value === responses.asset_type,
      )?.label || responses.asset_type;

    const certifLabel =
      responses.certif_target && responses.certif_target !== "non"
        ? responses.certif_target
        : "sans objectif de certification déclaré";

    const riskLabel =
      riskScore < 30 ? "maîtrisé" : riskScore < 60 ? "modéré" : "critique";

    return `Profil identifié : ${personaLabel}, sur un actif de type ${assetLabel}. Le niveau de risque global du projet est actuellement ${riskLabel} (${riskScore}%). Les recommandations ci-dessous sont priorisées selon vos réponses et votre contexte opérationnel. ${certifLabel !== "sans objectif de certification déclaré" ? `Un objectif de certification ${certifLabel} a également été pris en compte.` : "Aucun objectif de certification spécifique n’a été déclaré."}`;
  };
  const [synthesis, setSynthesis] = useState("");

  const results = useMemo(
    () => getPrioritizedRecommendations(RECOMMENDATIONS, responses),
    [responses],
  );

  React.useEffect(() => {
    setSynthesis(buildLocalSynthesis(responses, results.projectRiskScore));
  }, [responses, results.projectRiskScore]);

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 pb-24">
      <div className="grid lg:grid-cols-4 gap-8 mb-12">
        <section className="lg:col-span-3 bg-emerald-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-id-card-clip text-emerald-400"></i>{" "}
              Synthèse Stratégique
            </h2>
            <p className="text-emerald-50 leading-relaxed text-lg italic">
              "{synthesis}"
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-emerald-700/50 px-3 py-1 rounded-lg text-xs font-semibold border border-emerald-500/30 uppercase tracking-wider">
                {responses.contact_company}
              </span>
              <span className="bg-emerald-700/50 px-3 py-1 rounded-lg text-xs font-semibold border border-emerald-500/30 uppercase tracking-wider">
                {responses.asset_type}
              </span>
              <span className="bg-emerald-700/50 px-3 py-1 rounded-lg text-xs font-semibold border border-emerald-500/30 uppercase tracking-wider">
                {responses.certif_target !== "non"
                  ? responses.certif_target
                  : "Pas de certification"}
              </span>
            </div>
          </div>
          <i className="fa-solid fa-leaf absolute -bottom-10 -right-10 text-[150px] opacity-10 rotate-12"></i>
        </section>

        <RiskGauge score={results.projectRiskScore} />
      </div>

      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
            <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm italic">
              8
            </span>
            Top 8 Recommandations Priorisées
          </h2>
          <div className="text-xs text-slate-400 italic">
            Classées par score de pertinence calculé pour votre profil
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {results.top8.map(({ rec, score }, idx) => (
            <div
              key={rec.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                  {rec.categorie}
                </span>
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm">
                    Score: {score}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    #{rec.id}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-tight">
                {rec.titre}
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">
                {rec.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-50">
                <div>
                  <h4 className="font-bold text-slate-800 uppercase text-[9px] mb-1">
                    Niveau de risque
                  </h4>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        rec.niveau_risque === "faible"
                          ? "bg-green-500"
                          : rec.niveau_risque === "moyen"
                            ? "bg-orange-500"
                            : "bg-red-500"
                      }`}
                    ></span>
                    <span className="capitalize text-slate-500 font-medium">
                      {rec.niveau_risque}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 uppercase text-[9px] mb-1">
                    Horizon
                  </h4>
                  <span className="text-slate-500 flex items-center gap-1 italic">
                    <i className="fa-solid fa-clock opacity-50"></i>{" "}
                    {rec.horizon}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-plus-circle text-emerald-600"></i>{" "}
              Actions complémentaires
            </h2>
            <div className="space-y-4">
              {results.complementary.map(({ rec, score }) => (
                <div
                  key={rec.id}
                  className="bg-slate-50 p-4 rounded-xl flex items-start gap-4 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
                >
                  <div className="bg-white w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm border border-slate-100 text-emerald-600 font-bold text-xs">
                    {score}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      {rec.titre}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {rec.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div>
          <section className="mb-12 bg-orange-50 p-6 rounded-2xl border border-orange-100">
            <h2 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation text-orange-600"></i>{" "}
              Points de vigilance
            </h2>
            <div className="space-y-4">
              {results.vigilance.length > 0 ? (
                results.vigilance.map(({ rec, score }) => (
                  <div
                    key={rec.id}
                    className="text-sm bg-white/50 p-3 rounded-lg border border-orange-200/50"
                  >
                    <h4 className="font-bold text-orange-800 mb-1 flex justify-between items-center">
                      <span>{rec.titre}</span>
                      <span className="text-[10px] bg-orange-200 text-orange-800 px-1.5 rounded">
                        {score}
                      </span>
                    </h4>
                    <p className="text-orange-700/80 text-xs leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-orange-600 italic">
                  Aucune vigilance critique identifiée selon vos réponses.
                </p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Sources et références
            </h2>
            <ul className="space-y-3">
              {[...results.top8, ...results.complementary].map(({ rec }, i) => (
                <li
                  key={i}
                  className="text-[10px] text-slate-400 leading-tight flex gap-2"
                >
                  <span className="font-bold text-slate-300">[{rec.id}]</span>{" "}
                  {rec.source}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="flex-1 md:flex-none bg-slate-900 text-white py-3 px-8 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-file-pdf"></i> Exporter le dossier
        </button>

        <a
          href="https://zcal.co/agathemaussion/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 md:flex-none bg-emerald-600 text-white py-3 px-8 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-calendar-check"></i> Rendez-vous direct
        </a>

        <button
          onClick={() => window.location.reload()}
          className="flex-1 md:flex-none bg-white text-slate-900 border border-slate-200 py-3 px-8 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-rotate-left"></i> Relancer l'audit
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<"intro" | "form" | "results">("intro");
  const [responses, setResponses] = useState<UserResponses | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {step === "intro" && (
          <div className="max-w-4xl mx-auto my-20 px-6 text-center">
            <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Outil d'Aide à la Décision
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
              Qualifiez la biodiversité de votre site en{" "}
              <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">
                5 minutes
              </span>
              .
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Coach Biodiversité PRO analyse vos contraintes métiers et
              techniques pour vous proposer une trajectoire sur-mesure conforme
              aux référentiels 2025.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setStep("form")}
                className="w-full md:w-auto bg-emerald-600 text-white py-4 px-12 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200/50 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                Commencer l'audit <i className="fa-solid fa-arrow-right"></i>
              </button>
              <div className="text-slate-400 text-sm flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-check text-emerald-500"></i> Gratuit
                </span>
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-check text-emerald-500"></i> Sans
                  compte
                </span>
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-check text-emerald-500"></i>{" "}
                  Conforme BREEAM
                </span>
              </div>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs font-bold uppercase">AFILOG</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs font-bold uppercase">BREEAM</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs font-bold uppercase">HQE</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs font-bold uppercase">BiodiverCity</div>
              </div>
            </div>
          </div>
        )}

        {step === "form" && (
          <Questionnaire
            onComplete={(data) => {
              setResponses(data);
              setStep("results");
            }}
          />
        )}

        {step === "results" && responses && <Results responses={responses} />}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12 px-4 mt-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <i className="fa-solid fa-leaf text-emerald-600"></i>
            <span className="font-bold text-slate-800">
              Coach Biodiversité PRO
            </span>
          </div>
          <div className="text-xs text-slate-400 text-center md:text-right">
            © 2025 — Développé pour les acteurs de l'immobilier durable.
            <br />
            Les recommandations sont indicatives et ne remplacent pas un audit
            écologique sur site.
          </div>
        </div>
      </footer>
    </div>
  );
}
