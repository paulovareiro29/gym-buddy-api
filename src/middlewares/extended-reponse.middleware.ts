/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

declare module 'express' {
  // eslint-disable-next-line no-shadow
  export interface Response {
    success(_?: { data?: any; code?: number; message?: string }): Response;
    error(_?: { errors?: any; code?: number; message?: string }): Response;
    badrequest(_?: { errors?: any; message?: string }): Response;
    unauthorized(_?: { errors?: any; message?: string }): Response;
    forbidden(_?: { errors?: any; message?: string }): Response;
    notfound(_?: { errors?: any; message?: string }): Response;
    internal(_?: { errors?: any; message?: string }): Response;
  }
}

export default (_: Request, res: Response, next: NextFunction) => {
  /**
   * (default status 200)
   * Success response
   */
  res.success = ({ data = {}, code = 200, message = 'SUCCESS' }) =>
    res.status(code).json({
      code,
      message,
      data
    });

  /**
   * (default status 400)
   * Custom Error Response
   */
  res.error = ({ errors = {}, code = 400, message = 'FAILED' }) =>
    res.status(code).json({
      code,
      message,
      errors
    });

  /**
   * (status 400)
   * Bad Request Response
   */
  res.badrequest = ({ errors = {}, message = 'BAD REQUEST' }) =>
    res.error({
      errors,
      code: 400,
      message
    });

  /**
   * (status 401)
   * Unauthorized Response
   */
  res.unauthorized = ({ errors = {}, message = 'UNAUTHORIZED' }) =>
    res.error({
      errors,
      code: 401,
      message
    });

  /**
   * (status 403)
   * Forbidden Response
   */
  res.forbidden = ({ errors = {}, message = 'FORBIDDEN' }) =>
    res.error({
      errors,
      code: 403,
      message
    });

  /**
   * (status 404)
   * Not Found Response
   */
  res.notfound = ({ errors = {}, message = 'NOT FOUND' }) =>
    res.error({
      errors,
      code: 404,
      message
    });

  /**
   * (status 500)
   * Internal Server Error Response
   */
  res.internal = ({ errors = {}, message = 'INTERNAL SERVER ERROR' }) =>
    res.error({
      errors,
      code: 500,
      message
    });

  next();
};
