import { Server, Socket } from 'socket.io';
import addSongRequest from '../../../../../core/interactors/song-request/add-song-request';
import getSongRequestsFromRoomInteractor from '../../../../../core/interactors/song-request/get-song-requests-from-room';
import SongRequestEntity from '../../../../../core/types/SongRequestEntity';
import { SERVER__NEW_SONG_REQUEST } from '../../../constants/server-actions';
import { sendAck } from '../../../helpers';
import { UserSchema, userSchema } from '../../../schemas/song-request.schemas';
import SocketError, { StatusCodeEnum } from '../../../services/SocketError';
import Ack from '../../../types/Ack';

export function addSongRequestHandler(io: Server, socket: Socket): (
  payload: { songId: string },
  ack: Ack
) => Promise<void> {
  return async (payload, ack) => {
    const { value, error } = userSchema.validate(payload);
    if (error) {
      sendAck(ack, {
        error: new SocketError(StatusCodeEnum.BadPayload, error.details)
      });
    } else {
      const { songId } = value as UserSchema;
      try {
        const {
          id, roomId,
          createdAt, updatedAt, song
        } = await addSongRequest(songId, socket.data.auth);
        const data: SongRequestEntity = {
          id, createdAt, updatedAt,
          song
        };
        const response = { data };
        socket.to(roomId!).emit(SERVER__NEW_SONG_REQUEST, response);
        io.of(`/moderate-rooms/${roomId}`).to(roomId!).emit(
          SERVER__NEW_SONG_REQUEST, response
        );
        sendAck(ack, { data }); 
      } catch (error) {
        sendAck(ack, { error });
      }
    }
  }
}

export function getSongRequestsHandler(socket: Socket): (ack: Ack) => Promise<void> {
  return async ack => {
    try {
      const data = await getSongRequestsFromRoomInteractor(socket.data.auth.roomId);
      sendAck(ack, { data });
    } catch (error) {
      sendAck(ack, { error });
    }
  }
}
