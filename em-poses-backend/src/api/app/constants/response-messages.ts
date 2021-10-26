import InteractorErrorCode from "../../../core/types/InteractorErrorCode";

export type IErrorCode = 'ERR_GENERIC' | 
'ERR_NOT_FOUND' |
'ERR_UNAUTHORIZED' | 'ERR_BAD_REQUEST' | 'UnauthorizedError';

export type ResponseError = {
  statusCode: number;
  msg: string;
};

export type ResponseErrors = Record<InteractorErrorCode, ResponseError>;

const responseErrors: ResponseErrors = {
  GENERIC: {
    statusCode: 500,
    msg: 'Something went wrong',
  },
  ENTITY_NOT_FOUND: {
    statusCode: 404,
    msg: 'No found'
  },
  UNAUTHORIZED: {
    statusCode: 401,
    msg: 'Unauthorized',
  },
  ACCESS_DENIED: {
    statusCode: 403,
    msg: 'Access denied'
  },
  BAD_INPUT: {
    statusCode: 400,
    msg: 'Bad request',
  }
};

export default responseErrors;
