import { Request, Response } from 'express';
import { LoginRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import UserService from '../../services/user';

export default class AuthenticationController {
  static async login(request: Request, response: Response) {
    const body = request.body as any as LoginRequest;

    if (!body.email) {
      return response.badrequest({ errors: { email: 'Email is required' } });
    }

    if (!body.password) {
      // eslint-disable-next-line prettier/prettier
      return response.badrequest({ errors: { password: 'Password is required' } });
    }

    try {
      const user = await UserService.find({ email: body.email });

      // TODO: Use bcrypt for this
      if (!user || body.password !== user.password) {
        return response.badrequest({ message: 'Wrong credentials!' });
      }

      // TODO: Generate JWT Token
      const token = '123';

      return response.success({
        data: {
          user,
          token
        }
      });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
