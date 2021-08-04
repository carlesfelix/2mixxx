import { useAuth0 } from '@auth0/auth0-react';
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { guestPermissions, permissions } from './constants/permissions';
import { guestAppRoutes, registeredAppRoutes } from './constants/routes';
import { useGuestAuth } from './contexts/guest-auth';
import { getRoutes } from './helpers/app-routes';
import IRoute from './models/IRoute.model';
import './App.scss';

function App() {
  const { state: guestAuthState } = useGuestAuth();
  const { isAuthenticated, isLoading } = useAuth0();

  function getAppRoutes(): IRoute[] {
    if (!isLoading) {
      if (isAuthenticated) {
        return getRoutes({
          routes: registeredAppRoutes,
          permissions: Object.values(permissions)
        });
      }
    }
    if (!guestAuthState.inProgress) {
      if (guestAuthState.token) {
        return getRoutes({
          routes: guestAppRoutes,
          permissions: Object.values(guestPermissions)
        });
      }
    }
    return getRoutes({
      routes: guestAppRoutes
    });
  }
  function getRedirectPath(): string {
    if (isAuthenticated) {
      return '/dashboard';
    }
    if (guestAuthState.token) {
      return '/app';
    }
    return '/';
  }

  if (isLoading || guestAuthState.inProgress) {
    return <p>Login...</p>
  }

  return (
    <div className="App">
      <Switch>
        {
          getAppRoutes().map((route, IRoute) => (
            <Route path={route.path} key={IRoute} exact={route.exact}>
              <Suspense fallback={false}>
                <route.Component />
              </Suspense>
            </Route>
          ))
        }
        <Route render={() => <Redirect to={getRedirectPath()} />} />
      </Switch>
    </div>
  );
}

export default App;
