import { PrismaClient, UserPlan } from '@prisma/client';
import { NormalizedUserPlan, CreateUserPlan, UpdateUserPlan } from './types';
import { FindQuery } from '../../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class UserPlanService {
  static async getAll(userId: string): Promise<NormalizedUserPlan[]> {
    return prisma.userPlan.findMany({
      where: {
        user_id: userId,
        deleted_on: null
      },
      select: schema
    });
  }

  static async find(query: FindQuery<UserPlan>): Promise<NormalizedUserPlan> {
    return prisma.userPlan.findFirst({
      where: {
        ...query,
        deleted_on: null
      },
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

  static async count(filters: any): Promise<number> {
    const result = await prisma.userPlan.aggregate({
      _count: { _all: true },
      where: {
        ...filters,
        deleted_on: null
      }
    });
    // eslint-disable-next-line no-underscore-dangle
    return result._count?._all ?? 0;
  }

  static async delete(user_id: string, plan_id: string): Promise<NormalizedUserPlan> {
    return prisma.userPlan.delete({
      where: {
        user_id_plan_id: {
          user_id,
          plan_id
        }
      },
      select: schema
    });
  }
}
