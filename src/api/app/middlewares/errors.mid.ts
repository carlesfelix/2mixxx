import { NextFunction, Request, Response } from 'express';
import responseMessages, { IResponseMessage } from '../constants/response-messages';

export function notFoundErrorMid(req: Request, res: Response, next: NextFunction): void {
  next(responseMessages.ERR_NOT_FOUND);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function genericErrorMid(responseMessage: IResponseMessage, req: Express.Request, res: Response, _: NextFunction): void {
  const { statusCode, code, msg } = responseMessage;
  res.status(statusCode).json({ msg, code });
}
