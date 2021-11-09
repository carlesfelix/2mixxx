import SocketResponseError from './SocketResponseError';

type SocketReponse<Data = undefined> = {
  error?: SocketResponseError;
  data: Data;
  status: 'OK' | 'FAILED';
};

export default SocketReponse;
