import { faEllipsisV, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import OverlayMenu from '../../components/OverlayMenu';
import OptionItem from '../../types/OptionItem';
import Room from '../../types/Room';
import Label from '../Label';
import './RoomItem.scss';

type Props = {
  room: Room;
  menu?: OptionItem[];
  className?: string;
};

export default function RoomItem(props: Props) {
  const { room, menu = [], className = '' } = props;
  const rootItemClassName = classNames(
    'RoomItem',
    { [className]: !!className }
  );
  return (
    <Label
      className={rootItemClassName}
      header={
        <div className="RoomItem__icon">
          <FontAwesomeIcon icon={faKey} />
        </div> 
      }
    >
      <div className="RoomItem__info">
        <span className="room-code">
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
    </Label>
  );
}
