import { PrismaClient, TrainingPlan } from '@prisma/client';
import { NormalizedTrainingPlan, CreateTrainingPlan, UpdateTrainingPlan } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class TrainingPlanService {
  static async getAll(filters: Record<string, any>): Promise<NormalizedTrainingPlan[]> {
    const entities = await prisma.trainingPlan.findMany({
      where: {
        ...filters,
        deleted_on: null
      },
      select: schema
    });

    return entities.map((p) => normalize(p));
  }

  static async find(query: FindQuery<TrainingPlan>): Promise<NormalizedTrainingPlan> {
    const entity = await prisma.trainingPlan.findFirst({
      where: {
        ...query,
        deleted_on: null
      },
      select: schema
    });

    return normalize(entity);
  }

  static async create(data: CreateTrainingPlan): Promise<NormalizedTrainingPlan> {
    const entity = await prisma.trainingPlan.create({
      data,
      select: schema
    });

    return normalize(entity);
  }

  static async patch(id: string, data: UpdateTrainingPlan): Promise<NormalizedTrainingPlan> {
    const entity = await prisma.trainingPlan.update({
      where: { id },
      data,
      select: schema
    });

    return normalize(entity);
  }

  static async delete(id: string): Promise<NormalizedTrainingPlan> {
    const entity = await prisma.trainingPlan.update({
      where: { id },
      data: { deleted_on: new Date() },
      select: schema
    });

    return normalize(entity);
  }

  static async count(filters: any): Promise<number> {
    const result = await prisma.trainingPlan.aggregate({
      _count: { _all: true },
      where: {
        ...filters,
        deleted_on: null
      }
    });
    // eslint-disable-next-line no-underscore-dangle
    return result._count?._all ?? 0;
  }
}

const normalize = (plan: any): NormalizedTrainingPlan => ({
  id: plan.id,
  name: plan.name,
  creator: plan.creator,
  clients: plan.userPlan.map((u: any) => u.user)
});
