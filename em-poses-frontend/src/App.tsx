import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import Routes from './components/Routes';
import { guestAppRoutes, registeredAppRoutes } from './constants/routes';
import { getGuestMeAction, getRegisteredMeAction, useMe } from './contexts/me';
import { useRoomUser } from './contexts/room-user';
import { setGuestTokenFn, setRegisteredTokenFn } from './services/http-auth';
import { connectToMainSocket, disconnectToMainSocket } from './services/main-socket';
import { getGuestToken } from './services/room-user-auth';
import AppRoute from './types/AppRoute';
import './App.scss';

function App() {
  const { state: roomUserState } = useRoomUser();
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const { state: meState, dispatch: meDispatch } = useMe();

  const registeredLogged = !isLoading && isAuthenticated;
  const guestLogged =  !roomUserState.inProgress &&
    roomUserState.isAuthenticated;
  const shouldGetMe = !meState.user && (registeredLogged || guestLogged) &&
    !meState.inProgress && !meState.error;
  const globalInProgress = isLoading || roomUserState.inProgress ||
    meState.inProgress || shouldGetMe;

  useEffect(() => {
    let removeToken: () => void;
    if (registeredLogged) {
      getRegisteredMeAction(meDispatch);
      removeToken = setRegisteredTokenFn(getIdTokenClaims);
      connectToMainSocket(async () => {
        const idToken = await getIdTokenClaims();
        return {
          authorization: `Bearer ${idToken.__raw}`,
          userType: 'registeredUser'
        };
      });
    } else if (guestLogged) {
      getGuestMeAction(meDispatch);
      removeToken = setGuestTokenFn(getGuestToken);
      connectToMainSocket(async () => ({
        authorization: `Bearer ${getGuestToken().__raw}`,
        userType: 'roomUser'
      }));
    }
    return () => {
      if (removeToken) {
        removeToken();
        disconnectToMainSocket();
      }
    }
  }, [ registeredLogged, guestLogged, meDispatch, getIdTokenClaims ]);
  let appRoutes: AppRoute[] = guestAppRoutes;
  let redirectPath: string = '/';
  if (meState.user) {
    if (meState.user.type === 'registered') {
      appRoutes = registeredAppRoutes;
      redirectPath = '/dashboard';
    }
  }

  if (globalInProgress) {
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
