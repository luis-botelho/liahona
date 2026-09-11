import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireUser } from '../../helpers/require-role.js';

export async function listMyApplicationsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'WORKER');
  if (!user) return;

  const applications = await prisma.application.findMany({
    where: { workerId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      opportunity: {
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          location: true,
          category: true,
          createdAt: true,
          author: { select: { name: true } },
        },
      },
    },
  });

  return reply.send({ success: true, data: applications });
}