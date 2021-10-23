import { NextFunction, Request, Response } from "express";
import IRoomEntity from "../../../core/entities/IRoomEntity";
import addLibraryToRoom from "../../../core/interactors/rooms/addLibraryToRoom";
import createRoom from "../../../core/interactors/rooms/createRoom";
import deleteLibraryFromRoom from "../../../core/interactors/rooms/deleteLibraryFromRoom";
import deleteRoom from "../../../core/interactors/rooms/deleteRoom";
import getAllRooms from "../../../core/interactors/rooms/getAllRooms";
import getRoomById from "../../../core/interactors/rooms/getRoomById";
import responseErrors from "../constants/response-messages";

export function getAllRoomsCtrl(
  req: Request, res: Response<IRoomEntity[]>, next: NextFunction
): void {
  getAllRooms().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function getRoomByIdCtrl(
  req: Request<{ roomId: string }>,
  res: Response<IRoomEntity>, next: NextFunction
): void {
  const { params } = req;
  const { roomId } = params;
  getRoomById(roomId).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function createRoomCtrl(
  req: Request, res: Response<IRoomEntity>,
  next: NextFunction
): void {
  createRoom().then(data => {
    res.status(200).json(data);
  }).catch(err => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
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
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
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
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
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
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}
