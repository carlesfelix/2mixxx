import { Socket } from 'socket.io';

export default function errorListeners(socket: Socket): void {
  socket.on('error', () => {
    socket.disconnect();
  });
}
