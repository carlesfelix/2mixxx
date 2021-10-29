import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { SocketsProvider } from '../../contexts/sockets';
import environment from '../../environment';

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
  useEffect(() => {
    songRequestsSocket.connect();
    return () => {
      songRequestsSocket.disconnect();
    }
  }, []);
  return (
    <div className="RoomView">
      <SocketsProvider songRequestsSocket={songRequestsSocket}>
        {/* <Routes
          routes={roomRoutes} fallbackPath={`${parentUrl}/song-requests`}
          parentUrl={parentUrl}
        /> */}
      </SocketsProvider>
    </div>
  );
}
