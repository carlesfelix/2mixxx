import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom, deleteRoom, getAllRooms, getRoomQr } from '../../api/rooms';
import AsyncLayout from '../../components/AsyncLayout';
import BasicButton from '../../components/BasicButton';
import BottomActionWrapper from '../../components/BottomActionWrapper';
import ConfirmDialog from '../../components/ConfirmDialog';
import PageLayout from '../../components/PageLayout';
import RoomItem from '../../components/RoomItem';
import useObjectUrl from '../../hooks/useObjectUrl';
import { useTranslation } from '../../services/i18n';
import AsyncState from '../../types/AsyncState';
import DialogState from '../../types/DialogState';
import Room from '../../types/Room';
import { getRoomItemMenu } from './helpers';
import './RoomsDashboardPage.scss';

export default function RoomsDashboardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { createObjectURL } = useObjectUrl();
  const [ rooms, setRooms ] = useState<AsyncState<Room[]>>({
    data: [], inProgress: true, error: false
  });
  const [ confirmDeleteDialog, setConfirmDeleteDialog ] = useState<DialogState<Room>>({
    inProgress: false, isOpen: false
  });
  const menu = getRoomItemMenu({
    t,
    onDeleteRoom: deleteRoomMenuHandler,
    onManageLibraries: manageLibrariesMenuHandler,
    onManageModerators: manageModeratorsMenuHandler,
    onPrintQr: printQrHandler
  });
  useEffect(() => {
    getAllRooms().then(data => {
      setRooms({ inProgress: false, error: false, data });
    }).catch(() => {
      setRooms({ inProgress: false, error: true, data: [] });
    });
  }, []);
  function printQrHandler(room: Room): void {
    getRoomQr(
      room.id!,
      t('Pages.RoomsDashboardPage.roomQrHeader')
    ).then(data => {
      const url = createObjectURL(data);
      window.open(url);
    });
  }
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
    navigate(`/rooms/${room.id}/libraries`);
  }
  function manageModeratorsMenuHandler(room: Room): void {
    navigate(`/rooms/${room.id}/moderators`);
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
      toolbarTitle={t('Pages.RoomsDashboardPage.toolbarTitle')}
      toolbarLinkBack="/"
      className="RoomsDashboardPage"
      bottomBar={
        <BottomActionWrapper className="bottom-action">
          <BasicButton onClick={createNewRoomHandler} color="primary" className="bottom-action-btn">
            {t('Pages.RoomsDashboardPage.bottomActionButton')}
          </BasicButton>
        </BottomActionWrapper>
      }
    >
      <div className="page-content rooms-container layout layout-center-v">
        <AsyncLayout
          inProgress={rooms.inProgress}
          error={rooms.error}
        >
          {
            rooms.data.length ? (
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
            ) : (
              <p className="empty-rooms">
                {t('Pages.RoomsDashboardPage.emptyRooms')}
              </p>
            )
          }
          
        </AsyncLayout>
      </div>
      <ConfirmDialog
        message={t('Pages.RoomsDashboardPage.confirmDeleteRoom')}
        isOpen={confirmDeleteDialog.isOpen}
        inProgress={confirmDeleteDialog.inProgress}
        onRejected={rejectedConfirmDeleteHandler}
        onConfirmed={confirmedDeleteHandler}
      />
    </PageLayout>
  );
}
