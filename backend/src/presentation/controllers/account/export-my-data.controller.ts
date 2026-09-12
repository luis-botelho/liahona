import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireAnyUser } from '../../helpers/require-role.js';

export async function exportMyDataController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await requireAnyUser(request, reply);
  if (!user) return;

  const [workerProfile, recruiterProfile] = await Promise.all([
    prisma.workerProfile.findUnique({ where: { userId: user.id } }),
    prisma.recruiterProfile.findUnique({ where: { userId: user.id } }),
  ]);

  let opportunities: unknown[] = [];
  let applications: unknown[] = [];
  let enrollments: unknown[] = [];
  let certificates: unknown[] = [];

  if (user.role === 'WORKER') {
    [applications, enrollments, certificates] = await Promise.all([
      prisma.application.findMany({
        where: { workerId: user.id },
        include: {
          opportunity: {
            select: {
              id: true,
              title: true,
              type: true,
              status: true,
              category: true,
              location: true,
              createdAt: true,
            },
          },
        },
      }),
      prisma.courseEnrollment.findMany({
        where: { workerId: user.id },
        include: {
          course: {
            select: { id: true, title: true, provider: true, source: true },
          },
        },
      }),
      prisma.certificate.findMany({
        where: { workerId: user.id },
        include: {
          course: { select: { id: true, title: true, provider: true } },
        },
      }),
    ]);
  } else {
    [opportunities, applications] = await Promise.all([
      prisma.opportunity.findMany({ where: { authorId: user.id } }),
      prisma.application.findMany({
        where: { opportunity: { authorId: user.id } },
        include: {
          opportunity: { select: { id: true, title: true } },
          worker: { select: { id: true, name: true, email: true } },
        },
      }),
    ]);
  }

  return reply.send({
    success: true,
    data: {
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      workerProfile,
      recruiterProfile,
      opportunities,
      applications,
      enrollments,
      certificates,
    },
  });
}