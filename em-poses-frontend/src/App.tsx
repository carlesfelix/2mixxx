import { useAuth0 } from '@auth0/auth0-react';
import { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { guestAppRoutes, registeredAppRoutes } from './constants/routes';
import { useGuestAuth } from './contexts/guest-auth';
import { getGuestMeAction, getRegisteredMeAction, useMe } from './contexts/me';
import { getRoutes } from './helpers/app-routes';
import AppRoute from './types/AppRoute';
import './App.scss';

function App() {
  const { state: guestAuthState } = useGuestAuth();
  const { isAuthenticated, isLoading } = useAuth0();
  const { state: meState, dispatch: meDispatch } = useMe();

  const registeredLogged = !isLoading && isAuthenticated;
  const guestLogged = !guestAuthState.inProgress && guestAuthState.isAuthenticated;

  useEffect(() => {
    if (registeredLogged) {
      getRegisteredMeAction(meDispatch);
    } else if (guestLogged) {
      getGuestMeAction(meDispatch);
    }
  }, [ registeredLogged, guestLogged, meDispatch ]);

  let appRoutes: AppRoute[] = [];
  let redirectPath: string = '';
  if (!meState.user) {
    appRoutes = getRoutes({ routes: guestAppRoutes });
    redirectPath = '/';
  } else if (meState.user.type === 'registered') {
    appRoutes = getRoutes({
      routes: registeredAppRoutes,
      permissions: meState.user.permissions
    });
    redirectPath = '/dashboard';
  } else if (meState.user.type === 'guest') {
    appRoutes = getRoutes({
      routes: guestAppRoutes,
      permissions: meState.user.permissions
    });
    redirectPath = '/app';
  }

  if (isLoading || guestAuthState.inProgress || meState.inProgress) {
    return <p>Login...</p>
  }

  return (
    <div className="App">
      <Switch>
        {
          appRoutes.map((route, AppRoute) => (
            <Route path={route.path} key={AppRoute} exact={route.exact}>
              <Suspense fallback={false}>
                <route.Component />
              </Suspense>
            </Route>
          ))
        }
        <Route render={() => <Redirect to={redirectPath} />} />
      </Switch>
    </div>
  );
}

export default App;
