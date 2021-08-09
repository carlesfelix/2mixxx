import { useRouteMatch } from 'react-router-dom';
import RoomView from '../../components/RoomView';
import { useGuestAuth } from '../../contexts/guest-auth';

export default function RoomPage() {
  const { state: guestAuthState } = useGuestAuth();

  const { url: parentUrl } = useRouteMatch<{ id: string }>();
  return (
    <div className="RoomPage">
      <RoomView room="mock" parentUrl={parentUrl} />
    </div>
  );
}
