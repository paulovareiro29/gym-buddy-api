import { PrismaClient, User } from '@prisma/client';
import { CreateUser, NormalizedUser, UpdateUser } from './types';
import { FindQuery } from '../../types/global';
import { generateRegisterCode } from '../../lib/random/generate-register-code';
import schema from './schema';

const prisma = new PrismaClient();

export default class UserService {
  static async getAll(): Promise<NormalizedUser[]> {
    return prisma.user.findMany({
      where: { deleted_on: null },
      select: schema
    });
  }

  static async find(query: FindQuery<User>): Promise<NormalizedUser> {
    return prisma.user.findFirst({
      where: {
        ...query,
        deleted_on: null
      },
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

  static async delete(id: string): Promise<NormalizedUser> {
    return prisma.user.update({
      where: { id },
      data: { deleted_on: new Date() },
      select: schema
    });
  }
}
