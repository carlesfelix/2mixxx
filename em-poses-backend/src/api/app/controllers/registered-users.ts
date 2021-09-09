import { NextFunction, Request, Response } from 'express';
import IRegisteredUserEntity from '../../../core/entities/IRegisteredUserEntity';
import createUserInteractor from '../../../core/interactors/registered-users/createUser';
import deleteUserInteractor from '../../../core/interactors/registered-users/deleteUser';
import getAllUsersInteractor from '../../../core/interactors/registered-users/getAllUsers';
import updateUserInteractor from '../../../core/interactors/registered-users/updateUser';
import responseErrors from '../constants/response-messages';

export function createUserCtrl(
  req: Request<unknown, unknown, IRegisteredUserEntity>,
  res: Response<IRegisteredUserEntity>,
  next: NextFunction
): void {
  const { body } = req;
  const { email, role } = body;
  createUserInteractor({ email, role }).then(createdUser => {
    res.status(200).json(createdUser);
  }).catch((err) => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function deleteUserCtrl(
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction
): void {
  const { params } = req;
  const { userId } = params;
  deleteUserInteractor(userId).then(() => {
    res.status(200).json();
  }).catch((err) => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function getAllUsersCtrl(
  req: Request,
  res: Response<IRegisteredUserEntity[]>,
  next: NextFunction
): void {
  getAllUsersInteractor().then(users => {
    res.status(200).json(users);
  }).catch((err) => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function updateUserCtrl(
  req: Request<{ userId: string }, unknown, IRegisteredUserEntity>,
  res: Response<IRegisteredUserEntity>,
  next: NextFunction
): void {
  const { body, params } = req;
  const { email, role } = body;
  const { userId } = params;
  updateUserInteractor(
    userId, { email, role }
  ).then(() => {
    res.status(200).json();
  }).catch((err) => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}
