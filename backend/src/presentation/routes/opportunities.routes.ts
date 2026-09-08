import type { FastifyInstance } from 'fastify';

import { createOpportunityController } from '../controllers/opportunities/create-opportunity.controller.js';
import { listOpportunitiesController } from '../controllers/opportunities/list-opportunities.controller.js';
import { listMyOpportunitiesController } from '../controllers/opportunities/list-my-opportunities.controller.js';
import { getOpportunityController } from '../controllers/opportunities/get-opportunity.controller.js';
import { getRecommendedOpportunitiesController } from '../controllers/opportunities/get-recommended-opportunities.controller.js';
import { applyToOpportunityController } from '../controllers/opportunities/apply-to-opportunity.controller.js';
import { listOpportunityApplicationsController } from '../controllers/opportunities/list-opportunity-applications.controller.js';

const createOpportunitySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'description', 'type'],
    properties: {
      title: { type: 'string', minLength: 3, maxLength: 120 },
      description: { type: 'string', minLength: 10, maxLength: 2000 },
      type: { type: 'string', enum: ['JOB', 'SERVICE'] },
      location: { type: 'string', maxLength: 120 },
      category: { type: 'string', maxLength: 80 },
      tags: {
        type: 'array',
        maxItems: 20,
        items: { type: 'string', maxLength: 40 },
      },
    },
  },
} as const;

export async function opportunitiesRoutes(app: FastifyInstance) {
  app.get('/opportunities', listOpportunitiesController);
  app.get('/opportunities/recommended', getRecommendedOpportunitiesController);
  app.get('/opportunities/mine', listMyOpportunitiesController);
  app.get('/opportunities/:id', getOpportunityController);
  app.get('/opportunities/:id/applications', listOpportunityApplicationsController);
  app.post(
    '/opportunities',
    { schema: createOpportunitySchema },
    createOpportunityController,
  );
  app.post('/opportunities/:id/apply', applyToOpportunityController);
}