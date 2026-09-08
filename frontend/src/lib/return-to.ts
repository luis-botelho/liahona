// Aceita apenas caminhos internos da aplicação, evitando open redirect.
export function getSafeReturnTo(
  value: string | null | undefined,
): string | null {
  if (!value) return null;

  if (!value.startsWith("/")) return null;

  if (value.startsWith("//")) return null;

  // Bloqueia valores do tipo "https://..." ou caminhos com espaço.
  if (/\s/.test(value)) return null;

  try {
    const origin = window.location.origin;
    const url = new URL(value, origin);

    if (url.origin !== origin) return null;

    const pathname = url.pathname;

    // Evita redirecionamento para as próprias telas de autenticação.
    if (pathname === "/login" || pathname === "/register") return null;

    return value;
  } catch {
    return null;
  }
}

export function buildReturnToHref(
  base: string,
  returnTo: string | null | undefined,
): string {
  const safe = getSafeReturnTo(returnTo);

  return safe ? `${base}?returnTo=${encodeURIComponent(safe)}` : base;
}