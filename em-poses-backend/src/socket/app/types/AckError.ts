import { StatusCodeEnum } from '../services/SocketError';

type AckError<Details = unknown> = {
  code: StatusCodeEnum;
  message: string;
  details?: Details;
};

export default AckError;
