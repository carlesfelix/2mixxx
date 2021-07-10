import { Router } from 'express';
import { importLibraryCtrl, searchCtrl } from '../controllers/library.controller';
import { uploadFileMemoryHOM } from '../middlewares/upload-file.mid';

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
  searchCtrl
);

export default libraryRoute;
