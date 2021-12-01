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
      sendAck(ack, { status: 'OK', data });
    } catch {
      sendAck(ack, { status: 'FAILED' });
    }
  };
}

export function deleteSongRequestHandler(io: Server, socket: Socket): (
  payload: { songRequestId: string }, ack: Ack
) => Promise<void> {
  return async (payload, ack) => {
    const { songRequestId } = payload;
    
    try {
      await deleteSongRequestInteractor(songRequestId);

      io.of('/').to(socket.data.params.roomId).emit(
        SERVER__DELETE_SONG_REQUEST,
        { data: { songRequestId } }
      );
      sendAck(ack, { status: 'OK' });
    } catch (err) {
      console.log(err)
      sendAck(ack, { status: 'FAILED' });
    }
  };
}