import { Router } from 'express';
import { param } from 'express-validator';
import { createRoomCtrl, deleteRoomCtrl, getAllRoomsCtrl, getRoomByIdCtrl } from '../controllers/rooms';
import { validationErrorMid } from '../middlewares/validation.mid';

const roomsRouter = Router();

roomsRouter.get(
  '/',
  getAllRoomsCtrl
);

roomsRouter.get(
  '/:roomId',
  [ param('roomId').isUUID() ],
  validationErrorMid,
  getRoomByIdCtrl
);

roomsRouter.post('/', createRoomCtrl);

roomsRouter.delete(
  '/:roomId',
  [ param('roomId').isUUID() ],
  validationErrorMid,
  deleteRoomCtrl
);

export default roomsRouter;
