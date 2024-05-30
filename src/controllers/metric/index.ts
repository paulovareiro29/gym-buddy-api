import { Request, Response } from 'express';
import MetricService from '../../services/metric';
import { CreateMetricRequest, FindMetricRequest, PatchMetricRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import UserService from '../../services/user';
import MetricTypesService from '../../services/metricTypes';

export default class MetricController {
  static async getAll(_: Request, response: Response) {
    const metrics = await MetricService.getAll();
    return response.success({ data: { metrics } });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindMetricRequest;

    const metric = await MetricService.find({ id });

    if (!metric) {
      return response.notfound({ errors: { name: 'Metric not found' } });
    }

    return response.success({ data: { metric } });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreateMetricRequest;

    try {
      const user = await UserService.find({ id: body.user_id });
      const creator = await UserService.find({ id: body.creator_id });
      const metricType = await MetricTypesService.find({ id: body.type_id });

      if (!user) {
        return response.badrequest({ errors: { user_id: 'Invalid user ID provided' } });
      }
      if (!creator) {
        return response.badrequest({ errors: { creator_id: 'Invalid creator ID provided' } });
      }
      if (!metricType) {
        return response.badrequest({ errors: { creator_id: 'Invalid metric type ID provided' } });
      }
    } catch (err) {
      return response.error(handlePrismaError(err));
    }

    if (!body.user_id) {
      return response.badrequest({ errors: { user_id: 'User is required' } });
    }
    if (!body.type_id) {
      return response.badrequest({ errors: { type_id: 'Type is required' } });
    }
    if (!body.value) {
      return response.badrequest({ errors: { value: 'Value is required' } });
    }
    if (!body.date) {
      return response.badrequest({ errors: { date: 'Date is required' } });
    }

    try {
      const metric = await MetricService.create({
        user_id: body.user_id!,
        creator_id: body.creator_id!,
        type_id: body.type_id!,
        value: body.value!,
        date: body.date!
      });

      return response.success({ data: { metric } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindMetricRequest;
    const body = request.body as any as PatchMetricRequest;

    try {
      if (body.user_id) {
        const user = await UserService.find({ id: body.user_id });

        if (!user) {
          return response.badrequest({ errors: { user_id: 'Invalid User ID provided' } });
        }
      }
      if (body.creator_id) {
        const creator = await UserService.find({ id: body.creator_id });

        if (!creator) {
          return response.badrequest({ errors: { creator_id: 'Invalid Creator ID provided' } });
        }
      }
      if (body.type_id) {
        const metricType = await MetricTypesService.find({ id: body.type_id });

        if (!metricType) {
          return response.badrequest({ errors: { type_id: 'Invalid Type ID provided' } });
        }
      }

      const metric = await MetricService.patch(id, {
        user_id: body.user_id,
        creator_id: body.creator_id,
        type_id: body.type_id,
        value: body.value,
        date: body.date
      });

      return response.success({ data: { metric } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params as any as FindMetricRequest;

    try {
      const metric = await MetricService.delete(id);

      if (!metric) {
        return response.notfound({ errors: { name: 'Metric not found' } });
      }

      return response.success({ data: { metric } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
