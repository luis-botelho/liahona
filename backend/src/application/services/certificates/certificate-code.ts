import crypto from "node:crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateCertificateCode(length = 8): string {
  const bytes = crypto.randomBytes(length);
  let code = "";

  for (let index = 0; index < length; index += 1) {
    code += ALPHABET[bytes[index] % ALPHABET.length];
  }

  return `LIA-${code}`;
}