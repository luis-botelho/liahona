import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { scoreOpportunity } from '../../../shared/matching/match.js';
import { requireUser } from '../../helpers/require-role.js';

export async function getRecommendedOpportunitiesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'WORKER');
  if (!user) return;

  const [profile, opportunities] = await Promise.all([
    prisma.workerProfile.findUnique({ where: { userId: user.id } }),
    prisma.opportunity.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    }),
  ]);

  const data = opportunities
    .map((opportunity) => {
      const { matchScore, matchReasons } = scoreOpportunity(
        opportunity,
        profile ?? { skills: [], interests: [] },
      );

      return { opportunity, matchScore, matchReasons };
    })
    .sort(
      (a, b) =>
        b.matchScore - a.matchScore ||
        new Date(b.opportunity.createdAt).getTime() -
          new Date(a.opportunity.createdAt).getTime(),
    );

  return reply.send({ success: true, data });
}