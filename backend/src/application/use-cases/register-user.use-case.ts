import { RegisterUserDTO } from '../dto/register-user.dto.js';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma-user.repository.js';
import argon2 from 'argon2';
import { AppError } from '../../shared/errors/app-error.js';

export class RegisterUserUseCase {
  private readonly repository = new PrismaUserRepository();

  async execute(data: RegisterUserDTO) {
    if (!data.name.trim()) {
      throw new AppError('Nome é obrigatório.', 400);
    }

    if (!data.email.trim()) {
      throw new AppError('E-mail é obrigatório.', 400);
    }

    if (!data.password.trim()) {
      throw new AppError('Senha é obrigatória.', 400);
    }
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError('E-mail já cadastrado.', 409);
    }
    const hashedPassword = await argon2.hash(data.password);

    return this.repository.create({ ...data, password: hashedPassword });
  }
}
