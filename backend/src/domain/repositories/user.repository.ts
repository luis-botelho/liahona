import { RegisterUserDTO } from '../../application/dto/register-user.dto.js';

export interface UserRepository {
  create(data: RegisterUserDTO): Promise<{
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }>;

  findByEmail(email: string): Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  } | null>;
}
