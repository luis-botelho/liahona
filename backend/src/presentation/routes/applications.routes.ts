import type { FastifyInstance } from 'fastify';

import { listMyApplicationsController } from '../controllers/applications/list-my-applications.controller.js';
import { updateApplicationStatusController } from '../controllers/applications/update-application-status.controller.js';
import { withdrawApplicationController } from '../controllers/applications/withdraw-application.controller.js';

const updateApplicationStatusSchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['status'],
    properties: {
      status: {
        type: 'string',
        enum: ['REVIEWING', 'INTERVIEW', 'APPROVED', 'REJECTED'],
      },
    },
  },
} as const;

export async function applicationsRoutes(app: FastifyInstance) {
  app.get('/applications/mine', listMyApplicationsController);
  app.patch(
    '/applications/:id/status',
    { schema: updateApplicationStatusSchema },
    updateApplicationStatusController,
  );
  app.post('/applications/:id/withdraw', withdrawApplicationController);
}