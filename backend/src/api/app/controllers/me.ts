import { NextFunction, Request, Response } from 'express';
import ApiError, { StatusCodeEnum } from '../services/ApiError';
import { AnyUserAuth } from '../../../core/types/UserAuth';

export function getMeCtrl(
  _: Request,
  res: Response<unknown, { auth: AnyUserAuth }>,
  next: NextFunction
): void {
  if (res.locals.auth && res.locals.auth.user) {
    res.status(200).json(res.locals.auth);
    return;
  }
  next(new ApiError(StatusCodeEnum.AccessDenied));
}
