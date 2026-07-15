import type { FastifyReply, FastifyRequest } from 'fastify';

import { LoginUseCase } from '../../../application/use-cases/auth/login.use-case.js';

interface LoginBody {
  email: string;
  password: string;
}

export async function loginController(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;

  const useCase = new LoginUseCase();

  try {
    const user = await useCase.execute({
      email,
      password,
    });

    return reply.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      return reply.status(401).send({
        success: false,
        message: 'Invalid credentials',
      });
    }

    request.log.error(error);

    return reply.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
}
