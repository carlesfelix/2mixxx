import { Socket } from 'socket.io';
import { errorHandler } from '../handlers/error.handlers';

export default function errorListeners(socket: Socket): void {
  socket.on('error', errorHandler(socket));
}
