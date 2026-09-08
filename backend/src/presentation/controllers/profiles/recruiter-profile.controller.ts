import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireUser } from '../../helpers/require-role.js';

interface RecruiterProfileBody {
  organizationName?: string;
  whatsapp?: string;
  city?: string;
  neighborhood?: string;
  description?: string;
}

export async function getRecruiterProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'RECRUITER');
  if (!user) return;

  const profile = await prisma.recruiterProfile.findUnique({
    where: { userId: user.id },
  });

  return reply.send({ success: true, data: profile });
}

export async function upsertRecruiterProfileController(
  request: FastifyRequest<{ Body: RecruiterProfileBody }>,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'RECRUITER');
  if (!user) return;

  const { organizationName, whatsapp, city, neighborhood, description } =
    request.body;

  const data = {
    organizationName: organizationName?.trim() || '',
    whatsapp: whatsapp?.trim() || null,
    city: city?.trim() || null,
    neighborhood: neighborhood?.trim() || null,
    description: description?.trim() || null,
  };

  const profile = await prisma.recruiterProfile.upsert({
    where: { userId: user.id },
    create: { userId: user.id, ...data },
    update: data,
  });

  return reply.send({ success: true, data: profile });
}