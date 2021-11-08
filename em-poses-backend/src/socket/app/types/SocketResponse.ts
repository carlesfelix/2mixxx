import SocketResponseError from './SocketResponseError';

type SocketResponse<Data = unknown> = {
  error?: SocketResponseError;
  data?: Data;
  status: 'OK' | 'FAILED'
};

export default SocketResponse;
