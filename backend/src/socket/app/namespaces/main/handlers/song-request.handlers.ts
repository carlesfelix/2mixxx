import { Server, Socket } from 'socket.io';
import addSongRequest from '../../../../../core/interactors/song-request/add-song-request';
import getSongRequestsFromRoomInteractor from '../../../../../core/interactors/song-request/get-song-requests-from-room';
import SongRequestEntity from '../../../../../core/types/SongRequestEntity';
import { sendAck } from '../../../helpers';
import { StatusCodeEnum } from '../../../services/SocketError';
import Ack from '../../../types/Ack';
import SocketResponse from '../../../types/SocketResponse';
import { UserSchema, userSchema } from '../../schemas/song-request.schemas';
import { SERVER__NEW_SONG_REQUEST } from '../../../constants/server-actions';

export function addSongRequestHandler(io: Server, socket: Socket): (
  payload: { songId: string },
  ack: Ack
) => Promise<void> {
  return async (payload, ack) => {
    const { value, error } = userSchema.validate(payload);
    if (error) {
      sendAck(ack, {
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
          id, roomId,
          createdAt, updatedAt, song
        } = await addSongRequest(songId, socket.data.auth);
        const data = {
          id, createdAt, updatedAt,
          song
        };
        const response: SocketResponse<SongRequestEntity> = {
          status: 'OK',
          data
        };
        socket.to(roomId!).emit(SERVER__NEW_SONG_REQUEST, response);
        io.of(`/moderate-rooms/${roomId}`).to(roomId!).emit(
          SERVER__NEW_SONG_REQUEST, response
        );
        sendAck(ack, response); 
      } catch (err) {
        sendAck(ack, { status: 'FAILED' });
      }
    }
  }
}

export function getSongRequestsHandler(socket: Socket): (ack: Ack) => Promise<void> {
  return async ack => {
    try {
      const data = await getSongRequestsFromRoomInteractor(socket.data.auth.user.roomId);
      sendAck(ack, { status: 'OK', data });
    } catch {
      sendAck(ack, { status: 'FAILED' });
    }
  }
}
