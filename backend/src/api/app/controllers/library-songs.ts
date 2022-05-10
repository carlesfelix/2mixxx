import { NextFunction, Request, Response } from 'express';
import importSongsToLibrary from '../../../core/interactors/songs/importSongsToLibrary';
import removeSongsFromLibrary from '../../../core/interactors/songs/removeSongsFromLibrary';
import SongEntity from '../../../core/types/SongEntity';

export function importSongsCtrl(
  req: Request<
    { libraryId: string },
    unknown,
    { songs: SongEntity[] }
  >,
  res: Response,
  next: NextFunction
): void {
  const { params, body } = req;
  const { libraryId } = params;
  const { songs } = body;
	importSongsToLibrary({
    libraryId,
    songs
  }).then(() => {
    res.status(200).json();
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
