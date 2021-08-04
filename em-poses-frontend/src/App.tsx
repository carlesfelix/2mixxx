import { useAuth0 } from '@auth0/auth0-react';
import { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { guestPermissions, permissions } from './constants/permissions';
import { guestAppRoutes, registeredAppRoutes } from './constants/routes';
import { getRoutes } from './helpers/app-routes';
import './App.scss';

function App() {
  const { isAuthenticated, getIdTokenClaims, isLoading } = useAuth0();
  const userType = 'guest';
  const routes = userType === 'guest' ? guestAppRoutes : registeredAppRoutes;
  const p = Object.values(userType === 'guest' ? guestPermissions : permissions);
  const appRoutes = getRoutes({
    routes,
    permissions: isAuthenticated ? p : undefined
  });
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      getIdTokenClaims().then(token => {
        console.log('entra', token);
      })
    }
  }, [isLoading, isAuthenticated, getIdTokenClaims]);
  function getRedirectPath(): string {
    if (!isAuthenticated) {
      return '/';
    }
    if (userType === 'guest') {
      return '/app';
    }
    return '/dashboard';
  }
  if (isLoading) {
    return <p>Login...</p>
  }
  return (
    <div className="App">
      <Switch>
        {
          appRoutes.map((appRoute, IRoute) => (
            <Route path={appRoute.path} key={IRoute} exact={appRoute.exact}>
              <Suspense fallback={false}>
                <appRoute.Component />
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
