import { UserRepository } from '../../domain/repositories/user.repository.js';
import { RegisterUserDTO } from '../../application/dto/register-user.dto.js';
import { prisma } from '../database/prisma.js';

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: RegisterUserDTO) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
