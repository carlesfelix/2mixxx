import { faDoorOpen, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayMenu from '../../../../components/OverlayMenu';
import Room from '../../../../types/Room';
import { getRoomItemMenu } from '../../helpers';
import './RoomItem.scss';

type Props = {
  room: Room;
  onDeleteMenu: (room: Room) => void;
  onManageLibrariesMenu: (room: Room) => void;
  onManageModeradorsMenu: (room: Room) => void;
};

export default function RoomItem(props: Props) {
  const {
    room, onDeleteMenu,
    onManageLibrariesMenu,
    onManageModeradorsMenu
  } = props;
  const roomItemMenu = getRoomItemMenu({
    onDeleteRoom: deleteRoomMenuHandler,
    onManageLibraries: manageLibrariesMenuHandler,
    onManageModerators: manageModeratorsMenuHandler
  });
  function deleteRoomMenuHandler(): void {
    onDeleteMenu(room);
  }
  function manageLibrariesMenuHandler(): void {
    onManageLibrariesMenu(room);
  }
  function manageModeratorsMenuHandler(): void {
    onManageModeradorsMenu(room);
  }
  return (
    <div className="card card-primary RoomItem">
      <span className="room-icon">
      <FontAwesomeIcon icon={faDoorOpen} />
      </span>
      <span className="room-code">
        { room.code }
      </span>
      <span className="room-menu">
        <OverlayMenu items={roomItemMenu}>
          <span className="room-menu-btn">
            <FontAwesomeIcon icon={faEllipsisV} />
          </span>
        </OverlayMenu>
      </span>
    </div>
  );
}
