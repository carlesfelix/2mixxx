import { Socket } from 'socket.io-client';
import SocketAck from '../types/SocketResponse';

export function emitWithAckPromise<Response = undefined>(
  socket: Socket, ev: string, ...args: any[]
): Promise<SocketAck<Response>> {
  return new Promise((resolve, reject) => {
    socket.emit(ev, ...args, (ackResponse: SocketAck<Response>) => {
      if (ackResponse.status === 'OK') {
        resolve(ackResponse);
      } else {
        reject(ackResponse.error);
      }
    });
  });
}
