import { Request, Response } from 'express';
import MachineService from '../../services/machine';
import { CreateMachineRequest, FindMachineRequest, PatchMachineRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';

export default class MachineController {
  static async getAll(_: Request, response: Response) {
    const categories = await MachineService.getAll();
    return response.success({ data: categories });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindMachineRequest;

    const machine = await MachineService.find({ id });

    if (!machine) {
      return response.notfound();
    }

    return response.success({ data: machine });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreateMachineRequest;

    if (!body.name) {
      return response.badrequest({ errors: { name: 'Name is required' } });
    }

    try {
      const machine = await MachineService.create({
        name: body.name!,
        photo: body.photo
      });

      return response.success({ data: machine });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindMachineRequest;
    const body = request.body as any as PatchMachineRequest;

    try {
      const machine = await MachineService.patch(id, {
        name: body.name,
        photo: body.photo
      });

      return response.success({ data: machine });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
