import { Router } from 'express';
import { param } from 'express-validator';
import { getMeCtrl, getMyRoomCtrl, getMyRoomsCtrl } from '../controllers/me';
import { rateLimiterMid } from '../middlewares/rate-limiter.mid';
import { userIsAuthenticated } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';
import { generalRateLimiter } from '../services/rate-limiters';

const meRouter = Router();

meRouter.get(
  '/',
  rateLimiterMid(generalRateLimiter, 20),
  userIsAuthenticated(),
  getMeCtrl
);

meRouter.get(
  '/my-rooms',
  rateLimiterMid(generalRateLimiter, 20),
  userIsAuthenticated('registeredUser'),
  getMyRoomsCtrl
);

meRouter.get(
  '/my-rooms/:roomId',
  rateLimiterMid(generalRateLimiter, 20),
  userIsAuthenticated('registeredUser'),
  [ param('roomId').isUUID() ],
  validationErrorMid,
  getMyRoomCtrl
);

export default meRouter;
