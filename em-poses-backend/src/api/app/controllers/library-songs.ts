import { NextFunction, Request, Response } from 'express';
import LibraryEntity from '../../../core/types/LibraryEntity';
import SongEntity from '../../../core/types/SongEntity';
import importFromItunes from '../../../core/interactors/songs/importFromItunes';
import removeSongsFromLibrary from '../../../core/interactors/songs/removeSongsFromLibrary';
import searchSongsFromLibrary from '../../../core/interactors/songs/searchSongsFromLibrary';
import responseErrors from '../constants/response-messages';

export function importSongsFromItunesCtrl(
  req: Request<{ libraryId: string }>,
  res: Response<LibraryEntity | null>,
  next: NextFunction
): void {
  const { file, params } = req;
  const { libraryId } = params;
	if (!file) {
    next({
      responseError: responseErrors.ERR_BAD_REQUEST,
      details: 'File does not exist'
    });
		return;
	}
  const { buffer: fileBuffer } = file;
	importFromItunes({ fileBuffer, mimetype: 'utf8', libraryId }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function searchSongsCtrl(
  req: Request<
    { libraryId: string },
    unknown,
    unknown,
    { query: string }
  >,
  res: Response<SongEntity[]>,
  next: NextFunction
): void {
  const { query: { query }, params: { libraryId } } = req;
  searchSongsFromLibrary({ libraryId, query }).then(tracks => {
    res.status(200).json(tracks);
  }).catch((err) => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function deleteSongsFromLibraryCtrl(
  req: Request<{ libraryId: string }>,
  res: Response<SongEntity[]>,
  next: NextFunction
): void {
  const { params: { libraryId } } = req;
  removeSongsFromLibrary(libraryId).then(() => {
    res.status(200).json();
  }).catch(err => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}
