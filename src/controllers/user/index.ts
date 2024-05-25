import { Request, Response } from 'express';
import UserService from '../../services/user';
import { FindUserRequest, PatchUserRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';

export default class UserController {
  static async getAll(_: Request, response: Response) {
    const users = await UserService.getAll();
    return response.success({ data: { users } });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindUserRequest;

    const user = await UserService.find({ id });

    if (!user) {
      return response.notfound();
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
      return response.status(400).json({ error: 'Trainer or Client ID are required' });
    }

    try {
      const metrics = await UserService.getMetrics(id as string);
      return response.success({ data: metrics });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
