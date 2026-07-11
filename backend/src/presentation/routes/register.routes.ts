import { FastifyInstance } from 'fastify';
import { RegisterController } from '../controllers/register.controller.js';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case.js';

const registerUserUseCase = new RegisterUserUseCase();

const controller = new RegisterController(registerUserUseCase);

export async function registerRoutes(app: FastifyInstance) {
  app.post('/register', controller.handle.bind(controller));
}
