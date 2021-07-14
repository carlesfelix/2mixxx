import { NextFunction, Request, Response } from 'express';
import responseErrors from '../constants/response-messages';
import importXmlInteractor from '../../../core/interactors/library/import-xml.interactor';
import searchTrackInteractor from '../../../core/interactors/library/search-track.interactor';

export function importLibraryCtrl(req: Request, res: Response, next: NextFunction): void {
  const { file } = req;
	if (!file) {
    next({ responseError: responseErrors.ERR_BAD_REQUEST, details: 'File does not exist' });
		return;
	}
	importXmlInteractor(file.buffer, 'utf8').then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    next({ responseError: responseErrors.ERR_GENERIC, details: err });
  });
  
}

export function searchCtrl(req: Request, res: Response, next: NextFunction): void {
  const { query: { query } } = req;
  if (typeof query === 'string') {
    searchTrackInteractor(query).then(tracks => {
      res.status(200).json(tracks);
    }).catch((err) => {
      next({ responseError: responseErrors.ERR_GENERIC, details: err });
    });
  }
  
}
