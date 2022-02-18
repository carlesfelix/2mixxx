import { NextFunction, Request, RequestHandler, Response } from 'express';
import InteractorError from '../../../core/services/InteractorError';
import ApiError, { StatusCodeEnum } from '../services/ApiError';
import { getStatusFromInteractorErrorCode } from '../helpers';
import BaseError from '../../../core/services/BaseError';

export function notFoundErrorMid(req: Request, res: Response): void {
  res.status(404).json({ msg: 'Not found' });
}

export function genericErrorMid(
  error: Error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request, res: Response, _: NextFunction
): void {
  if (error instanceof InteractorError) {
    res.status(getStatusFromInteractorErrorCode(error.code)).json({
      message: error.message,
      details: error.details
    });
    return;
  }
  if (error instanceof BaseError) {
    res.status(error.code).json(error.toJSON());
    return;
  }
  res.status(500).json({
    message: 'Internal server error',
    error
  });
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
