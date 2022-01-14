import { useEffect, useState } from 'react';
import AsyncLayout from '../../components/AsyncLayout';
import BottomLink from '../../components/BottomLink';
import PageLayout from '../../components/PageLayout';
import { SERVER__DELETE_SONG_REQUEST, SERVER__NEW_SONG_REQUEST } from '../../constants/server-socket-actions';
import environment from '../../environment';
import useSocketConnectionManager from '../../hooks/useSocketConnectionManager';
import { useTranslation } from '../../services/i18n';
import { emitGetSongRequests } from '../../socket/emitters';
import AsyncState from '../../types/AsyncState';
import SocketReponse from '../../types/SocketResponse';
import SongRequest from '../../types/SongRequest';
import SongRequestQueue from './components/SongRequestQueue';
import './SongRequestsPage.scss';

export default function SongRequestsPage() {
  const { t } = useTranslation();
  const [ songRequests, setSongRequests ] = useState<
    AsyncState<{ request: SongRequest, deleteInProgress: boolean }[]>
  >({
    inProgress: true, error: false,
    data: []
  });
  const mainSocket = useSocketConnectionManager(environment.REACT_APP_SOCKET_BASE_URI);
  useEffect(() => {
    function newSongRequestlistener(res: SocketReponse<SongRequest>): void {
      setSongRequests(old => ({
        ...old,
        data: [ ...old.data, { request: res.data, deleteInProgress: false } ]
      }));
    }
    function deleteSongRequestlistener(
      res: SocketReponse<{ songRequestId: string }>
    ): void {
      setSongRequests(old => ({
        ...old,
        data: old.data.filter(
          ({ request }) => request.id !== res.data.songRequestId
        )
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
          data: data.data.map(request => ({
            request, deleteInProgress: false
          }))
        });
      }).catch(error => {
        setSongRequests({
          inProgress: false, error,
          data: []
        });
      });
      mainSocket.on(SERVER__NEW_SONG_REQUEST, newSongRequestlistener);
      mainSocket.on(SERVER__DELETE_SONG_REQUEST, deleteSongRequestlistener);
    }
    return () => {
      if (mainSocket) {
        mainSocket.off(SERVER__NEW_SONG_REQUEST, newSongRequestlistener);
        mainSocket.off(SERVER__DELETE_SONG_REQUEST, deleteSongRequestlistener);
      }
    };
  }, [ mainSocket ]);

  return (
    <PageLayout
      toolbarTitle={t('Pages.SongRequestsPage.toolbarTitle')}
      className="SongRequestsPage"
      bottomBar={
        <BottomLink to="/make-a-song-request">
          {t('Pages.SongRequestsPage.bottomAction')}
        </BottomLink>
      }
    >
      <div className="page-content SongRequestsPage__content">
        <AsyncLayout
          inProgress={songRequests.inProgress}
          error={songRequests.error}
          errorMessage={t('Pages.SongRequestsPage.pendingSongsLoadError')}
        >
          <SongRequestQueue
            className="pending-songs"
            songRequests={songRequests.data}
          /> 
        </AsyncLayout>
      </div>
    </PageLayout>
  );
}
