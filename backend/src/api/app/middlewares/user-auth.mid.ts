import { NextFunction, Request, Response } from 'express';
import getUserAuth from '../../../core/interactors/auth/getUserAuth';
import userHasSomePermissionInteractor from '../../../core/interactors/auth/userHasSomePermission';
import UserAuth, { BaseUserAuth } from '../../../core/types/UserAuth';
import ApiError, { StatusCodeEnum } from '../services/ApiError';

export function userAuthMid(
  req: Request,
  res: Response<unknown, { auth: UserAuth }>,
  next: NextFunction
): void {
  const { headers } = req;
  const {
    authorization,
    'user-type': userType
  } = headers;
  if (typeof userType === 'string' && authorization) {
    getUserAuth(userType, authorization).then(auth => {
      res.locals.auth = auth;
      next();
      return;
    }).catch(err => {
      next(err);
      return;
    });
  } else {
    next();
  }
}

export function userHasSomePermission(permissions: string[]): (
  req: Request,
  res: Response<unknown, { auth: BaseUserAuth }>,
  next: NextFunction
) => void {
  return (_, res, next) => {
    const allowed = userHasSomePermissionInteractor({
      anyUser: res.locals.auth,
      permissions
    });
    if (allowed) {
      next();
      return;
    }
    next(new ApiError(StatusCodeEnum.AccessDenied));
  }
}
