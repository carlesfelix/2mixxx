import AckError from './AckError';

type Ack<Data = null> = (ackResponse: {
  error?: AckError;
  data: Data;
}) => void;

export default Ack;
