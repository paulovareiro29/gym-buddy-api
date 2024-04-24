import { Request, Response } from 'express';
import ExerciseService from '../../services/exercise';
import { CreateExerciseRequest, FindExerciseRequest, PatchExerciseRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import CategoriesService from '../../services/categories';
import MachineService from '../../services/machine';

export default class ExerciseController {
  static async getAll(_: Request, response: Response) {
    try {
      const exercises = await ExerciseService.getAll();
      return response.success({ data: exercises });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindExerciseRequest;

    const exercise = await ExerciseService.find({ id });

    if (!exercise) {
      return response.notfound();
    }

    return response.success({ data: exercise });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreateExerciseRequest;

    if (!body.name) {
      return response.badrequest({ errors: { name: 'Name is required' } });
    }

    if (!body.categories?.length) {
      return response.badrequest({ errors: { name: 'Categories are required' } });
    }

    if (!body.machine_id) {
      return response.badrequest({ errors: { name: 'Machine is required' } });
    }

    try {
      const machine = await MachineService.find({ id: body.machine_id });
      const categories = await Promise.all(
        body.categories.map(async (categoryId) => CategoriesService.find({ id: categoryId }))
      );
      const invalidCategories = categories.filter((category) => !category);

      if (!machine) {
        return response.badrequest({ errors: { creator_id: 'Invalid Machine ID provided' } });
      }

      if (invalidCategories.length > 0) {
        return response.badrequest({ errors: { category: 'Invalid Category ID provided' } });
      }

      const exercise = await ExerciseService.create({
        name: body.name,
        machine_id: body.machine_id,
        categories: body.categories,
        photo: body.photo
      });

      return response.success({ data: exercise });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindExerciseRequest;
    const body = request.body as any as PatchExerciseRequest;

    if (!body.name) {
      return response.badrequest({ errors: { name: 'Name is required' } });
    }

    if (!body.categories || body.categories.length === 0) {
      return response.badrequest({ errors: { name: 'Categories are required' } });
    }

    if (!body.machine_id) {
      return response.badrequest({ errors: { name: 'Machine is required' } });
    }

    try {
      const machine = await MachineService.find({ id: body.machine_id });
      const categories = await Promise.all(
        body.categories.map(async (categoryId) => CategoriesService.find({ id: categoryId }))
      );
      const invalidCategories = categories.filter((category) => !category);

      if (!machine) {
        return response.badrequest({ errors: { creator_id: 'Invalid Machine ID provided' } });
      }

      if (invalidCategories.length > 0) {
        return response.badrequest({ errors: { category: 'Invalid Category ID provided' } });
      }

      const exercise = await ExerciseService.patch(id, {
        name: body.name,
        machine_id: body.machine_id,
        categories: body.categories,
        photo: body.photo
      });

      return response.success({ data: exercise });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
