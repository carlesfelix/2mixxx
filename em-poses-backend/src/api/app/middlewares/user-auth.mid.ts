import { Request, Response, NextFunction } from 'express';
import getUserAuth from '../../../core/interactors/auth/getUserAuth';
import UserAuth from '../../../core/types/UserAuth';
import responseErrors from '../constants/response-messages';

export function userAuthMid(
  req: Request,
  res: Response<unknown, { auth: UserAuth }>,
  next: NextFunction
): void {
  const { headers } = req;
  const {
    authorization,
    'authorization-type': authorizationType
  } = headers;
  if (typeof authorizationType === 'string' && authorization) {
    getUserAuth(authorizationType, authorization).then(auth => {
      res.locals.auth = auth;
      next();
      return;
    }).catch(err => {
      next({ responseError: responseErrors.ERR_GENERIC, details: err });
      return;
    });
  } else {
    next();
  }
}
