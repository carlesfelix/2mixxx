import SocketAckError from './SocketAckError';

type SocketAck<Data = undefined> = {
  error?: SocketAckError;
  data: Data;
};

export default SocketAck;
