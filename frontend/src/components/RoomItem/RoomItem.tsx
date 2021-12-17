import { faEllipsisV, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import OverlayMenu from '../../components/OverlayMenu';
import OptionItem from '../../types/OptionItem';
import Room from '../../types/Room';
import './RoomItem.scss';

type Props = {
  room: Room;
  menu?: OptionItem[];
  className?: string;
};

export default function RoomItem(props: Props) {
  const { room, menu = [], className = '' } = props;
  const rootItemClassName = classNames(
    'RoomItem', 'card', 'card-group',
    { [className]: !!className }
  );
  return (
    <div className={rootItemClassName}>
      <div className="RoomItem__icon card-addon card-addon-primary">
        <FontAwesomeIcon icon={faKey} />
      </div>
      <div className="RoomItem__info card card-primary">
        <span className="room-code card-title">
          { room.code }
        </span>
        {
          !!menu.length && (
            <span>
              <OverlayMenu items={menu} data={room}>
                <span>
                  <FontAwesomeIcon icon={faEllipsisV} className="card-icon" />
                </span>
              </OverlayMenu>
            </span>
          )
        }
      </div>
    </div>
  );
}
