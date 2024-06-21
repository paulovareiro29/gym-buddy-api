import { Request, Response } from 'express';
import MachineService from '../../services/machine';
import { CreateMachineRequest, FindMachineRequest, PatchMachineRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import CategoriesService from '../../services/categories';

export default class MachineController {
  static async getAll(_: Request, response: Response) {
    try {
      const machines = await MachineService.getAll();
      return response.success({ data: { machines } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindMachineRequest;

    const machine = await MachineService.find({ id });

    if (!machine) {
      return response.notfound({ errors: { name: 'Machine not found' } });
    }

    return response.success({ data: { machine } });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as CreateMachineRequest;

    if (!body.name) {
      return response.badrequest({ errors: { name: 'Name is required' } });
    }

    if (!body.categories?.length) {
      return response.badrequest({ errors: { name: 'Categories are required' } });
    }

    try {
      const categories = await Promise.all(
        body.categories.map(async (categoryId) => CategoriesService.find({ id: categoryId }))
      );
      const invalidCategories = categories.filter((category) => !category);

      if (invalidCategories.length > 0) {
        return response.badrequest({ errors: { category: 'Invalid Category ID provided' } });
      }

      const machine = await MachineService.create({
        name: body.name,
        categories: body.categories,
        photo: body.photo
      });

      return response.success({ data: { machine } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindMachineRequest;
    const body = request.body as any as PatchMachineRequest;

    try {
      if (body.categories?.length) {
        const categories = await Promise.all(
          body.categories.map(async (categoryId) => CategoriesService.find({ id: categoryId }))
        );
        const invalidCategories = categories.filter((category) => !category);

        if (invalidCategories.length > 0) {
          return response.badrequest({ errors: { category: 'Invalid Category ID provided' } });
        }
      }

      const machine = await MachineService.patch(id, {
        name: body.name,
        categories: body.categories,
        photo: body.photo
      });

      return response.success({ data: { machine } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params as any as FindMachineRequest;

    try {
      const machine = await MachineService.delete(id);

      if (!machine) {
        return response.notfound({ errors: { name: 'Machine not found' } });
      }

      return response.success({ data: { machine } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
