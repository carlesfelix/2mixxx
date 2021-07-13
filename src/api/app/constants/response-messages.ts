export type IMessageCode = 'ERR_GENERIC' | 
'ERR_NOT_FOUND' | 'ERR_DUPLICATED_ENTRIES' |
'ERR_UNAUTHORIZED' | 'ERR_BAD_REQUEST' | 'UnauthorizedError';

export interface IResponseMessage {
  statusCode: number;
  msg: string;
  code: IMessageCode;
}

export type IResponseMessages = Record<IMessageCode, IResponseMessage>;

const messages: IResponseMessages = {
  ERR_GENERIC: {
    statusCode: 500,
    msg: 'Something went wrong',
    code: 'ERR_GENERIC'
  },
  ERR_NOT_FOUND: {
    statusCode: 404,
    msg: 'No found',
    code: 'ERR_NOT_FOUND'
  },
  ERR_DUPLICATED_ENTRIES: {
    statusCode: 400,
    msg: 'Duplicated entries don\'t allowed',
    code: 'ERR_DUPLICATED_ENTRIES'
  },
  ERR_UNAUTHORIZED: {
    statusCode: 401,
    msg: 'Unauthorized!',
    code: 'ERR_UNAUTHORIZED'
  },
  ERR_BAD_REQUEST: {
    statusCode: 400,
    msg: 'Bad request',
    code: 'ERR_BAD_REQUEST'
  },
  UnauthorizedError: {
    statusCode: 401,
    msg: 'Invalid token!',
    code: 'UnauthorizedError'
  }
};

export default messages;
