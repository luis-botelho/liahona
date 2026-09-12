import type { FastifyInstance } from 'fastify';

import { deleteMyAccountController } from '../controllers/account/delete-my-account.controller.js';
import { exportMyDataController } from '../controllers/account/export-my-data.controller.js';

export async function accountRoutes(app: FastifyInstance) {
  app.get('/account/data', exportMyDataController);
  app.post('/account/delete', deleteMyAccountController);
}