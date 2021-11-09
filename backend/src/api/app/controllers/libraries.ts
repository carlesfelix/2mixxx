import { NextFunction, Request, Response } from 'express';
import createLibrary from '../../../core/interactors/libraries/createLibrary';
import deleteLibrary from '../../../core/interactors/libraries/deleteLibrary';
import getLibraries from '../../../core/interactors/libraries/getLibraries';
import getLibraryById from '../../../core/interactors/libraries/getLibraryById';
import updateLibrary from '../../../core/interactors/libraries/updateLibrary';
import LibraryEntity from '../../../core/types/LibraryEntity';

export function createLibraryCtrl(
  req: Request<unknown, unknown, LibraryEntity>,
  res: Response<LibraryEntity>,
  next: NextFunction
): void {
  const { body } = req;
  const { title } = body;
  createLibrary({ title }).then(library => {
    res.status(200).json(library);
  }).catch(err => {
    next(err);
  });
}

export function deleteLibraryCtrl(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): void {
  const { params } = req;
  const { id } = params;
  deleteLibrary(id).then(() => {
    res.status(200).json();
  }).catch(err => {
    next(err);
  });
}

export function updateLibraryCtrl(
  req: Request<{ id: string }>,
  res: Response<LibraryEntity>,
  next: NextFunction
): void {
  const { body, params } = req;
  const { title } = body;
  const { id } = params;
  updateLibrary(id, { title }).then(() => {
    res.status(200).json();
  }).catch(err => {
    next(err);
  });
}

export function getLibraryByIdCtrl(
  req: Request<{ id: string }>,
  res: Response<LibraryEntity>,
  next: NextFunction
): void {
  const { params } = req;
  const { id } = params;
  getLibraryById(id).then(library => {
    res.status(200).json(library);
  }).catch(err => {
    next(err);
  });
}

export function getLibrariesCtrl(
  _: Request,
  res: Response<LibraryEntity[]>,
  next: NextFunction
): void {
  getLibraries().then(libraries => {
    res.status(200).json(libraries);
  }).catch(err => {
    next(err);
  });
}
