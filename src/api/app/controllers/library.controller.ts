import { NextFunction, Request, Response } from "express";
import importXmlInteractor from "../../../core/interactors/library/import-xml.interactor";
import searchTrackInteractor from "../../../core/interactors/library/search-track.interactor";

export function importLibraryCtrl(req: Request, res: Response, next: NextFunction): void {
  const { file } = req;
	if (!file) {
		res.status(400).json({ msg: 'Bad request, file not found!' });
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
