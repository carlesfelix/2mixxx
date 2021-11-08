import { CLIENT__ADD_SONG_REQUEST, CLIENT__GET_SONG_REQUESTS } from '../../constants/client-socket-actions';
import { emitWithAckPromise } from '../../helpers/socket';
import mainSocket from '../../services/main-socket';
import SocketReponse from '../../types/SocketResponse';
import SongRequest from '../../types/SongRequest';

export async function emitNewSongRequest(songId: string): Promise<SocketReponse> {
  const data = await emitWithAckPromise(
    mainSocket,
    CLIENT__ADD_SONG_REQUEST,
    { songId }
  );
  return data;
}

export async function emitGetSongRequests(): Promise<SocketReponse<SongRequest[]>> {
  const data = await emitWithAckPromise<SongRequest[]>(
    mainSocket,
    CLIENT__GET_SONG_REQUESTS
  );
  return data;
}
