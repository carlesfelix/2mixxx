import { Router } from 'express';
import { deleteSongsFromLibraryCtrl, importSongsFromItunesCtrl } from '../controllers/library-songs';
import { catchRequestHandlerErrorMid } from '../middlewares/errors.mid';
import { getUploadFileMemoryMid } from '../middlewares/upload-file.mid';

const librarySongsRouter = Router({ mergeParams: true });

librarySongsRouter.post(
  '/import',
  catchRequestHandlerErrorMid(
    getUploadFileMemoryMid({
      limits: {
        fileSize: 50000000,
        fields: 0,
        files: 1,
        parts: 1
      },
      acceptedMimeTypes: ['application/xml', 'text/xml']
    }).single('itunes')
  ),
  importSongsFromItunesCtrl
);

librarySongsRouter.delete(
  '/',
  deleteSongsFromLibraryCtrl
);

export default librarySongsRouter;
