import { PrismaClient, ContractCategory } from '@prisma/client';
import { CreateContractCategory, UpdateContractCategory } from './types';

const prisma = new PrismaClient();

export default class ContractCategoryService {
  static async getAll(): Promise<ContractCategory[]> {
    return prisma.contractCategory.findMany();
  }

  static async find(id: string): Promise<ContractCategory | null> {
    return prisma.contractCategory.findUnique({ where: { id } });
  }

  static async create(data: CreateContractCategory): Promise<ContractCategory> {
    return prisma.contractCategory.create({ data: { name: data.name } });
  }

  static async patch(id: string, data: UpdateContractCategory): Promise<ContractCategory> {
    return prisma.contractCategory.update({
      where: { id },
      data
    });
  }
}
