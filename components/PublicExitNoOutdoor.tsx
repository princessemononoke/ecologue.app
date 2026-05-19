import { PUBLIC_SOURCES } from '../data/publicSources';

const resources = [
  'ofb_nature_quotidien',
  'ofb_jardin_naturel',
  'lpo_refuge_balcon',
  'jardins_noe_charte',
  'pollinisactions',
];

export function PublicExitNoOutdoor() {
  const selected = PUBLIC_SOURCES.filter((source) => resources.includes(source.id));

  return (
    <section className="rounded-3xl border border-lime-200 bg-lime-50 p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-lime-700">Test non applicable</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">Vous pouvez quand même agir pour la biodiversité.</h2>
      <p className="mt-4 text-slate-700 leading-relaxed">
        Ce parcours est conçu pour les personnes qui peuvent agir sur un espace extérieur, même très petit. Sans jardin, balcon, terrasse ou rebord de fenêtre, le test s’arrête ici pour rester honnête. Vous pouvez toutefois agir par vos choix de consommation, votre engagement local, les sciences participatives, le soutien à des associations ou la participation à des démarches citoyennes.
      </p>
      <div className="mt-6 grid gap-3">
        {selected.map((source) => (
          <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition">
            <span className="font-semibold text-slate-900">{source.title}</span>
            <span className="block text-sm text-slate-600">{source.author}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
