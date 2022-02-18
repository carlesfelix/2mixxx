import ErrorAsJSON from "../../../core/types/ErrorAsJSON";

type SocketResponse<Data = unknown, ErrorCode extends number = number> = {
  error?: ErrorAsJSON<ErrorCode>;
  data?: Data;
  status: 'OK' | 'FAILED'
};

export default SocketResponse;
