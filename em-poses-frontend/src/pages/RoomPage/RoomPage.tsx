import { Suspense, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { io } from 'socket.io-client';
import PageLayout from '../../components/PageLayout';
import { SocketsProvider } from '../../contexts/sockets';
import environment from '../../environment';
import { getRoomPageRoutes } from './helpers/room-page-routes';

const songRequestsSocket = io(`${environment.REACT_APP_SOCKET_BASE_URI}/song-requests`, {
  autoConnect: false,
  forceNew: true,
  auth: (cb) => {
    cb({
      room: `token -> ${Date.now()}`
    })
  }
});

export default function RoomPage() {
  const { url, params } = useRouteMatch<{ id: string }>();
  const { id: roomId } = params;
  const roomPageRoutes = getRoomPageRoutes(url);
  useEffect(() => {
    songRequestsSocket.connect();
    return () => {
      songRequestsSocket.disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ roomId ]);
  return (
      <div className="RoomPage">
        <SocketsProvider songRequestsSocket={songRequestsSocket}>
          <Switch>
            {
              roomPageRoutes.map((roomPageRoute, iRoomPageRoute) => (
                <Route path={`${url}${roomPageRoute.path}`} key={iRoomPageRoute}>
                  <PageLayout toolbarTitle={roomPageRoute.toolbarTitle} routes={roomPageRoutes} links={roomPageRoute.links} toolbarLinkBack={roomPageRoute.toolbarLinkBack}>
                    <Suspense fallback={false}>
                      <roomPageRoute.Component />
                    </Suspense>
                  </PageLayout>
                </Route>
              ))
            }
          </Switch>
        </SocketsProvider>
      </div>
  );
}
