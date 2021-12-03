import { Router } from 'express';
import { body } from 'express-validator';
import { createRoomUserCtrl } from '../controllers/room-users';
import { validationErrorMid } from '../middlewares/validation.mid';

const roomUsersRouter = Router();

roomUsersRouter.post(
  '/',
  [
    body('roomCode').isString(),
  ],
  validationErrorMid,
  createRoomUserCtrl
);

export default roomUsersRouter;
