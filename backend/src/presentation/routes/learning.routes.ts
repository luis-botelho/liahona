import type { FastifyInstance } from 'fastify';

import { completeLessonController } from '../controllers/learning/complete-lesson.controller.js';
import { enrollCourseController } from '../controllers/learning/enroll-course.controller.js';
import { getCertificateController } from '../controllers/learning/get-certificate.controller.js';
import { getCourseController } from '../controllers/learning/get-course.controller.js';
import { listCoursesController } from '../controllers/learning/list-courses.controller.js';
import { listMyLearningController } from '../controllers/learning/list-my-learning.controller.js';
import { recommendedCoursesController } from '../controllers/learning/recommended-courses.controller.js';

const courseParamsSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string' } },
  },
} as const;

const lessonParamsSchema = {
  params: {
    type: 'object',
    required: ['id', 'lessonId'],
    properties: { id: { type: 'string' }, lessonId: { type: 'string' } },
  },
} as const;

const certificateParamsSchema = {
  params: {
    type: 'object',
    required: ['code'],
    properties: { code: { type: 'string' } },
  },
} as const;

export async function learningRoutes(app: FastifyInstance) {
  app.get('/courses', listCoursesController);
  app.get('/courses/:id', { schema: courseParamsSchema }, getCourseController);
  app.get('/learning/recommended', recommendedCoursesController);
  app.get('/learning/mine', listMyLearningController);
  app.post(
    '/courses/:id/enroll',
    { schema: courseParamsSchema },
    enrollCourseController,
  );
  app.post(
    '/courses/:id/lessons/:lessonId/complete',
    { schema: lessonParamsSchema },
    completeLessonController,
  );
  app.get(
    '/certificates/:code',
    { schema: certificateParamsSchema },
    getCertificateController,
  );
}