import { Router } from 'express';
import { getMeCtrl, getMyRoomsCtrl } from '../controllers/me';
import { userIsAuthenticated } from '../middlewares/user-auth.mid';

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

export default meRouter;
