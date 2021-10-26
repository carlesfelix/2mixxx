export enum StatusCodeEnum {
  BadRequest = 400,
  NotFound = 404,
  InternalError = 500,
  Unauthorized = 401,
  AccessDenied = 403
}
const apiErrorMessages = {
  [StatusCodeEnum.BadRequest]: 'Bad request',
  [StatusCodeEnum.NotFound]: 'Not found',
  [StatusCodeEnum.InternalError]: 'Internal server error',
  [StatusCodeEnum.Unauthorized]: 'Unauthorized',
  [StatusCodeEnum.AccessDenied]: 'Access denied',
}
export default class ApiError<Details = undefined> extends Error {
  statusCode: StatusCodeEnum;
  details: Details | undefined;
  constructor(statusCode: StatusCodeEnum, details?: Details | undefined) {
    super(apiErrorMessages[statusCode]);
    this.name = 'InteractorError';
    this.statusCode = statusCode;
    this.details = details;
  }
  getHttpResponse(): { message: string, details: Details | undefined } {
    return {
      message: this.message,
      details: this.details
    };
  }
}
