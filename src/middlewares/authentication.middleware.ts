import { NextFunction, Request, Response } from 'express';
import { RoleName } from '../constants/available-roles';
import { decodeAccessToken } from '../lib/jwt/decode-access-token';
import { NormalizedUser } from '../services/user/types';
import UserService from '../services/user';

export default class AuthenticationMiddleware {
  static async authenticated(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(' ').pop();

    if (!token) {
      return response.unauthorized({ message: 'The API key was not provided' });
    }

    const decoded = await decodeAccessToken(token);

    if (decoded instanceof Error) {
      return response.unauthorized({ message: 'The API key is invalid' });
    }

    const user = await UserService.find({ id: decoded.id });

    if (!user) return response.notfound({ message: 'User associated with API key not found' });

    if (!user.activated) {
      return response.unauthorized({ message: 'Authenticated user is still not activated' });
    }

    response.locals.user = user;
    next();
  }

  static authorized(roles: RoleName[]) {
    return async (_: Request, response: Response, next: NextFunction) => {
      const user = response.locals.user as NormalizedUser;

      roles.push('admin');
      if (!roles.includes(user.role.name as RoleName)) {
        return response.unauthorized({});
      }

      next();
    };
  }
}
