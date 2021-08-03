import { useAuth0 } from '@auth0/auth0-react';
import { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import getAppRoutes from './helpers/app-routes';
import './App.scss';

function App() {
  const { isAuthenticated, getIdTokenClaims, isLoading } = useAuth0();
  const appRoutes = getAppRoutes(isAuthenticated ? [
    'page:dashboard', 'page:room'
  ] : undefined);
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      getIdTokenClaims().then(token => {
        console.log('entra', token);
      })
    }
  }, [isLoading, isAuthenticated, getIdTokenClaims]);
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
        {
          isAuthenticated ? (
            <Route render={() => <Redirect to="/dashboard" />} />
          ) : (
            <Route render={() => <Redirect to="/" />} />
          )
        }
      </Switch>
    </div>
  );
}

export default App;
