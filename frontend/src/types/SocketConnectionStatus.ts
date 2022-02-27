import SocketErrorMessage from "./SocketErrorMessage";

type SocketConnectionStatus = {
  error?: SocketErrorMessage | string;
  connected: boolean;
};

export default SocketConnectionStatus;
