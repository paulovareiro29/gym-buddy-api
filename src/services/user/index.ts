import { PrismaClient, User } from '@prisma/client';
import { CreateUser, NormalizedUser, UpdateUser } from './types';
import { FindQuery } from '../../types/global';
import { generateRegisterCode } from '../../lib/random/generate-register-code';
import schema from './schema';

const prisma = new PrismaClient();

export default class UserService {
  static async getAll(): Promise<NormalizedUser[]> {
    return prisma.user.findMany({ select: schema });
  }

  static async find(query: FindQuery<User>): Promise<NormalizedUser> {
    return prisma.user.findFirst({
      where: query,
      select: schema
    });
  }

  static async create(data: CreateUser): Promise<NormalizedUser> {
    return prisma.user.create({
      data: {
        ...data,
        register_code: generateRegisterCode()
      },
      select: schema
    });
  }

  static async patch(id: string, data: UpdateUser): Promise<NormalizedUser> {
    return prisma.user.update({
      where: { id },
      data,
      select: schema
    });
  }

}
