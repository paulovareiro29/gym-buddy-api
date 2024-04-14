import { PrismaClient, Role } from '@prisma/client';
import { FindQuery } from '../../types/global';
import { NormalizedRole } from './types';
import schema from './schema';

const prisma = new PrismaClient();

export default class RoleService {
  static async getAll(): Promise<NormalizedRole[]> {
    return prisma.role.findMany({ select: schema });
  }

  static async find(query: FindQuery<Role>): Promise<NormalizedRole> {
    return prisma.role.findFirst({
      where: query,
      select: schema
    });
  }
}
