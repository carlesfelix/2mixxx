import { Router } from 'express';
import { getApiHealthCtrl } from '../controllers/health';
import { rateLimiterMid } from '../middlewares/rate-limiter.mid';
import { generalRateLimiter } from '../services/rate-limiters';

const healthRouter = Router();

healthRouter.get(
  '/',
  rateLimiterMid(generalRateLimiter, 20),
  getApiHealthCtrl
);

export default healthRouter;
