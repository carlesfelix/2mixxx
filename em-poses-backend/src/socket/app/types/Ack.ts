import AckError from './AckError';

type Ack<Data = unknown> = (ackResponse: {
  error?: AckError;
  data?: Data;
  status: 'OK' | 'FAILED'
}) => void;

export default Ack;
