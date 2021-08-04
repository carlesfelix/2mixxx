import { useRouteMatch } from 'react-router-dom';
import RoomView from '../../components/RoomView';


export default function RoomPage() {
  const room = 'uI8jK';
  const { url: parentUrl } = useRouteMatch<{ id: string }>();
  return (
    <div className="RoomPage">
      <RoomView room={room} parentUrl={parentUrl} />
    </div>
  );
}
