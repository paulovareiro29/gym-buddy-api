import { PrismaClient, Exercise } from '@prisma/client';
import { CreateExercise, UpdateExercise, NormalizedExercise } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';
const prisma = new PrismaClient();

export default class ExerciseService {
  static async getAll(): Promise<NormalizedExercise[]> {
    return prisma.exercise.findMany({
      where: { deleted_on: null },
      select: schema
    });
  }

  static async find(query: FindQuery<Exercise>): Promise<NormalizedExercise> {
    return prisma.exercise.findFirst({
      where: {
        ...query,
        deleted_on: null
      },
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
    const updateData: any = {
      name: data.name,
      photo: data.photo,
      categories: { set: data.categories?.map((categoryId) => ({ id: categoryId })) }
    };

    if (data.machine_id) {
      updateData.machine = { connect: { id: data.machine_id } };
    }

    return prisma.exercise.update({
      where: { id },
      data: updateData,
      select: schema
    });
  }

  static async delete(id: string): Promise<NormalizedExercise> {
    return prisma.exercise.update({
      where: { id },
      data: { deleted_on: new Date() },
      select: schema
    });
  }
}
