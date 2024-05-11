import { Request, Response } from 'express';
import MetricTypesService from '../../services/metricTypes';
import { CreateMetricTypesRequest, FindMetricTypesRequest, PatchMetricTypesRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';

export default class MetricTypesController {
  static async getAll(_: Request, response: Response) {
    const metricTypes = await MetricTypesService.getAll();
    return response.success({ data: { metricTypes } });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindMetricTypesRequest;

    const metricType = await MetricTypesService.find({ id });

    if (!metricType) {
      return response.notfound();
    }

    return response.success({ data: { metricType } });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreateMetricTypesRequest;

    if (!body.name) {
      return response.badrequest({ errors: { name: 'Name is required' } });
    }

    try {
      const metricType = await MetricTypesService.create({ name: body.name! });

      return response.success({ data: { metricType } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindMetricTypesRequest;
    const body = request.body as any as PatchMetricTypesRequest;

    try {
      const metricType = await MetricTypesService.patch(id, { name: body.name });

      return response.success({ data: { metricType } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
