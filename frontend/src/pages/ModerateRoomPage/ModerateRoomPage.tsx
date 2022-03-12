import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMyRoomById } from '../../api/me';
import PageLayout from '../../components/PageLayout';
import SocketStatusLayout from '../../components/SocketStatusLayout';
import SongRequestQueueContent from './components/SongRequestQueueContent';
import { defaultRoomDetails } from '../../constants/default-states';
import environment from '../../environment';
import useSocketConnectionManager from '../../hooks/useSocketConnectionManager';
import useSocketConnectionStatus from '../../hooks/useSocketConnectionStatus';
import { useTranslation } from '../../services/i18n';
import AsyncState from '../../types/AsyncState';
import Room from '../../types/Room';
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
  const socketConnectionStatus = useSocketConnectionStatus(moderateRoomSocket);
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
      <SocketStatusLayout
        className="page-content ModerateRoomPage__content"
        socketConnectionStatus={socketConnectionStatus}
      >
        {
          !!moderateRoomSocket && (
            <SongRequestQueueContent moderateRoomSocket={moderateRoomSocket} />
          )
        }
      </SocketStatusLayout>
    </PageLayout>
  );
}
