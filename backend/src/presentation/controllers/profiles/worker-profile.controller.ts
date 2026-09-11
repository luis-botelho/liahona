import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireUser } from '../../helpers/require-role.js';
import {
  computeWorkerProfileCompletion,
  normalizeFriendlyList,
} from '../../../shared/profiles/worker-profile.js';

interface WorkerProfileBody {
  whatsapp?: string;
  city?: string;
  neighborhood?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  professionalTitle?: string;
  availability?: string;
  desiredRoles?: string[];
  workPreferences?: string[];
  discoverableByRecruiters?: boolean;
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

  const completion = computeWorkerProfileCompletion(profile ?? {});

  return reply.send({ success: true, data: { profile, completion } });
}

export async function upsertWorkerProfileController(
  request: FastifyRequest<{ Body: WorkerProfileBody }>,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'WORKER');
  if (!user) return;

  const {
    whatsapp,
    city,
    neighborhood,
    bio,
    skills,
    interests,
    professionalTitle,
    availability,
    desiredRoles,
    workPreferences,
    discoverableByRecruiters,
    whatsappOptIn,
  } = request.body;

  const data = {
    whatsapp: whatsapp?.trim() || null,
    city: city?.trim() || null,
    neighborhood: neighborhood?.trim() || null,
    bio: bio?.trim() || null,
    skills: normalizeFriendlyList(skills ?? []),
    interests: normalizeFriendlyList(interests ?? []),
    professionalTitle: professionalTitle?.trim() || null,
    availability: availability?.trim() || null,
    desiredRoles: normalizeFriendlyList(desiredRoles ?? []),
    workPreferences: normalizeFriendlyList(workPreferences ?? []),
    discoverableByRecruiters: Boolean(discoverableByRecruiters),
    whatsappOptIn: Boolean(whatsappOptIn),
  };

  const profile = await prisma.workerProfile.upsert({
    where: { userId: user.id },
    create: { userId: user.id, ...data },
    update: data,
  });

  const completion = computeWorkerProfileCompletion(profile);

  return reply.send({ success: true, data: { profile, completion } });
}