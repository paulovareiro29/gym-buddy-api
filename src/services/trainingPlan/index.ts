import { PrismaClient, TrainingPlan } from '@prisma/client';
import { NormalizedTrainingPlan, CreateTrainingPlan, UpdateTrainingPlan } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class TrainingPlanService {
  static async getAll(filters: Record<string, any>): Promise<NormalizedTrainingPlan[]> {
    return prisma.trainingPlan.findMany({
      where: filters,
      select: schema
    });
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
}
