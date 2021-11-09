import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { SERVER__NEW_SONG_REQUEST } from '../../constants/server-socket-actions';
import environment from '../../environment';
import useSocketConnectionManager from '../../hooks/useSocketConnectionManager';
import { emitGetSongRequests } from '../../socket/main/emitters';
import SocketReponse from '../../types/SocketResponse';
import SongRequest from '../../types/SongRequest';
import SongRequestQueue from './components/SongRequestQueue';
import './SongRequestsPage.scss';

export default function SongRequestsPage() {
  const [ songRequests, setSongRequests ] = useState<SongRequest[]>([]);
  const mainSocket = useSocketConnectionManager(environment.REACT_APP_SOCKET_BASE_URI);
  useEffect(() => {
    function listener(res: SocketReponse<SongRequest>): void {
      setSongRequests(old => [ ...old, res.data ]);
    }
    if (mainSocket) {
      emitGetSongRequests(mainSocket).then(res => {
        setSongRequests(res.data)
      }).catch(err => console.log('err', err));
      mainSocket.on(SERVER__NEW_SONG_REQUEST, listener);
    }
    return () => {
      mainSocket && mainSocket.off(SERVER__NEW_SONG_REQUEST, listener);
    };
  }, [ mainSocket ]);

  return (
    <PageLayout toolbarTitle="Pending songs" className="SongRequestsPage">
      <div className="page-content">
        <SongRequestQueue songRequests={songRequests} onDeleteSong={() => {}} />
      </div>
      <Link
        className="btn btn-primary btn-round btn-make-song-request"
        to="/make-a-song-request"
      >
        Request a song
      </Link>
    </PageLayout>
  );
}