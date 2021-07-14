import { NextFunction, Request, Response } from 'express';
import responseErrors, { IResponseError } from '../constants/response-messages';

export function notFoundErrorMid(req: Request, res: Response, next: NextFunction): void {
  next({ responseError: responseErrors.ERR_NOT_FOUND });
}

export function genericErrorMid(
  errorData: { responseError: IResponseError, details?: unknown },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Express.Request, res: Response, _: NextFunction
): void {
  const { responseError, details } = errorData;
  const { statusCode, code, msg } = responseError;
  res.status(statusCode).json({ msg, code, details });
}
