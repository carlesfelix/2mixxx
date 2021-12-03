import { Router } from 'express';
import { query } from 'express-validator';
import { permissions } from '../../../core/constants/user-roles';
import { searchSongsCtrl } from '../controllers/songs';
import { userHasSomePermission } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';

const songsRouter = Router();

songsRouter.get(
  '/',
  userHasSomePermission([ permissions.SONGS_SEARCH ]),
  [ query('query').optional().isString().isLength({ min: 3 }) ],
  validationErrorMid,
  searchSongsCtrl
);

export default songsRouter;
