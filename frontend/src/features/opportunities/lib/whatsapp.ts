export function buildWhatsAppUrl(phone: string, title: string): string {
  const digits = phone.replace(/\D/g, "");

  const message = encodeURIComponent(
    `Olá, vi a oportunidade ${title} no LIA e gostaria de saber mais.`,
  );

  return `https://wa.me/${digits}?text=${message}`;
}