import { NextFunction, Request, Response } from "express";
import IRoomEntity from "../../../core/entities/IRoomEntity";
import createRoom from "../../../core/interactors/rooms/createRoom";
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

