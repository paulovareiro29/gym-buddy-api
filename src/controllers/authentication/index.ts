import { Request, Response } from 'express';
import { ActivateRequest, LoginRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import UserService from '../../services/user';
import { compareEncryptedString } from '../../lib/encryption/compare-encrypted-string';
import { encryptString } from '../../lib/encryption/encrypt-string';
import { generateAccessToken } from '../../lib/jwt/generate-access-token';

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

      if (!user) {
        return response.badrequest({ message: 'Wrong credentials!' });
      }

      if (!user.activated) {
        return response.badrequest({ message: 'User is still not activated' });
      }

      if (!(await compareEncryptedString(body.password, user.password))) {
        return response.badrequest({ message: 'Wrong credentials!' });
      }

      const token = generateAccessToken(user.id);

      // eslint-disable-next-line no-unused-vars
      const { password, ...userWithoutPassword } = user;

      return response.success({
        data: {
          user: userWithoutPassword,
          token
        }
      });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async activate(request: Request, response: Response) {
    const body = request.body as any as ActivateRequest;

    if (!body.email) {
      return response.badrequest({ errors: { email: 'Email is required' } });
    }

    if (!body.password) {
      return response.badrequest({ errors: { password: 'Password is required' } });
    }

    if (!body.register_code) {
      return response.badrequest({ errors: { email: 'Register code is required' } });
    }

    try {
      const user = await UserService.find({ email: body.email });

      if (!user || body.register_code !== user.register_code) {
        return response.badrequest({ message: 'Wrong credentials!' });
      }

      if (user.activated) {
        return response.success({ data: user });
      }

      // eslint-disable-next-line no-unused-vars
      const { password, ...updated } = await UserService.patch(user.id, {
        password: await encryptString(body.password),
        activated: true
      });

      return response.success({ data: updated });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }
}
