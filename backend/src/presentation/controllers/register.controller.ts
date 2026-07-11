import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case.js';
import { AppError } from '../../shared/errors/app-error.js';
import { RegisterUserDTO } from '../../application/dto/register-user.dto.js';

export class RegisterController {
  // 1. O construtor agora recebe e armazena a instância do caso de uso
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as RegisterUserDTO;

      // 2. Agora você usa "this.registerUserUseCase" para acessar a propriedade da classe
      const user = await this.registerUserUseCase.execute(body);

      return reply.status(201).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          message: error.message,
        });
      }

      request.log.error(error);

      return reply.status(500).send({
        message: 'Internal Server Error',
      });
    }
  }
}
