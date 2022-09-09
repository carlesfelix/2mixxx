import { Server, Socket } from 'socket.io';
import deleteSongRequestInteractor from '../../../../../core/interactors/song-request/delete-song-request';
import getSongRequestsFromRoomInteractor from '../../../../../core/interactors/song-request/get-song-requests-from-room';
import { SERVER__DELETE_SONG_REQUEST } from '../../../constants/server-actions';
import { sendAck } from '../../../helpers';
import Ack from '../../../types/Ack';

export function getSongRequestsHandler(socket: Socket): (ack: Ack) => Promise<void> {
  return async ack => {
    try {
      const data = await getSongRequestsFromRoomInteractor(socket.data.params.roomId);
      sendAck(ack, { data });
    } catch (error) {
      sendAck(ack, { error });
    }
  };
}

export function deleteSongRequestHandler(io: Server, socket: Socket): (
  payload: { songRequestId: string }, ack: Ack
) => Promise<void> {
  return async (payload, ack) => {
    const { songRequestId } = payload;
    try {
      await deleteSongRequestInteractor(
        songRequestId, socket.data.params.roomId
      );
      const deleteSongPayload = { data: { songRequestId } };
      socket.to(socket.data.params.roomId).emit(
        SERVER__DELETE_SONG_REQUEST,
        deleteSongPayload
      );
      io.of('/').to(socket.data.params.roomId).emit(
        SERVER__DELETE_SONG_REQUEST,
        deleteSongPayload
      );
      sendAck(ack);
    } catch (error) {
      sendAck(ack, { error });
    }
  };
}
