import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PRISMA_ERRORS } from '../constants/prisma-errors';

export const handlePrismaError = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    const fields = (error.meta.target as string[]) || [];

    const errors = fields.reduce(
      (accumulator, current) => ({
        ...accumulator,
        [current]: PRISMA_ERRORS[error.code] || PRISMA_ERRORS.DEFAULT
      }),
      {}
    );

    return {
      code: 400,
      errors
    };
  }

  return { errors: error };
};
