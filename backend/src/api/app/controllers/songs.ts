import { NextFunction, Request, Response } from 'express';
import searchSongsFromLibrary from '../../../core/interactors/songs/searchSongsFromLibrary';
import SongEntity from '../../../core/types/SongEntity';
import { RoomUserAuth } from '../../../core/types/UserAuth';

export function searchSongsCtrl(
  req: Request<
    unknown,
    SongEntity[],
    unknown,
    { query: string }
  >,
  res: Response<unknown, { auth: RoomUserAuth }>,
  next: NextFunction
): void {
  const {
    query: { query }
  } = req;
  searchSongsFromLibrary({
    userAuth: res.locals.auth,
    query
  }).then(tracks => {
    res.status(200).json(tracks);
  }).catch((err) => {
    next(err);
  });
}
