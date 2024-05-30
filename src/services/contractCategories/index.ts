import { PrismaClient, ContractCategory } from '@prisma/client';
import { CreateContractCategory, UpdateContractCategory } from './types';
import { FindQuery } from '../../types/global';

const prisma = new PrismaClient();

export default class ContractCategoryService {
  static async getAll(): Promise<ContractCategory[]> {
    return prisma.contractCategory.findMany({ where: { deleted_on: null } });
  }

  static async find(query: FindQuery<ContractCategory>): Promise<ContractCategory | null> {
    return prisma.contractCategory.findFirst({
      where: {
        ...query,
        deleted_on: null
      }
    });
  }

  static async create(data: CreateContractCategory): Promise<ContractCategory> {
    return prisma.contractCategory.create({ data });
  }

  static async patch(id: string, data: UpdateContractCategory): Promise<ContractCategory> {
    return prisma.contractCategory.update({
      where: { id },
      data
    });
  }

  static async delete(id: string): Promise<ContractCategory> {
    return prisma.contractCategory.update({
      where: { id },
      data: { deleted_on: new Date() }
    });
  }
}
