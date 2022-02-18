import { NextFunction, Request, RequestHandler, Response } from 'express';
import ApiError, { StatusCodeEnum } from '../services/ApiError';
import BaseError from '../../../core/services/BaseError';

export function notFoundErrorMid(req: Request, res: Response): void {
  const notFoundError = new ApiError(StatusCodeEnum.NotFound, 'Endpoint does not exist');
  res.status(notFoundError.code).json(notFoundError.toJSON());
}

export function genericErrorMid(
  error: Error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request, res: Response, _: NextFunction
): void {
  if (error instanceof BaseError) {
    res.status(error.code).json(error.toJSON());
    return;
  }
  const unknownError = new ApiError(StatusCodeEnum.InternalError, 'Unexpected error');
  res.status(unknownError.code).json(unknownError.toJSON());
}

export function catchRequestHandlerErrorMid(uploadRequestHandler: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    uploadRequestHandler(req, res, err => {
      if (!err) {
        next();
        return;
      }
      genericErrorMid(
        new ApiError(StatusCodeEnum.BadRequest, err.message),
        req, res, next
      );
    });
  }
}
