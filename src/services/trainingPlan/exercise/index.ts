import { PrismaClient, PlanExercise } from '@prisma/client';
import { NormalizedPlanExercise, CreatePlanExercise, UpdatePlanExercise } from './types';
import { FindQuery } from '../../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class PlanExerciseService {
  static async getAll(): Promise<NormalizedPlanExercise[]> {
    return prisma.planExercise.findMany({
      where: { deleted_on: null },
      select: schema
    });
  }

  static async find(query: FindQuery<PlanExercise>): Promise<NormalizedPlanExercise> {
    return prisma.planExercise.findFirst({
      where: {
        ...query,
        deleted_on: null
      },
      select: schema
    });
  }

  static async create(data: CreatePlanExercise): Promise<NormalizedPlanExercise> {
    return prisma.planExercise.create({
      data: {
        plan: { connect: { id: data.plan_id } },
        exercise: { connect: { id: data.exercise_id } },
        repetitions: data.repetitions,
        sets: data.sets,
        rest_between_sets: data.rest_between_sets,
        day: data.day
      },
      select: schema
    });
  }

  static async patch(id: string, data: UpdatePlanExercise): Promise<NormalizedPlanExercise> {
    return prisma.planExercise.update({
      where: { id },
      data,
      select: schema
    });
  }

  static async delete(id: string): Promise<NormalizedPlanExercise> {
    return prisma.planExercise.update({
      where: { id },
      data: { deleted_on: new Date() },
      select: schema
    });
  }
}
