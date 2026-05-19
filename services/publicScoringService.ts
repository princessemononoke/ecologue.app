import type { PublicAnswers, PublicRecommendation, PublicScoreBreakdown } from '../data/publicTypes';
import { PUBLIC_RECOMMENDATIONS } from '../data/publicRecommendations';

const isArray = (value: unknown): value is string[] => Array.isArray(value);

function answerIncludes(answers: PublicAnswers, field: string, expected: string): boolean {
  const actual = answers[field];
  if (isArray(actual)) return actual.includes(expected);
  return actual === expected;
}

function matchCondition(condition: NonNullable<PublicRecommendation['ifAnswers']>[number], answers: PublicAnswers): boolean {
  const actual = answers[condition.field];
  const expected = condition.value;
  const expectedValues = isArray(expected) ? expected : [expected];

  switch (condition.operator) {
    case '==':
      return actual === expected;
    case '!=':
      return actual !== expected;
    case 'includes':
      return typeof expected === 'string' && answerIncludes(answers, condition.field, expected);
    case 'includes_any':
      return expectedValues.some((value) => answerIncludes(answers, condition.field, value));
    case 'not_includes':
      return typeof expected === 'string' && !answerIncludes(answers, condition.field, expected);
    case 'in':
      return typeof actual === 'string' && expectedValues.includes(actual);
    case 'not_in':
      return typeof actual === 'string' && !expectedValues.includes(actual);
    default:
      return false;
  }
}

export function hasOutdoorSpace(answers: PublicAnswers): boolean {
  return answers.outdoor_type !== 'aucun';
}

export function calculatePublicScore(answers: PublicAnswers): PublicScoreBreakdown {
  if (!hasOutdoorSpace(answers)) {
    return {
      total: 0,
      seNourrir: 0,
      seRefugier: 0,
      seReproduire: 0,
      circulerSurvivre: 0,
      level: 'a_commencer',
      label: 'Test non applicable',
      summary: 'Ce test est conçu pour les personnes qui peuvent agir sur un espace extérieur, même très petit.',
    };
  }

  let seNourrir = 0;
  let seRefugier = 0;
  let seReproduire = 0;
  let circulerSurvivre = 0;

  const vegetation = (answers.existing_vegetation as string[]) || [];
  const shelters = (answers.shelters as string[]) || [];

  if (vegetation.includes('pots')) seNourrir += 4;
  if (vegetation.includes('pelouse')) circulerSurvivre += 2;
  if (vegetation.includes('massifs')) seNourrir += 8;
  if (vegetation.includes('haie')) { seNourrir += 8; seRefugier += 10; seReproduire += 8; }
  if (vegetation.includes('arbres')) { seNourrir += 6; seRefugier += 12; seReproduire += 8; circulerSurvivre += 6; }
  if (vegetation.includes('potager')) seNourrir += 4;

  switch (answers.wild_plants_place) {
    case 'un_peu': seNourrir += 4; seRefugier += 3; break;
    case 'zones': seNourrir += 10; seRefugier += 8; seReproduire += 8; break;
    case 'beaucoup': seNourrir += 14; seRefugier += 12; seReproduire += 10; break;
  }

  switch (answers.mowing_pruning_frequency) {
    case 'tres_souvent': seNourrir -= 8; seRefugier -= 6; seReproduire -= 8; break;
    case 'regulierement': seNourrir -= 4; seRefugier -= 3; seReproduire -= 4; break;
    case '1_2_par_an': seNourrir += 8; seRefugier += 8; seReproduire += 8; break;
    case 'jamais_pas_concerne': seRefugier += 2; break;
  }

  switch (answers.chemical_products) {
    case 'oui': seNourrir -= 12; seRefugier -= 8; seReproduire -= 12; circulerSurvivre -= 8; break;
    case 'parfois': seNourrir -= 7; seRefugier -= 4; seReproduire -= 7; circulerSurvivre -= 5; break;
    case 'non': seNourrir += 8; seRefugier += 6; seReproduire += 8; circulerSurvivre += 8; break;
  }

  switch (answers.flowers_for_insects) {
    case 'quelques_unes': seNourrir += 7; break;
    case 'beaucoup': seNourrir += 15; seReproduire += 3; break;
  }

  switch (answers.water_for_wildlife) {
    case 'coupelle': circulerSurvivre += 8; break;
    case 'mare': circulerSurvivre += 14; seRefugier += 8; seReproduire += 12; seNourrir += 6; break;
    case 'temporaire': circulerSurvivre += 3; break;
  }

  if (shelters.includes('feuilles_mortes')) { seRefugier += 7; seReproduire += 4; }
  if (shelters.includes('bois_mort')) { seRefugier += 10; seReproduire += 7; }
  if (shelters.includes('pierres')) { seRefugier += 7; circulerSurvivre += 4; }
  if (shelters.includes('compost')) { seNourrir += 2; seRefugier += 5; circulerSurvivre += 4; }
  if (shelters.includes('haie_dense')) { seRefugier += 8; seReproduire += 8; }
  if (shelters.includes('nichoir')) { seRefugier += 4; seReproduire += 5; }

  switch (answers.night_lighting) {
    case 'fort_toute_nuit': circulerSurvivre -= 10; break;
    case 'ponctuel_detecteur': circulerSurvivre -= 4; break;
    case 'non': circulerSurvivre += 8; break;
  }

  switch (answers.cat) {
    case 'oui_souvent': seReproduire -= 6; circulerSurvivre -= 8; break;
    case 'oui_parfois': seReproduire -= 3; circulerSurvivre -= 4; break;
  }

  const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
  seNourrir = clamp(seNourrir);
  seRefugier = clamp(seRefugier);
  seReproduire = clamp(seReproduire);
  circulerSurvivre = clamp(circulerSurvivre);

  const total = Math.round((seNourrir + seRefugier + seReproduire + circulerSurvivre) / 4);

  let level: PublicScoreBreakdown['level'] = 'a_commencer';
  let label = 'À démarrer';
  let summary = 'Votre espace peut rapidement devenir plus accueillant avec quelques gestes simples.';

  if (total >= 75) {
    level = 'tres_favorable';
    label = 'Très favorable au vivant';
    summary = 'Votre espace offre déjà plusieurs ressources importantes. Les prochaines actions peuvent surtout renforcer la continuité et la diversité.';
  } else if (total >= 50) {
    level = 'refuge_en_devenir';
    label = 'Refuge en devenir';
    summary = 'Votre espace dispose déjà de bons points d’appui. Quelques ajustements peuvent fortement augmenter son intérêt pour la faune.';
  } else if (total >= 25) {
    level = 'en_transition';
    label = 'En transition';
    summary = 'Les bases sont présentes, mais l’espace reste encore assez limité pour le vivant. Les premières actions auront un effet visible.';
  }

  return { total, seNourrir, seRefugier, seReproduire, circulerSurvivre, level, label, summary };
}

function goalBoost(rec: PublicRecommendation, answers: PublicAnswers): number {
  const goal = answers.main_goal;
  const category = rec.category;
  const text = `${rec.id} ${rec.title} ${rec.why}`.toLowerCase();

  const boostByGoal: Record<string, Partial<Record<PublicRecommendation['category'], number>>> = {
    oiseaux: { oiseaux: 18, haies_arbres: 10, micro_habitats: 8, nuit: 6 },
    papillons_pollinisateurs: { flore_pollinisateurs: 18, prairie_tonte: 12, micro_habitats: 8, balcon: 8 },
    moins_moustiques: { eau_mare: 16, nuit: 8, haies_arbres: 5 },
    moins_entretien: { prairie_tonte: 14, sol_dechets_verts: 10, haies_arbres: 6 },
    chaleur_secheresse: { sol_dechets_verts: 16, eau_mare: 10, haies_arbres: 10, flore_pollinisateurs: 6 },
    enfants_apprendre: { engagement: 14, eau_mare: 10, oiseaux: 8, flore_pollinisateurs: 8, micro_habitats: 6 },
    embellir: { flore_pollinisateurs: 14, balcon: 10, haies_arbres: 10 },
  };

  let boost = typeof goal === 'string' ? boostByGoal[goal]?.[category] ?? 0 : 0;

  if (goal === 'moins_moustiques' && /mare|point d’eau|eau/.test(text)) boost += 6;
  if (goal === 'oiseaux' && /chat|nichoir|haie|lierre/.test(text)) boost += 5;
  if (goal === 'papillons_pollinisateurs' && /fleur|aromatique|ortie|pollinisateur/.test(text)) boost += 5;

  return boost;
}

function urgencyBoost(rec: PublicRecommendation, answers: PublicAnswers): number {
  let boost = 0;
  if (rec.id === 'stop_pesticides' && ['oui', 'parfois', 'je_ne_sais_pas'].includes(String(answers.chemical_products))) boost += 35;
  if (rec.id === 'reduce_lighting' && ['fort_toute_nuit', 'ponctuel_detecteur'].includes(String(answers.night_lighting))) boost += 28;
  if (rec.id === 'water_safe_bowl' && ['non', 'temporaire'].includes(String(answers.water_for_wildlife))) boost += 22;
  if (rec.id === 'cat_precautions' && ['oui_souvent', 'oui_parfois'].includes(String(answers.cat))) boost += 24;
  if (rec.id === 'plant_local_simple_flowers' && ['peu', 'quelques_unes', 'je_ne_sais_pas'].includes(String(answers.flowers_for_insects))) boost += 24;
  if (rec.id === 'mow_less_high' && ['tres_souvent', 'regulierement'].includes(String(answers.mowing_pruning_frequency))) boost += 18;
  if (rec.id === 'mulch_soil' && answers.main_goal === 'chaleur_secheresse') boost += 28;
  if (rec.id === 'rainwater_saving' && answers.main_goal === 'chaleur_secheresse') boost += 24;
  if (rec.id === 'avoid_pruning_bird_season' && ['tres_souvent', 'regulierement'].includes(String(answers.mowing_pruning_frequency))) boost += 16;
  return boost;
}

function deficitBoost(rec: PublicRecommendation, score: PublicScoreBreakdown): number {
  const deficits = {
    seNourrir: Math.max(0, 70 - score.seNourrir),
    seRefugier: Math.max(0, 70 - score.seRefugier),
    seReproduire: Math.max(0, 70 - score.seReproduire),
    circulerSurvivre: Math.max(0, 70 - score.circulerSurvivre),
  };

  return Object.entries(rec.scoreWeights).reduce((sum, [key, value]) => {
    const dimension = key as keyof typeof deficits;
    return sum + ((value ?? 0) * deficits[dimension]) / 18;
  }, 0);
}

function recommendationScore(rec: PublicRecommendation, answers: PublicAnswers, score: PublicScoreBreakdown): number {
  const priorityBase = { 1: 60, 2: 42, 3: 26 } as const;
  const effortPenalty = { facile: 0, moyen: 6, avance: 28 } as const;
  const alreadyStrongPenalty = score.total >= 75 && rec.priority === 1 ? 10 : 0;

  return (
    priorityBase[rec.priority] +
    deficitBoost(rec, score) +
    goalBoost(rec, answers) +
    urgencyBoost(rec, answers) -
    effortPenalty[rec.effort] -
    alreadyStrongPenalty
  );
}

export function getPublicRecommendations(answers: PublicAnswers, maxResults = 8): PublicRecommendation[] {
  const outdoorType = answers.outdoor_type as string | undefined;

  if (outdoorType === 'aucun') {
    return PUBLIC_RECOMMENDATIONS.filter((rec) => rec.id === 'no_outdoor_resources');
  }

  const score = calculatePublicScore(answers);
  const candidates = PUBLIC_RECOMMENDATIONS.filter((rec) => {
    if (!rec.appliesTo.includes('tous') && outdoorType && !rec.appliesTo.includes(outdoorType as never)) {
      return false;
    }
    if (!rec.ifAnswers || rec.ifAnswers.length === 0) return true;
    return rec.ifAnswers.every((condition) => matchCondition(condition, answers));
  }).sort((a, b) => recommendationScore(b, answers, score) - recommendationScore(a, answers, score));

  const selected: PublicRecommendation[] = [];
  const categoryCounts = new Map<PublicRecommendation['category'], number>();

  for (const rec of candidates) {
    const count = categoryCounts.get(rec.category) ?? 0;
    if (count >= 2) continue;
    selected.push(rec);
    categoryCounts.set(rec.category, count + 1);
    if (selected.length >= maxResults) return selected;
  }

  for (const rec of candidates) {
    if (!selected.includes(rec)) selected.push(rec);
    if (selected.length >= maxResults) break;
  }

  return selected;
}
