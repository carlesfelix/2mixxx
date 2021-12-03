import { NextFunction, Request, Response } from 'express';
import createUserInteractor from '../../../core/interactors/registered-users/createUser';
import deleteUserInteractor from '../../../core/interactors/registered-users/deleteUser';
import getAllUsersInteractor from '../../../core/interactors/registered-users/getAllUsers';
import updateUserRoleInteractor from '../../../core/interactors/registered-users/updateUserRole';
import userEmailExistsInteractor from '../../../core/interactors/registered-users/userEmailExists';
import RegisteredUserEntity from '../../../core/types/RegisteredUserEntity';

export function createUserCtrl(
  req: Request<
    unknown, unknown,
    { email: string, role: number, password: string }
  >,
  res: Response<RegisteredUserEntity>,
  next: NextFunction
): void {
  const { body } = req;
  const { email, role, password } = body;
  createUserInteractor({
    email, role, password
  }).then(createdUser => {
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

export function updateUserRoleCtrl(
  req: Request<{ userId: string }, unknown, { role: number }>,
  res: Response,
  next: NextFunction
): void {
  const { body, params } = req;
  const { userId } = params;
  const { role } = body;
  updateUserRoleInteractor(
    userId, role
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
