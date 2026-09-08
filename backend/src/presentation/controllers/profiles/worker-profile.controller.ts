import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { normalizeTags } from '../../../shared/matching/match.js';
import { requireUser } from '../../helpers/require-role.js';

interface WorkerProfileBody {
  whatsapp?: string;
  city?: string;
  neighborhood?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  whatsappOptIn?: boolean;
}

export async function getWorkerProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'WORKER');
  if (!user) return;

  const profile = await prisma.workerProfile.findUnique({
    where: { userId: user.id },
  });

  return reply.send({ success: true, data: profile });
}

export async function upsertWorkerProfileController(
  request: FastifyRequest<{ Body: WorkerProfileBody }>,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'WORKER');
  if (!user) return;

  const { whatsapp, city, neighborhood, bio, skills, interests, whatsappOptIn } =
    request.body;

  const data = {
    whatsapp: whatsapp?.trim() || null,
    city: city?.trim() || null,
    neighborhood: neighborhood?.trim() || null,
    bio: bio?.trim() || null,
    skills: normalizeTags(skills ?? []),
    interests: normalizeTags(interests ?? []),
    whatsappOptIn: Boolean(whatsappOptIn),
  };

  const profile = await prisma.workerProfile.upsert({
    where: { userId: user.id },
    create: { userId: user.id, ...data },
    update: data,
  });

  return reply.send({ success: true, data: profile });
}