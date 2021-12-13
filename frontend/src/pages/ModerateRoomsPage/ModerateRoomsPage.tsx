import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getMyRooms } from '../../api/me';
import PageLayout from '../../components/PageLayout';
import RoomsList from '../../components/RoomsList/RoomsList';
import AsyncState from '../../types/AsyncState';
import OptionItem from '../../types/OptionItem';
import Room from '../../types/Room';

export default function ModerateRoomsPage() {
  const { push } = useHistory();
  const menu: OptionItem[] = [
    {
      label: 'Moderate',
      onSelected: room => {
        push(`/moderate/rooms/${room.id}`);
      }
    }
  ];
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
      toolbarTitle="Moderate rooms"
      toolbarLinkBack="/dashboard"
    >
      <RoomsList
        className="page-content"
        rooms={rooms}
        menu={menu}
      />
    </PageLayout>
  );
}
