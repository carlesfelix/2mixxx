import { Router } from 'express';
import libraryRoute from './library';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).json({ msg: 'Api works!' });
});

routes.use(
  '/library',
  libraryRoute
);

export default routes;
