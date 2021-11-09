import { NextFunction, Request, Response } from 'express';
import getUserAuth from '../../../core/interactors/auth/getUserAuth';
import userHasSomePermissionInteractor from '../../../core/interactors/auth/userHasSomePermission';
import UserAuth from '../../../core/types/UserAuth';

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

export function userHasSomePermission(permissions: string[], userType?: UserAuth['type']): (
  req: Request,
  res: Response<unknown, { auth: UserAuth }>,
  next: NextFunction
) => void {
  return (_, res, next) => {
    userHasSomePermissionInteractor({
      userAuth: res.locals.auth,
      permissions,
      userType,
      next: err => {
        if (err) {
          next(err);
          return;
        }
        next();
      }
    });
  }
}
