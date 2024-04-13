import { Request, Response } from 'express';
import UserMetricService from '../../services/userMetric';
import { CreateUserMetricRequest, FindUserMetricRequest, PatchUserMetricRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import UserService from '../../services/user';
import MetricTypesService from '../../services/metricTypes';

export default class UserMetricController {
  static async getAll(_: Request, response: Response) {
    const userMetric = await UserMetricService.getAll();
    return response.success({ data: userMetric });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindUserMetricRequest;

    const userMetric = await UserMetricService.find({ id });

    if (!userMetric) {
      return response.notfound();
    }

    return response.success({ data: userMetric });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreateUserMetricRequest;

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
      const userMetric = await UserMetricService.create({
        user_id: body.user_id!,
        creator_id: body.creator_id!,
        type_id: body.type_id!,
        value: body.value!,
        date: body.date!
      });

      return response.success({ data: userMetric });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindUserMetricRequest;
    const body = request.body as any as PatchUserMetricRequest;

    // TODO: Verify if the logged user is an administrator or a personal trainer
    try {
      const userMetric = await UserMetricService.patch(id, {
        user_id: body.user_id!,
        creator_id: body.creator_id!,
        type_id: body.type_id!,
        value: body.value!,
        date: body.date!
      });

      return response.success({ data: userMetric });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
