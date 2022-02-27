import SocketErrorEnum from "../enums/SocketErrorCodeEnum";

type SocketErrorMessage = {
  code: SocketErrorEnum;
  message: string;
  name: string;
  details?: unknown;
};

export default SocketErrorMessage;
