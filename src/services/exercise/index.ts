import { PrismaClient, Exercise } from '@prisma/client';
import { CreateExercise, UpdateExercise, NormalizedExercise } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';
const prisma = new PrismaClient();

export default class ExerciseService {
  static async getAll(): Promise<NormalizedExercise[]> {
    return prisma.exercise.findMany({ select: schema });
  }

  static async find(query: FindQuery<Exercise>): Promise<NormalizedExercise> {
    return prisma.exercise.findFirst({
      where: query,
      select: schema
    });
  }

  static async create(data: CreateExercise): Promise<NormalizedExercise> {
    return prisma.exercise.create({
      data: {
        name: data.name,
        machine_id: data.machine_id,
        categories: { connect: data.categories.map((categoryId) => ({ id: categoryId })) },
        photo: data.photo
      },
      select: schema
    });
  }

  static async patch(id: string, data: UpdateExercise): Promise<NormalizedExercise> {
    return prisma.exercise.update({
      where: { id },
      data: {
        name: data.name,
        machine: { connect: { id: data.machine_id } },
        categories: { set: data.categories?.map((categoryId) => ({ id: categoryId })) },
        photo: data.photo
      },
      select: schema
    });
  }
}
