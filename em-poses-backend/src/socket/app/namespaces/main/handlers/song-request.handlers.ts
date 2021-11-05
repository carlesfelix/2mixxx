import { Socket } from 'socket.io';
import Ack from '../../../types/Ack';
import addSongRequest from '../../../../../core/interactors/song-request/add-song-request'; 
import { StatusCodeEnum } from '../../../services/SocketError';
import { SERVER__NEW_SONG_REQUEST } from '../constants/server-actions';
import { UserSchema, userSchema } from '../../schemas/song-request.schemas';
import getSongRequestsFromRoomInteractor from '../../../../../core/interactors/song-request/get-song-requests-from-room';

export function addSongRequestHandler(socket: Socket): (
  payload: { songId: string },
  ack: Ack
) => Promise<void> {
  return async (payload, ack) => {
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
      try {
        const {
          songId: newSongId, roomId,
          createdAt, updatedAt, song
        } = await addSongRequest(songId, socket.data.auth);
        const data = {
          id: newSongId, createdAt, updatedAt,
          song
        };
        socket.to(roomId!).emit(SERVER__NEW_SONG_REQUEST, data); 
        ack({ status: 'OK', data }); 
      } catch (err) {
        ack({ status: 'FAILED' });
      }
    }
  }
}

export function getSongRequestsHandler(socket: Socket): (
  payload: void, ack: Ack
) => Promise<void> {
  return async (payload, ack) => {
    try {
      const data = await getSongRequestsFromRoomInteractor(socket.data.auth);
      ack({ status: 'OK', data });
    } catch {
      ack({ status: 'FAILED' });
    }
  }
}
