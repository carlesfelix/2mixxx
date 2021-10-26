import { Router } from 'express';
import { param } from 'express-validator';
import { genericErrorMid, notFoundErrorMid } from '../middlewares/errors.mid';
import { userAuthMid } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';
import librariesRouter from './libraries';
import librarySongsRouter from './library-songs';
import registeredUsersRouter from './registered-users';
import roomUsers from './room-users';
import roomsRouter from './rooms';
import songsRouter from './songs';

const api = Router();

api.use(userAuthMid);

api.get('/', (req, res) => {
  res.status(200).json({ msg: 'Api works!' });
});

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

api.use(notFoundErrorMid);
api.use(genericErrorMid);

export default api;
