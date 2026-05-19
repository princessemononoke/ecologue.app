import { describe, expect, it } from 'vitest';
import { PRO_V4_RECOMMENDATION_ADDITIONS } from '../data/pro/proRecommendationAdditions';
import { withProV4Additions } from '../data/pro/proRecommendationPatch';

describe('PRO V4 recommendations', () => {
  it('fournit des identifiants uniques', () => {
    const ids = PRO_V4_RECOMMENDATION_ADDITIONS.map((recommendation) => recommendation.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('n’ajoute pas de doublons si le patch est appliqué deux fois', () => {
    const once = withProV4Additions([]);
    const twice = withProV4Additions(once);
    expect(twice).toHaveLength(once.length);
  });

  it('ajoute les recommandations structurantes attendues', () => {
    const ids = PRO_V4_RECOMMENDATION_ADDITIONS.map((recommendation) => recommendation.id);
    expect(ids).toContain('pro_v4_plan_gestion_differenciee_zones_refuges');
    expect(ids).toContain('pro_v4_strategie_eclairage_trame_noire');
    expect(ids).toContain('pro_v4_clotures_permeables_petite_faune');
  });
});
