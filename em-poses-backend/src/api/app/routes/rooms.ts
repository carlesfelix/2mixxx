import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  addLibraryToRoomCtrl, createRoomCtrl,
  deleteLibraryFromRoomCtrl, deleteRoomCtrl,
  getAllRoomsCtrl, getLibrariesFromRoomCtrl,
  getRoomByIdCtrl
} from '../controllers/rooms';
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

roomsRouter.post(
  '/:roomId/libraries',
  [
    param('roomId').isUUID(),
    body('libraryId').isUUID()
  ],
  validationErrorMid,
  addLibraryToRoomCtrl
);

roomsRouter.get(
  '/:roomId/libraries',
  [ param('roomId').isUUID() ],
  validationErrorMid,
  getLibrariesFromRoomCtrl
);

roomsRouter.delete(
  '/:roomId/libraries/:libraryId',
  [
    param('roomId').isUUID(),
    param('libraryId').isUUID()
  ],
  validationErrorMid,
  deleteLibraryFromRoomCtrl
);

export default roomsRouter;
