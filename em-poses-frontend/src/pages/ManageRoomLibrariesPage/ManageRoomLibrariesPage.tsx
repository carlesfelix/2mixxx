import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllLibraries } from '../../api/libraries';
import { addLibraryToRoom, deleteLibraryFromRoom, getRoomById } from '../../api/rooms';
import MultiselectBox from '../../components/forms/inputs/MultiselectBox';
import PageLayout from '../../components/PageLayout';
import { defaultRoomDetails } from '../../constants/default-states';
import AsyncState from '../../types/AsyncState';
import Library from '../../types/Library';
import Room from '../../types/Room';
import './ManageRoomLibrariesPage.scss';

export default function ManageRoomLibrariesPage() {
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
    <PageLayout toolbarTitle="Manage room's libraries" toolbarLinkBack="/dashboard/rooms">
      <div className="ManageRoomLibrariesPage">
        <div className="card card-primary manage-room-header">
          <span className="room-icon">
            <FontAwesomeIcon icon={faDoorOpen} />
          </span>
          <span className="room-title">
            <span>{room.data.code}</span>
          </span>
        </div>
        <MultiselectBox<Library>
          extraProps={{
            onChecked: checkedHandler,
            items: libraries.data,
            labelProp: 'title',
            valueProp: 'id'
          }}
          onChange={changeHandler}
          value={room.data.libraries!.map(({ id }) => id)}
          className="manage-room-content card card-primary"
        />
      </div>
    </PageLayout>
  );
}
