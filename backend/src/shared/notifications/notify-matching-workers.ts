import { prisma } from '../../infrastructure/database/prisma.js';
import { scoreOpportunity } from '../matching/match.js';
import { sendWhatsAppOpportunityNotification } from '../whatsapp/whatsapp-notification.service.js';

interface NotifiableOpportunity {
  id: string;
  title: string;
  location?: string | null;
  category?: string | null;
  tags: string[];
}

const MATCH_THRESHOLD = 60;

export async function notifyMatchingWorkers(
  opportunity: NotifiableOpportunity,
): Promise<void> {
  const workers = await prisma.user.findMany({
    where: {
      role: 'WORKER',
      workerProfile: {
        whatsappOptIn: true,
        whatsapp: { not: null },
      },
    },
    select: {
      workerProfile: {
        select: {
          whatsapp: true,
          skills: true,
          interests: true,
          city: true,
        },
      },
    },
  });

  const promises = workers
    .map((worker) => {
      const profile = worker.workerProfile;

      if (!profile?.whatsapp) return null;

      const { matchScore } = scoreOpportunity(opportunity, profile);

      if (matchScore < MATCH_THRESHOLD) return null;

      return sendWhatsAppOpportunityNotification(profile.whatsapp, {
        title: opportunity.title,
        location: opportunity.location,
      });
    })
    .filter((promise): promise is Promise<void> => promise !== null);

  await Promise.allSettled(promises);
}