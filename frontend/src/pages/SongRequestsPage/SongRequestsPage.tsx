import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { SERVER__NEW_SONG_REQUEST } from '../../constants/server-socket-actions';
import environment from '../../environment';
import useSocketConnectionManager from '../../hooks/useSocketConnectionManager';
import { emitGetSongRequests } from '../../socket/main/emitters';
import AsyncState from '../../types/AsyncState';
import SocketReponse from '../../types/SocketResponse';
import SongRequest from '../../types/SongRequest';
import SongRequestQueue from './components/SongRequestQueue';
import './SongRequestsPage.scss';

export default function SongRequestsPage() {
  const [ songRequests, setSongRequests ] = useState<AsyncState<SongRequest[]>>({
    inProgress: true, error: false,
    data: []
  });
  const mainSocket = useSocketConnectionManager(environment.REACT_APP_SOCKET_BASE_URI);
  useEffect(() => {
    function listener(res: SocketReponse<SongRequest>): void {
      setSongRequests(old => ({
        ...old,
        data: [ ...old.data, res.data ]
      }));
    }
    if (mainSocket) {
      setSongRequests({
        inProgress: true, error: false,
        data: []
      });
      emitGetSongRequests(mainSocket).then(data => {
        setSongRequests({
          inProgress: false, error: false,
          data: data.data
        });
      }).catch(error => {
        setSongRequests({
          inProgress: false, error,
          data: []
        });
      });
      mainSocket.on(SERVER__NEW_SONG_REQUEST, listener);
    }
    return () => {
      mainSocket && mainSocket.off(SERVER__NEW_SONG_REQUEST, listener);
    };
  }, [ mainSocket ]);

  return (
    <PageLayout toolbarTitle="Pending songs" className="SongRequestsPage">
      <div className="page-content">
        <SongRequestQueue
          className="pending-songs"
          songRequests={songRequests}
        />
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