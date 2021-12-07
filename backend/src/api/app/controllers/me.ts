import { NextFunction, Request, Response } from 'express';
import getMyRoomInteractor from '../../../core/interactors/registered-users/getMyRoom';
import getMyRoomsInteractor from '../../../core/interactors/registered-users/getMyRooms';
import RoomEntity from '../../../core/types/RoomEntity';
import { AnyUserAuth, RegisteredUserAuth } from '../../../core/types/UserAuth';

export function getMeCtrl(
  _: Request,
  res: Response<AnyUserAuth, { auth: AnyUserAuth }>
): void {
  res.status(200).json(res.locals.auth);
}

export function getMyRoomsCtrl(
  req: Request,
  res: Response<RoomEntity[], { auth: RegisteredUserAuth }>,
  next: NextFunction
): void {
  const { auth } = res.locals;
  getMyRoomsInteractor(auth).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    next(err);
  });
}

export function getMyRoomCtrl(
  req: Request<{ roomId: string }>,
  res: Response<RoomEntity, { auth: RegisteredUserAuth }>,
  next: NextFunction
): void {
  const { params } = req;
  const { roomId } = params;
  const { auth } = res.locals;
  getMyRoomInteractor(auth, roomId).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    next(err);
  });
}
