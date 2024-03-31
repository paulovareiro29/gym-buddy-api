import { PrismaClient, User } from '@prisma/client';
import { CreateUser, UpdateUser } from './types';
import { FindQuery } from '../../types/global';

const prisma = new PrismaClient();

export default class UserService {
  static async getAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  static async find(query: FindQuery<User>): Promise<User> {
    return prisma.user.findFirst({ where: query });
  }

  static async create(data: CreateUser): Promise<User> {
    return prisma.user.create({ data });
  }

  static async patch(id: string, data: UpdateUser): Promise<User> {
    return prisma.user.update({
      where: { id },
      data
    });
  }
}
