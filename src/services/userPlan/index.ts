import { PrismaClient, UserPlan } from '@prisma/client';
import { NormalizedUserPlan, CreateUserPlan, UpdateUserPlan } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class UserPlanService {
  static async getAll(): Promise<NormalizedUserPlan[]> {
    return prisma.userPlan.findMany({ select: schema });
  }

  static async find(query: FindQuery<UserPlan>): Promise<NormalizedUserPlan> {
    return prisma.userPlan.findFirst({
      where: query,
      select: schema
    });
  }

  static async create(data: CreateUserPlan): Promise<NormalizedUserPlan> {
    return prisma.userPlan.create({
      data,
      select: schema
    });
  }

  static async patch(id: string, data: UpdateUserPlan): Promise<NormalizedUserPlan> {
    return prisma.userPlan.update({
      where: { id },
      data,
      select: schema
    });
  }
}
