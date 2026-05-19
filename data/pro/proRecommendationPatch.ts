import type { Recommendation } from '../../types';
import { PRO_V4_RECOMMENDATION_ADDITIONS } from './proRecommendationAdditions';

export function withProV4Additions(existingRecommendations: Recommendation[]): Recommendation[] {
  const existingIds = new Set(existingRecommendations.map((recommendation) => recommendation.id));
  const additions = PRO_V4_RECOMMENDATION_ADDITIONS.filter((recommendation) => !existingIds.has(recommendation.id));
  return [...existingRecommendations, ...additions];
}
