import { NextFunction, Request, Response } from 'express';
import { ILibraryEntity } from '../../../core/entities/ILibraryEntity';
import createLibrary from '../../../core/interactors/libraries/createLibrary';
import deleteLibrary from '../../../core/interactors/libraries/deleteLibrary';
import getLibraries from '../../../core/interactors/libraries/getLibraries';
import getLibraryById from '../../../core/interactors/libraries/getLibraryById';
import updateLibrary from '../../../core/interactors/libraries/updateLibrary';
import responseErrors from '../constants/response-messages';

export function createLibraryCtrl(
  req: Request<unknown, unknown, ILibraryEntity>,
  res: Response<ILibraryEntity>,
  next: NextFunction
): void {
  const { body } = req;
  const { title } = body;
  createLibrary({ title }).then(library => {
    res.status(200).json(library);
  }).catch(err => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function deleteLibraryCtrl(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): void {
  const { params } = req;
  const { id } = params;
  deleteLibrary(id).then(deleteCount => {
    if (deleteCount) {
      res.status(200).json();
      return;
    }
    next({ responseError: responseErrors.ERR_NOT_FOUND });
  }).catch(err => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function updateLibraryCtrl(
  req: Request<{ id: string }>,
  res: Response<ILibraryEntity>,
  next: NextFunction
): void {
  const { body, params } = req;
  const { title } = body;
  const { id } = params;
  updateLibrary(id, { title }).then(updateCount => {
    if (updateCount) {
      res.status(200).json();
      return;
    }
    next({ responseError: responseErrors.ERR_NOT_FOUND });
  }).catch(err => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}

export function getLibraryByIdCtrl(
  req: Request<{ id: string }>,
  res: Response<ILibraryEntity>,
  next: NextFunction
): void {
  const { params } = req;
  const { id } = params;
  getLibraryById(id).then(library => {
    if (library) {
      res.status(200).json(library);
      return;
    }
    next({ responseError: responseErrors.ERR_NOT_FOUND });
  }).catch(err => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}


export function getLibrariesCtrl(
  _: Request,
  res: Response<ILibraryEntity[]>,
  next: NextFunction
): void {
  getLibraries().then(libraries => {
    res.status(200).json(libraries);
  }).catch(err => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
}
