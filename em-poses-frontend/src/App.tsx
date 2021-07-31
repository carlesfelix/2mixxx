import { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { io } from 'socket.io-client';
import PageLayout from './components/PageLayout';
import appRoutes from './constants/app-routes';
import { SocketsProvider } from './contexts/sockets';

import './App.scss';

const socket = io('ws://localhost:3002/song-requests')

function App() {
  useEffect(() => {
    return () => {
      socket.disconnect();
    }
  }, []);
  return (
    <div className="App">
      <SocketsProvider songRequestsSocket={socket}>
        <BrowserRouter>
          <Switch>
            {
              appRoutes.map((appRoute, iAppRoute) => (
                <Route path={appRoute.route.path} key={iAppRoute}>
                  <PageLayout toolbarTitle={appRoute.route.toolbarTitle} routes={appRoutes}>
                    <Suspense fallback={false}>
                      <appRoute.route.Component />
                    </Suspense>
                  </PageLayout>
                </Route>
              ))
            }
          </Switch>
        </BrowserRouter>
      </SocketsProvider>
    </div>
  );
}

export default App;
