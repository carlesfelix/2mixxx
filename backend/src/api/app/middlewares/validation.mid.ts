import { NextFunction, Request, Response } from 'express';
import { ErrorFormatter, validationResult } from 'express-validator';
import ApiError, { StatusCodeEnum } from '../services/ApiError';

export function validationErrorMid(req: Request, res: Response, next: NextFunction): void {
  const errorFormatter: ErrorFormatter = ({ location, msg, param }) => (
    `${location}[${param}]: ${msg}`
  );
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    throw new ApiError(StatusCodeEnum.BadRequest, errors.array());
  }
  next();
}
