import { Request, Response } from 'express';
import MetricTypesService from '../../services/metricTypes';
import { CreateMetricTypesRequest, FindMetricTypesRequest, PatchMetricTypesRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';

export default class MetricTypesController {
  static async getAll(_: Request, response: Response) {
    const metricsTypes = await MetricTypesService.getAll();
    return response.success({ data: metricsTypes });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindMetricTypesRequest;

    const metricsType = await MetricTypesService.find({ id });

    if (!metricsType) {
      return response.notfound();
    }

    return response.success({ data: metricsType });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreateMetricTypesRequest;

    // TODO: Validate if the logged user is a admin
    if (!body.name) {
      return response.badrequest({ errors: { name: 'Name is required' } });
    }

    try {
      const metricsType = await MetricTypesService.create({ name: body.name! });

      return response.success({ data: metricsType });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindMetricTypesRequest;
    const body = request.body as any as PatchMetricTypesRequest;

    // TODO: Validate if the logged user is a admin

    try {
      const metricsType = await MetricTypesService.patch(id, { name: body.name });

      return response.success({ data: metricsType });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
