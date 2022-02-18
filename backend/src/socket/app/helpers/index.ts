import BaseError from '../../../core/services/BaseError';
import ErrorAsJSON from '../../../core/types/ErrorAsJSON';
import SocketError, { StatusCodeEnum } from '../services/SocketError';
import Ack from '../types/Ack';
import AckPayload from '../types/AckPayload';

export function sendAck<Data = unknown>(
  ackPayload: AckPayload<Data>,
  ack?: Ack<Data>
): void {
  if (typeof ack === 'function') {
    const { error, ...data } = ackPayload;
    let errorResponse: ErrorAsJSON | undefined;
    if (error instanceof BaseError) {
      errorResponse = error.toJSON();
    } else if (error instanceof Error) {
      const unknownError = new SocketError(StatusCodeEnum.InternalError);
      errorResponse = unknownError.toJSON();
    }
    ack({
      ...data,
      error: errorResponse
    });
  }
}
