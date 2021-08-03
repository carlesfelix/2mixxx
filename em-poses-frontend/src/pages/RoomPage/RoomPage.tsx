import { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { io } from 'socket.io-client';
import PageLayout from '../../components/PageLayout';
import { SocketsProvider } from '../../contexts/sockets';
import environment from '../../environment';
import { getRoomRoutes } from '../../helpers/app-routes';

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

export default function RoomPage() {
  const { url, params } = useRouteMatch<{ id: string }>();
  const { id: roomId } = params;
  const roomRoutes = getRoomRoutes(url);
  useEffect(() => {
    songRequestsSocket.connect();
    return () => {
      songRequestsSocket.disconnect();
    }
  }, [ roomId ]);
  return (
    <div className="RoomPage">
      <SocketsProvider songRequestsSocket={songRequestsSocket}>
        <Switch>
          {
            roomRoutes.map((roomPageRoute, iRoomPageRoute) => (
              <Route path={`${url}${roomPageRoute.path}`} key={iRoomPageRoute} exact={roomPageRoute.exact}>
                <PageLayout toolbarTitle={roomPageRoute.toolbarTitle} routes={roomRoutes} links={roomPageRoute.links} toolbarLinkBack={roomPageRoute.toolbarLinkBack}>
                  <Suspense fallback={false}>
                    <roomPageRoute.Component />
                  </Suspense>
                </PageLayout>
              </Route>
            ))
          }
          <Route path={url} render={() => <Redirect to={`${url}/song-requests`} />} />
        </Switch>
      </SocketsProvider>
    </div>
  );
}
