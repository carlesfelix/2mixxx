import { Router } from 'express';
import { body, param } from 'express-validator';
import { createLibraryCtrl, deleteLibraryCtrl, getLibrariesCtrl, getLibraryByIdCtrl, updateLibraryCtrl } from '../controllers/libraries';
import { validationErrorMid } from '../middlewares/validation.mid';

const librariesRouter = Router();

librariesRouter.post(
  '/',
  [ body('title').isString().isLength({ min: 1, max: 255 }) ],
  validationErrorMid,
  createLibraryCtrl
);

librariesRouter.delete(
  '/:id',
  [ param('id').isUUID() ],
  validationErrorMid,
  deleteLibraryCtrl
);

librariesRouter.put(
  '/:id',
  [
    param('id').isUUID(),
    body('title').isString().isLength({ min: 1, max: 255 })
  ],
  validationErrorMid,
  updateLibraryCtrl
);

librariesRouter.get(
  '/:id',
  [ param('id').isUUID() ],
  validationErrorMid,
  getLibraryByIdCtrl
);

librariesRouter.get(
  '/',
  getLibrariesCtrl
);

export default librariesRouter;
