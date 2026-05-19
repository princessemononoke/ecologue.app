import { describe, expect, it } from 'vitest';
import { calculatePublicScore, getPublicRecommendations, hasOutdoorSpace } from '../services/publicScoringService';

const baseAnswers = {
  outdoor_type: 'jardin',
  surface_range: '50_200',
  existing_vegetation: ['pelouse', 'haie', 'arbres'],
  wild_plants_place: 'zones',
  mowing_pruning_frequency: '1_2_par_an',
  chemical_products: 'non',
  flowers_for_insects: 'beaucoup',
  water_for_wildlife: 'coupelle',
  shelters: ['feuilles_mortes', 'bois_mort', 'haie_dense'],
  night_lighting: 'non',
  cat: 'non',
  main_goal: 'papillons_pollinisateurs',
};

describe('publicScoringService', () => {
  it('detecte les personnes sans exterieur', () => {
    expect(hasOutdoorSpace({ outdoor_type: 'aucun' })).toBe(false);
    const score = calculatePublicScore({ outdoor_type: 'aucun' });
    expect(score.label).toBe('Test non applicable');
  });

  it('calcule un score positif pour un jardin favorable', () => {
    const score = calculatePublicScore(baseAnswers);
    expect(score.total).toBeGreaterThan(45);
    expect(score.seNourrir).toBeGreaterThan(30);
  });

  it('priorise le zero pesticide quand des produits sont utilises', () => {
    const recs = getPublicRecommendations({ ...baseAnswers, chemical_products: 'oui' });
    expect(recs.some((rec) => rec.id === 'stop_pesticides')).toBe(true);
  });
});

const intensiveGarden = {
  outdoor_type: 'jardin',
  surface_range: '10_50',
  existing_vegetation: ['pelouse', 'haie'],
  wild_plants_place: 'aucune',
  mowing_pruning_frequency: 'tres_souvent',
  chemical_products: 'oui',
  flowers_for_insects: 'peu',
  water_for_wildlife: 'non',
  shelters: ['aucun'],
  night_lighting: 'fort_toute_nuit',
  cat: 'oui_souvent',
  main_goal: 'moins_entretien',
};

const litBalcony = {
  outdoor_type: 'balcon',
  surface_range: '2_10',
  existing_vegetation: ['pots'],
  wild_plants_place: 'un_peu',
  mowing_pruning_frequency: 'regulierement',
  chemical_products: 'parfois',
  flowers_for_insects: 'quelques_unes',
  water_for_wildlife: 'non',
  shelters: ['aucun'],
  night_lighting: 'fort_toute_nuit',
  cat: 'oui_souvent',
  main_goal: 'oiseaux',
};

describe('equilibrage des recommandations publiques', () => {
  it('ne renvoie que la ressource sans exterieur quand le test est non applicable', () => {
    const recs = getPublicRecommendations({ outdoor_type: 'aucun' });
    expect(recs.map((rec) => rec.id)).toEqual(['no_outdoor_resources']);
  });

  it('adapte fortement les recommandations a un balcon avec chat, eclairage et traitements', () => {
    const ids = getPublicRecommendations(litBalcony).map((rec) => rec.id);
    expect(ids.slice(0, 3)).toEqual(['stop_pesticides', 'reduce_lighting', 'cat_precautions']);
    expect(ids).toContain('water_safe_bowl');
  });

  it('ne propose pas une mare naturelle comme action prioritaire dans un petit jardin tres degrade', () => {
    const ids = getPublicRecommendations(intensiveGarden).map((rec) => rec.id);
    expect(ids.slice(0, 6)).not.toContain('natural_pond');
    expect(ids).toContain('stop_pesticides');
    expect(ids).toContain('mow_less_high');
  });
});
