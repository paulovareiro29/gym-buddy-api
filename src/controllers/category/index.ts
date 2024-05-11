import { Request, Response } from 'express';
import CategoryService from '../../services/categories';
import { CreateCategoryRequest, FindCategoryRequest, PatchCategoryRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';

export default class CategoryController {
  static async getAll(_: Request, response: Response) {
    const categories = await CategoryService.getAll();
    return response.success({ data: { categories } });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindCategoryRequest;

    const category = await CategoryService.find({ id });

    if (!category) {
      return response.notfound();
    }

    return response.success({ data: { category } });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreateCategoryRequest;

    if (!body.name) {
      return response.badrequest({ errors: { name: 'Name is required' } });
    }

    try {
      const category = await CategoryService.create({ name: body.name! });

      return response.success({ data: { category } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindCategoryRequest;
    const body = request.body as any as PatchCategoryRequest;

    try {
      const category = await CategoryService.patch(id, { name: body.name });

      return response.success({ data: { category } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
