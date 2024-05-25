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

  static async getMetrics(userId: string): Promise<{
    number_of_clients: number;
    number_of_trainer_plans: number;
    number_of_client_plans: number;
  }> {
    const today = new Date();

    const [number_of_clients, number_of_trainer_plans, number_of_client_plans] = await Promise.all([
      prisma.contract.count({
        where: {
          provider_id: userId,
          end_date: { gte: today }
        }
      }),
      prisma.trainingPlan.count({ where: { creator_id: userId } }),
      prisma.userPlan.count({ where: { user_id: userId } })
    ]);

    return {
      number_of_clients,
      number_of_trainer_plans,
      number_of_client_plans
    };
  }
}
