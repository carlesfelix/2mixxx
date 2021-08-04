import { useRouteMatch } from 'react-router-dom';
import RoomView from '../../components/RoomView';

export default function RoomByIdPage() {
  const { url: parentUrl, params } = useRouteMatch<{ id: string }>();
  const { id: room } = params;
  return (
    <div className="RoomByIdPage">
      <RoomView room={room} parentUrl={parentUrl} />
    </div>
  );
}