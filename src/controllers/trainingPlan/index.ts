import { Request, Response } from 'express';
import TrainingPlanService from '../../services/trainingPlan';
import {
  CreateTrainingPlanRequest,
  FindTrainingPlanRequest,
  FindTrainingPlanByCreatorRequest,
  PatchTrainingPlanRequest
} from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';

export default class TrainingPlanController {
  static async getAll(request: Request, response: Response) {
    const { creator } = request.query;
    const trainingPlans = await TrainingPlanService.getAll(creator as string); 

    return response.success({ data: { trainingPlans } });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindTrainingPlanRequest;

    const trainingPlan = await TrainingPlanService.find({ id });

    if (!trainingPlan) {
      return response.notfound();
    }

    return response.success({ data: { trainingPlan } });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as CreateTrainingPlanRequest;
    const loggedUser = response.locals.user;

    try {
      if (!body.name) {
        return response.badrequest({ errors: { name: 'Name is required' } });
      }

      const trainingPlan = await TrainingPlanService.create({
        name: body.name,
        creator_id: loggedUser.id
      });

      return response.success({ data: { trainingPlan } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindTrainingPlanRequest;
    const body = request.body as PatchTrainingPlanRequest;

    try {
      const trainingPlan = await TrainingPlanService.patch(id, { name: body.name });

      return response.success({ data: { trainingPlan } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
