import { Request, Response } from 'express';
import TrainingPlanService from '../../services/trainingPlan';
import UserService from '../../services/user';
import {
  CreateTrainingPlanRequest,
  FindTrainingPlanRequest,
  PatchTrainingPlanRequest
} from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import { decodeAccessToken } from '../../lib/jwt/decode-access-token';

export default class TrainingPlanController {
  static async getAll(_: Request, response: Response) {
    const trainingPlans = await TrainingPlanService.getAll();
    return response.success({ data: trainingPlans });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindTrainingPlanRequest;

    const trainingPlan = await TrainingPlanService.find({ id });

    if (!trainingPlan) {
      return response.notfound();
    }

    return response.success({ data: trainingPlan });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as CreateTrainingPlanRequest;

    try {
      const loggedUser = await TrainingPlanController.authorizedUser(request);

      if (!loggedUser) {
        return response.forbidden({ message: 'User is not authorized to create training plans' });
      }

      if (!body.name) {
        return response.badrequest({ errors: { name: 'Name is required' } });
      }

      const trainingPlan = await TrainingPlanService.create({
        name: body.name,
        creator_id: loggedUser.id
      });

      return response.success({ data: trainingPlan });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindTrainingPlanRequest;
    const body = request.body as PatchTrainingPlanRequest;

    try {
      const loggedUser = await TrainingPlanController.authorizedUser(request);

      if (!loggedUser) {
        return response.forbidden({ message: 'User is not authorized to create training plans' });
      }

      if (!body.name) {
        return response.badrequest({ errors: { name: 'Name is required' } });
      }

      const trainingPlan = await TrainingPlanService.patch(id, { name: body.name });

      return response.success({ data: trainingPlan });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async authorizedUser(request: Request) {
    const token = request.headers.authorization?.split(' ')[1];
    const decodedToken = await decodeAccessToken(token);

    if (!decodedToken || !('id' in decodedToken)) {
      return null;
    }

    const loggedUser = await UserService.find({ id: decodedToken.id });

    if (!loggedUser || loggedUser.role.name !== 'trainer') {
      return null;
    }

    return loggedUser;
  }
}
