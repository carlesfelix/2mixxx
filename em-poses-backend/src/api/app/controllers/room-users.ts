import { NextFunction, Request, Response } from 'express';
import createRoomUser from '../../../core/interactors/room-users/createRoomUser';
import responseErrors from '../constants/response-messages';

export function createRoomUserCtrl(
  req: Request<unknown, unknown, { roomCode: string }>,
  res: Response<{ token: string }>,
  next: NextFunction
): void {
  const { body } = req;
  const { roomCode } = body;
  createRoomUser(roomCode).then(token => {
    res.status(200).json({ token });
  }).catch((err) => {
    next(err);
  });
}
