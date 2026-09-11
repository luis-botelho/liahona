import { describe, expect, it } from 'vitest';

import {
  computeWorkerProfileCompletion,
  normalizeFriendlyList,
} from './worker-profile.js';

describe('normalizeFriendlyList', () => {
  it('trims values and collapses inner whitespace', () => {
    expect(normalizeFriendlyList(['  Vendas ', ' Operações   Logística '])).toEqual(
      ['Vendas', 'Operações Logística'],
    );
  });

  it('removes empty entries', () => {
    expect(normalizeFriendlyList(['', '  ', 'Vendas'])).toEqual(['Vendas']);
  });

  it('dedupes case-insensitively keeping first occurrence', () => {
    expect(normalizeFriendlyList(['Vendas', 'vendas', 'VENDAS'])).toEqual([
      'Vendas',
    ]);
  });
});

describe('computeWorkerProfileCompletion', () => {
  it('reports a full profile as complete', () => {
    const completion = computeWorkerProfileCompletion({
      professionalTitle: 'Vendedor',
      city: 'Angra dos Reis',
      skills: ['vendas'],
      desiredRoles: ['vendedor'],
      whatsapp: '5511999999999',
    });

    expect(completion.isComplete).toBe(true);
    expect(completion.completionPercentage).toBe(100);
    expect(completion.missingFields).toEqual([]);
  });

  it('reports missing fields for an incomplete profile', () => {
    const completion = computeWorkerProfileCompletion({
      city: 'Angra dos Reis',
      skills: ['vendas'],
    });

    expect(completion.isComplete).toBe(false);
    expect(completion.completionPercentage).toBe(40);
    expect(completion.missingFields).toEqual([
      'professionalTitle',
      'desiredRoles',
      'whatsapp',
    ]);
  });

  it('treats an empty profile as 0% complete', () => {
    const completion = computeWorkerProfileCompletion({});

    expect(completion.isComplete).toBe(false);
    expect(completion.completionPercentage).toBe(0);
    expect(completion.missingFields).toHaveLength(5);
  });
});