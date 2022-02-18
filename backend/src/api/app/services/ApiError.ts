import BaseError from '../../../core/services/BaseError';

export enum StatusCodeEnum {
  BadRequest = 400,
  NotFound = 404,
  InternalError = 500,
  Unauthorized = 401,
  AccessDenied = 403
}

export default class ApiError<Details = unknown> extends BaseError<StatusCodeEnum, Details> {
  constructor(statusCode: StatusCodeEnum, details?: Details) {
    super(statusCode, details);
    this.name = 'ApiError';
  }
  protected getErrorMessageResolver(): Record<StatusCodeEnum, string> {
    return {
      [StatusCodeEnum.BadRequest]: 'Bad request',
      [StatusCodeEnum.NotFound]: 'Not found',
      [StatusCodeEnum.InternalError]: 'Internal server error',
      [StatusCodeEnum.Unauthorized]: 'Unauthorized',
      [StatusCodeEnum.AccessDenied]: 'Access denied',
    };
  }
}
