type ErrorAsJSON<ErrorCode extends number = number> = {
  name: string;
  message: string;
  details: unknown;
  code: ErrorCode;
};

export default ErrorAsJSON;
