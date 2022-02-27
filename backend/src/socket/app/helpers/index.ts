import BaseError from '../../../core/services/BaseError';
import ErrorAsJSON from '../../../core/types/ErrorAsJSON';
import SocketError, { StatusCodeEnum } from '../services/SocketError';
import Ack from '../types/Ack';
import AckPayload from '../types/AckPayload';

export function sendAck<Data = unknown>(
  ack?: Ack<Data>,
  ackPayload: AckPayload<Data> = {}
): void {
  if (typeof ack === 'function') {
    const { error, data } = ackPayload;
    let errorResponse: ErrorAsJSON | undefined;
    if (error instanceof BaseError) {
      errorResponse = error.toJSON();
    } else if (error instanceof Error) {
      const unknownError = new SocketError(StatusCodeEnum.InternalError);
      errorResponse = unknownError.toJSON();
    }
    ack({
      data,
      error: errorResponse,
      status: error ? 'FAILED' : 'OK'
    });
  }
}

export function buildNativeError(error: unknown): Error | undefined {
  if (error instanceof BaseError) {
    return error.toNative();
  }
  if (error instanceof Error) {
    const unknownError = new SocketError(StatusCodeEnum.InternalError);
    return unknownError.toNative();
  }
}
