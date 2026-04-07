
import { Recommendation, UserResponses } from '../types';

function evaluateCondition(condition: any, responses: UserResponses): boolean {
  const { field, op, value } = condition;
  const userValue = responses[field];

  if (op === '==') return userValue === value;
  if (op === '!=') return userValue !== value;
  if (op === 'in') return Array.isArray(value) ? value.includes(userValue) : false;
  
  return false;
}

function evaluateHardFilters(filtersStr: string, responses: UserResponses): boolean {
  if (!filtersStr) return true;
  try {
    const filters = JSON.parse(filtersStr);
    
    if (filters.field) {
        return evaluateCondition(filters, responses);
    }

    if (filters.any) {
      return (filters.any as any[]).some(cond => evaluateCondition(cond, responses));
    }
    if (filters.all) {
      return (filters.all as any[]).every(cond => evaluateCondition(cond, responses));
    }
    return true;
  } catch (e) {
    console.error("Filter parse error", e);
    return true;
  }
}

function calculateSoftScore(rec: Recommendation, responses: UserResponses): number {
  if (!rec.soft_scores) return 0;
  try {
    const scores = JSON.parse(rec.soft_scores);
    let total = 0;
    
    const persona = responses['persona'];
    if (persona === 'certif_qe') total += (scores.certification || 0) * 2;
    if (persona === 'rse_dd') total += (scores.pilotage || 0) * 1.5;
    if (persona === 'dev_foncier') total += (scores.risque || 0) * 1.5;

    const constraint = responses['stakeholder_constraints'];
    if (constraint === 'budget') total -= (scores.cout || 0);
    if (constraint === 'delais') total += (scores.pilotage || 0);

    Object.values(scores).forEach(val => total += (val as number));

    return Math.max(0, total);
  } catch (e) {
    return 0;
  }
}

export interface ScoredRecommendation {
  rec: Recommendation;
  score: number;
}

export function calculateProjectRiskScore(responses: UserResponses): number {
  let risk = 0;
  
  // Critères de risque majeurs
  if (responses['ecology_study'] === 'non') risk += 35;
  if (responses['ecology_study'] === 'partiel') risk += 15;
  
  if (responses['land_take'] === 'oui') risk += 30;
  
  if (responses['soil_full_ground'] === 'non') risk += 15;
  
  if (responses['lighting_night'] === 'oui_fort') risk += 10;
  
  if (responses['has_project'] === 'oui' && ['chantier', 'exploitation'].includes(responses['project_stage'])) {
    if (responses['ecology_study'] !== 'oui_recent') risk += 10;
  }

  return Math.min(100, risk);
}

export function getPrioritizedRecommendations(library: Recommendation[], responses: UserResponses) {
  const filtered = library.filter(rec => rec.active && evaluateHardFilters(rec.hard_filters, responses));
  
  const scored: ScoredRecommendation[] = filtered.map(rec => ({
    rec,
    score: calculateSoftScore(rec, responses)
  }));

  scored.sort((a, b) => b.score - a.score);

  return {
    top8: scored.slice(0, 8),
    complementary: scored.slice(8, 13),
    vigilance: scored.filter(s => s.rec.categorie === 'Vigilance'),
    projectRiskScore: calculateProjectRiskScore(responses)
  };
}
