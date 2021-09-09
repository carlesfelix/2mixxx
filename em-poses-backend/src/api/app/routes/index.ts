import { Router } from 'express';
import { param } from 'express-validator';
import { genericErrorMid, notFoundErrorMid } from '../middlewares/errors.mid';
import { validationErrorMid } from '../middlewares/validation.mid';
import librariesRouter from './libraries';
import librarySongsRouter from './library-songs';
import registeredUsersRouter from './registered-users';

const api = Router();

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

api.use(notFoundErrorMid);
api.use(genericErrorMid);

export default api;
