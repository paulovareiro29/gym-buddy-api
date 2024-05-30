import { PrismaClient, Category } from '@prisma/client';
import { CreateCategory, UpdateCategory } from './types';
import { FindQuery } from '../../types/global';

const prisma = new PrismaClient();

export default class CategoriesService {
  static async getAll(): Promise<Category[]> {
    return prisma.category.findMany({ where: { deleted_on: null } });
  }

  static async find(query: FindQuery<Category>): Promise<Category> {
    return prisma.category.findFirst({
      where: {
        ...query,
        deleted_on: null
      }
    });
  }

  static async create(data: CreateCategory): Promise<Category> {
    return prisma.category.create({ data: { name: data.name } });
  }

  static async patch(id: string, data: UpdateCategory): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data
    });
  }

  static async delete(id: string): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data: { deleted_on: new Date() }
    });
  }
}
