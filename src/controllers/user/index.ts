import { Request, Response } from 'express';
import UserService from '../../services/user';
import { FindUserRequest, PatchUserRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import ContractService from '../../services/contract';
import TrainingPlanService from '../../services/trainingPlan';
import UserPlanService from '../../services/user/plan';

export default class UserController {
  static async getAll(_: Request, response: Response) {
    const users = await UserService.getAll();
    return response.success({ data: { users } });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindUserRequest;

    const user = await UserService.find({ id });

    if (!user) {
      return response.notfound({ errors: { name: 'User not found' } });
    }

    return response.success({ data: { user } });
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindUserRequest;
    const body = request.body as any as PatchUserRequest;

    try {
      const user = await UserService.patch(id, {
        email: body.email,
        name: body.name
      });

      return response.success({ data: { user } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async getMetrics(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      return response.badrequest({ errors: { id: 'Trainer or Client ID are required' } });
    }

    try {
      const today = new Date();

      const contractMetrics = await ContractService.count({
        provider_id: id as string,
        end_date: { gte: today }
      });

      const trainingPlanMetrics = await TrainingPlanService.count({ creator_id: id as string });

      const userPlanMetrics = await UserPlanService.count({ user_id: id as string });

      return response.success({
        data: {
          number_of_contracts: contractMetrics,
          number_of_created_plans: trainingPlanMetrics,
          number_of_associated_plans: userPlanMetrics
        }
      });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params as any as FindUserRequest;

    try {
      const user = await UserService.delete(id);

      if (!user) {
        return response.notfound({ errors: { name: 'User not found' } });
      }

      return response.success({ data: { user } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
