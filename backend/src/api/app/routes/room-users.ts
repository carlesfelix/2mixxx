import { Router } from 'express';
import { body } from 'express-validator';
import { createRoomUserCtrl } from '../controllers/room-users';
import { rateLimiterMid } from '../middlewares/rate-limiter.mid';
import { validationErrorMid } from '../middlewares/validation.mid';
import { createRoomUserRateLimiter } from '../services/rate-limiters';

const roomUsersRouter = Router();

roomUsersRouter.post(
  '/',
  rateLimiterMid(createRoomUserRateLimiter, 50),
  [
    body('roomCode').isString(),
  ],
  validationErrorMid,
  createRoomUserCtrl
);

export default roomUsersRouter;
