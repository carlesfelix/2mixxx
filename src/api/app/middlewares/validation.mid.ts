import { NextFunction, Request, Response } from 'express';
import { ErrorFormatter, validationResult } from 'express-validator';
import responseErrors from '../constants/response-messages';

export function validatorErrorMid(req: Request, res: Response, next: NextFunction): void {
  const errorFormatter: ErrorFormatter = ({ location, msg, param }) => (
    `${location}[${param}]: ${msg}`
  );
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    next({ responseError: responseErrors.ERR_BAD_REQUEST, details: errors.array() });
    return;
  }
  next();
}
