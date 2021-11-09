import { useRouteMatch } from 'react-router-dom';
import RoomView from '../../components/RoomView';

export default function RoomPage() {
  const { url: parentUrl } = useRouteMatch<{ id: string }>();
  return (
    <div className="RoomPage">
      <RoomView room="mock" parentUrl={parentUrl} />
    </div>
  );
}
