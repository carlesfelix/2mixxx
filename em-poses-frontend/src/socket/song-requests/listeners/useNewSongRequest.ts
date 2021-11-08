import { useEffect, useState } from 'react';
import { SERVER__NEW_SONG_REQUEST } from '../../../constants/server-socket-actions';
import mainSocket from '../../../services/main-socket';
import SocketReponse from '../../../types/SocketResponse';
import SongRequest from '../../../types/SongRequest';

export default function useNewSongRequest(): SocketReponse<SongRequest | undefined> {
  const [ songRequest, setSongRequest ] = useState<SocketReponse<SongRequest | undefined>>({
    data: undefined, status: 'OK'
  });
  useEffect(() => {
    function listener(res: SocketReponse<SongRequest>): void {
      setSongRequest(res)
    }
    mainSocket.on(SERVER__NEW_SONG_REQUEST, listener);
    return () => {
      mainSocket.off(SERVER__NEW_SONG_REQUEST, listener);
    };
  }, []);
  return songRequest;
}
