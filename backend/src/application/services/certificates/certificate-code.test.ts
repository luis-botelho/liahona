import { describe, expect, it } from "vitest";

import { generateCertificateCode } from './certificate-code.js';

describe("generateCertificateCode", () => {
  it("prefixes the code with LIA-", () => {
    expect(generateCertificateCode()).toMatch(/^LIA-[A-Z2-9]{8}$/);
  });

  it("respects a custom length", () => {
    expect(generateCertificateCode(6)).toMatch(/^LIA-[A-Z2-9]{6}$/);
  });

  it("generates distinct codes", () => {
    const codes = new Set(Array.from({ length: 50 }, () => generateCertificateCode()));

    expect(codes.size).toBe(50);
  });
});