import { CLIENT__ADD_SONG_REQUEST } from '../constants/client-socket-actions';
import mainSocket from '../services/main-socket';

export async function addSongRequest(songId: string): Promise<void> {
  await mainSocket.emitWithAck<void>({
    event: CLIENT__ADD_SONG_REQUEST,
    payload: { songId }
  });
}
