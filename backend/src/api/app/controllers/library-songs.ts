import { NextFunction, Request, Response } from 'express';
import importFromItunes from '../../../core/interactors/songs/importFromItunes';
import removeSongsFromLibrary from '../../../core/interactors/songs/removeSongsFromLibrary';
import LibraryEntity from '../../../core/types/LibraryEntity';
import SongEntity from '../../../core/types/SongEntity';
import ApiError, { StatusCodeEnum } from '../services/ApiError';

export function importSongsFromItunesCtrl(
  req: Request<{ libraryId: string }>,
  res: Response<LibraryEntity>,
  next: NextFunction
): void {
  const { file, params } = req;
  const { libraryId } = params;
	if (!file) {
    throw new ApiError(StatusCodeEnum.BadRequest, 'File must be provided');
	}
  const { buffer: fileBuffer } = file;
	importFromItunes({ fileBuffer, mimetype: 'utf8', libraryId }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    next(err);
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
    next(err);
  });
}
