import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getRoomById } from '../../api/rooms';
import PageLayout from '../../components/PageLayout';
import { defaultRoomDetails } from '../../constants/default-states';
import environment from '../../environment';
import useSocketConnectionManager from '../../hooks/useSocketConnectionManager';
import AsyncState from '../../types/AsyncState';
import Room from '../../types/Room';
import SongRequest from '../../types/SongRequest';
import SongRequestQueue from '../SongRequestsPage/components/SongRequestQueue';
import './ModerateRoomPage.scss';

export default function ModerateRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [ room, setRoom ] = useState<AsyncState<Room>>({
    inProgress: true, error: false,
    data: defaultRoomDetails
  });
  const moderateRoomSocket = useSocketConnectionManager(
    `${environment.REACT_APP_SOCKET_BASE_URI}/moderate-rooms/${roomId}`
  );
  const [ songRequests, setSongRequests ] = useState<AsyncState<SongRequest[]>>({
    inProgress: true, error: false,
    data: []
  });
  useEffect(() => {
    if (moderateRoomSocket) {
      // TODO
    }
  }, [ moderateRoomSocket ]);
  useEffect(() => {
    async function fetchRoom(): Promise<void> {
      setRoom({
        inProgress: true, error: false,
        data: defaultRoomDetails
      });
      getRoomById(roomId).then(data => {
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
      toolbarTitle={room.data.code}
      toolbarLinkBack="/moderate/rooms"
      inProgress={room.inProgress}
      error={room.error}
      errorMessage="Room cannot be loaded :("
    >
      <div className="page-content moderate-room">
        <SongRequestQueue
          className="moderate-room__songs"
          songRequests={songRequests}
          canDelete
          onDeleteSong={() => {}}
        />
      </div>
    </PageLayout>
  );
}
