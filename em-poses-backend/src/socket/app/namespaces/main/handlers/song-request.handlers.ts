import { Socket } from 'socket.io';
import Ack from '../../../types/Ack';
import { StatusCodeEnum } from '../../../services/SocketError';
import { UserSchema, userSchema } from '../../schemas/song-request.schemas';

export function addSongRequestHandler(socket: Socket) {
  return (payload: { songId: string }, ack: Ack): void => {
    const { value, error } = userSchema.validate(payload);
    if (error) {
      ack({
        status: 'FAILED',
        error: {
          code: StatusCodeEnum.BadPayload,
          message: error.message,
          details: error.details
        }
      });
    } else {
      const { songId } = value as UserSchema;
      console.log('song added!', songId, socket.data.auth);
      ack({ status: 'OK' });
    }
  }
}
