import { PrismaClient, Machine } from '@prisma/client';
import { CreateMachine, UpdateMachine } from './types';
import { FindQuery } from '../../types/global';

const prisma = new PrismaClient();

export default class CategoriesService {
  static async getAll(): Promise<Machine[]> {
    return prisma.machine.findMany();
  }

  static async find(query: FindQuery<Machine>): Promise<Machine> {
    return prisma.machine.findFirst({ where: query });
  }

  static async create(data: CreateMachine): Promise<Machine> {
    return prisma.machine.create({
      data: {
        name: data.name,
        photo: data.photo
      }
    });
  }

  static async patch(id: string, data: UpdateMachine): Promise<Machine> {
    return prisma.machine.update({
      where: { id },
      data
    });
  }
}
