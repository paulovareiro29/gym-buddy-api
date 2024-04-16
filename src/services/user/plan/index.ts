import { PrismaClient, UserPlan } from '@prisma/client';
import { NormalizedUserPlan, CreateUserPlan, UpdateUserPlan } from './types';
import { FindQuery } from '../../../types/global';
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

  static async patch(
    user_id: string,
    plan_id: string,
    data: UpdateUserPlan
  ): Promise<NormalizedUserPlan> {
    return prisma.userPlan.update({
      where: {
        user_id_plan_id: {
          user_id,
          plan_id
        }
      },
      data,
      select: schema
    });
  }
}
