import { PrismaClient, Contract } from '@prisma/client';
import { NormalizedContract, CreateContract, UpdateContract } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class ContractService {
  static async getAll(): Promise<NormalizedContract[]> {
    return prisma.contract.findMany({ select: schema });
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

  static async getContractMetrics(providerId: string, filters: any): Promise<{
    number_of_contracts: number;
  }> {
    const today = new Date();

    const result = await prisma.contract.aggregate({
      _count: {
        _all: true,
      },
      where: {
        provider_id: providerId,
        ...filters,
        end_date: { gte: today },
      },
    });

    const number_of_contracts = result._count?._all ?? 0;

    return { number_of_contracts };
  }

}
