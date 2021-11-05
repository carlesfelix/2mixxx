type SocketAckError<Details = unknown> = {
  code: number;
  message: string;
  details?: Details;
};

export default SocketAckError;
