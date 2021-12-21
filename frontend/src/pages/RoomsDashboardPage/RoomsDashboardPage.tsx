import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createRoom, deleteRoom, getAllRooms } from '../../api/rooms';
import AsyncLayout from '../../components/AsyncLayout';
import BottomActionButton from '../../components/BottomActionButton';
import ConfirmDialog from '../../components/ConfirmDialog';
import PageLayout from '../../components/PageLayout';
import RoomItem from '../../components/RoomItem';
import AsyncState from '../../types/AsyncState';
import DialogState from '../../types/DialogState';
import Room from '../../types/Room';
import { getRoomItemMenu } from './helpers';
import './RoomsDashboardPage.scss';

export default function RoomsDashboardPage() {
  const { push } = useHistory();
  const [ rooms, setRooms ] = useState<AsyncState<Room[]>>({
    data: [], inProgress: true, error: false
  });
  const [ confirmDeleteDialog, setConfirmDeleteDialog ] = useState<DialogState<Room>>({
    inProgress: false, isOpen: false
  });
  const menu = getRoomItemMenu({
    onDeleteRoom: deleteRoomMenuHandler,
    onManageLibraries: manageLibrariesMenuHandler,
    onManageModerators: manageModeratorsMenuHandler
  });
  useEffect(() => {
    getAllRooms().then(data => {
      setRooms({ inProgress: false, error: false, data });
    }).catch(() => {
      setRooms({ inProgress: false, error: true, data: [] });
    });
  }, []);
  function createNewRoomHandler(): void {
    createRoom().then(data => {
      setRooms(old => ({ ...old, data: [ data, ...old.data ] }))
    });
  }
  function deleteRoomMenuHandler(room: Room): void {
    setConfirmDeleteDialog({
      inProgress: false, isOpen: true,
      data: room
    });
  }
  function manageLibrariesMenuHandler(room: Room): void {
    push(`/dashboard/rooms/${room.id}/libraries`);
  }
  function manageModeratorsMenuHandler(room: Room): void {
    push(`/dashboard/rooms/${room.id}/moderators`);
  }
  function rejectedConfirmDeleteHandler(): void {
    setConfirmDeleteDialog({
      inProgress: false, isOpen: false
    });
  }
  function confirmedDeleteHandler(): void {
    if (confirmDeleteDialog.data) {
      setConfirmDeleteDialog(old => ({
        ...old, inProgress: true
      }));
      deleteRoom(confirmDeleteDialog.data.id!).then(() => {
        setRooms(old => ({
          ...old,
          data: old.data.filter(
            eachRoom => confirmDeleteDialog.data?.id !== eachRoom.id
          )
        }));
        setConfirmDeleteDialog({
          inProgress: false, isOpen: false
        });
      }).catch(() => {
        setConfirmDeleteDialog(old => ({
          ...old, inProgress: false
        }));
      });
    }
  }
  return (
    <PageLayout
      toolbarTitle="Rooms"
      toolbarLinkBack="/dashboard"
      className="RoomsDashboardPage"
      bottomBar={
        <BottomActionButton onClick={createNewRoomHandler}>
          Create a new room
        </BottomActionButton>
      }
    >
      <div className="page-content rooms-container layout layout-center-v">
        <AsyncLayout
          inProgress={rooms.inProgress}
          error={rooms.error}
        >
          <div className="rooms-grid">
            {
              rooms.data.map(room => (
                <RoomItem
                  key={room.id}
                  className="room-item"
                  room={room}
                  menu={menu}
                />
              ))
            }
          </div>
        </AsyncLayout>
      </div>
      <ConfirmDialog
        message="The room will be deleted"
        isOpen={confirmDeleteDialog.isOpen}
        inProgress={confirmDeleteDialog.inProgress}
        onRejected={rejectedConfirmDeleteHandler}
        onConfirmed={confirmedDeleteHandler}
      />
    </PageLayout>
  );
}
