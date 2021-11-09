export enum StatusCodeEnum {
  BadPayload = 1,
  NotFound = 2,
  InternalError = 3,
  Unauthorized = 4,
  AccessDenied = 5
}
const socketErrorMessages = {
  [StatusCodeEnum.BadPayload]: 'Bad payload',
  [StatusCodeEnum.NotFound]: 'Not found',
  [StatusCodeEnum.InternalError]: 'Internal server error',
  [StatusCodeEnum.Unauthorized]: 'Unauthorized',
  [StatusCodeEnum.AccessDenied]: 'Access denied',
}

export default class SocketError<Details = undefined> extends Error {
  statusCode: StatusCodeEnum;
  details: Details | undefined;
  eventArgs: unknown[];
  constructor(errorProps: {
    statusCode: StatusCodeEnum,
    eventArgs: unknown[],
    details?: Details | undefined,
  }) {
    const {
      statusCode, eventArgs, details
    } = errorProps;
    super(socketErrorMessages[statusCode]);
    this.name = 'SocketError';
    this.statusCode = statusCode;
    this.eventArgs = eventArgs;
    this.details = details;
  }
}