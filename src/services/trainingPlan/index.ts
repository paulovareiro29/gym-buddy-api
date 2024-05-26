import { PrismaClient, TrainingPlan } from '@prisma/client';
import { NormalizedTrainingPlan, CreateTrainingPlan, UpdateTrainingPlan } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class TrainingPlanService {
  static async getAll(): Promise<NormalizedTrainingPlan[]> {
    return prisma.trainingPlan.findMany({ select: schema });
  }

  static async find(query: FindQuery<TrainingPlan>): Promise<NormalizedTrainingPlan> {
    return prisma.trainingPlan.findFirst({
      where: query,
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

  
  static async getTrainingPlanMetrics(creatorId: string, filters: any): Promise<{
    number_of_associated_plans: number;
  }> {
    const result = await prisma.trainingPlan.aggregate({
      _count: {
        _all: true,
      },
      where: {
        creator_id: creatorId,
        ...filters,
      },
    });

    const number_of_associated_plans = result._count?._all ?? 0;

    return { number_of_associated_plans };
  }
}

