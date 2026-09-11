import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { scoreCourse } from '../../../shared/learning/recommendations.js';
import { requireUser } from '../../helpers/require-role.js';

export async function recommendedCoursesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const worker = await requireUser(request, reply, 'WORKER');
  if (!worker) return;

  const workerProfile = await prisma.workerProfile.findUnique({
    where: { userId: worker.id },
    select: { interests: true, skills: true },
  });

  const profile = {
    interests: workerProfile?.interests ?? [],
    skills: workerProfile?.skills ?? [],
  };

  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      skills: true,
      provider: true,
      externalUrl: true,
      source: true,
      createdAt: true,
      _count: { select: { lessons: true } },
    },
  });

  const enrollmentByCourse = new Map(
    (
      await prisma.courseEnrollment.findMany({
        where: { workerId: worker.id },
        select: {
          courseId: true,
          status: true,
          completedLessonIds: true,
          completedAt: true,
        },
      })
    ).map((enrollment) => [enrollment.courseId, enrollment]),
  );

  const data = courses
    .map(({ _count, ...course }) => {
      const { score, reasons } = scoreCourse(profile, course);

      return {
        ...course,
        lessonCount: _count.lessons,
        score,
        reasons,
        enrollment: enrollmentByCourse.get(course.id) ?? null,
      };
    })
    .sort((left, right) => right.score - left.score);

  return reply.send({ success: true, data });
}