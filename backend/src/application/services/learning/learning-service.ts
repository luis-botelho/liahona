import type { PrismaClient } from '../../../generated/prisma/client.js';

import { generateCertificateCode } from '../certificates/certificate-code.js';

const IN_PROGRESS = 'IN_PROGRESS';
const COMPLETED = 'COMPLETED';

export async function enrollWorkerInCourse(
  prisma: PrismaClient,
  courseId: string,
  workerId: string,
) {
  const existing = await prisma.courseEnrollment.findUnique({
    where: { courseId_workerId: { courseId, workerId } },
  });

  if (existing) return existing;

  return prisma.courseEnrollment.create({
    data: { courseId, workerId, completedLessonIds: [] },
  });
}

export async function completeLesson(
  prisma: PrismaClient,
  courseId: string,
  lessonId: string,
  workerId: string,
): Promise<{ enrollment: unknown; certificate?: unknown; lessonCompleted: boolean }> {
  const existing = await prisma.courseEnrollment.findUnique({
    where: { courseId_workerId: { courseId, workerId } },
  });

  if (!existing) {
    const error = new Error('Você precisa se matricular antes de concluir uma aula.');
    Object.assign(error, { statusCode: 404 });

    throw error;
  }

  if (existing.status === COMPLETED) {
    return { enrollment: existing, lessonCompleted: false };
  }

  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });

  if (!lesson || lesson.courseId !== courseId) {
    const error = new Error('Aula não encontrada para este curso.');
    Object.assign(error, { statusCode: 404 });

    throw error;
  }

  if (existing.completedLessonIds.includes(lesson.id)) {
    return { enrollment: existing, lessonCompleted: false };
  }

  const totalLessons = await prisma.lesson.count({ where: { courseId } });
  const completedLessonIds = [...existing.completedLessonIds, lesson.id];
  const courseFinished = completedLessonIds.length >= totalLessons;

  return prisma.$transaction(async (tx) => {
    const enrollment = await tx.courseEnrollment.update({
      where: { id: existing.id },
      data: {
        completedLessonIds,
        status: courseFinished ? COMPLETED : IN_PROGRESS,
        completedAt: courseFinished ? new Date() : null,
      },
    });

    let certificate;

    if (courseFinished) {
      certificate = await tx.certificate.upsert({
        where: { courseId_workerId: { courseId, workerId } },
        update: {},
        create: {
          courseId,
          workerId,
          code: generateCertificateCode(),
        },
      });
    }

    return { enrollment, certificate, lessonCompleted: true };
  });
}