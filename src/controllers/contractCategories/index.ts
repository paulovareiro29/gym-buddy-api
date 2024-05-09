import { Request, Response } from 'express';
import ContractCategoryService from '../../services/contractCategories';
import {
  CreateContractCategoriesRequest,
  FindContractCategoriesRequest,
  PatchContractCategoriesRequest
} from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';

export default class ContractCategoryController {
  static async getAll(_: Request, response: Response) {
    const contractCategories = await ContractCategoryService.getAll();
    return response.success({ data: { contractCategories } });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindContractCategoriesRequest;

    const contractCategory = await ContractCategoryService.find({ id });

    if (!contractCategory) {
      return response.notfound();
    }

    return response.success({ data: { contractCategory } });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreateContractCategoriesRequest;

    if (!body.name) {
      return response.badrequest({ errors: { name: 'Name is required' } });
    }

    try {
      const contractCategory = await ContractCategoryService.create({ name: body.name! });

      return response.success({ data: { contractCategory } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindContractCategoriesRequest;
    const body = request.body as any as PatchContractCategoriesRequest;

    try {
      const contractCategory = await ContractCategoryService.patch(id, { name: body.name });

      return response.success({ data: { contractCategory } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
