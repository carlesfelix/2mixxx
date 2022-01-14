import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMyRoomById } from '../../api/me';
import AsyncLayout from '../../components/AsyncLayout';
import PageLayout from '../../components/PageLayout';
import { defaultRoomDetails } from '../../constants/default-states';
import { SERVER__DELETE_SONG_REQUEST, SERVER__NEW_SONG_REQUEST } from '../../constants/server-socket-actions';
import environment from '../../environment';
import useSocketConnectionManager from '../../hooks/useSocketConnectionManager';
import { useTranslation } from '../../services/i18n';
import { emitDeleteSongRequest, emitGetSongRequests } from '../../socket/emitters';
import AsyncState from '../../types/AsyncState';
import Room from '../../types/Room';
import SocketReponse from '../../types/SocketResponse';
import SongRequest from '../../types/SongRequest';
import SongRequestQueue from '../SongRequestsPage/components/SongRequestQueue';
import './ModerateRoomPage.scss';

export default function ModerateRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const { t } = useTranslation();
  const [ room, setRoom ] = useState<AsyncState<Room>>({
    inProgress: true, error: false,
    data: defaultRoomDetails
  });
  const moderateRoomSocket = useSocketConnectionManager(
    `${environment.REACT_APP_SOCKET_BASE_URI}/moderate-rooms/${roomId}`
  );
  const [ songRequests, setSongRequests ] = useState<
    AsyncState<{ request: SongRequest, deleteInProgress: boolean }[]>
  >({
    inProgress: true, error: false,
    data: []
  });
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
    if (moderateRoomSocket) {
      setSongRequests({
        inProgress: true, error: false,
        data: []
      });
      emitGetSongRequests(moderateRoomSocket).then(data => {
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
      moderateRoomSocket.on(SERVER__NEW_SONG_REQUEST, newSongRequestlistener);
      moderateRoomSocket.on(SERVER__DELETE_SONG_REQUEST, deleteSongRequestlistener);
    }
    return () => {
      if (moderateRoomSocket) {
        moderateRoomSocket.off(SERVER__NEW_SONG_REQUEST, newSongRequestlistener);
        moderateRoomSocket.off(SERVER__DELETE_SONG_REQUEST, deleteSongRequestlistener);
      }
    };
  }, [ moderateRoomSocket ]);
  useEffect(() => {
    async function fetchRoom(): Promise<void> {
      setRoom({
        inProgress: true, error: false,
        data: defaultRoomDetails
      });
      getMyRoomById(roomId).then(data => {
        setRoom({
          inProgress: false, error: false,
          data
        });
      }).catch(() => {
        setRoom({
          inProgress: false, error: true,
          data: defaultRoomDetails
        });
      });
    }
    fetchRoom();
  }, [ roomId ]);
  function setRequestProgress(
    songRequestId: string, inProgress: boolean,
    oldSongRequests: { request: SongRequest, deleteInProgress: boolean }[]
  ): { request: SongRequest, deleteInProgress: boolean }[] {
    return oldSongRequests.map(eachSongRequest => {
      if (eachSongRequest.request.id === songRequestId) {
        return {
          deleteInProgress: inProgress,
          request: eachSongRequest.request
        };
      }
      return eachSongRequest;
    });
  }
  function deleteSongHandler(songRequest: SongRequest): void {
    if (moderateRoomSocket) {
      setSongRequests(old => ({
        ...old,
        data: setRequestProgress(songRequest.id!, true, old.data)
      }));
      emitDeleteSongRequest(moderateRoomSocket, songRequest.id!).finally(() => {
        setSongRequests(old => ({
          ...old,
          data: old.data.filter(({ request }) => request.id !== songRequest.id)
        }));
      });
    }
  }
  return (
    <PageLayout
      className="ModerateRoomPage"
      hideTitleOnError
      toolbarTitle={t(
        'Pages.ModerateRoomPage.toolbarTitle',
        { value: room.data.code }
      )}
      toolbarLinkBack="/moderate/rooms"
      inProgress={room.inProgress}
      error={room.error}
      errorMessage={t('Pages.ModerateRoomPage.roomLoadError')}
    >
      <div className="page-content ModerateRoomPage__content">
        <AsyncLayout
          inProgress={songRequests.inProgress}
          error={songRequests.error}
          errorMessage={t('Pages.ModerateRoomPage.pendingSongsLoadError')}
        >
          <SongRequestQueue
            className="room-requests"
            songRequests={songRequests.data}
            canDelete
            onDeleteSong={deleteSongHandler}
          />
        </AsyncLayout>  
      </div>
    </PageLayout>
  );
}
