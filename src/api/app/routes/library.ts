import { Router } from 'express';
import { query } from 'express-validator';
import { importLibraryCtrl, searchCtrl } from '../controllers/library.controller';
import { uploadFileMemoryHOM } from '../middlewares/upload-file.mid';
import { validationErrorMid } from '../middlewares/validation.mid';

const libraryRoute = Router();

libraryRoute.post(
  '/import',
  uploadFileMemoryHOM({
    limits: {
      fileSize: 50000000,
      fields: 0,
      files: 1,
      parts: 1
    },
    acceptedMimeTypes: ['text/xml']
  }).single('itunes'),
  importLibraryCtrl
);

libraryRoute.get(
  '/search',
  [query('query').optional().isString().isLength({ min: 3 })],
  validationErrorMid,
  searchCtrl
);

export default libraryRoute;
