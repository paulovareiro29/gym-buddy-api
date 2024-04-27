import { Request, Response } from 'express';
import ContractService from '../../services/contract';
import { CreateContractRequest, FindContractRequest, PatchContractRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import UserService from '../../services/user';
import ContractCategoryService from '../../services/contractCategories';

export default class ContractController {
  static async getAll(_: Request, response: Response) {
    const contracts = await ContractService.getAll();
    return response.success({ data: contracts });
  }

  static async find(request: Request, response: Response) {
    const { id } = request.params as any as FindContractRequest;

    const contract = await ContractService.find({ id });

    if (!contract) {
      return response.notfound();
    }

    return response.success({ data: contract });
  }

  static async create(request: Request, response: Response) {
    const body = request.body as any as CreateContractRequest;

    if (!body.beneficiary_id) {
      return response.badrequest({ errors: { beneficiary_id: 'Beneficiary is required ' } });
    }
    if (!body.provider_id) {
      return response.badrequest({ errors: { provider_id: 'Provider is required' } });
    }
    if (!body.category_id) {
      return response.badrequest({ errors: { category_id: 'Category is required' } });
    }
    if (!body.start_date) {
      return response.badrequest({ errors: { start_date: 'Start date is required' } });
    }

    try {
      const beneficiary = await UserService.find({ id: body.beneficiary_id });
      if (!beneficiary) {
        // eslint-disable-next-line prettier/prettier
        return response.badrequest({ errors: { beneficiary_id: 'Invalid beneficiary ID provided' } });
      }

      const provider = await UserService.find({ id: body.provider_id });
      if (!provider) {
        return response.badrequest({ errors: { provider_id: 'Invalid provider ID provided' } });
      }

      const category = await ContractCategoryService.find({ id: body.category_id });
      if (!category) {
        return response.badrequest({ errors: { category_id: 'Invalid category ID provided' } });
      }
    } catch (err) {
      return response.error(handlePrismaError(err));
    }

    try {
      const contract = await ContractService.create({
        beneficiary_id: body.beneficiary_id!,
        provider_id: body.provider_id!,
        category_id: body.category_id!,
        start_date: body.start_date!,
        end_date: body.end_date
      });

      return response.success({ data: contract });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async patch(request: Request, response: Response) {
    const { id } = request.params as any as FindContractRequest;
    const body = request.body as any as PatchContractRequest;

    // TODO: Verify if the logged user has the authority to update the contract
    try {
      if (body.provider_id) {
        const provider = await UserService.find({ id: body.provider_id });

        if (!provider) {
          return response.badrequest({ errors: { provider_id: 'Invalid Provider ID provided' } });
        }
      }

      if (body.category_id) {
        const category = await ContractCategoryService.find({ id: body.category_id });

        if (!category) {
          return response.badrequest({ errors: { category_id: 'Invalid Category ID provided' } });
        }
      }

      const contract = await ContractService.patch(id, {
        beneficiary_id: body.beneficiary_id,
        provider_id: body.provider_id,
        category_id: body.category_id,
        start_date: body.start_date,
        end_date: body.end_date
      });

      return response.success({ data: contract });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
