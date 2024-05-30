import { PrismaClient, Metric } from '@prisma/client';
import { NormalizedMetric, CreateMetric, UpdateMetric } from './types';
import { FindQuery } from '../../types/global';
import schema from './schema';

const prisma = new PrismaClient();

export default class MetricService {
  static async getAll(): Promise<NormalizedMetric[]> {
    return prisma.metric.findMany({ 
      where: { deleted_on: null },
      select: schema 
    });
  }

  static async find(query: FindQuery<Metric>): Promise<NormalizedMetric> {
    return prisma.metric.findFirst({
      where: {
        ...query,
        deleted_on: null
      },
      select: schema
    });
  }

  static async create(data: CreateMetric): Promise<NormalizedMetric> {
    return prisma.metric.create({
      data,
      select: schema
    });
  }

  static async patch(id: string, data: UpdateMetric): Promise<Metric> {
    return prisma.metric.update({
      where: { id },
      data
    });
  }

  static async delete(id: string): Promise<Metric> {
    return prisma.metric.update({
      where: { id },
      data: {
        deleted_on: new Date()
      }
    });
  }
}
