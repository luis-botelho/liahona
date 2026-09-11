import { describe, expect, it } from 'vitest';

import { normalizeTag, normalizeTags, scoreOpportunity } from './match.js';

describe('normalizeTag / normalizeTags', () => {
  it('normalizes a single tag', () => {
    expect(normalizeTag('  Eletricista ')).toBe('eletricista');
  });

  it('normalizes, trims and dedupes a list', () => {
    expect(normalizeTags([' Eletricista ', 'eletricista', '', 'Pintura'])).toEqual(
      ['eletricista', 'pintura'],
    );
  });
});

describe('scoreOpportunity', () => {
  it('scores location, skill and interest', () => {
    const result = scoreOpportunity(
      {
        location: 'Angra dos Reis',
        category: 'construção',
        tags: ['pintura', 'eletricista'],
      },
      {
        city: 'Angra dos Reis',
        skills: ['eletricista'],
        interests: ['construção'],
      },
    );

    expect(result.matchScore).toBe(100);
    expect(result.matchReasons).toContain('Localização compatível');
    expect(result.matchReasons).toContain('Habilidade: eletricista');
    expect(result.matchReasons).toContain('Interesse: construção');
  });

  it('scores skill match without location', () => {
    const result = scoreOpportunity(
      { location: null, tags: ['eletricista'] },
      { city: null, skills: ['Eletricista'], interests: [] },
    );

    expect(result.matchScore).toBe(40);
    expect(result.matchReasons).toEqual(['Habilidade: eletricista']);
  });

  it('returns zero when nothing matches', () => {
    const result = scoreOpportunity(
      { location: 'Mambucaba', tags: ['motorista'] },
      { city: 'Paraty', skills: ['cozinha'], interests: ['vendas'] },
    );

    expect(result.matchScore).toBe(0);
    expect(result.matchReasons).toEqual([]);
  });

  it('matches location by substring of city or location', () => {
    const result = scoreOpportunity(
      { location: 'Centro, Angra dos Reis', tags: [] },
      { city: 'Angra dos Reis', skills: [], interests: [] },
    );

    expect(result.matchScore).toBe(40);
  });
});