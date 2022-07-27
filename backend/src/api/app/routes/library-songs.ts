import { Router } from 'express';
import { body } from 'express-validator';
import { permissions } from '../../../core/constants/user-roles';
import { deleteSongsFromLibraryCtrl, importSongsCtrl } from '../controllers/library-songs';
import { rateLimiterMid } from '../middlewares/rate-limiter.mid';
import { userHasSomePermission } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';
import { generalRateLimiter } from '../services/rate-limiters';

const librarySongsRouter = Router({ mergeParams: true });

librarySongsRouter.post(
  '/import',
  userHasSomePermission([ permissions.IMPORT_SONGS ]),
  [
    body('songs').isArray({ min: 1, max: 100 }),
    body('songs.*.title').isString().isLength({ min: 1, max: 255 }),
    body('songs.*.artist').isString()
      .isLength({ min: 1, max: 255 })
      .optional(),
  ],
  validationErrorMid,
  importSongsCtrl
);

librarySongsRouter.delete(
  '/',
  rateLimiterMid(generalRateLimiter, 20),
  userHasSomePermission([ permissions.DELETE_SONGS ]),
  deleteSongsFromLibraryCtrl
);

export default librarySongsRouter;
