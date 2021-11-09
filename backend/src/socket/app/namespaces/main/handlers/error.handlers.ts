import { Socket } from 'socket.io';
import InteractorError from '../../../../../core/services/InteractorError';

export function errorHandler(socket: Socket): (error: Error) => void {
  return err => {
    if (err instanceof InteractorError) {
      socket.emit('SERVER__SOCKET_ERROR', {
        code: err.code,
        message: err.message,
        details: err.details,
        type: err.name
      });
    } else {
      socket.emit('SERVER__SOCKET_ERROR', {
        code: 0,
        message: 'Internal server error',
        type: 'Unknown'
      });
    }
  }
}