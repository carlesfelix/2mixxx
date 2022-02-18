import ErrorAsJSON from "../types/ErrorAsJSON";

export default abstract class BaseError<
  ErrorCode extends number = number,
  Details = unknown
> extends Error {
  code: ErrorCode;
  details?: Details;
  constructor(code: ErrorCode, details?: Details) {
    super();
    this.code = code;
    this.details = details;
    this.message = this.#resolveErrorMessage();
  }
  toJSON(): ErrorAsJSON<ErrorCode> {
    return {
      code: this.code,
      details: this.details,
      message: this.message,
      name: this.name
    }
  }
  #resolveErrorMessage(): string {
    const resolver = this.getErrorMessageResolver();
    return resolver[this.code] || '';
  }
  protected abstract getErrorMessageResolver(): Record<ErrorCode, string>;
  toNative(): Error {
    const message = this.toJSON();
    const error = new Error(JSON.stringify(message));
    error.stack = this.stack;
    return error;
  }
}
