import { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { io } from 'socket.io-client';
import PageLayout from '../../components/PageLayout';
import { roomRoutes } from '../../constants/routes';
import { SocketsProvider } from '../../contexts/sockets';
import environment from '../../environment';
import { getRoutes } from '../../helpers/app-routes';

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
        <Switch>
          {
            routes.map((roomPageRoute, iRoomPageRoute) => (
              <Route path={roomPageRoute.path} key={iRoomPageRoute} exact={roomPageRoute.exact}>
                <PageLayout toolbarTitle={roomPageRoute.toolbarTitle} routes={routes} links={roomPageRoute.links} toolbarLinkBack={roomPageRoute.toolbarLinkBack}>
                  <Suspense fallback={false}>
                    <roomPageRoute.Component />
                  </Suspense>
                </PageLayout>
              </Route>
            ))
          }
          <Route path={parentUrl} render={() => <Redirect to={`${parentUrl}/song-requests`} />} />
        </Switch>
      </SocketsProvider>
    </div>
  );
}
