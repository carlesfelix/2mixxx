import { NextFunction, Request, Response } from 'express';
import addLibraryToRoom from '../../../core/interactors/rooms/addLibraryToRoom';
import createRoom from '../../../core/interactors/rooms/createRoom';
import deleteLibraryFromRoom from '../../../core/interactors/rooms/deleteLibraryFromRoom';
import deleteRoom from '../../../core/interactors/rooms/deleteRoom';
import getAllRooms from '../../../core/interactors/rooms/getAllRooms';
import getRoomById from '../../../core/interactors/rooms/getRoomById';
import RoomEntity from '../../../core/types/RoomEntity';
import addModeratorToRoom from '../../../core/interactors/rooms/addModeratorToRoom';
import deleteModeratorFromRoom from '../../../core/interactors/rooms/deleteModeratorFromRoom';
import roomCodeExists from '../../../core/interactors/rooms/roomCodeExists';
import generateRoomQr from '../../../core/interactors/rooms/generateRoomQr';
import { RegisteredUserAuth } from '../../../core/types/UserAuth';

export function getAllRoomsCtrl(
  req: Request,
  res: Response<
    RoomEntity[],
    { auth: RegisteredUserAuth }
  >,
  next: NextFunction
): void {
  getAllRooms(res.locals.auth.id!).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    next(err);
  });
}

export function getRoomByIdCtrl(
  req: Request<{ roomId: string }>,
  res: Response<RoomEntity>, next: NextFunction
): void {
  const { params } = req;
  const { roomId } = params;
  getRoomById(roomId).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    next(err);
  });
}

export function getRoomQrCtrl(
  req: Request<
    {roomId: string},
    unknown,
    unknown,
    {docHeader: string}
  >,
  res: Response<RoomEntity>,
  next: NextFunction
): void {
  const { params, query } = req;
  const { roomId } = params;
  const { docHeader } = query;
  getRoomById(roomId).then(({ code: roomCode }) => {
    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf'
    });
    generateRoomQr({
      roomCode,
      stream,
      docHeader
    });
  }).catch(err => next(err))
}

export function roomCodeExistsCtrl(
  req: Request<unknown, unknown, unknown, { code: string }>,
  res: Response<{ exists: boolean }>,
  next: NextFunction
): void {
  const { query } = req;
  const { code } = query;
  roomCodeExists(code).then(exists => {
    res.status(200).json({ exists });
  }).catch(err => {
    next(err);
  });
}

export function createRoomCtrl(
  req: Request, res: Response<RoomEntity>,
  next: NextFunction
): void {
  createRoom().then(data => {
    res.status(200).json(data);
  }).catch(err => {
    next(err);
  });
}

export function deleteRoomCtrl(
  req: Request<{ roomId: string }>,
  res: Response, next: NextFunction
): void {
  const { params } = req;
  const { roomId } = params;
  deleteRoom(roomId).then(() => {
    res.status(200).json();
  }).catch(err => {
    next(err);
  });
}

export function addLibraryToRoomCtrl(
  req: Request<{ roomId: string }, unknown, { libraryId: string }>,
  res: Response,
  next: NextFunction
): void {
  const { params, body } = req;
  const { roomId } = params;
  const { libraryId } = body;
  addLibraryToRoom(roomId, libraryId).then(() => {
    res.status(200).json();
  }).catch(err => {
    next(err);
  });
}

export function deleteLibraryFromRoomCtrl(
  req: Request<{ roomId: string, libraryId: string }>,
  res: Response,
  next: NextFunction
): void {
  const { params } = req;
  const { roomId, libraryId } = params;
  deleteLibraryFromRoom(roomId, libraryId).then(() => {
    res.status(200).json();
  }).catch(err => {
    next(err);
  });
}

export function addModeratorToRoomCtrl(
  req: Request<
    { roomId: string }, unknown,
    { registeredUserId: string }
  >,
  res: Response,
  next: NextFunction
): void {
  const { params, body } = req;
  const { roomId } = params;
  const { registeredUserId } = body;
  addModeratorToRoom(roomId, registeredUserId).then(() => {
    res.status(200).json();
  }).catch(err => {
    next(err);
  });
}

export function deleteModeratorFromRoomCtrl(
  req: Request<{
    roomId: string, registeredUserId: string
  }>,
  res: Response,
  next: NextFunction
): void {
  const { params } = req;
  const { roomId, registeredUserId } = params;
  deleteModeratorFromRoom(roomId, registeredUserId).then(() => {
    res.status(200).json();
  }).catch(err => {
    next(err);
  });
}
