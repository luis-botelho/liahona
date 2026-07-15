import { verify } from 'argon2';

import { prisma } from '../../../infrastructure/database/prisma.js';

interface LoginRequest {
  email: string;
  password: string;
}

export class LoginUseCase {
  async execute({ email, password }: LoginRequest) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const passwordMatches = await verify(user.password, password);

    if (!passwordMatches) {
      throw new Error('Invalid credentials');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
