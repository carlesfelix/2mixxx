import { Router } from 'express';
import { getMeCtrl } from '../controllers/me';

const meRouter = Router();

meRouter.get(
  '/',
  getMeCtrl
);

export default meRouter;
