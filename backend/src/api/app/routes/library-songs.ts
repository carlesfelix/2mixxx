import { Router } from 'express';
import { permissions } from '../../../core/constants/user-roles';
import { deleteSongsFromLibraryCtrl, importSongsFromItunesCtrl } from '../controllers/library-songs';
import { catchRequestHandlerErrorMid } from '../middlewares/errors.mid';
import { getUploadFileMemoryMid } from '../middlewares/upload-file.mid';
import { userHasSomePermission } from '../middlewares/user-auth.mid';

const librarySongsRouter = Router({ mergeParams: true });

librarySongsRouter.post(
  '/import',
  userHasSomePermission([ permissions.IMPORT_SONGS_FROM_ITUNES ]),
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
  userHasSomePermission([ permissions.DELETE_SONGS_FROM_ITUNES ]),
  deleteSongsFromLibraryCtrl
);

export default librarySongsRouter;
