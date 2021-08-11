import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { roomRoutes } from '../../constants/routes';
import { SocketsProvider } from '../../contexts/sockets';
import environment from '../../environment';
import { getRoutes } from '../../helpers/app-routes';
import Routes from '../Routes';

const songRequestsSocket = io(`${environment.REACT_APP_SOCKET_BASE_URI}/song-requests`, {
  autoConnect: false,
  forceNew: true,
  auth: (cb) => {
    cb({
      room: `token -> ${Date.now()}`,
      token: ''
    })
  }
});

type Props = {
  room: string;
  parentUrl?: string;
}
export default function RoomView(props: Props) {
  const { parentUrl } = props;
  const routes = getRoutes({
    parentUrl,
    routes: roomRoutes
  });
  useEffect(() => {
    songRequestsSocket.connect();
    return () => {
      songRequestsSocket.disconnect();
    }
  }, []);
  return (
    <div className="RoomView">
      <SocketsProvider songRequestsSocket={songRequestsSocket}>
        <Routes routes={routes} fallbackPath={`${parentUrl}/song-requests`} />
      </SocketsProvider>
    </div>
  );
}
