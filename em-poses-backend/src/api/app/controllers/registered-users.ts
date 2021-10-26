import { NextFunction, Request, Response } from 'express';
import RegisteredUserEntity from '../../../core/types/RegisteredUserEntity';
import createUserInteractor from '../../../core/interactors/registered-users/createUser';
import deleteUserInteractor from '../../../core/interactors/registered-users/deleteUser';
import getAllUsersInteractor from '../../../core/interactors/registered-users/getAllUsers';
import updateUserInteractor from '../../../core/interactors/registered-users/updateUser';
import userEmailExistsInteractor from '../../../core/interactors/registered-users/userEmailExists';
import responseErrors from '../constants/response-messages';

export function createUserCtrl(
  req: Request<unknown, unknown, RegisteredUserEntity>,
  res: Response<RegisteredUserEntity>,
  next: NextFunction
): void {
  const { body } = req;
  const { email, role } = body;
  createUserInteractor({ email, role }).then(createdUser => {
    res.status(200).json(createdUser);
  }).catch((err) => {
    next(err);
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
    next(err);
  });
}

export function getAllUsersCtrl(
  req: Request,
  res: Response<RegisteredUserEntity[]>,
  next: NextFunction
): void {
  getAllUsersInteractor().then(users => {
    res.status(200).json(users);
  }).catch((err) => {
    next(err);
  });
}

export function updateUserCtrl(
  req: Request<{ userId: string }, unknown, RegisteredUserEntity>,
  res: Response<RegisteredUserEntity>,
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
    next(err);
  });
}

export function userEmailExistsCtrl(
  req: Request<unknown, unknown, unknown, { email: string }>,
  res: Response<{ exists: boolean }>,
  next: NextFunction
): void {
  const { query } = req;
  const { email } = query;
  userEmailExistsInteractor(email).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    next(err);
  });
}
