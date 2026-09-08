interface OpportunityNotificationData {
  title: string;
  location?: string | null;
}

const whatsappEnabled = () => process.env.WHATSAPP_ENABLED === 'true';

function buildMessage(data: OpportunityNotificationData): string {
  const location = data.location ? `📍 ${data.location}` : '';
  return (
    `🔔 Nova oportunidade no LIA\n\n` +
    `${data.title}\n` +
    (location ? `${location}\n` : '') +
    `\nEncontramos esta oportunidade porque ela combina com seu perfil.\n\n` +
    `Acesse o LIA para ver os detalhes.`
  );
}

export async function sendWhatsAppOpportunityNotification(
  to: string,
  data: OpportunityNotificationData,
): Promise<void> {
  const message = buildMessage(data);

  if (!whatsappEnabled()) {
    console.log(
      `[whatsapp] Notificação simulada para ${to}: ${message.replace(/\n/g, ' | ')}`,
    );
    return;
  }

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? 'v21.0';

  if (!accessToken || !phoneNumberId) {
    console.log(
      '[whatsapp] WHATSAPP_ENABLED=true mas faltam credenciais no .env. Notificação não enviada.',
    );
    return;
  }

  const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: message },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`WhatsApp API error (${response.status}): ${body}`);
  }
}