import { Request, Response } from 'express';
import { ActivateRequest, LoginRequest, RegisterRequest } from './types';
import { handlePrismaError } from '../../lib/handle-prisma-error';
import { encryptString } from '../../lib/encryption/encrypt-string';
import { generateAccessToken } from '../../lib/jwt/generate-access-token';
import AuthenticationService from '../../services/authentication';
import UserService from '../../services/user';
import RoleService from '../../services/role';

export default class AuthenticationController {
  static async login(request: Request, response: Response) {
    const body = request.body as any as LoginRequest;

    if (!body.email) {
      return response.badrequest({ errors: { email: 'Email is required' } });
    }

    if (!body.password) {
      return response.badrequest({ errors: { password: 'Password is required' } });
    }

    try {
      const valid = await AuthenticationService.validateCredentials(body.email, body.password);
      if (!valid) return response.badrequest({ message: 'Wrong credentials' });

      const user = await UserService.find({ email: body.email });
      const token = generateAccessToken(user.id);

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

  static async register(request: Request, response: Response) {
    const body = request.body as any as RegisterRequest;

    if (!body.email) {
      return response.badrequest({ errors: { email: 'Email is required' } });
    }

    if (!body.name) {
      return response.badrequest({ errors: { name: 'Name is required' } });
    }

    if (!body.role_id) {
      const defaultRole = await RoleService.find({ name: 'default' });
      if (!defaultRole) return response.internal({});
      body.role_id = defaultRole.id;
    }

    try {
      const user = await UserService.find({ email: body.email });
      if (user) return response.badrequest({ errors: { email: 'Email already in use' } });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }

    try {
      const user = await UserService.create({
        email: body.email!,
        name: body.name!,
        role_id: body.role_id!
      });

      return response.success({ data: { user } });
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

      if (!user) {
        return response.badrequest({ message: 'User does not exist' });
      }

      if (body.register_code !== user.register_code) {
        return response.badrequest({ message: 'Register code is invalid' });
      }

      if (user.activated) {
        return response.success({ data: user });
      }

      const updated = await UserService.patch(user.id, {
        password: await encryptString(body.password),
        activated: true
      });

      return response.success({ data: updated });
    } catch (err) {
      return response.error(handlePrismaError(err));
    }
  }

  static async me(_: Request, response: Response) {
    return response.success({ data: { user: response.locals.user } });
  }
}
