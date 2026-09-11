import { describe, expect, it } from 'vitest';

import {
  generateResumePdf,
  orderSkillsForOpportunity,
} from './resume-pdf.service.js';

describe('generateResumePdf', () => {
  it('produces a valid PDF buffer', async () => {
    const buffer = await generateResumePdf({
      name: 'Joao da Silva',
      email: 'joao@example.com',
      professionalTitle: 'Eletricista',
      skills: ['eletricista', 'segurança'],
      city: 'Mambucaba',
      whatsapp: '5511999999999',
    });

    expect(Buffer.isBuffer(buffer)).toBe(true);
    expect(buffer.subarray(0, 5).toString()).toBe('%PDF-');
    const content = buffer.toString('latin1').trimEnd();
    expect(content.endsWith('%%EOF')).toBe(true);
    expect(buffer.length).toBeGreaterThan(500);
  });

  it('embeds the worker name and target title in the metadata', async () => {
    const buffer = await generateResumePdf({
      name: 'Maria Santos',
      email: 'maria@example.com',
      professionalTitle: 'Atendente',
      opportunity: { title: 'Atendente de padaria', tags: ['atendimento'] },
    });

    const content = buffer.toString('latin1');
    expect(content).toContain('Maria Santos');
    expect(content).toContain('Atendente de padaria');
  });
});

describe('orderSkillsForOpportunity', () => {
  it('prioritizes skills that match the opportunity tags', () => {
    const ordered = orderSkillsForOpportunity(
      ['pintura', 'eletrica', 'vendas'],
      ['eletrica', 'instalacao'],
    );

    expect(ordered[0]).toBe('eletrica');
    expect(ordered).toEqual(['eletrica', 'pintura', 'vendas']);
  });

  it('keeps the original order when there is no match', () => {
    const ordered = orderSkillsForOpportunity(['pintura', 'vendas'], ['carga']);

    expect(ordered).toEqual(['pintura', 'vendas']);
  });

  it('is case-insensitive when matching', () => {
    const ordered = orderSkillsForOpportunity(['Caixa', 'Vendas'], ['vendas']);

    expect(ordered[0]).toBe('Vendas');
  });
});