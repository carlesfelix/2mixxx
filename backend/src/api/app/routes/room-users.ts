import { Router } from 'express';
import { body } from 'express-validator';
import { permissions } from '../../../core/constants/user-roles';
import { createRoomUserCtrl } from '../controllers/room-users';
import { userHasSomePermission } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';

const roomUsersRouter = Router();

roomUsersRouter.post(
  '/',
  userHasSomePermission([ permissions.CREATE_ROOM_USER ]),
  [
    body('roomCode').isString(),
  ],
  validationErrorMid,
  createRoomUserCtrl
);

export default roomUsersRouter;
