import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { permissions } from '../../../core/constants/user-roles';
import {
  addLibraryToRoomCtrl, addModeratorToRoomCtrl, createRoomCtrl,
  deleteLibraryFromRoomCtrl, deleteModeratorFromRoomCtrl, deleteRoomCtrl,
  getAllRoomsCtrl, getRoomByIdCtrl, roomCodeExistsCtrl,
  getRoomQrCtrl
} from '../controllers/rooms';
import { userHasSomePermission } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';

const roomsRouter = Router();

roomsRouter.get(
  '/',
  userHasSomePermission([ permissions.GET_ALL_ROOMS ]),
  getAllRoomsCtrl
);

roomsRouter.get(
  '/exists',
  [ query('code').isString() ],
  validationErrorMid,
  roomCodeExistsCtrl
);

roomsRouter.get(
  '/:roomId',
  userHasSomePermission([ permissions.GET_ROOM_BY_ID ]),
  [ param('roomId').isUUID() ],
  validationErrorMid,
  getRoomByIdCtrl
);

roomsRouter.get(
  '/:roomId/qr',
  userHasSomePermission([ permissions.GET_ROOM_QR ]),
  [
    param('roomId').isUUID(),
    query('docHeader').isString().isLength({max: 20})
  ],
  validationErrorMid,
  getRoomQrCtrl
);

roomsRouter.post(
  '/',
  userHasSomePermission([ permissions.CREATE_ROOM ]),
  createRoomCtrl
);

roomsRouter.delete(
  '/:roomId',
  userHasSomePermission([ permissions.DELETE_ROOM ]),
  [ param('roomId').isUUID() ],
  validationErrorMid,
  deleteRoomCtrl
);

roomsRouter.post(
  '/:roomId/libraries',
  userHasSomePermission([ permissions.ADD_LIBRARY_TO_ROOM ]),
  [
    param('roomId').isUUID(),
    body('libraryId').isUUID()
  ],
  validationErrorMid,
  addLibraryToRoomCtrl
);


roomsRouter.delete(
  '/:roomId/libraries/:libraryId',
  userHasSomePermission([ permissions.DELETE_LIBRARY_FROM_ROOM ]),
  [
    param('roomId').isUUID(),
    param('libraryId').isUUID()
  ],
  validationErrorMid,
  deleteLibraryFromRoomCtrl
);

roomsRouter.post(
  '/:roomId/moderators',
  userHasSomePermission([ permissions.ADD_MODERATOR_TO_ROOM ]),
  [
    param('roomId').isUUID(),
    body('registeredUserId').isUUID()
  ],
  validationErrorMid,
  addModeratorToRoomCtrl
);

roomsRouter.delete(
  '/:roomId/moderators/:registeredUserId',
  userHasSomePermission([ permissions.DELETE_MODERATOR_FROM_ROOM ]),
  [
    param('roomId').isUUID(),
    param('registeredUserId').isUUID()
  ],
  validationErrorMid,
  deleteModeratorFromRoomCtrl
);

export default roomsRouter;
