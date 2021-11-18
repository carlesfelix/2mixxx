import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createRoom, deleteRoom, getAllRooms } from '../../api/rooms';
import AsyncLayout from '../../components/AsyncLayout';
import ConfirmDialog from '../../components/ConfirmDialog';
import PageLayout from '../../components/PageLayout';
import AsyncState from '../../types/AsyncState';
import DialogState from '../../types/DialogState';
import Room from '../../types/Room';
import RoomItem from './components/RoomItem';
import './RoomsDashboardPage.scss';

export default function RoomsDashboardPage() {
  const { push } = useHistory();
  const [ rooms, setRooms ] = useState<AsyncState<Room[]>>({
    data: [], inProgress: true, error: false
  });
  const [ confirmDeleteDialog, setConfirmDeleteDialog ] = useState<DialogState<Room>>({
    inProgress: false, isOpen: false
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
  function deleteMenuHandler(room: Room): void {
    setConfirmDeleteDialog({
      inProgress: false, isOpen: true,
      data: room
    });
  }
  function manageLibrariesMenuHandler(room: Room): void {
    push(`/dashboard/rooms/${room.id}/libraries`);
  }
  function manageModeradorsMenuHandler(room: Room): void {
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
    <PageLayout toolbarTitle="Rooms" toolbarLinkBack="/dashboard">
      <div className="RoomsDashboardPage page-content">
        <AsyncLayout inProgress={rooms.inProgress} error={rooms.error}>
          <div className="room-list">
            {
              rooms.data.map(room => (
                <div key={room.id} className="room-item">
                  <RoomItem
                    room={room}
                    onDeleteMenu={deleteMenuHandler}
                    onManageLibrariesMenu={manageLibrariesMenuHandler}
                    onManageModeradorsMenu={manageModeradorsMenuHandler}
                  />
                </div>
              ))
            }
          </div>
        </AsyncLayout>
        <div className="actions-container">
          <button className="btn btn-primary" onClick={createNewRoomHandler}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Create new room</span>
          </button>
        </div>
        <ConfirmDialog
          message="The room will be deleted"
          isOpen={confirmDeleteDialog.isOpen}
          inProgress={confirmDeleteDialog.inProgress}
          onRejected={rejectedConfirmDeleteHandler}
          onConfirmed={confirmedDeleteHandler}
        />
      </div>
    </PageLayout>
  );
}
