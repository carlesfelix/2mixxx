import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  addLibraryToRoomCtrl, addModeratorToRoomCtrl, createRoomCtrl,
  deleteLibraryFromRoomCtrl, deleteModeratorFromRoomCtrl, deleteRoomCtrl,
  getAllRoomsCtrl, getRoomByIdCtrl
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


roomsRouter.delete(
  '/:roomId/libraries/:libraryId',
  [
    param('roomId').isUUID(),
    param('libraryId').isUUID()
  ],
  validationErrorMid,
  deleteLibraryFromRoomCtrl
);

roomsRouter.post(
  '/:roomId/moderators',
  [
    param('roomId').isUUID(),
    body('registeredUserId').isUUID()
  ],
  validationErrorMid,
  addModeratorToRoomCtrl
);

roomsRouter.delete(
  '/:roomId/moderators/:registeredUserId',
  [
    param('roomId').isUUID(),
    param('registeredUserId').isUUID()
  ],
  validationErrorMid,
  deleteModeratorFromRoomCtrl
);

export default roomsRouter;
