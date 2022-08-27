import { Socket } from 'socket.io-client';
import SocketAck from '../types/SocketResponse';

export function emitWithAckPromise<Response = undefined>(
  socket: Socket, ev: string, ...args: any[]
): Promise<SocketAck<Response>> {
  return new Promise((resolve, reject) => {
    socket.timeout(45000).emit(ev, ...args, (error: any, ackResponse: SocketAck<Response>) => {
      if (error !== null) {
        reject();
      } else if (ackResponse.status === 'OK') {
        resolve(ackResponse);
      } else {
        reject(ackResponse.error);
      }
    });
  });
}
