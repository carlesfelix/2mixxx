import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import Routes from './components/Routes';
import { guestAppRoutes, registeredAppRoutes } from './constants/routes';
import { useGuestAuth } from './contexts/guest-auth';
import { getGuestMeAction, getRegisteredMeAction, useMe } from './contexts/me';
import { getGuestToken } from './services/guest-auth';
import { setGuestTokenFn, setRegisteredTokenFn } from './services/http-auth';
import AppRoute from './types/AppRoute';
import './App.scss';

function App() {
  const { state: guestAuthState } = useGuestAuth();
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const { state: meState, dispatch: meDispatch } = useMe();

  const registeredLogged = !isLoading && isAuthenticated;
  const guestLogged = !guestAuthState.inProgress && guestAuthState.isAuthenticated;

  useEffect(() => {
    let removeToken: () => void;
    if (registeredLogged) {
      getRegisteredMeAction(meDispatch);
      removeToken = setRegisteredTokenFn(getIdTokenClaims);
    } else if (guestLogged) {
      getGuestMeAction(meDispatch);
      removeToken = setGuestTokenFn(getGuestToken);
    }
    return () => {
      if (removeToken) {
        removeToken();
      }
    }
  }, [ registeredLogged, guestLogged, meDispatch, getIdTokenClaims ]);

  let appRoutes: AppRoute[] = guestAppRoutes;
  let redirectPath: string = '/';
  if (meState.user) {
    if (meState.user.type === 'registered') {
      appRoutes = registeredAppRoutes;
      redirectPath = '/dashboard';
    } else {
      redirectPath = '/app';
    }
  }

  if (
    (isLoading || guestAuthState.inProgress || meState.inProgress) || 
    (!meState.user && (registeredLogged || guestLogged))
  ) {
    return <p>Login...</p>
  }

  return (
    <div className="App">
      <Routes
        routes={appRoutes} fallbackPath={redirectPath}
        permissions={meState.user?.permissions}
      />
    </div>
  );
}

export default App;
