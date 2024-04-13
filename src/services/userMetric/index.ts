import { PrismaClient, UserMetric } from '@prisma/client';
import { NormalizedUserMetric, CreateUserMetric, UpdateUserMetric } from './types';
import { FindQuery } from '../../types/global';
import { userMetricSchema } from './schema';

const prisma = new PrismaClient();

export default class UserMetricService {
  static async getAll(): Promise<NormalizedUserMetric[]> {
    return prisma.userMetric.findMany({ select: userMetricSchema() });
  }

  static async find(query: FindQuery<UserMetric>): Promise<NormalizedUserMetric> {
    return prisma.userMetric.findFirst({
      where: query,
      select: userMetricSchema()
    });
  }

  static async create(data: CreateUserMetric): Promise<UserMetric> {
    return prisma.userMetric.create({ data: { ...data } });
  }

  static async patch(id: string, data: UpdateUserMetric): Promise<UserMetric> {
    return prisma.userMetric.update({
      where: { id },
      data
    });
  }
}
