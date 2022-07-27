import { Router } from 'express';
import { query } from 'express-validator';
import { permissions } from '../../../core/constants/user-roles';
import { searchSongsCtrl } from '../controllers/songs';
import { rateLimiterMid } from '../middlewares/rate-limiter.mid';
import { userHasSomePermission } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';
import { generalRateLimiter } from '../services/rate-limiters';

const songsRouter = Router();

songsRouter.get(
  '/',
  rateLimiterMid(generalRateLimiter, 20),
  userHasSomePermission([ permissions.SONGS_SEARCH ]),
  [ query('query').optional().isString().isLength({ min: 3 }) ],
  validationErrorMid,
  searchSongsCtrl
);

export default songsRouter;
