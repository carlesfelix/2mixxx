import BaseError from '../../../core/services/BaseError';

export enum StatusCodeEnum {
  BadPayload = 1,
  NotFound = 2,
  InternalError = 3,
  Unauthorized = 4,
  AccessDenied = 5,
  TooManyEmits = 6
}

export default class SocketError<
  Details = unknown
> extends BaseError<StatusCodeEnum, Details> {
  constructor(statusCode: StatusCodeEnum, details?: Details) {
    super(statusCode, details);
    this.name = 'SocketError';
  }

  protected getErrorMessageResolver(): Record<StatusCodeEnum, string> {
    return {
      [StatusCodeEnum.BadPayload]: 'Bad payload',
      [StatusCodeEnum.NotFound]: 'Not found',
      [StatusCodeEnum.InternalError]: 'Internal server error',
      [StatusCodeEnum.Unauthorized]: 'Unauthorized',
      [StatusCodeEnum.AccessDenied]: 'Access denied',
      [StatusCodeEnum.TooManyEmits]: 'TooManyEmits'
    }
  }
}
