import { Request, Response } from 'express';
import RoleService from '../../services/role';
import { FindRoleRequest } from './types';

export default class RoleController {
  static async getAll(_: Request, response: Response) {
    const roles = await RoleService.getAll();
    return response.success({ data: roles });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindRoleRequest;

    const user = await RoleService.find({ id });

    if (!user) {
      return response.notfound();
    }

    return response.success({ data: user });
  }
}
