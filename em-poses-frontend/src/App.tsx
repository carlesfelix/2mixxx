import { useAuth0 } from '@auth0/auth0-react';
import { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { guestPermissions, permissions } from './constants/permissions';
import { guestAppRoutes, registeredAppRoutes } from './constants/routes';
import { useGuestAuth } from './contexts/guest-auth';
import { getRoutes } from './helpers/app-routes';
import AppRoute from './types/AppRoute';
import './App.scss';
import { getGuestToken } from './services/guest-auth';
import GuestToken from './types/GuestToken';

function App() {
  const { state: guestAuthState } = useGuestAuth();
  const { isAuthenticated, isLoading } = useAuth0();
  const [ guestToken, setGuestToken ] = useState<GuestToken | null>(null);
  const registeredLogged = !isLoading && isAuthenticated;
  const guestLogged = !guestAuthState.inProgress && guestAuthState.isAuthenticated;
  useEffect(() => {
    if (registeredLogged) {
      console.log('Registered authenticated');
    } else if (guestLogged) {
      console.log('Guest authenticated', getGuestToken());
    }
  }, [ registeredLogged, guestLogged ]);

  let appRoutes: AppRoute[];
  let redirectPath: string;
  if (registeredLogged) {
    appRoutes = getRoutes({
      routes: registeredAppRoutes,
      permissions: Object.values(permissions)
    });
    redirectPath = '/dashboard';
  } else if (guestLogged) {
    appRoutes = getRoutes({
      routes: guestAppRoutes,
      permissions: Object.values(guestPermissions)
    });
    redirectPath = '/app';
  } else {
    appRoutes = getRoutes({ routes: guestAppRoutes });
    redirectPath = '/';
  }

  if (isLoading || guestAuthState.inProgress) {
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
