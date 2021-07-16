import { Router } from 'express';
import { query } from 'express-validator';
import { importLibraryCtrl, searchCtrl } from '../controllers/library.controller';
import { catchRequestHandlerErrorMid } from '../middlewares/errors.mid';
import { getUploadFileMemoryMid } from '../middlewares/upload-file.mid';
import { validationErrorMid } from '../middlewares/validation.mid';

const libraryRoute = Router();

libraryRoute.post(
  '/import',
  catchRequestHandlerErrorMid(
    getUploadFileMemoryMid({
      limits: {
        fileSize: 50000000,
        fields: 0,
        files: 1,
        parts: 1
      },
      acceptedMimeTypes: ['application/xml']
    }).single('itunes')
  ),
  importLibraryCtrl
);

libraryRoute.get(
  '/search',
  [query('query').optional().isString().isLength({ min: 3 })],
  validationErrorMid,
  searchCtrl
);

export default libraryRoute;
