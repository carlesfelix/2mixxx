import { Router } from 'express';
import { param } from 'express-validator';
import { getMeCtrl, getMyRoomCtrl, getMyRoomsCtrl } from '../controllers/me';
import { userIsAuthenticated } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';

const meRouter = Router();

meRouter.get(
  '/',
  userIsAuthenticated(),
  getMeCtrl
);

meRouter.get(
  '/my-rooms',
  userIsAuthenticated('registeredUser'),
  getMyRoomsCtrl
);

meRouter.get(
  '/my-rooms/:roomId',
  userIsAuthenticated('registeredUser'),
  [ param('roomId').isUUID() ],
  validationErrorMid,
  getMyRoomCtrl
);

export default meRouter;
