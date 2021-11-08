import { StatusCodeEnum } from '../services/SocketError';

type SocketResponseError = {
  code: StatusCodeEnum;
  message: string;
  details?: unknown;
};

export default SocketResponseError;
