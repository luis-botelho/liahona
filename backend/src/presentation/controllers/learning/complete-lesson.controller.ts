import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { completeLesson } from '../../../application/services/learning/learning-service.js';
import { requireUser } from '../../helpers/require-role.js';

interface CompleteLessonParams {
  id: string;
  lessonId: string;
}

function isKnownError(error: unknown): error is Error & { statusCode?: number } {
  return error instanceof Error;
}

export async function completeLessonController(
  request: FastifyRequest<{ Params: CompleteLessonParams }>,
  reply: FastifyReply,
) {
  const worker = await requireUser(request, reply, 'WORKER');
  if (!worker) return;

  const { id, lessonId } = request.params;

  const course = await prisma.course.findUnique({ where: { id }, select: { id: true } });

  if (!course) {
    return reply.status(404).send({
      success: false,
      message: 'Curso não encontrado.',
    });
  }

  try {
    const result = await completeLesson(prisma, id, lessonId, worker.id);

    return reply.send({ success: true, data: result });
  } catch (error) {
    if (isKnownError(error)) {
      return reply.status(error.statusCode ?? 400).send({
        success: false,
        message: error.message,
      });
    }

    throw error;
  }
}