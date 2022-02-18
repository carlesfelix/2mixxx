import BaseError from "./BaseError";

export enum InteractorErrorCodeEnum {
  ENTITY_NOT_FOUND = 404,
  GENERIC = 500,
  UNAUTHORIZED = 401,
  ACCESS_DENIED = 403,
  BAD_INPUT_DATA = 400
}

export default class InteractorError<Details = undefined> extends BaseError<InteractorErrorCodeEnum> {
  constructor(code: InteractorErrorCodeEnum, details?: Details | undefined) {
    super(code, details);
    this.name = 'InteractorError';
  }

  protected getErrorMessageResolver(): Record<InteractorErrorCodeEnum, string> {
    return {
      [InteractorErrorCodeEnum.ENTITY_NOT_FOUND]: 'Entity not found',
      [InteractorErrorCodeEnum.GENERIC]: 'Generic error',
      [InteractorErrorCodeEnum.UNAUTHORIZED]: 'Unauthorized',
      [InteractorErrorCodeEnum.BAD_INPUT_DATA]: 'Bad data provided',
      [InteractorErrorCodeEnum.ACCESS_DENIED]: 'Access denied',
    };
  }
}
