import { NextFunction, Request, Response } from 'express';
import responseMessages from '../constants/response-messages';
import importXmlInteractor from '../../../core/interactors/library/import-xml.interactor';
import searchTrackInteractor from '../../../core/interactors/library/search-track.interactor';

export function importLibraryCtrl(req: Request, res: Response, next: NextFunction): void {
  const { file } = req;
	if (!file) {
    next(responseMessages.ERR_BAD_REQUEST);
		return;
	}
	importXmlInteractor(file.buffer, 'utf8').then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json({ msg: err });
  });
  
}

export function searchCtrl(req: Request, res: Response, next: NextFunction): void {
  const { query: { query } } = req;
  if (typeof query === 'string') {
    searchTrackInteractor(query).then(tracks => {
      res.status(200).json(tracks);
    }).catch((err) => {
      res.status(500).json({ msg: err });
    });
  }
  
}
