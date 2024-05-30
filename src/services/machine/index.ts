import { PrismaClient, Machine } from '@prisma/client';
import { CreateMachine, UpdateMachine, NormalizedMachine } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';
const prisma = new PrismaClient();

export default class MachineService {
  static async getAll(): Promise<NormalizedMachine[]> {
    return prisma.machine.findMany({ 
      where: { deleted_on: null },
      select: schema 
    });
  }

  static async find(query: FindQuery<Machine>): Promise<NormalizedMachine> {
    return prisma.machine.findFirst({
      where: {
        ...query,
        deleted_on: null
      },
      select: schema
    });
  }

  static async create(data: CreateMachine): Promise<NormalizedMachine> {
    return prisma.machine.create({
      data: {
        name: data.name,
        categories: { connect: data.categories.map((categoryId) => ({ id: categoryId })) },
        photo: data.photo
      },
      select: schema
    });
  }

  static async patch(id: string, data: UpdateMachine): Promise<NormalizedMachine> {
    return prisma.machine.update({
      where: { id },
      data: {
        name: data.name,
        categories: { set: data.categories?.map((categoryId) => ({ id: categoryId })) },
        photo: data.photo
      },
      select: schema
    });
  }

  static async delete(id: string): Promise<NormalizedMachine> {
    return prisma.machine.update({
      where: { id },
      data: {
        deleted_on: new Date(),
      },
      select: schema
    });
  }
}
