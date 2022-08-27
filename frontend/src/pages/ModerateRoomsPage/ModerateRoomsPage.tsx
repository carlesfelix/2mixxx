import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyRooms } from '../../api/me';
import AsyncLayout from '../../components/AsyncLayout';
import PageLayout from '../../components/PageLayout';
import RoomItem from '../../components/RoomItem';
import { useTranslation } from '../../services/i18n';
import AsyncState from '../../types/AsyncState';
import Room from '../../types/Room';
import './ModerateRoomsPage.scss';

export default function ModerateRoomsPage() {
  const { t } = useTranslation();
  const [ rooms, setRooms ] = useState<AsyncState<Room[]>>({
    data: [], inProgress: true, error: false
  });
  useEffect(() => {
    getMyRooms().then(data => {
      setRooms({ inProgress: false, error: false, data });
    }).catch(() => {
      setRooms({ inProgress: false, error: true, data: [] });
    });
  }, []);
  return (
    <PageLayout
      className="ModerateRoomsPage"
      toolbarTitle={t('Pages.ModerateRoomsPage.toolbarTitle')}
      toolbarLinkBack="/"
    >
      <AsyncLayout
        inProgress={rooms.inProgress}
        error={rooms.error}
      >
        <div className="page-content rooms-container layout layout-center-v">
          <div className="rooms-grid">
            {
              rooms.data.map(room => (
                <Link to={`/moderate/rooms/${room.id}`} key={room.id}>
                  <RoomItem
                    className="room-item mouse-event mouse-event-hover mouse-event-clickable"
                    room={room}
                  />
                </Link>
              ))
            }
          </div>
        </div>
      </AsyncLayout>
    </PageLayout>
  );
}
