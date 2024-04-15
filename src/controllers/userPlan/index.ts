import { Request, Response } from 'express';
import UserPlanService from '../../services/userPlan';
import { CreateUserPlanRequest, FindUserPlanRequest, PatchUserPlanRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import UserService from '../../services/user';
import TrainingPlanService from '../../services/trainingPlan';

export default class UserPlanController {
  static async getAll(_: Request, response: Response) {
    const userPlans = await UserPlanService.getAll();
    return response.success({ data: userPlans });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindUserPlanRequest;

    const userPlan = await UserPlanService.find({ id });

    if (!userPlan) {
      return response.notfound();
    }

    return response.success({ data: userPlan });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as CreateUserPlanRequest;

    try {
      const user = await UserService.find({ id: body.user_id });
      const plan = await TrainingPlanService.find({ id: body.plan_id });

      if (!user) {
        return response.badrequest({ errors: { user_id: 'Invalid user ID provided' } });
      }
      if (!plan) {
        return response.badrequest({ errors: { creator_id: 'Invalid Plan ID provided' } });
      }

      if (!body.user_id) {
        return response.badrequest({ errors: { user_id: 'User_id is required' } });
      }
      if (!body.plan_id) {
        return response.badrequest({ errors: { user_id: 'Plan_id is required' } });
      }
      if (!body.start_date) {
        return response.badrequest({ errors: { user_id: 'Start Date is required' } });
      }

      const userPlan = await UserPlanService.create({
        user_id: body.user_id,
        plan_id: body.plan_id,
        start_date: body.start_date,
        end_date: body.end_date
      });

      return response.success({ data: userPlan });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindUserPlanRequest;
    const body = request.body as PatchUserPlanRequest;

    try {
      const user = await UserService.find({ id: body.user_id });
      const plan = await TrainingPlanService.find({ id: body.plan_id });

      if (!user) {
        return response.badrequest({ errors: { user_id: 'Invalid user ID provided' } });
      }
      if (!plan) {
        return response.badrequest({ errors: { creator_id: 'Invalid Plan ID provided' } });
      }

      if (!body.user_id) {
        return response.badrequest({ errors: { user_id: 'User_id is required' } });
      }
      if (!body.plan_id) {
        return response.badrequest({ errors: { user_id: 'Plan_id is required' } });
      }
      if (!body.start_date) {
        return response.badrequest({ errors: { user_id: 'Start Date is required' } });
      }

      const userPlan = await UserPlanService.patch(id, {
        user_id: body.user_id,
        plan_id: body.plan_id,
        start_date: body.start_date,
        end_date: body.end_date
      });

      return response.success({ data: userPlan });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
