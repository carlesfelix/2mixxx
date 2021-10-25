enum ErrorCode {
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  GENERIC = 'GENERIC',
  UNAUTHORIZED = 'UNAUTHORIZED',
  ACCESS_DENIED = 'ACCESS_DENIED'
}
export default class InteractorError extends Error {
  static Codes = ErrorCode;
  code: ErrorCode;
  constructor(code: ErrorCode, message?: string) {
    super(message);
    this.name = 'InteractorError';
    this.code = code;
  }
}
