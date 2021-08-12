import { Router } from 'express';
import { param } from 'express-validator';
import { genericErrorMid, notFoundErrorMid } from '../middlewares/errors.mid';
import { validationErrorMid } from '../middlewares/validation.mid';
import librarySongsRoute from './library-songs';

const api = Router();

api.get('/', (req, res) => {
  res.status(200).json({ msg: 'Api works!' });
});

api.use(
  '/libraries/:libraryId/songs',
  [ param('libraryId').isUUID() ],
  validationErrorMid,
  librarySongsRoute
);

api.use(notFoundErrorMid);
api.use(genericErrorMid);

export default api;
