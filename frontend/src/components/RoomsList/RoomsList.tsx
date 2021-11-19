import classNames from 'classnames';
import AsyncState from '../../types/AsyncState';
import OptionItem from '../../types/OptionItem';
import Room from '../../types/Room';
import AsyncLayout from '../AsyncLayout';
import RoomItem from './components/RoomItem';
import './RoomsList.scss';

type Props = {
  rooms: AsyncState<Room[]>;
  menu?: OptionItem[];
  className?: string;
};
export default function RoomsList(props: Props) {
  const { rooms, menu, className = '' } = props;
  const roomListClassName = classNames('RoomsList', {
    [className]: !!className
  });
  return (
    <div className={roomListClassName}>
      <AsyncLayout
        inProgress={rooms.inProgress}
        error={rooms.error}
      >
        <>
          {
            rooms.data.map(room => (
              <div key={room.id} className="room-item">
                <RoomItem
                  room={room}
                  menu={menu}
                />
              </div>
            ))
          }
        </>
      </AsyncLayout>
    </div>
  );
}
