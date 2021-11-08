import SocketResponse from './SocketResponse';

type Ack<Data = unknown> = (ackResponse: SocketResponse<Data>) => void;

export default Ack;
