import { Request, Response } from 'express';
import UserPlanService from '../../../services/user/plan';
import {
  CreateUserPlanRequest,
  FindUserPlanRequest,
  PatchUserPlanRequest,
  UserPlanRequest
} from './types';
import { handlePrismaError } from '../../../lib/handle-prisma-error';
import TrainingPlanService from '../../../services/trainingPlan';

export default class UserPlanController {
  static async getAll(request: Request, response: Response) {
    const userId = request.params?.user_id;

    if (!userId) {
      return response.badrequest({ errors: { user_id: 'User ID is required' } });
    }

    try {
      const userPlans = await UserPlanService.getAll(userId);
      return response.success({ data: { userPlans } });
    } catch (error) {
      return response.error(handlePrismaError(error));
    }
  }

  static async find(request: Request, response: Response) {
    const { user_id, plan_id } = request.params as any as FindUserPlanRequest;

    const userPlan = await UserPlanService.find({
      user_id,
      plan_id
    });

    if (!userPlan) {
      return response.notfound({ errors: { name: 'User Plan not found' } });
    }

    return response.success({ data: { userPlan } });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as CreateUserPlanRequest;
    const { user_id } = request.params as any as UserPlanRequest;
    try {
      const plan = await TrainingPlanService.find({ id: body.plan_id });

      if (!plan) {
        return response.badrequest({ errors: { creator_id: 'Invalid Plan ID provided' } });
      }
      if (!body.plan_id) {
        return response.badrequest({ errors: { user_id: 'Plan_id is required' } });
      }
      if (!body.start_date) {
        return response.badrequest({ errors: { user_id: 'Start Date is required' } });
      }

      const userPlan = await UserPlanService.create({
        user_id,
        plan_id: body.plan_id,
        start_date: body.start_date,
        end_date: body.end_date
      });

      return response.success({ data: { userPlan } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { user_id, plan_id } = request.params as any as FindUserPlanRequest;
    const body = request.body as PatchUserPlanRequest;

    try {
      const userPlan = await UserPlanService.patch(user_id, plan_id, {
        start_date: body.start_date,
        end_date: body.end_date
      });

      return response.success({ data: { userPlan } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async delete(request: Request, response: Response) {
    const { user_id, plan_id } = request.params as any as FindUserPlanRequest;

    try {
      const userPlan = await UserPlanService.delete(user_id, plan_id);

      if (!userPlan) {
        return response.notfound({ errors: { name: 'User Plan not found' } });
      }

      return response.success({ data: { userPlan } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
