import { faDoorOpen, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayMenu from '../../../../components/OverlayMenu';
import OptionItem from '../../../../types/OptionItem';
import Room from '../../../../types/Room';
import './RoomItem.scss';

type Props = {
  room: Room;
  menu?: OptionItem[];
};

export default function RoomItem(props: Props) {
  const { room, menu = [] } = props;

  return (
    <div className="card card-primary RoomItem">
      <span className="room-icon">
        <FontAwesomeIcon icon={faDoorOpen} />
      </span>
      <span className="room-code">
        { room.code }
      </span>
      {
        !!menu.length && (
          <span className="room-menu">
            <OverlayMenu items={menu} data={room}>
              <span className="room-menu-btn">
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>
            </OverlayMenu>
          </span>
        )
      }
    </div>
  );
}
