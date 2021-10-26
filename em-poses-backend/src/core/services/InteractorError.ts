export enum InteractorErrorCodeEnum {
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  GENERIC = 'GENERIC',
  UNAUTHORIZED = 'UNAUTHORIZED',
  ACCESS_DENIED = 'ACCESS_DENIED',
  BAD_INPUT_DATA = 'BAD_INPUT_DATA'
}

const interactorErrorMessages = {
  [InteractorErrorCodeEnum.ENTITY_NOT_FOUND]: 'Not found',
  [InteractorErrorCodeEnum.GENERIC]: 'Internal error',
  [InteractorErrorCodeEnum.UNAUTHORIZED]: 'Unauthorized',
  [InteractorErrorCodeEnum.BAD_INPUT_DATA]: 'Bad data provided',
  [InteractorErrorCodeEnum.ACCESS_DENIED]: 'Access denied',
}

export default class InteractorError<Details = undefined> extends Error {
  code: InteractorErrorCodeEnum;
  details: Details | undefined;
  constructor(code: InteractorErrorCodeEnum, details?: Details | undefined) {
    super(interactorErrorMessages[code]);
    this.name = 'InteractorError';
    this.code = code;
    this.details = details;
  }
}
