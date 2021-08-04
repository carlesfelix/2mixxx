import { useRouteMatch } from 'react-router-dom';
import RoomView from '../../components/RoomView';
import { useGuestAuth } from '../../contexts/guest-auth';

export default function RoomPage() {
  const { state: guestAuthState } = useGuestAuth();
  const { token } = guestAuthState;
  const { url: parentUrl } = useRouteMatch<{ id: string }>();
  return (
    <div className="RoomPage">
      {
        token ? (
          <RoomView room={token.room} parentUrl={parentUrl} />
        ) : (
          <p>You must be logged in order to see this page</p>
        )
      }
    </div>
  );
}
