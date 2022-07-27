import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { permissions } from '../../../core/constants/user-roles';
import {
  addLibraryToRoomCtrl, addModeratorToRoomCtrl, createRoomCtrl,
  deleteLibraryFromRoomCtrl, deleteModeratorFromRoomCtrl, deleteRoomCtrl,
  getAllRoomsCtrl, getRoomByIdCtrl, roomCodeExistsCtrl,
  getRoomQrCtrl
} from '../controllers/rooms';
import { rateLimiterMid } from '../middlewares/rate-limiter.mid';
import { userHasSomePermission } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';
import {
  checkRoomRateLimiter, generalRateLimiter
} from '../services/rate-limiters';

const roomsRouter = Router();

roomsRouter.get(
  '/',
  rateLimiterMid(generalRateLimiter, 20),
  userHasSomePermission([ permissions.GET_ALL_ROOMS ]),
  getAllRoomsCtrl
);

roomsRouter.get(
  '/exists',
  rateLimiterMid(checkRoomRateLimiter, 20),
  [ query('code').isString() ],
  validationErrorMid,
  roomCodeExistsCtrl
);

roomsRouter.get(
  '/:roomId',
  rateLimiterMid(generalRateLimiter, 20),
  userHasSomePermission([ permissions.GET_ROOM_BY_ID ]),
  [ param('roomId').isUUID() ],
  validationErrorMid,
  getRoomByIdCtrl
);

roomsRouter.get(
  '/:roomId/qr',
  rateLimiterMid(generalRateLimiter, 20),
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
  rateLimiterMid(generalRateLimiter, 20),
  userHasSomePermission([ permissions.CREATE_ROOM ]),
  createRoomCtrl
);

roomsRouter.delete(
  '/:roomId',
  rateLimiterMid(generalRateLimiter, 20),
  userHasSomePermission([ permissions.DELETE_ROOM ]),
  [ param('roomId').isUUID() ],
  validationErrorMid,
  deleteRoomCtrl
);

roomsRouter.post(
  '/:roomId/libraries',
  rateLimiterMid(generalRateLimiter, 20),
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
  rateLimiterMid(generalRateLimiter, 20),
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
  rateLimiterMid(generalRateLimiter, 20),
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
  rateLimiterMid(generalRateLimiter, 20),
  userHasSomePermission([ permissions.DELETE_MODERATOR_FROM_ROOM ]),
  [
    param('roomId').isUUID(),
    param('registeredUserId').isUUID()
  ],
  validationErrorMid,
  deleteModeratorFromRoomCtrl
);

export default roomsRouter;
