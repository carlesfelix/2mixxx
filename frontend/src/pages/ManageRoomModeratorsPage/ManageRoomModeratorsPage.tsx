import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllUsers } from '../../api/registered-users';
import { addModeratorToRoom, deleteModeratorFromRoom, getRoomById } from '../../api/rooms';
import MultiselectBox from '../../components/forms/inputs/MultiselectBox';
import PageLayout from '../../components/PageLayout';
import RoomItem from '../../components/RoomItem';
import Section from '../../components/Section';
import { defaultRoomDetails } from '../../constants/default-states';
import AsyncState from '../../types/AsyncState';
import RegisteredUser from '../../types/RegisteredUser';
import Room from '../../types/Room';
import './ManageRoomModeratorsPage.scss';

export default function ManageRoomModeratorsPage() {
  const [ room, setRoom ] = useState<AsyncState<Room>>({
    data: defaultRoomDetails,
    error: false,
    inProgress: false
  });
  const [ registeredUsers, setRegisteredUsers ] = useState<AsyncState<RegisteredUser[]>>({
    data: [], error: false, inProgress: false
  });
  const { roomId } = useParams<{ roomId: string }>();
  useEffect(() => {
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
        data: defaultRoomDetails,
        error: true,
        inProgress: false
      });
    })
  }, [ roomId ]);
  useEffect(() => {
    setRegisteredUsers({
      inProgress: true, error: false,
      data: []
    });
    getAllUsers().then(data => {
      setRegisteredUsers({
        data, error: false, inProgress: false
      });
    }).catch(() => {
      setRegisteredUsers({
        data: [], inProgress: false, error: true
      })
    });
  }, []);
  function checkedHandler(moderator: RegisteredUser, checked: boolean): void {
    if (checked) {
      addModeratorToRoom(roomId, moderator.id!);
    } else {
      deleteModeratorFromRoom(roomId, moderator.id!);
    }
  }
  function changeHandler(value: string[]): void {
    const selectedModerators = registeredUsers.data.filter(({ id }) => value.includes(id!));
    setRoom(old => ({
      ...old,
      data: { ...old.data, moderators: selectedModerators }
    }));
  }
  return (
    <PageLayout
      toolbarTitle="Manage room's moderators"
      toolbarLinkBack="/dashboard/rooms"
      inProgress={room.inProgress}
      error={room.error}
      errorMessage="Room cannot be loaded :("
      className="ManageRoomModeratorsPage"
    >
      <div className="manage-room-moderators-container page-content">
        <RoomItem room={room.data} className="room-header" />
        <Section
          className="manage-room-content"
          header={
            <div className="manage-room-content__title">
              <h3>Assign/Unassign users</h3>
            </div>
          }
        >
          <MultiselectBox<RegisteredUser>
            extraProps={{
              onChecked: checkedHandler,
              items: registeredUsers.data,
              labelProp: 'email',
              valueProp: 'id',
              inProgress: registeredUsers.inProgress,
              error: registeredUsers.error,
              errorMessage: 'Users cannot be loaded :(',
              itemClassName: 'list-item'
            }}
            onChange={changeHandler}
            value={room.data.moderators!.map(({ id }) => id)}
            className="checkbox-list list list-hr"
          />
        </Section>
      </div>
    </PageLayout>
  );
}
