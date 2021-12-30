import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllLibraries } from '../../api/libraries';
import { addLibraryToRoom, deleteLibraryFromRoom, getRoomById } from '../../api/rooms';
import MultiselectBox from '../../components/forms/inputs/MultiselectBox';
import PageLayout from '../../components/PageLayout';
import RoomItem from '../../components/RoomItem';
import Section from '../../components/Section';
import { defaultRoomDetails } from '../../constants/default-states';
import { useTranslation } from '../../services/i18n';
import AsyncState from '../../types/AsyncState';
import Library from '../../types/Library';
import Room from '../../types/Room';
import './ManageRoomLibrariesPage.scss';

export default function ManageRoomLibrariesPage() {
  const { t } = useTranslation();
  const [ room, setRoom ] = useState<AsyncState<Room>>({
    data: defaultRoomDetails,
    error: false,
    inProgress: false
  });
  const [ libraries, setLibraries ] = useState<AsyncState<Library[]>>({
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
    setLibraries({
      inProgress: true, error: false,
      data: []
    });
    getAllLibraries().then(data => {
      setLibraries({
        data, error: false, inProgress: false
      });
    }).catch(() => {
      setLibraries({
        data: [], inProgress: false, error: true
      })
    });
  }, []);
  function checkedHandler(library: Library, checked: boolean): void {
    if (checked) {
      addLibraryToRoom(roomId, library.id!);
    } else {
      deleteLibraryFromRoom(roomId, library.id!);
    }
  }
  function changeHandler(value: string[]): void {
    const selectedLibraries = libraries.data.filter(({ id }) => value.includes(id!));
    setRoom(old => ({
      ...old,
      data: { ...old.data, libraries: selectedLibraries }
    }));
  }
  return (
    <PageLayout
      toolbarTitle={t('Pages.ManageRoomLibrariesPage.toolbarTitle')}
      toolbarLinkBack="/dashboard/rooms"
      inProgress={room.inProgress}
      error={room.error}
      errorMessage={t('Pages.ManageRoomLibrariesPage.roomLoadError')}
      className="ManageRoomLibrariesPage"
    >
      <div className="page-content manage-room-libraries-container">
        <RoomItem room={room.data} className="room-header" />
        <Section
          className="manage-room-content"
          header={
            <div className="manage-room-content__title">
              <h3>{t('Pages.ManageRoomLibrariesPage.subtitle')}</h3>
            </div>
          }
        >
          <MultiselectBox<Library>
            extraProps={{
              onChecked: checkedHandler,
              items: libraries.data,
              labelProp: 'title',
              valueProp: 'id',
              itemClassName: 'list-item'
            }}
            onChange={changeHandler}
            value={room.data.libraries!.map(({ id }) => id)}
            className="checkbox-list list list-hr"
          />
        </Section>
      </div>
    </PageLayout>
  );
}
