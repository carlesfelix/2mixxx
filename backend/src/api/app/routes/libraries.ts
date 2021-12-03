import { Router } from 'express';
import { body, param } from 'express-validator';
import { permissions } from '../../../core/constants/user-roles';
import { createLibraryCtrl, deleteLibraryCtrl, getLibrariesCtrl, getLibraryByIdCtrl, updateLibraryCtrl } from '../controllers/libraries';
import { userHasSomePermission } from '../middlewares/user-auth.mid';
import { validationErrorMid } from '../middlewares/validation.mid';

const librariesRouter = Router();

librariesRouter.post(
  '/',
  userHasSomePermission([ permissions.CREATE_LIBRARY ]),
  [ body('title').isString().isLength({ min: 1, max: 255 }) ],
  validationErrorMid,
  createLibraryCtrl
);

librariesRouter.delete(
  '/:id',
  userHasSomePermission([ permissions.DELETE_LIBRARY ]),
  [ param('id').isUUID() ],
  validationErrorMid,
  deleteLibraryCtrl
);

librariesRouter.put(
  '/:id',
  userHasSomePermission([ permissions.UPDATE_LIBRARY ]),
  [
    param('id').isUUID(),
    body('title').isString().isLength({ min: 1, max: 255 })
  ],
  validationErrorMid,
  updateLibraryCtrl
);

librariesRouter.get(
  '/:id',
  userHasSomePermission([ permissions.GET_LIBRARY_BY_ID ]),
  [ param('id').isUUID() ],
  validationErrorMid,
  getLibraryByIdCtrl
);

librariesRouter.get(
  '/',
  userHasSomePermission([ permissions.GET_LIBRARIES ]),
  getLibrariesCtrl
);

export default librariesRouter;
