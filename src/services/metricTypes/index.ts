import { PrismaClient, MetricType } from '@prisma/client';
import { CreateMetricTypes, UpdateMetricTypes } from './types';
import { FindQuery } from '../../types/global';

const prisma = new PrismaClient();

export default class MetricTypesService {
  static async getAll(): Promise<MetricType[]> {
    return prisma.metricType.findMany({ where: { deleted_on: null } });
  }

  static async find(query: FindQuery<MetricType>): Promise<MetricType> {
    return prisma.metricType.findFirst({
      where: {
        ...query,
        deleted_on: null
      }
    });
  }

  static async create(data: CreateMetricTypes): Promise<MetricType> {
    return prisma.metricType.create({ data: { name: data.name } });
  }

  static async patch(id: string, data: UpdateMetricTypes): Promise<MetricType> {
    return prisma.metricType.update({
      where: { id },
      data
    });
  }

  static async delete(id: string): Promise<MetricType> {
    return prisma.metricType.update({
      where: { id },
      data: { deleted_on: new Date() }
    });
  }
}
