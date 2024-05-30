import { PrismaClient, TrainingPlan } from '@prisma/client';
import { NormalizedTrainingPlan, CreateTrainingPlan, UpdateTrainingPlan } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class TrainingPlanService {
  static async getAll(filters: Record<string, any>): Promise<NormalizedTrainingPlan[]> {
    return prisma.trainingPlan.findMany({
      where: {
        ...filters,
        deleted_on: null
      },
      select: schema
    });
  }

  static async find(query: FindQuery<TrainingPlan>): Promise<NormalizedTrainingPlan> {
    return prisma.trainingPlan.findFirst({
      where: {
        ...query,
        deleted_on: null
      },
      select: schema
    });
  }

  static async create(data: CreateTrainingPlan): Promise<NormalizedTrainingPlan> {
    return prisma.trainingPlan.create({
      data,
      select: schema
    });
  }

  static async patch(id: string, data: UpdateTrainingPlan): Promise<NormalizedTrainingPlan> {
    return prisma.trainingPlan.update({
      where: { id },
      data,
      select: schema
    });
  }

  static async delete(id: string): Promise<NormalizedTrainingPlan> {
    return prisma.trainingPlan.update({
      where: { id },
      data: { deleted_on: new Date() },
      select: schema
    });
  }

  static async count(filters: any): Promise<number> {
    const result = await prisma.trainingPlan.aggregate({
      _count: { _all: true },
      where: filters
    });
    // eslint-disable-next-line no-underscore-dangle
    return result._count?._all ?? 0;
  }
}
