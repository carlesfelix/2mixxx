import { Router } from 'express';
import { param } from 'express-validator';
import { genericErrorMid, notFoundErrorMid } from '../middlewares/errors.mid';
import { userAuthMid } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';
import healthRouter from './health';
import librariesRouter from './libraries';
import librarySongsRouter from './library-songs';
import meRouter from './me';
import registeredUsersRouter from './registered-users';
import roomUsers from './room-users';
import roomsRouter from './rooms';
import songsRouter from './songs';

const api = Router();

api.use(userAuthMid);

api.use('/health', healthRouter);

api.use('/libraries', librariesRouter);

api.use(
  '/libraries/:libraryId/songs',
  [ param('libraryId').isUUID() ],
  validationErrorMid,
  librarySongsRouter
);

api.use('/registered-users', registeredUsersRouter);

api.use('/rooms', roomsRouter);

api.use('/room-users', roomUsers);

api.use('/songs', songsRouter);

api.use('/me', meRouter);

api.use(notFoundErrorMid);
api.use(genericErrorMid);

export default api;
