import SocketResponse from '../types/SocketResponse';

export function sendAck<Ack = unknown>(ack: Ack, socketResponse: SocketResponse): void {
  if (typeof ack === 'function') {
    ack(socketResponse);
  }
}
