import { Router } from 'express';
import { genericErrorMid, notFoundErrorMid } from '../middlewares/errors.mid';
import libraryRoute from './library';

const api = Router();

api.get('/', (req, res) => {
  res.status(200).json({ msg: 'Api works!' });
});

api.use('/library', libraryRoute);

api.use(notFoundErrorMid);
api.use(genericErrorMid);

export default api;
