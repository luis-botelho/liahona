import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireUser } from '../../helpers/require-role.js';

export async function listMyLearningController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const worker = await requireUser(request, reply, 'WORKER');
  if (!worker) return;

  const [enrollments, certificates] = await Promise.all([
    prisma.courseEnrollment.findMany({
      where: { workerId: worker.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            category: true,
            skills: true,
            provider: true,
            source: true,
            lessons: { select: { id: true, title: true } },
          },
        },
      },
    }),
    prisma.certificate.findMany({
      where: { workerId: worker.id },
      orderBy: { issuedAt: 'desc' },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            provider: true,
            category: true,
          },
        },
      },
    }),
  ]);

  return reply.send({ success: true, data: { enrollments, certificates } });
}