import { PrismaClient, Contract } from '@prisma/client';
import { NormalizedContract, CreateContract, UpdateContract } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class ContractService {
  static async getAll(filters: Record<string, any>): Promise<NormalizedContract[]> {
    return prisma.contract.findMany({
      where: filters,
      select: schema
    });
  }

  static async find(query: FindQuery<Contract>): Promise<NormalizedContract | null> {
    return prisma.contract.findFirst({
      where: query,
      select: schema
    });
  }

  static async create(data: CreateContract): Promise<NormalizedContract> {
    return prisma.contract.create({
      data,
      select: schema
    });
  }

  static async patch(id: string, data: UpdateContract): Promise<NormalizedContract> {
    return prisma.contract.update({
      where: { id },
      data,
      select: schema
    });
  }
}
