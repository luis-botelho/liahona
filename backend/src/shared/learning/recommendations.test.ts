import { describe, expect, it } from "vitest";

import { scoreCourse } from './recommendations.js';

describe("scoreCourse", () => {
  const profile = {
    interests: ["atendimento", "tecnologia"],
    skills: ["comunicacao"],
  };

  it("scores skill interest matches with 50 each", () => {
    const result = scoreCourse(profile, {
      category: null,
      skills: ["atendimento", "tecnologia"],
    });

    expect(result.score).toBe(100);
    expect(result.reasons).toContain("Interesse: atendimento");
    expect(result.reasons).toContain("Interesse: tecnologia");
  });

  it("scores category interest matches with 40", () => {
    const result = scoreCourse(profile, {
      category: "tecnologia",
      skills: [],
    });

    expect(result.score).toBe(40);
    expect(result.reasons).toContain("Área de interesse: tecnologia");
  });

  it("flags skills the worker does not have yet as growth opportunities", () => {
    const result = scoreCourse(profile, {
      category: null,
      skills: ["comunicacao", "vendas"],
    });

    expect(result.reasons).not.toContain("Desenvolva a habilidade: comunicacao");
    expect(result.reasons).toContain("Desenvolva a habilidade: vendas");
  });

  it("is case and whitespace insensitive", () => {
    const result = scoreCourse(
      { interests: ["  Atendimento "], skills: [] },
      { category: null, skills: ["ATENDIMENTO"] },
    );

    expect(result.score).toBe(50);
  });

  it("returns zero score and empty reasons when nothing matches", () => {
    const result = scoreCourse(
      { interests: ["saude"], skills: [] },
      { category: "logistica", skills: ["direcao"] },
    );

    expect(result.score).toBe(0);
    expect(result.reasons).toEqual(["Desenvolva a habilidade: direcao"]);
  });
});