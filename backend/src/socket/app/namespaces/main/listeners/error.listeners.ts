import { Socket } from 'socket.io';

export default function errorListeners(socket: Socket): void {
  socket.on('error', () => {
    throw new Error("Not implemented");
  });
}
