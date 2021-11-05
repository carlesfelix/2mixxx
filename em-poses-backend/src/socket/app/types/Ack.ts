import AckError from './AckError';

type Ack<Data = null> = (ackResponse: {
  error?: AckError;
  data?: Data;
  status: 'OK' | 'FAILED'
}) => void;

export default Ack;
