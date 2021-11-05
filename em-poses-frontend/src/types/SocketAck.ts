import SocketAckError from './SocketAckError';

type SocketAck<Data = undefined, Details = unknown> = {
  error?: SocketAckError<Details>;
  data: Data;
  status: 'OK' | 'FAILED';
};

export default SocketAck;
