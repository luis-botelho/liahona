import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireUser } from '../../helpers/require-role.js';

export async function listOpportunityApplicationsController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'RECRUITER');
  if (!user) return;

  const opportunity = await prisma.opportunity.findFirst({
    where: { id: request.params.id, authorId: user.id },
    select: { id: true },
  });

  if (!opportunity) {
    return reply.status(404).send({
      success: false,
      message: 'Oportunidade não encontrada.',
    });
  }

  const applications = await prisma.application.findMany({
    where: { opportunityId: opportunity.id },
    orderBy: { createdAt: 'desc' },
    include: {
      worker: {
        select: {
          id: true,
          name: true,
          email: true,
          workerProfile: {
            select: {
              whatsapp: true,
              city: true,
              neighborhood: true,
              skills: true,
              bio: true,
            },
          },
        },
      },
    },
  });

  return reply.send({ success: true, data: applications });
}